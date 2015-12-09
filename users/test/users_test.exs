defmodule APITest do
  use ExUnit.Case
  use Maru.Router
  use Maru.Test, for: Users.Api

  @store Application.get_env(:users, :users_store)

  setup do
    @store.clear
  end

  def get_and_decode(url, type) do
    conn(:get, url) 
      |> make_response
      |> (fn r -> r.resp_body end).()
      |> (fn json -> Poison.decode!(json, as: type) end).()
  end

  test "/users" do 
    user1 = %User{name: "daniel", description: "developer"}
    user2 = %User{name: "hans", description: "user"}

    user1 = @store.insert(user1)
    user2 = @store.insert(user2)
 
    #sort the lists since by specs we don't care about the order
    assert [user1, user2] |> Enum.sort == "/users" |> (get_and_decode [User]) |> Enum.sort 
  end

  test "/users/:id" do
    user1 = %User{name: "daniel", description: "developer"}
    user2 = %User{name: "hans", description: "user"}

    user1 = @store.insert(user1)
    user2 = @store.insert(user2)
    assert user1 == "/users/#{user1.id}" |> get_and_decode User
    assert user2 == "/users/#{user2.id}" |> get_and_decode User
  end

  test "creates new user by posting to /users/" do
    user1 = %User{name: "daniel", description: "developer", email: "yyy@xxx.de"}
    user2 = %User{name: "hans", description: "user", email: "xxx@yyy.de"}

    post_new_user = fn user -> conn(:post, "/users", user |> Poison.encode!) 
      |> Plug.Conn.put_req_header("content-type", "application/json") 
      |> make_response
      |> (fn r -> r.resp_body end).()
      |> (fn json -> Poison.decode!(json, as: User) end).()
    end

    new_user1 = post_new_user.(user1)
    assert new_user1 === @store.get(new_user1.id) 
    new_user2 = post_new_user.(user2)
    assert new_user2 === @store.get(new_user2.id) 
  end
  test "returns status code 201 when creating new user by posting to /users/" do
    user1 = %User{name: "daniel", description: "developer", email: "yyy@xxx.de"}

    post_new_user = fn user -> conn(:post, "/users", user |> Poison.encode!) 
      |> Plug.Conn.put_req_header("content-type", "application/json") 
      |> make_response
    end

    new_user1_resp = post_new_user.(user1)
    assert 201 == new_user1_resp.status
  end
  
  test "updates an existing user by PUT on /users/:id" do
    user = %User{name: "daniel", description: "developer", email: "yyy@xxx.de"}
    user = @store.insert(user)
    
    update_user = fn user -> 
      conn(:put, "/users/#{user.id}", user |> Poison.encode!) 
      |> Plug.Conn.put_req_header("content-type", "application/json") 
      |> make_response
      |> (fn r -> r.resp_body end).()
      |> (fn json -> Poison.decode!(json, as: User) end).()
    end

    updated_user = %{user | name: "sigfried"}
    assert updated_user === update_user.(updated_user)
    assert updated_user === @store.get(user.id)
  end
end
