"use client";
import { useEffect, useState } from "react";
import api from "@/api/actions";
import NavBar from "./componentes/NavBar";

interface Todo {
  id: number;
  name: string;
  status: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


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

  const handleSearch = (query: string) => {
    console.log("Buscando por:", query);
  };

  if (loading) return <div className="text-center text-blue-500 text-xl">Carregando...</div>;
  if (error) return <div className="text-center text-red-500">Erro: {error}</div>;

  return (
    <div>
      <NavBar onSearch={handleSearch} />

      {/* conteiner */}
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-black text-2xl font-bold mb-4">lista de produtos</h1>
        {/* lista dos itens */}
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="text-gray-800 border-b py-2 flex justify-between items-center">
              <span className="">
                {todo.name} {todo.status ? "✅" : "❌"}
              </span>
          
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}
