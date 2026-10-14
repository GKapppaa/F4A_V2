// src/components/organisms/Header/Header.jsx
import Logo from '../atoms/Logo';
import '../../styles/organisms/Header.css';
import SearchBar from '../molecules/SearchBar';
import NavElement from '../molecules/NavElement';

export const Header = () => {
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
          <Logo />
        </div>

        <SearchBar/>

        <div className="header-auth">
          <button className="btn-login">Acceder</button>
        </div>
      </div>

      {/* Fila Inferior */}
      <div className="header-bottom">
        <nav className="header-nav">
          {navLinks.map((link) => (
            <NavElement
              key={link.id}
              href={link.href}
              active={link.active}
              className="nav-link"
            >
              {link.label}
            </NavElement>
          ))}
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
