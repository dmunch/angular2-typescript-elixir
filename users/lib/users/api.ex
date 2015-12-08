defmodule Users.Api do  
  use Maru.Router
  @store Application.get_env(:users, :users_store)

  namespace :users do  
    desc "get all users" 
       get do conn |> json @store.get 
    end 
    
      route_param :id do
        desc "get a specific user"
          get do conn |> json @store.get params[:id]    
        end
      end
  end

  rescue_from :all do
    status 500
    conn |> json %{message: "Server Error"}
  end
end
