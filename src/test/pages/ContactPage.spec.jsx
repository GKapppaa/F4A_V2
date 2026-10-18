import { fireEvent, render, screen } from '@testing-library/react';
import ContactPage from '../../pages/ContactPage';
import { ticketService } from '../../data/dbService';

describe('ContactPage', () => {
  it('guarda un ticket cuando el formulario es válido', () => {
    const createTicketSpy = spyOn(ticketService, 'create');
    render(<ContactPage />);

    fireEvent.change(screen.getByPlaceholderText('Ej. Pedro Hacker'), {
      target: { value: 'Ana Pérez' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ej. pedro.hacker20@example.com'), {
      target: { value: 'ana@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Escribe aquí tu duda/), {
      target: { value: 'Necesito ayuda con una clave de juego.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje a soporte' }));

    expect(createTicketSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      nombre: 'Ana Pérez',
      correo: 'ana@example.com',
      mensaje: 'Necesito ayuda con una clave de juego.',
    }));
    expect(screen.getByRole('alert').textContent).toContain('enviado con éxito');
  });
});
