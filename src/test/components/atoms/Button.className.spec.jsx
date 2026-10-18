import { render, screen } from '@testing-library/react';
import Button from '../../../components/atoms/Boton';

describe('Button atom: clases CSS', () => {
  it('combina la clase base con una clase personalizada', () => {
    render(<Button className="boton-principal">Comprar</Button>);
    const button = screen.getByRole('button', { name: 'Comprar' });

    expect(button.classList.contains('atom-button')).toBeTrue();
    expect(button.classList.contains('boton-principal')).toBeTrue();
  });
});
