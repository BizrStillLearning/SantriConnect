import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Bell, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const location = useLocation();

  // Mock user data - in real app this would come from context/state
  const user = {
    name: 'Admin User',
    role: 'Administrator',
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Santri', path: '/santri' },
    { name: 'Attendance', path: '/attendance' },
    { name: 'Dormitory', path: '/dormitory' },
    { name: 'Reports', path: '/reports' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-secondary-bg border-b border-border-color sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard" className="text-2xl font-bold text-primary-accent">
              Santri<span className="text-primary-text">Connect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(link.path)
                      ? 'bg-tertiary-bg text-primary-accent'
                      : 'text-secondary-text hover:bg-tertiary-bg hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right section - Search, Notifications, User menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search santri..."
                className="bg-tertiary-bg text-white rounded-md pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary-accent"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-muted-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button className="bg-tertiary-bg p-1 rounded-full text-secondary-text hover:text-white focus:outline-none">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>

            {/* Theme Toggle */}
            <div className="relative">
              <button 
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="bg-tertiary-bg p-1 rounded-full text-secondary-text hover:text-white focus:outline-none"
              >
                <Moon className="h-6 w-6" />
              </button>
              
              {isThemeMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-tertiary-bg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button className="block px-4 py-2 text-sm text-secondary-text hover:bg-tertiary-bg w-full text-left">
                      Light
                    </button>
                    <button className="block px-4 py-2 text-sm text-secondary-text hover:bg-tertiary-bg w-full text-left">
                      Dark
                    </button>
                    <button className="block px-4 py-2 text-sm text-secondary-text hover:bg-tertiary-bg w-full text-left">
                      System
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative ml-3">
              <div>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex text-sm rounded-full focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-primary-accent flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </button>
              </div>

              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-tertiary-bg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-border-color">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-secondary-text">{user.role}</p>
                    </div>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-secondary-text hover:bg-tertiary-bg"
                    >
                      Profile
                    </Link>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-secondary-text hover:bg-tertiary-bg"
                    >
                      Settings
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-secondary-text hover:bg-tertiary-bg"
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary-text hover:text-white hover:bg-tertiary-bg focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-tertiary-bg text-primary-accent'
                    : 'text-secondary-text hover:bg-tertiary-bg hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-border-color">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-accent flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{user.name}</div>
                <div className="text-sm font-medium text-secondary-text">{user.role}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-secondary-text hover:bg-tertiary-bg hover:text-white"
              >
                Profile
              </Link>
              <Link
                to="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-secondary-text hover:bg-tertiary-bg hover:text-white"
              >
                Settings
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-secondary-text hover:bg-tertiary-bg hover:text-white"
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;