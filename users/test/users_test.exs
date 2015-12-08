defmodule APITest do
  use ExUnit.Case
  use Maru.Router
  use Maru.Test, for: Users.Api

  @store Application.get_env(:users, :users_store)

  setup do
    @store.clear
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

  end
end
