import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../../../components/templates/MainLayout';

describe('MainLayout template: visitante', () => {
  it('oculta el carrito cuando no hay sesión', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<MainLayout isRegistered={false} />}>
            <Route index element={<p>Inicio</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByRole('button', { name: /carrito/i })).toBeNull();
  });
});
