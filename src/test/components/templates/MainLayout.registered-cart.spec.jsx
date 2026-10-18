import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../../../components/templates/MainLayout';

describe('MainLayout template: usuario registrado', () => {
  it('muestra el carrito cuando hay sesión', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<MainLayout isRegistered />}>
            <Route index element={<p>Inicio</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /carrito/i })).toBeTruthy();
  });
});
