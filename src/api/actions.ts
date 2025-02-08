import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const getTodos = async () => {
  const response = await api.get("/todos");
  return response.data;
};

export const createTodo = async (name: string) => {
  const response = await api.post("/todos", { name });
  return response.data;
};

export const updateTodo = async (id: number, name: string, status: boolean) => {
  const response = await api.put("/todos", { id, name, status });
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};

export default api;
