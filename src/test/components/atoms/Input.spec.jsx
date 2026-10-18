import { fireEvent, render, screen } from '@testing-library/react';
import Input from '../../../components/atoms/Input';

describe('Input atom', () => {
  it('muestra el placeholder y propaga cambios al onChange', () => {
    const handleChange = jasmine.createSpy('handleChange');

    render(
      <Input
        placeholder="Tu correo"
        value=""
        onChange={handleChange}
        required
      />
    );

    const input = screen.getByPlaceholderText('Tu correo');
    expect(input.required).toBeTrue();

    fireEvent.change(input, { target: { value: 'ana@example.com' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('usa text como tipo predeterminado', () => {
    render(<Input placeholder="Buscar producto" />);

    expect(screen.getByPlaceholderText('Buscar producto').type).toBe('text');
  });
});
