"use client";
import { useEffect, useState, useRef } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);


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

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  if (loading) return <div className="text-center text-blue-500 text-xl">Carregando...</div>;
  if (error) return <div className="text-center text-red-500">Erro: {error}</div>;

  return (
    <div className="ab">
      <div>
      <NavBar onSearch={handleSearch} />
      </div>
      {/* conteiner */}
      <div className="min-h-screen bg-gray-100">
          {/* lista dos itens */}
        <div className="" >
          <h1 className="text-black text-2xl font-bold mb-4">Lista de Produtos</h1>

          <div className="flex items-center w-full overflow-hidden">

          {/* Botão Esquerdo */}
          <button 
            onClick={scrollLeft} 
            className="p-2 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 transition"
          >
            ◀
          </button>

          {/* Lista de Produtos */}
          <div 
            ref={scrollContainerRef} 
            className="flex gap-4 overflow-x-hidden whitespace-nowrap w-full max-w-screen px-2"
          >
            {todos.map((todo) => (
              <div 
                key={todo.id} 
                className="bg-white p-20 text-black rounded-lg shadow-lg min-w-[400px] text-center"
              >
                <div>{todo.name}</div>
                <div>{todo.status ? "✅" : "❌"}</div>
              </div>
            ))}
          </div>

          {/* Botão Direito */}
          <button 
            onClick={scrollRight} 
            className="p-2 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 transition"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
            
          </div>
       
  );
}
