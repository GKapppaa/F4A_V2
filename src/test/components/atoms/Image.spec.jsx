import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image atom', () => {
  it('renderiza la imagen con su origen, texto alternativo y clase', () => {
    render(
      <Image
        src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        alt="Portada de Minecraft"
        className="portada"
      />
    );

    const image = screen.getByRole('img', { name: 'Portada de Minecraft' });
    expect(image.getAttribute('src')).toBe('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=');
    expect(image.classList.contains('atom-img')).toBeTrue();
    expect(image.classList.contains('portada')).toBeTrue();
  });
});
