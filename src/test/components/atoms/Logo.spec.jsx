import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Logo from '../../../components/atoms/Logo';

describe('Logo atom', () => {
  it('muestra el logo accesible enlazado a la ruta indicada', () => {
    render(
      <MemoryRouter>
        <Logo alt="F4A" href="/inicio" />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: 'F4A' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/inicio');
  });
});
