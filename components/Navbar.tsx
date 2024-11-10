import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Bars3BottomLeftIcon, MoonIcon, SunIcon, XCircleIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = window.localStorage.getItem('token');
      setToken(savedToken);
      if (savedToken) {
        const decodedToken: any = jwtDecode(savedToken);
        setUserName(`${decodedToken.first_name} ${decodedToken.last_name}`);
        setUserEmail(decodedToken.email);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <header className="bg-blue-700 dark:bg-gray-900 text-white shadow-lg sticky top-0 z-50">
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
              <Link href="/chatbot-security" className="hover:text-gray-300">Chatbot</Link>
              <Link href="/security-plan" className="hover:text-gray-300">Plan de Seguridad</Link>
              <Link href="/info-agent" className="hover:text-gray-300">Agente de Búsqueda</Link>
              <Link href="/zone-chat" className="hover:text-gray-300">Chat de Zona</Link>
              <Link href="/geo-map" className="hover:text-gray-300">Mapa</Link>
            </>
          ) : (
            <Link href="/login" className="hover:text-gray-300">Iniciar Sesión</Link>
          )}
          {userName && (
            <div className="relative">
              <button onClick={toggleUserMenu} className="flex items-center space-x-1 focus:outline-none">
                <UserCircleIcon className="w-5 h-5" />
                <span className="hidden sm:inline font-semibold">¡Bienvenido! 👋</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-lg py-4">
                  <div className="px-4 pb-3 text-sm">
                    <p className="font-semibold text-gray-900 dark:text-white">¡Hola, {userName}! 😊</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">📧 {userEmail}</p>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-2"></div>
                  <button onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.localStorage.removeItem('token')
                      window.location.href = '/'
                    }
                  }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md">
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          )}
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
        <nav className="md:hidden bg-blue-600 dark:bg-gray-900 p-4 space-y-2 text-center">
          <Link href="/" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>
            Inicio
          </Link>
          {token ? (
            <>
              <Link href="/chatbot-security" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>
                Chatbot
              </Link>
              <Link href="/security-plan" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>
                Plan de Seguridad
              </Link>
              <Link href="/info-agent" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>
                Agente de Búsqueda
              </Link>
              <Link href="/zone-chat" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>
                Chat de Zona
              </Link>
              <Link href="/geo-map" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>
                Mapa
              </Link>
            </>
          ) : (
            <Link href="/login" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>
              Iniciar Sesión
            </Link>
          )}
          {userName && (
            <div className="text-center mt-4 text-sm font-semibold text-gray-200 dark:text-gray-400">
              ¡Bienvenido! 👋 {userName} <br /> 📧 {userEmail}
            </div>
          )}
          <button onClick={toggleDarkMode} className="mt-2 text-white focus:outline-none">
            {darkMode ? <SunIcon className="w-5 h-5 mx-auto" /> : <MoonIcon className="w-5 h-5 mx-auto" />}
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
