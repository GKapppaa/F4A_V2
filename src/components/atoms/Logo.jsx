import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importamos Link
import logoImg from '../../assets/images/logo.webp';
import '../../styles/atoms/Logo.css';

function Logo({ alt = "Logo de la página", className = "", href = "/" }) {
  return (
    <Link to={href} className="atom-logo-link">
      <img 
        src={logoImg} 
        alt={alt} 
        className={`atom-logo ${className}`} 
      />
    </Link>
  );
}

export default Logo;