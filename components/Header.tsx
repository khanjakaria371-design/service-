import React, { useState } from 'react';
import { Menu, X, Globe, ChevronDown, User } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              V
            </div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">GlobalVisa<span className="text-brand-600">HQ</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-brand-600 transition-colors">
              <Globe className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">English</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <div className="h-6 w-px bg-gray-200"></div>
            <button className="flex items-center text-gray-600 hover:text-brand-600 transition-colors">
              <User className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">Sign In</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
