import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Text from '../../../components/atoms/Text';

describe('Text atom', () => {
  it('usa la variante semántica y la clase recibidas', () => {
    render(<Text variant="h2" className="titulo">Nuestros juegos</Text>);

    const heading = screen.getByRole('heading', { level: 2, name: 'Nuestros juegos' });
    expect(heading).toHaveClass('atom-text', 'titulo');
  });
});
