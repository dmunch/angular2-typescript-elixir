defmodule Users.AgentWorker do
  @name __MODULE__

  def start_link do
    Agent.start_link(fn -> %{} end, name: @name)
  end

  def insert(params) do
    id = get_id_value
    Agent.update(@name, &Map.put_new(&1, id, %{params | id: id}))
    id
  end

  def update(params) do
    Agent.update(@name, &Map.put(&1, params.id, params))
  end

  def get do
    Agent.get(@name, &Map.values(&1))
  end
  def get(id) do
    Agent.get(@name, &Map.get(&1, id))
  end

  def delete(id) do
    Agent.update(@name, &Map.delete(&1, id))
  end

  defp get_id_value do
    :crypto.rand_bytes(16) |> Base.encode16 |> String.downcase
  end
end
