import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';

describe('ProductCard organism: datos visibles', () => {
  it('muestra nombre, categoría legible y precio', () => {
    const producto = {
      id: 101,
      nombre: 'Minecraft',
      imagen: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
      categoria: 'Videojuegos',
      precio: 13450,
      descripcion: 'Juego de construcción y aventura.',
      esOferta: false,
      stock: 4,
    };

    render(<MemoryRouter><ProductCard producto={producto} isLoggedIn={false} /></MemoryRouter>);
    const formattedPrice = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(producto.precio);

    expect(screen.getByRole('heading', { name: 'Minecraft' })).toBeTruthy();
    expect(screen.getByText('Videojuegos')).toBeTruthy();
    expect(screen.getByText(formattedPrice)).toBeTruthy();
  });
});
