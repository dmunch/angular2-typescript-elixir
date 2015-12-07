defmodule APITest do
  use ExUnit.Case
  use Maru.Router
  use Maru.Test, for: Users.Api

  @store Application.get_env(:users, :users_store)

  test "/users" do
    resp_body = conn(:get, "/users") |> make_response |> (fn r -> r.resp_body end).()
    assert @store.get |> Poison.encode! == resp_body 
  end
end
