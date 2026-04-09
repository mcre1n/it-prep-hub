import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Icons } from '../Common/Icons';
import LoginModal from '../Auth/LoginModal';
import RegisterModal from '../Auth/RegisterModal';

export default function Header() {
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                <span className="text-white font-bold text-sm">IT</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Prep Hub
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
              >
                <Icons.Home />
                <span>Главная</span>
              </Link>
              <Link
                to="/tests"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
              >
                <Icons.Tests />
                <span>Тесты</span>
              </Link>
              <Link
                to="/tasks"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
              >
                <Icons.Tasks />
                <span>Задания</span>
              </Link>
              {isAuthenticated && (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
                >
                  <Icons.Profile />
                  <span>Профиль</span>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900">
                      {user?.displayName || user?.email?.split('@')[0]}
                    </span>
                    <span className="text-xs text-gray-500">{user?.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Icons.Logout />
                    <span>Выйти</span>
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Icons.Login />
                    <span>Войти</span>
                  </button>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Icons.Register />
                    <span>Регистрация</span>
                  </button>
                </div>
              )}

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 py-2"
                >
                  <Icons.Home /> Главная
                </Link>
                <Link
                  to="/tests"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 py-2"
                >
                  <Icons.Tests /> Тесты
                </Link>
                <Link
                  to="/tasks"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 py-2"
                >
                  <Icons.Tasks /> Задания
                </Link>
                {isAuthenticated && (
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 py-2"
                  >
                    <Icons.Profile /> Профиль
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </>
  );
}
