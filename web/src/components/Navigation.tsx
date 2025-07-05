'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Calendar, BarChart3, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/politicos', label: 'Políticos', icon: Users },
    { href: '/sesiones', label: 'Sesiones', icon: Calendar },
    { href: '/estadisticas', label: 'Estadísticas', icon: BarChart3 },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="glass-effect sticky top-0 z-50 border-b border-white/20">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white p-2 rounded-xl shadow-lg">
                  <BarChart3 className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl lg:text-2xl font-bold text-gradient">
                  Control Político
                </span>
                <div className="text-xs text-gray-500 -mt-1">
                  Transparencia democrática
                </div>
              </div>
              <span className="text-lg font-bold text-gradient block sm:hidden">
                CP
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                      isActive
                        ? 'text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg"></div>
                    )}
                    <div className="relative flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-xl bg-white/50 hover:bg-white/80 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          ></div>
          <div className="absolute top-16 left-0 right-0 glass-effect border-t border-white/20 animate-slide-up">
            <div className="container-custom py-6">
              <div className="grid grid-cols-2 gap-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={toggleMobileMenu}
                      className={`relative flex flex-col items-center justify-center p-6 rounded-2xl text-center transition-all duration-300 group ${
                        isActive
                          ? 'text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 bg-white/30 hover:bg-white/50'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg"></div>
                      )}
                      <div className="relative flex flex-col items-center space-y-2">
                        <div className={`p-3 rounded-xl ${isActive ? 'bg-white/20' : 'bg-white/50 group-hover:bg-white/70'} transition-colors`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation for Mobile (Alternative) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass-effect border-t border-white/20">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                )}
                <Icon className={`h-5 w-5 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
