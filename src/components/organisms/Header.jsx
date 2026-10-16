import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../atoms/Logo';
import '../../styles/organisms/Header.css';
import SearchBar from '../molecules/SearchBar';
import NavElement from '../molecules/NavElement';
import AuthDropdown from '../molecules/AuthDropdown'; // 1. Importamos la molécula

export const Header = ({ isRegistered = false }) => {
  const { pathname } = useLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const authRef = useRef(null);

  const toggleAuth = () => {
    setIsAuthOpen((prev) => !prev);
  };

  // Cierra el menú desplegable si el usuario hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authRef.current && !authRef.current.contains(event.target)) {
        setIsAuthOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { id: 'home', href: '/', label: 'Home', active: true },
    { id: 'categorias', href: '/categorias', label: 'Categorías ▾' },
    { id: 'ofertas', href: '/ofertas', label: 'Ofertas' },
    { id: 'nosotros', href: '/nosotros', label: 'Nosotros' },
    { id: 'blog', href: '/blog', label: 'Blog' },
    { id: 'contacto', href: '/contacto', label: 'Contacto' },
  ];

  return (
    <header className="site-header">
      {/* Fila Superior */}
      <div className="header-top">
        <div className="header-brand">
          <Logo/>
        </div>

        <SearchBar />

        {/* 2. Asignamos la ref al contenedor y montamos AuthDropdown */}
        <div className="header-auth" ref={authRef} style={{ position: 'relative' }}>
          <button className="btn-login" onClick={toggleAuth}>
            Acceder
          </button>

          <AuthDropdown 
            isOpen={isAuthOpen} 
            onClose={() => setIsAuthOpen(false)} 
          />
        </div>
      </div>

      {/* Fila Inferior */}
      <div className="header-bottom">
        <nav className="header-nav">
          {navLinks.map((link) => (
            <NavElement
              key={link.id}
              href={link.href}
              active={pathname === link.href || (link.href === '/categorias' && pathname === '/gaming')}
              className="nav-link"
            >
              {link.label}
            </NavElement>
          ))}
        </nav>

        {isRegistered && (
          <div className="header-cart">
            <button className="btn-cart" type="button">
              <span aria-hidden="true">🛒</span> Carrito $5.000
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
