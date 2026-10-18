import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../../../components/templates/MainLayout';

describe('MainLayout template: estructura compartida', () => {
  it('muestra Header, contenido de ruta y Footer', () => {
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
