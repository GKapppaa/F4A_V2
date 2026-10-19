import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminPage from '../../pages/AdminPage';
import { productoService, ticketService, ventaService } from '../../data/dbService';

describe('AdminPage', () => {
  beforeEach(() => {
    spyOn(productoService, 'getAllWithCategory').and.returnValue([
      { id: 101, nombre: 'Minecraft', categoria: 'Juegos', categoriaId: 1, precio: 13450, stock: 13, esOferta: true },
    ]);
    spyOn(ventaService, 'getAll').and.returnValue([
      { id: 'ORDER-1', fecha: '2026-10-16', cliente: { nombre: 'Cliente demo' }, estado: 'Completado', total: 13450 },
    ]);
    spyOn(ticketService, 'getAll').and.returnValue([
      { id: 'TICKET-1', fecha: '2026-10-16T12:00:00.000Z', nombre: 'Cliente demo', correo: 'cliente@example.com', mensaje: 'Consulta de prueba', estado: 'Pendiente' },
    ]);
  });

  it('muestra inventario, ventas y tickets que devuelven los servicios', () => {
    render(<MemoryRouter><AdminPage /></MemoryRouter>);

    expect(screen.getByRole('heading', { name: 'Panel de administración' })).toBeTruthy();
    expect(screen.getByText('Minecraft')).toBeTruthy();
    expect(screen.getByText('ORDER-1')).toBeTruthy();
    expect(screen.getByText('Consulta de prueba')).toBeTruthy();
  });

  it('crea un producto con los valores del formulario', () => {
    const createSpy = spyOn(productoService, 'create');
    render(<MemoryRouter><AdminPage /></MemoryRouter>);

    fireEvent.change(screen.getAllByLabelText('Nombre')[0], { target: { value: 'Producto nuevo' } });
    fireEvent.change(screen.getByLabelText('Precio (CLP)'), { target: { value: '9900' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '8' } });
    fireEvent.click(screen.getByRole('button', { name: 'Crear producto' }));

    expect(createSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      nombre: 'Producto nuevo',
      categoriaId: 1,
      precio: 9900,
      stock: 8,
    }));
    expect(screen.getByRole('status').textContent).toBe('Producto creado.');
  });

  it('permite marcar un ticket pendiente como resuelto', () => {
    const updateStatusSpy = spyOn(ticketService, 'updateStatus');
    render(<MemoryRouter><AdminPage /></MemoryRouter>);

    fireEvent.click(screen.getByRole('button', { name: 'Marcar resuelto' }));

    expect(updateStatusSpy).toHaveBeenCalledWith('TICKET-1', 'Resuelto');
  });
});
