import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Enlace from '../../../components/atoms/Enlaces';

describe('Enlace atom', () => {
  it('renderiza su texto y navega a la ruta indicada', () => {
    render(
      <MemoryRouter>
        <Enlace href="/catalogo">Ver catálogo</Enlace>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Ver catálogo' }))
      .toHaveAttribute('href', '/catalogo');
  });
});
