import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import farmerLogo from '../assets/farmer.png'; // ✅ Update path if stored elsewhere

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'मुख्यपृष्ठ' },
    { path: '/about', label: 'आमच्याविषयी' },
    { path: '/services', label: 'सेवा' },
    { path: '/products', label: 'उत्पादने' },
    { path: '/contact', label: 'संपर्क' }
  ];

  return (
    <header className="bg-green-800 text-white shadow-lg">
      {/* Top bar */}
      <div className="bg-green-900 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm">📞 +919834330439</span>
            <span className="text-sm">✉️ shetimajur1992@gmail.com</span>
          </div>
          <div className="flex space-x-4">
            <button className="text-sm hover:text-green-300 transition">नोंदणी</button>
            <button className="text-sm hover:text-green-300 transition">लॉगिन</button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={farmerLogo}
              alt="ShetMajuri Logo"
              className="h-12 w-12 rounded-full shadow-md"
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold">ShetMajuri</h1>
              <p className="text-xs text-green-200">कृषी संपादन सेवा</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`py-2 px-3 rounded-lg transition ${
                  location.pathname === item.path
                    ? 'bg-green-700 text-white font-bold'
                    : 'hover:bg-green-700/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="शोधा..."
                className="bg-green-700/30 border border-green-600 rounded-full py-2 px-4 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 w-40"
              />
              <button className="absolute right-3 top-2.5 text-green-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <button className="relative p-2 rounded-full hover:bg-green-700/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span className="absolute top-0 right-0 bg-green-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">३</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-green-700/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-green-700">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`py-2 px-3 rounded-lg transition ${
                    location.pathname === item.path
                      ? 'bg-green-700 text-white font-bold'
                      : 'hover:bg-green-700/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex items-center space-x-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="शोधा..."
                  className="bg-green-700/30 border border-green-600 rounded-full py-2 px-4 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                />
                <button className="absolute right-3 top-2.5 text-green-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <button className="relative p-2 rounded-full hover:bg-green-700/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <span className="absolute top-0 right-0 bg-green-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">३</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
