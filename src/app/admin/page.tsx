"use client";
import { useEffect, useState } from "react";
import api from "@/api/actions";

interface Todo {
  id: number;
  name: string;
  status: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get<Todo[]>("/todos");
        setTodos(response.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await api.post<Todo>("/todos", { name: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (err) {
      console.error("Erro ao adicionar tarefa", err);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error("Erro ao deletar tarefa", err);
    }
  };

  const toggleStatus = async (id: number, name: string, status: boolean) => {
    try {
      const response = await api.put<Todo>("/todos", { id, name, status: !status });
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
    } catch (err) {
      console.error("Erro ao atualizar tarefa", err);
    }
  };

  if (loading) return <div className="text-center text-xl">Carregando...</div>;
  if (error) return <div className="text-center text-red-500">Erro: {error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-black text-2xl font-bold mb-4">adicionar produto novo</h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="text-black flex-grow p-2 border rounded-l-lg"
            placeholder="Nova tarefa"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Adicionar</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="text-gray-800 border-b py-2 flex justify-between items-center">
              <span onClick={() => toggleStatus(todo.id, todo.name, todo.status)} className="cursor-pointer">
                {todo.name} - {todo.status ? "Concluído" : "Pendente"}
              </span>
              <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white px-2 py-1 rounded">Deletar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
