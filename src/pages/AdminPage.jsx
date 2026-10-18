import { useState } from 'react';
import Text from '../components/atoms/Text';
import { initialDatabase } from '../data/mockDatabase';
import { productoService, ticketService, ventaService } from '../data/dbService';
import '../styles/pages/AdminPage.css';

const emptyProduct = {
  nombre: '',
  categoriaId: '1',
  precio: '',
  stock: '',
  imagen: '',
  descripcion: '',
  esOferta: false,
};

const formatCLP = (amount) => new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
}).format(amount || 0);

function AdminPage() {
  const [products, setProducts] = useState(() => productoService.getAllWithCategory());
  const [sales] = useState(() => ventaService.getAll());
  const [tickets, setTickets] = useState(() => ticketService.getAll());
  const [formData, setFormData] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState('');

  const completedSales = sales.filter((sale) => sale.estado === 'Completado');
  const salesTotal = completedSales.reduce((sum, sale) => sum + sale.total, 0);
  const pendingTickets = tickets.filter((ticket) => ticket.estado === 'Pendiente').length;

  const refreshProducts = () => setProducts(productoService.getAllWithCategory());
  const refreshTickets = () => setTickets(ticketService.getAll());

  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData(emptyProduct);
    setEditingId(null);
  };

  const handleProductSubmit = (event) => {
    event.preventDefault();
    const productData = {
      ...formData,
      categoriaId: Number(formData.categoriaId),
      precio: Number(formData.precio),
      stock: Number(formData.stock),
    };

    if (editingId === null) {
      productoService.create(productData);
      setNotice('Producto creado.');
    } else {
      productoService.update(editingId, productData);
      setNotice('Producto actualizado.');
    }

    refreshProducts();
    resetForm();
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      nombre: product.nombre,
      categoriaId: String(product.categoriaId),
      precio: String(product.precio),
      stock: String(product.stock),
      imagen: product.imagen || '',
      descripcion: product.descripcion || '',
      esOferta: Boolean(product.esOferta),
    });
    setNotice('');
  };

  const handleDelete = (product) => {
    if (!window.confirm(`¿Eliminar ${product.nombre}?`)) return;
    productoService.delete(product.id);
    refreshProducts();
    if (editingId === product.id) resetForm();
    setNotice('Producto eliminado.');
  };

  const handleTicketStatus = (ticket) => {
    const nextStatus = ticket.estado === 'Pendiente' ? 'Resuelto' : 'Pendiente';
    ticketService.updateStatus(ticket.id, nextStatus);
    refreshTickets();
  };

  return (
    <section className="route-page admin-page">
      <header className="admin-page-header">
        <Text variant="p" className="page-eyebrow">ADMINISTRACIÓN F4A</Text>
        <Text variant="h1" className="page-title">Panel de administración</Text>
        <Text className="page-description">
          Gestiona el catálogo, revisa las ventas y atiende las consultas recibidas.
        </Text>
      </header>

      <div className="admin-summary-grid" aria-label="Resumen de administración">
        <article className="admin-summary-card">
          <Text className="admin-summary-label">Productos</Text>
          <Text variant="h2" className="admin-summary-value">{products.length}</Text>
        </article>
        <article className="admin-summary-card">
          <Text className="admin-summary-label">Ventas completadas</Text>
          <Text variant="h2" className="admin-summary-value">{completedSales.length}</Text>
        </article>
        <article className="admin-summary-card">
          <Text className="admin-summary-label">Total vendido</Text>
          <Text variant="h2" className="admin-summary-value">{formatCLP(salesTotal)}</Text>
        </article>
        <article className="admin-summary-card">
          <Text className="admin-summary-label">Tickets pendientes</Text>
          <Text variant="h2" className="admin-summary-value">{pendingTickets}</Text>
        </article>
      </div>

      <section className="admin-panel-section" aria-label="Gestión de productos">
        <div className="admin-section-heading">
          <Text variant="h2" className="admin-section-title">Gestión de productos</Text>
          <Text className="admin-section-description">Crea, modifica o elimina productos del catálogo.</Text>
        </div>

        {notice && <p className="alert alert-success" role="status">{notice}</p>}

        <form className="admin-product-form" onSubmit={handleProductSubmit}>
          <Text variant="h3" className="admin-form-title">
            {editingId === null ? 'Nuevo producto' : 'Editar producto'}
          </Text>
          <div className="admin-form-grid">
            <label>
              Nombre
              <input className="form-control" name="nombre" value={formData.nombre} onChange={handleFieldChange} required />
            </label>
            <label>
              Categoría
              <select className="form-select" name="categoriaId" value={formData.categoriaId} onChange={handleFieldChange} required>
                {initialDatabase.categorias.map((category) => (
                  <option key={category.id} value={category.id}>{category.nombre}</option>
                ))}
              </select>
            </label>
            <label>
              Precio (CLP)
              <input className="form-control" name="precio" type="number" min="0" value={formData.precio} onChange={handleFieldChange} required />
            </label>
            <label>
              Stock
              <input className="form-control" name="stock" type="number" min="0" value={formData.stock} onChange={handleFieldChange} required />
            </label>
            <label className="admin-form-wide">
              URL o ruta de imagen
              <input className="form-control" name="imagen" value={formData.imagen} onChange={handleFieldChange} />
            </label>
            <label className="admin-form-wide">
              Descripción
              <textarea className="form-control" name="descripcion" rows="2" value={formData.descripcion} onChange={handleFieldChange} />
            </label>
            <label className="admin-checkbox-label">
              <input type="checkbox" name="esOferta" checked={formData.esOferta} onChange={handleFieldChange} />
              Marcar como oferta
            </label>
          </div>
          <div className="admin-form-actions">
            <button className="btn btn-success" type="submit">
              {editingId === null ? 'Crear producto' : 'Guardar cambios'}
            </button>
            {editingId !== null && (
              <button className="btn btn-outline-light" type="button" onClick={resetForm}>
                Cancelar edición
              </button>
            )}
          </div>
        </form>

        <div className="table-responsive admin-table-wrap">
          <table className="table table-dark table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Oferta</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.nombre}</td>
                  <td>{product.categoria}</td>
                  <td>{formatCLP(product.precio)}</td>
                  <td>{product.stock}</td>
                  <td>{product.esOferta ? 'Sí' : 'No'}</td>
                  <td className="admin-row-actions">
                    <button className="btn btn-sm btn-outline-success" type="button" onClick={() => handleEdit(product)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => handleDelete(product)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan="6" className="text-center py-4">No hay productos registrados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-panel-section" aria-label="Ventas generales">
        <div className="admin-section-heading">
          <Text variant="h2" className="admin-section-title">Ventas generales</Text>
          <Text className="admin-section-description">Historial de órdenes de la tienda.</Text>
        </div>
        <div className="table-responsive admin-table-wrap">
          <table className="table table-dark table-striped align-middle mb-0">
            <thead>
              <tr><th>Orden</th><th>Fecha</th><th>Cliente</th><th>Estado</th><th>Total</th></tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.fecha}</td>
                  <td>{sale.cliente?.nombre || 'Sin nombre'}</td>
                  <td>{sale.estado}</td>
                  <td>{formatCLP(sale.total)}</td>
                </tr>
              ))}
              {sales.length === 0 && (
                <tr><td colSpan="5" className="text-center py-4">Todavía no hay ventas registradas.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-panel-section" aria-label="Tickets de soporte">
        <div className="admin-section-heading">
          <Text variant="h2" className="admin-section-title">Tickets de soporte</Text>
          <Text className="admin-section-description">Consultas enviadas desde el formulario de contacto.</Text>
        </div>
        <div className="table-responsive admin-table-wrap">
          <table className="table table-dark table-striped align-middle mb-0">
            <thead>
              <tr><th>Fecha</th><th>Cliente</th><th>Correo</th><th>Mensaje</th><th>Estado</th><th>Acción</th></tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{new Date(ticket.fecha).toLocaleString('es-CL')}</td>
                  <td>{ticket.nombre}</td>
                  <td>{ticket.correo}</td>
                  <td className="admin-ticket-message">{ticket.mensaje}</td>
                  <td>{ticket.estado}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-success" type="button" onClick={() => handleTicketStatus(ticket)}>
                      {ticket.estado === 'Pendiente' ? 'Marcar resuelto' : 'Reabrir'}
                    </button>
                  </td>
                </tr>
              ))}
              {tickets.length === 0 && (
                <tr><td colSpan="6" className="text-center py-4">Aún no hay tickets. Los nuevos mensajes de Contacto aparecerán aquí.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

export default AdminPage;
