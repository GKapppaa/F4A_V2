import React, { useState, useEffect } from 'react';
import { usuarioService, initDB } from '../../services/dbService';
import '../../styles/molecules/AuthDropdown.css';

export const AuthDropdown = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Cada vez que se abre el menú, verificamos si hay un usuario logueado
  useEffect(() => {
    if (isOpen) {
      initDB();
      const session = localStorage.getItem('f4a_session');
      if (session) {
        setCurrentUser(JSON.parse(session));
      } else {
        setCurrentUser(null);
      }
      setError('');
      setEmail('');
      setPassword('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Asegurar que la base de datos simulada esté inicializada
    initDB();

    // Utilizamos el servicio importado correctamente arriba
    const usuarioEncontrado = usuarioService.login(email, password);

    if (usuarioEncontrado) {
      // Guardar sesión y actualizar el estado interno
      localStorage.setItem('f4a_session', JSON.stringify(usuarioEncontrado));
      setCurrentUser(usuarioEncontrado);
      onClose();

      // Recargar la página para refrescar el Header y los permisos de compra
      window.location.reload();
    } else {
      setError('Correo o contraseña incorrectos. Inténtalo de nuevo.');
    }
  };

  const handleLogout = () => {
    // Eliminar la sesión del localStorage
    localStorage.removeItem('f4a_session');
    setCurrentUser(null);
    onClose();

    // Recargar la página para limpiar los estados globales
    window.location.reload();
  };

  return (
    <div className="auth-dropdown">
      {currentUser ? (
        /* ================= VISTA: USUARIO LOGUEADO ================= */
        <div className="auth-logged-in text-center p-2">
          <h3 className="auth-title mb-2">¡Hola, {currentUser.nombre}!</h3>
          <p className="text-secondary small mb-1">
            Rol: <span className="fw-bold text-secondary">{currentUser.rol}</span>
          </p>
          <p className="text-secondary small text-truncate mb-3">
            {currentUser.correo}
          </p>

          {currentUser.rol === 'admin' && (
            <a href="/admin" className="btn btn-outline-primary btn-sm w-100 mb-2">
              Panel de Administración
            </a>
          )}

          <button
            type="button"
            className="btn btn-danger btn-sm w-100 mt-2"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        /* ================= VISTA: FORMULARIO DE ACCESO ================= */
        <>
          <h3 className="auth-title">¡Bienvenido!</h3>

          {error && (
            <div className="alert alert-danger p-2 small mb-2 text-center" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />

            <button type="submit" className="btn-auth-submit">
              Acceder
            </button>
          </form>

          <a href="/recuperar" className="auth-forgot-link">
            ¿Olvidaste tu contraseña?
          </a>

          <div className="auth-divider">o</div>

          <div className="auth-social-buttons">
            <button type="button" className="btn-social">
              Acceder Google
            </button>
            <button type="button" className="btn-social">
              Acceder Facebook
            </button>
          </div>

          <div className="auth-footer">
            <span>¿No tienes cuenta?</span>{' '}
            <a href="/registro" className="auth-register-link">
              Regístrate aquí
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthDropdown;