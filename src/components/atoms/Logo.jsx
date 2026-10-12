// src/components/atoms/Logo/Logo.jsx
import React from 'react';
import logoImg from '../../assets/images/logo.webp';
import '../../styles/atoms/Logo.css';

function Logo({ alt = "Logo de la página", className = "" }) {
  return (
    <img 
      src={logoImg} 
      alt={alt} 
      className={`atom-logo ${className}`} 
    />
  );
}

export default Logo;
