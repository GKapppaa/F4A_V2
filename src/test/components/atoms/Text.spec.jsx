import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text atom', () => {
  it('usa la variante semántica y la clase recibidas', () => {
    render(<Text variant="h2" className="titulo">Nuestros juegos</Text>);

    const heading = screen.getByRole('heading', { level: 2, name: 'Nuestros juegos' });
    expect(heading.classList.contains('atom-text')).toBeTrue();
    expect(heading.classList.contains('titulo')).toBeTrue();
  });

  it('renderiza un párrafo cuando no se especifica una variante', () => {
    render(<Text>Descripción del producto</Text>);

    expect(screen.getByText('Descripción del producto').tagName).toBe('P');
  });
});
