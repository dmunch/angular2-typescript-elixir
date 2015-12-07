use Mix.Config

config :maru, Users.Api,
  http: [port: 8800]
config :users, :users_store, Users.AgentWorker
