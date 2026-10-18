import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../../../components/atoms/Boton';

describe('Button atom', () => {
  it('renderiza su contenido y ejecuta onClick al pulsarlo', () => {
    const handleClick = jasmine.createSpy('handleClick');

    render(<Button onClick={handleClick}>Haz clic</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Haz clic' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('usa button como tipo predeterminado para no enviar formularios accidentalmente', () => {
    render(<Button>Acción</Button>);

    expect(screen.getByRole('button', { name: 'Acción' }).type).toBe('button');
  });
});
