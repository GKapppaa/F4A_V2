import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';

describe('ProductCard organism: agregar al carrito', () => {
  it('entrega el producto al callback al pulsar el botón', () => {
    const producto = {
      id: 101,
      nombre: 'Minecraft',
      imagen: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
      categoria: 'Videojuegos',
      precio: 13450,
      stock: 4,
    };
    const onAddToCart = jasmine.createSpy('onAddToCart');

    render(
      <MemoryRouter>
        <ProductCard producto={producto} isLoggedIn onAddToCart={onAddToCart} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));

    expect(onAddToCart).toHaveBeenCalledWith(producto);
  });
});
