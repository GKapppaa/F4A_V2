import { productoService, ticketService, ventaService } from '../../data/dbService';

describe('dbService', () => {
  beforeEach(() => {
    localStorage.removeItem('f4a_database');
  });

  it('realiza CRUD de productos y resuelve el nombre de categoría', () => {
    const producto = productoService.create({
      nombre: 'Prueba admin',
      categoriaId: 1,
      precio: 5000,
      stock: 3,
      imagen: '',
      descripcion: '',
      esOferta: false,
    });

    expect(productoService.getAllWithCategory().find((item) => item.id === producto.id).categoria)
      .toBe('Juegos');

    productoService.update(producto.id, { stock: 9 });
    expect(productoService.getById(producto.id).stock).toBe(9);

    productoService.delete(producto.id);
    expect(productoService.getById(producto.id)).toBeUndefined();
  });

  it('registra una venta y descuenta el stock correspondiente', () => {
    const order = ventaService.crearOrden({
      usuarioId: 1,
      cliente: { nombre: 'Cliente test' },
      items: [{ productoId: 101, nombre: 'Minecraft', precio: 1000, cantidad: 2 }],
      total: 2000,
      estado: 'Completado',
    });

    expect(ventaService.getAll().some((sale) => sale.id === order.id)).toBeTrue();
    expect(productoService.getById(101).stock).toBe(11);
  });

  it('persiste tickets nuevos y permite cambiar su estado', () => {
    const ticket = ticketService.create({
      nombre: 'Cliente test',
      correo: 'test@example.com',
      mensaje: 'Necesito ayuda con una compra.',
    });

    expect(ticketService.getAll()[0].estado).toBe('Pendiente');
    ticketService.updateStatus(ticket.id, 'Resuelto');
    expect(ticketService.getAll()[0].estado).toBe('Resuelto');
  });
});
