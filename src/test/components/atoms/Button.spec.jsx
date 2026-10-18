import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from '../../../components/atoms/Boton';

describe('Button atom', () => {
  it('renderiza su contenido y ejecuta onClick al pulsarlo', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Haz clic</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Haz clic' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
