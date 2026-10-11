// src/components/atoms/Logo/Logo.jsx
import React from 'react';
import logoImg from '../../assets/images/logo.webp';

export const Logo = () => {
  return (
    <img src={logoImg} alt="Logo de la página" className="logo-atom" />
  );
};
