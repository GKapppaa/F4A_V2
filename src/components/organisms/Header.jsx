import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 1. Importamos useNavigate
import Logo from '../atoms/Logo';
import '../../styles/organisms/Header.css';
import SearchBar from '../molecules/SearchBar';
import NavElement from '../molecules/NavElement';
import AuthDropdown from '../molecules/AuthDropdown';

export const Header = ({ isRegistered = false, currentUser = null }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate(); // 2. Inicializamos la función de navegación
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // 3. Estado para la cantidad de productos
  const authRef = useRef(null);

  const toggleAuth = () => {
    setIsAuthOpen((prev) => !prev);
  };

  const accountLabel = !currentUser
    ? 'Acceder'
    : currentUser.rol === 'admin'
      ? 'Admin'
      : 'Mi cuenta';

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

  // 4. Leer y calcular la cantidad total de unidades en el carrito desde localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('f4a_cart');
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          // Suma la cantidad total de unidades agregadas
          const total = cart.reduce((acc, item) => acc + (item.cantidad || 1), 0);
          setCartCount(total);
        } catch (e) {
          console.error('Error al parsear el carrito:', e);
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();

    // Escuchar el evento 'storage' por si cambia el carrito en otra pestaña/componente
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, [pathname]); // Se actualiza automáticamente cada vez que cambias de página/ruta

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

        <SearchBar />

        <div className="header-auth" ref={authRef} style={{ position: 'relative' }}>
          <button
            className="btn-login"
            type="button"
            onClick={toggleAuth}
            aria-expanded={isAuthOpen}
          >
            {accountLabel}
          </button>

          {isAuthOpen && <AuthDropdown
            onClose={() => setIsAuthOpen(false)}
          />}
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
            {/* 5. Añadimos el evento onClick para navegar a /carrito y mostramos la cantidad */}
            <button
              className="btn-cart"
              type="button"
              onClick={() => navigate('/carrito')}
            >
              <span aria-hidden="true">🛒</span> Carrito ({cartCount})
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
