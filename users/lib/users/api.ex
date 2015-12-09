defmodule Users.Api do  
  use Maru.Router
  @store Application.get_env(:users, :users_store)

  defp params_to_user(params) do
    %User{id: params[:id], name: params[:name], description: params[:description], email: params[:email]}
  end

  namespace :users do  
    desc "get all users" 
       get do conn |> json @store.get 
    end 
    
    route_param :id do
      desc "get a specific user"
        get do conn |> json @store.get params[:id]    
      end
      desc "delete a specific user"
        delete do 
          conn
          |> put_status(204) 
          |> json @store.delete params[:id]    
      end
      desc "update a specific user"
        params do 
          requires :name
          requires :description
          requires :email
          requires :id 
        end
        put do 
          conn 
          |> put_status(200)
          |> json @store.update(params_to_user(params)) 
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
      |> json @store.insert(params_to_user(params))
    end
  end

  rescue_from :all, as: error do
    status 500
    IO.puts(error)
    conn |> json %{message: error}
  end
end
