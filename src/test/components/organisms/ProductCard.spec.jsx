import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';

describe('ProductCard organism', () => {
  it('muestra la categoría legible y entrega el producto al callback del carrito', () => {
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
    const onAddToCart = jasmine.createSpy('onAddToCart');

    render(
      <MemoryRouter>
        <ProductCard
          producto={producto}
          isLoggedIn
          onAddToCart={onAddToCart}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Videojuegos')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));
    expect(onAddToCart).toHaveBeenCalledWith(producto);
  });
});
