defmodule APITest do
  use ExUnit.Case
  use Maru.Router
  use Maru.Test, for: Users.Api

  @store Application.get_env(:users, :users_store)

  setup do
    @store.clear
  end

  def get(url, type) do
    conn(:get, "/users") 
      |> make_response
      |> (fn r -> r.resp_body end).()
      #|> (fn json -> Poison.decode!(json, :as type) end).()
  end
 
  test "/users" do 
    user1 = %User{name: "daniel", description: "developer"}
    user2 = %User{name: "hans", description: "user"}

    user1 = %{user1 | id: @store.insert(user1)}
    user2 = %{user2 | id: @store.insert(user2)}
 
    resp_body = conn(:get, "/users") |> make_response |> (fn r -> r.resp_body end).()
    
    #sort the lists since by specs we don't care about the order
    assert [user1, user2] |> Enum.sort == Poison.decode!(resp_body, as: [User]) |> Enum.sort 
  end

  test "/users/:id" do
    user1 = %User{name: "daniel", description: "developer"}
    user2 = %User{name: "hans", description: "user"}

    user1 = %{user1 | id: @store.insert(user1)}
    user2 = %{user2 | id: @store.insert(user2)}

    resp_body = conn(:get, "/users/#{user1.id}") |> make_response |> (fn r -> r.resp_body end).()
    assert user1 === Poison.decode!(resp_body, as: User)
    
    resp_body = conn(:get, "/users/#{user2.id}") |> make_response |> (fn r -> r.resp_body end).()
    assert user2 === Poison.decode!(resp_body, as: User)
  end
end
