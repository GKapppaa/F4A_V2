import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../../../components/atoms/Boton';

describe('Button atom: contenido e interacción', () => {
  it('renderiza el contenido y ejecuta onClick al pulsarlo', () => {
    const handleClick = jasmine.createSpy('handleClick');
    render(<Button onClick={handleClick}>Haz clic</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Haz clic' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
