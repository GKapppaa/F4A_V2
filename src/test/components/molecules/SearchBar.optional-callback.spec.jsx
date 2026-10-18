import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '../../../components/molecules/SearchBar';

describe('SearchBar molecule: callback opcional', () => {
  it('permite enviar el formulario aunque no reciba onSearch', () => {
    render(<SearchBar />);

    expect(() => fireEvent.click(screen.getByRole('button', { name: 'Buscar' })))
      .not.toThrow();
  });
});
