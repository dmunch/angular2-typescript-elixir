defmodule User do
  @derive [Poison.Encoder]
  defstruct [:id, :name, :description, :email]
end

defmodule Users do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      worker(Users.AgentWorker, [])
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Users.Supervisor]
    svReturn = Supervisor.start_link(children, opts)

    #Setup some test data
    Users.AgentWorker.insert(%User{name: "Daniel", email: "xxxx@gmail.com", description: "Developer"})
    
    #start expects us to return this value
    svReturn
  end
end
