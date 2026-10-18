import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '../../../components/molecules/SearchBar';

describe('SearchBar molecule: envío de búsqueda', () => {
  it('envía al callback el texto escrito', () => {
    const onSearch = jasmine.createSpy('onSearch');
    render(<SearchBar onSearch={onSearch} />);
    fireEvent.change(screen.getByPlaceholderText('Buscar'), {
      target: { value: 'Minecraft' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch.calls.mostRecent().args[0]).toBe('Minecraft');
  });
});
