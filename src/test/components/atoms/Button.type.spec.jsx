import { render, screen } from '@testing-library/react';
import Button from '../../../components/atoms/Boton';

describe('Button atom: tipo predeterminado', () => {
  it('usa button para no enviar formularios accidentalmente', () => {
    render(<Button>Acción</Button>);

    expect(screen.getByRole('button', { name: 'Acción' }).type).toBe('button');
  });
});
