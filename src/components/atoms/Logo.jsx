// src/components/atoms/Logo/Logo.jsx
import React from 'react';
import logoImg from '../../assets/images/logo.webp';
import '../../styles/atoms/Logo.css';

function Logo({ alt = "Logo de la página", className = "logo-atom" }) {
  return (
    <img 
      src={logoImg} 
      alt={alt} 
      className={className} 
    />
  );
}

export default Logo;
