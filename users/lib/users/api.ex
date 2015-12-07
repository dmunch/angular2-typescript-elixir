defmodule Users.Api do  
  use Maru.Router
  alias Users.AgentWorker, as: Store 

  namespace :users do  
    desc "get all users" 
      get do Store.get |> json 
    end 
  end

  def error(conn, _e) do 
    %{error: _e} |> json 
  end  
end
