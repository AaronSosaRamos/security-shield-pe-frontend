import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Bars3BottomLeftIcon, MoonIcon, SunIcon, XCircleIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = window.localStorage.getItem('token');
      setToken(savedToken);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-blue-600 dark:bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg"
            alt="Bandera de Perú"
            className="w-7 h-6"
          />
          <Link href="/" className="text-2xl font-bold text-white">
            Security Shield PE
          </Link>
        </div>

        <nav className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:text-gray-300">Inicio</Link>
          {token ? (
            <>
              <Link href="/services" className="hover:text-gray-300">Servicios</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">Iniciar Sesión</Link>
            </>
          )}
          <Link href="#contact" className="hover:text-gray-300">Contacto</Link>
          <button onClick={toggleDarkMode} className="text-white focus:outline-none">
            {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </nav>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {menuOpen ? <XCircleIcon className="w-6 h-6" /> : <Bars3BottomLeftIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-gray-700 dark:bg-gray-900 p-4 space-y-2 text-center">
          <Link href="/" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>
            Inicio
          </Link>
          {token ? (
            <Link href="/services" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>
              Servicios
            </Link>
          ) : (
            <Link href="/login" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>
              Iniciar Sesión
            </Link>
          )}
          <Link href="#contact" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>
            Contacto
          </Link>
          <button onClick={toggleDarkMode} className="mt-2 text-white focus:outline-none">
            {darkMode ? <SunIcon className="w-5 h-5 mx-auto" /> : <MoonIcon className="w-5 h-5 mx-auto" />}
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
