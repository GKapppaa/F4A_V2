import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '../../../components/molecules/SearchBar';

describe('SearchBar molecule: envío del formulario', () => {
  it('previene el envío nativo del formulario', () => {
    render(<SearchBar onSearch={() => {}} />);
    const form = screen.getByRole('button', { name: 'Buscar' }).closest('form');

    expect(fireEvent.submit(form)).toBeFalse();
  });
});
