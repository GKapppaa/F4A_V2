import React, { useState } from 'react';
import '../../styles/molecules/AuthDropdown.css';

export const AuthDropdown = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login con:', { email, password });
    // Aquí puedes invocar la lógica de autenticación
  };

  return (
    <div className="auth-dropdown">
      <h3 className="auth-title">Bienvenido!</h3>

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
          placeholder="Contrasena" 
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
        ¿Olvidaste tu contrasena?
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
        <span>No tienes cuenta?</span>{' '}
        <a href="/registro" className="auth-register-link">
          Registrate aqui
        </a>
      </div>
    </div>
  );
};

export default AuthDropdown;