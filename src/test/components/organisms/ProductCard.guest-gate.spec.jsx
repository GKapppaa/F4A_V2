import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';

describe('ProductCard organism: acceso de compra', () => {
  it('oculta la acción de compra y pide iniciar sesión a una visita', () => {
    const producto = {
      id: 101,
      nombre: 'Minecraft',
      imagen: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
      categoria: 'Videojuegos',
      precio: 13450,
      stock: 4,
    };

    render(<MemoryRouter><ProductCard producto={producto} isLoggedIn={false} /></MemoryRouter>);

    expect(screen.queryByRole('button', { name: 'Agregar al carrito' })).toBeNull();
    expect(screen.getByText('Inicia sesión para comprar')).toBeTruthy();
  });
});
