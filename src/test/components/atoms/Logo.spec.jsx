import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from '../../../components/atoms/Logo';

describe('Logo atom', () => {
  it('muestra el logo accesible enlazado a la ruta indicada', () => {
    render(
      <MemoryRouter>
        <Logo alt="F4A" href="/inicio" />
      </MemoryRouter>
    );

    expect(document.body.contains(screen.getByRole('img', { name: 'F4A' }))).toBeTrue();
    expect(screen.getByRole('link').getAttribute('href')).toBe('/inicio');
  });
});
