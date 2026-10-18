import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Image from '../../../components/atoms/Image';

describe('Image atom', () => {
  it('renderiza la imagen con su origen, texto alternativo y clase', () => {
    render(
      <Image
        src="/images/minecraft.webp"
        alt="Portada de Minecraft"
        className="portada"
      />
    );

    const image = screen.getByRole('img', { name: 'Portada de Minecraft' });
    expect(image).toHaveAttribute('src', '/images/minecraft.webp');
    expect(image).toHaveClass('atom-img', 'portada');
  });
});
