// src/components/organisms/Header/Header.jsx
import React from 'react';
import Logo from '../atoms/Logo';
import '../../styles/organisms/Header.css';
import SearchBar from '../molecules/SearchBar';
import '../../styles/molecules/NavElement.css'

export const Header = () => {
  return (
    <header className="site-header">
      {/* Fila Superior */}
      <div className="header-top">
        <div className="header-brand">
          <Logo />
        </div>

        <SearchBar/>

        <div className="header-auth">
          <button className="btn-login">Iniciar Sesión</button>
          <button className="btn-register">Crear Cuenta</button>
        </div>
      </div>

      {/* Fila Inferior */}
      <div className="header-bottom">
        <nav className="header-nav">
          <a href="/" className="nav-link active">Home</a>
          <a href="/categorias" className="nav-link">
            Categorías <span className="arrow">▾</span>
          </a>
          <a href="/ofertas" className="nav-link">Ofertas</a>
          <a href="/nosotros" className="nav-link">Nosotros</a>
          <a href="/blog" className="nav-link">Blog</a>
          <a href="/contacto" className="nav-link">Contacto</a>
        </nav>

        <div className="header-cart">
          <button className="btn-cart">
            <span className="cart-icon">🛒</span> Carrito $5.000
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;