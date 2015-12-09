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
end
