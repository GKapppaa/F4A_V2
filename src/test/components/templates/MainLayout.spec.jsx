import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../../../components/templates/MainLayout';

describe('MainLayout template', () => {
  it('mantiene Header y Footer alrededor del contenido de la ruta', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<p>Contenido de prueba</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toBeTruthy();
    expect(screen.getByText('Contenido de prueba')).toBeTruthy();
    expect(screen.getByRole('contentinfo')).toBeTruthy();
  });
});
