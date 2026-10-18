import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Input from '../../../components/atoms/Input';

describe('Input atom', () => {
  it('muestra el placeholder y propaga cambios al onChange', () => {
    const handleChange = vi.fn();

    render(
      <Input
        placeholder="Tu correo"
        value=""
        onChange={handleChange}
        required
      />
    );

    const input = screen.getByPlaceholderText('Tu correo');
    expect(input).toBeRequired();

    fireEvent.change(input, { target: { value: 'ana@example.com' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
