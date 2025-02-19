import { useState } from "react";
import Link from "next/link";

interface NavBarProps {
  onSearch: (searchTerm: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Passa o termo para o componente pai
  };

  return (
    <>
    <nav className="h-16 bg-green-900 text-white px-6 lg:px-20 flex items-center">
      <div className="w-full grid grid-cols-3 items-center">
        {/* Logo alinhado à esquerda */}
        <div className="flex items-center">
          <span className="text-3xl font-bold">Logo</span>
        </div>

        {/* Nome da Loja centralizado */}
        <div className="flex justify-center">
          <span className="text-lg font-semibold">Nome da Loja</span>
        </div>

        {/* Barra de Pesquisa alinhada à direita */}
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 w-48 lg:w-64 rounded-lg border border-green-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      </nav>
      {/* Menu de Navegação */}
      <div className=" top-16 left-0 w-full bg-green-800 shadow-md py-2 flex justify-center space-x-6">
        <Link href="/sobre" className="hover:underline">
          Sobre
        </Link>
        <Link href="/contato" className="hover:underline">
          Contato
        </Link>
        <Link href="/carrinho" className="hover:underline">
          🛒 Carrinho
        </Link>
        <Link href="/login" className="hover:underline">
          🔐 Login
        </Link>
      </div>
      </>
  );
};

export default NavBar;
