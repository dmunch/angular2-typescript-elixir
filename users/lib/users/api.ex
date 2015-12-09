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

   desc "create a new user"
     params do 
      requires :name
      requires :description
      requires :email
      optional :id 
    end
    post do
      conn 
      |> put_status(201)
      |> json @store.insert(%User{name: params[:name], description: params[:description], email: params[:email]})
    end
  end

  rescue_from :all, as: error do
    status 500
    conn |> json %{message: error}
  end
end
