import { useState } from 'react';
import Enlaces from '../components/atoms/Enlaces';
import Text from '../components/atoms/Text';
import { categoriaService, productoService, ticketService, usuarioService, ventaService } from '../data/dbService';
import '../styles/pages/AdminPage.css';

const formatCLP = (amount) => new Intl.NumberFormat('es-CL', {
  style: 'currency', currency: 'CLP', maximumFractionDigits: 0,
}).format(amount || 0);

const emptyProduct = {
  nombre: '', categoriaId: '1', precio: '', stock: '', imagen: '', descripcion: '', esOferta: false,
};
const emptyCategory = { nombre: '', descripcion: '' };
const emptyUser = { nombre: '', apellidos: '', correo: '', password: '', rol: 'cliente' };

function AdminPage({ currentUser }) {
  const [products, setProducts] = useState(() => productoService.getAllWithCategory());
  const [categories, setCategories] = useState(() => categoriaService.getAll());
  const [sales] = useState(() => ventaService.getAll());
  const [users, setUsers] = useState(() => usuarioService.getAll());
  const [tickets, setTickets] = useState(() => ticketService.getAll());
  const [productForm, setProductForm] = useState(emptyProduct);
  const [categoryForm, setCategoryForm] = useState(emptyCategory);
  const [userForm, setUserForm] = useState(emptyUser);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const refreshProducts = () => setProducts(productoService.getAllWithCategory());
  const refreshCategories = () => setCategories(categoriaService.getAll());
  const refreshUsers = () => setUsers(usuarioService.getAll());
  const refreshTickets = () => setTickets(ticketService.getAll());

  const completedSales = sales.filter((sale) => sale.estado === 'Completado');
  const salesTotal = completedSales.reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const criticalProducts = products.filter((product) => product.stock <= 5);
  const pendingTickets = tickets.filter((ticket) => ticket.estado === 'Pendiente').length;

  const reportByCategory = categories.map((category) => {
    const categoryProductIds = new Set(
      products.filter((product) => product.categoriaId === category.id).map((product) => product.id)
    );
    const items = completedSales.flatMap((sale) => sale.items || [])
      .filter((item) => categoryProductIds.has(item.productoId));
    return {
      ...category,
      units: items.reduce((sum, item) => sum + Number(item.cantidad || 0), 0),
      revenue: items.reduce((sum, item) => sum + Number(item.subtotal || item.precio * item.cantidad || 0), 0),
    };
  });

  const updateField = (setter) => (event) => {
    const { name, value, type, checked } = event.target;
    setter((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetProductForm = () => {
    setProductForm(emptyProduct);
    setEditingProductId(null);
  };

  const submitProduct = (event) => {
    event.preventDefault();
    const productData = {
      ...productForm,
      categoriaId: Number(productForm.categoriaId),
      precio: Number(productForm.precio),
      stock: Number(productForm.stock),
    };
    if (editingProductId === null) {
      productoService.create(productData);
      setNotice('Producto creado.');
    } else {
      productoService.update(editingProductId, productData);
      setNotice('Producto actualizado.');
    }
    refreshProducts();
    resetProductForm();
  };

  const editProduct = (product) => {
    setEditingProductId(product.id);
    setProductForm({
      nombre: product.nombre,
      categoriaId: String(product.categoriaId),
      precio: String(product.precio),
      stock: String(product.stock),
      imagen: product.imagen || '',
      descripcion: product.descripcion || '',
      esOferta: Boolean(product.esOferta),
    });
    setNotice('');
    setError('');
  };

  const deleteProduct = (product) => {
    if (!window.confirm(`¿Eliminar ${product.nombre}?`)) return;
    productoService.delete(product.id);
    refreshProducts();
    if (editingProductId === product.id) resetProductForm();
    setNotice('Producto eliminado.');
  };

  const resetCategoryForm = () => {
    setCategoryForm(emptyCategory);
    setEditingCategoryId(null);
  };

  const submitCategory = (event) => {
    event.preventDefault();
    if (editingCategoryId === null) {
      categoriaService.create(categoryForm);
      setNotice('Categoría creada.');
    } else {
      categoriaService.update(editingCategoryId, categoryForm);
      setNotice('Categoría actualizada.');
    }
    refreshCategories();
    resetCategoryForm();
  };

  const editCategory = (category) => {
    setEditingCategoryId(category.id);
    setCategoryForm({ nombre: category.nombre, descripcion: category.descripcion || '' });
    setNotice('');
  };

  const deleteCategory = (category) => {
    const hasProducts = products.some((product) => product.categoriaId === category.id);
    if (hasProducts) {
      setError('No puedes eliminar una categoría que todavía tiene productos.');
      return;
    }
    if (!window.confirm(`¿Eliminar la categoría ${category.nombre}?`)) return;
    categoriaService.delete(category.id);
    refreshCategories();
    setNotice('Categoría eliminada.');
    setError('');
  };

  const resetUserForm = () => {
    setUserForm(emptyUser);
    setEditingUserId(null);
  };

  const submitUser = (event) => {
    event.preventDefault();
    const userData = { ...userForm, correo: userForm.correo.trim().toLowerCase() };
    const duplicateEmail = users.some((user) =>
      user.id !== editingUserId && user.correo.toLowerCase() === userData.correo
    );
    if (duplicateEmail) {
      setError('Ya existe una cuenta con ese correo.');
      return;
    }

    if (editingUserId === null) {
      usuarioService.create(userData);
      setNotice('Usuario creado.');
    } else {
      const { password, ...profileData } = userData;
      usuarioService.update(editingUserId, password ? { ...profileData, password } : profileData);
      setNotice('Usuario actualizado.');
    }
    refreshUsers();
    resetUserForm();
    setError('');
  };

  const editUser = (user) => {
    setEditingUserId(user.id);
    setUserForm({
      nombre: user.nombre || '',
      apellidos: user.apellidos || '',
      correo: user.correo || '',
      password: '',
      rol: user.rol || 'cliente',
    });
    setNotice('');
  };

  const deleteUser = (user) => {
    if (user.id === currentUser?.id) {
      setError('No puedes eliminar la cuenta que está usando este panel.');
      return;
    }
    if (!window.confirm(`¿Eliminar la cuenta de ${user.nombre}?`)) return;
    usuarioService.delete(user.id);
    refreshUsers();
    if (selectedUser?.id === user.id) setSelectedUser(null);
    setNotice('Usuario eliminado.');
    setError('');
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
          Hola, {currentUser?.nombre || 'administrador'}. Gestiona la tienda y revisa su actividad.
        </Text>
        <nav className="admin-nav" aria-label="Secciones administrativas">
          <a href="#admin-products">Productos</a>
          <a href="#admin-orders">Órdenes</a>
          <a href="#admin-categories">Categorías</a>
          <a href="#admin-users">Usuarios</a>
          <a href="#admin-reports">Reportes</a>
          <a href="#admin-tickets">Tickets</a>
        </nav>
      </header>

      <section className="admin-profile" aria-label="Perfil administrador">
        <Text variant="h2">Perfil</Text>
        <p><strong>{currentUser?.nombre} {currentUser?.apellidos}</strong></p>
        <p>{currentUser?.correo} · Rol: {currentUser?.rol}</p>
      </section>

      {notice && <p className="alert alert-success" role="status">{notice}</p>}
      {error && <p className="alert alert-danger" role="alert">{error}</p>}

      <div className="admin-summary-grid" aria-label="Resumen de administración">
        <article className="admin-summary-card"><Text className="admin-summary-label">Productos</Text><Text variant="h2" className="admin-summary-value">{products.length}</Text></article>
        <article className="admin-summary-card"><Text className="admin-summary-label">Ventas completadas</Text><Text variant="h2" className="admin-summary-value">{completedSales.length}</Text></article>
        <article className="admin-summary-card"><Text className="admin-summary-label">Total vendido</Text><Text variant="h2" className="admin-summary-value">{formatCLP(salesTotal)}</Text></article>
        <article className="admin-summary-card"><Text className="admin-summary-label">Tickets pendientes</Text><Text variant="h2" className="admin-summary-value">{pendingTickets}</Text></article>
      </div>

      <section id="admin-products" className="admin-panel-section" aria-label="Gestión de productos">
        <div className="admin-section-heading">
          <Text variant="h2" className="admin-section-title">Productos</Text>
          <Text className="admin-section-description">Crea, edita, elimina y revisa el stock del catálogo.</Text>
        </div>
        <form className="admin-product-form" onSubmit={submitProduct}>
          <Text variant="h3" className="admin-form-title">{editingProductId === null ? 'Nuevo producto' : 'Editar producto'}</Text>
          <div className="admin-form-grid">
            <label>Nombre<input className="form-control" name="nombre" value={productForm.nombre} onChange={updateField(setProductForm)} required /></label>
            <label>Categoría<select className="form-select" name="categoriaId" value={productForm.categoriaId} onChange={updateField(setProductForm)} required>{categories.map((category) => <option key={category.id} value={category.id}>{category.nombre}</option>)}</select></label>
            <label>Precio (CLP)<input className="form-control" name="precio" type="number" min="0" value={productForm.precio} onChange={updateField(setProductForm)} required /></label>
            <label>Stock<input className="form-control" name="stock" type="number" min="0" value={productForm.stock} onChange={updateField(setProductForm)} required /></label>
            <label className="admin-form-wide">Imagen<input className="form-control" name="imagen" value={productForm.imagen} onChange={updateField(setProductForm)} /></label>
            <label className="admin-form-wide">Descripción<textarea className="form-control" name="descripcion" rows="2" value={productForm.descripcion} onChange={updateField(setProductForm)} /></label>
            <label className="admin-checkbox-label"><input type="checkbox" name="esOferta" checked={productForm.esOferta} onChange={updateField(setProductForm)} /> Marcar como oferta</label>
          </div>
          <div className="admin-form-actions">
            <button className="btn btn-success" type="submit">{editingProductId === null ? 'Crear producto' : 'Guardar cambios'}</button>
            {editingProductId !== null && <button className="btn btn-outline-light" type="button" onClick={resetProductForm}>Cancelar edición</button>}
          </div>
        </form>

        <AdminTableWrap>
          <table className="table table-dark table-striped align-middle mb-0">
            <thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
            <tbody>{products.map((product) => (
              <tr key={product.id} className={product.stock <= 5 ? 'admin-critical-row' : ''}>
                <td><Enlaces href={`/producto/${product.id}`}>{product.nombre}</Enlaces></td>
                <td>{product.categoria}</td><td>{formatCLP(product.precio)}</td><td>{product.stock}</td>
                <td className="admin-row-actions"><button className="btn btn-sm btn-outline-success" type="button" onClick={() => editProduct(product)}>Editar</button><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => deleteProduct(product)}>Eliminar</button></td>
              </tr>
            ))}{products.length === 0 && <tr><td colSpan="5" className="text-center py-4">No hay productos registrados.</td></tr>}</tbody>
          </table>
        </AdminTableWrap>

        <div className="admin-subsection">
          <Text variant="h3" className="admin-form-title">Listado de productos críticos (stock ≤ 5)</Text>
          <AdminTableWrap>
            <table className="table table-dark table-striped align-middle mb-0">
              <thead><tr><th>Producto</th><th>Categoría</th><th>Stock</th></tr></thead>
              <tbody>{criticalProducts.map((product) => <tr key={product.id}><td>{product.nombre}</td><td>{product.categoria}</td><td className="text-warning fw-bold">{product.stock}</td></tr>)}{criticalProducts.length === 0 && <tr><td colSpan="3" className="text-center py-4">No hay productos críticos.</td></tr>}</tbody>
            </table>
          </AdminTableWrap>
        </div>
      </section>

      <section id="admin-orders" className="admin-panel-section" aria-label="Órdenes y boletas">
        <div className="admin-section-heading"><Text variant="h2" className="admin-section-title">Órdenes y boletas</Text><Text className="admin-section-description">Consulta las ventas y abre el detalle de cada boleta.</Text></div>
        <AdminTableWrap>
          <table className="table table-dark table-striped align-middle mb-0">
            <thead><tr><th>Orden</th><th>Boleta</th><th>Fecha</th><th>Cliente</th><th>Estado</th><th>Total</th><th>Detalle</th></tr></thead>
            <tbody>{sales.map((sale) => <tr key={sale.id}><td>{sale.id}</td><td>#{sale.nroBoleta}</td><td>{sale.fecha}</td><td>{sale.cliente?.nombre || 'Sin nombre'}</td><td>{sale.estado}</td><td>{formatCLP(sale.total)}</td><td><button className="btn btn-sm btn-outline-success" type="button" onClick={() => setSelectedSale(sale)}>Mostrar boleta</button></td></tr>)}{sales.length === 0 && <tr><td colSpan="7" className="text-center py-4">Todavía no hay ventas registradas.</td></tr>}</tbody>
          </table>
        </AdminTableWrap>
        {selectedSale && <section className="admin-receipt" aria-label="Detalle de boleta"><div className="admin-section-heading"><Text variant="h3" className="admin-form-title">Boleta #{selectedSale.nroBoleta}</Text><button className="btn btn-sm btn-outline-light" type="button" onClick={() => setSelectedSale(null)}>Cerrar detalle</button></div><p>Orden: {selectedSale.id} · Cliente: {selectedSale.cliente?.nombre || 'Sin nombre'} · Estado: {selectedSale.estado}</p><ul>{(selectedSale.items || []).map((item, index) => <li key={`${item.productoId}-${index}`}>{item.nombre} × {item.cantidad} — {formatCLP(item.subtotal || item.precio * item.cantidad)}</li>)}</ul><strong>Total: {formatCLP(selectedSale.total)}</strong></section>}
      </section>

      <section id="admin-categories" className="admin-panel-section" aria-label="Gestión de categorías">
        <div className="admin-section-heading"><Text variant="h2" className="admin-section-title">Categorías</Text><Text className="admin-section-description">Crea y edita las categorías disponibles para los productos.</Text></div>
        <form className="admin-product-form" onSubmit={submitCategory}><Text variant="h3" className="admin-form-title">{editingCategoryId === null ? 'Nueva categoría' : 'Editar categoría'}</Text><div className="admin-form-grid"><label>Nombre<input className="form-control" name="nombre" value={categoryForm.nombre} onChange={updateField(setCategoryForm)} required /></label><label>Descripción<input className="form-control" name="descripcion" value={categoryForm.descripcion} onChange={updateField(setCategoryForm)} /></label></div><div className="admin-form-actions"><button className="btn btn-success" type="submit">{editingCategoryId === null ? 'Crear categoría' : 'Guardar cambios'}</button>{editingCategoryId !== null && <button className="btn btn-outline-light" type="button" onClick={resetCategoryForm}>Cancelar</button>}</div></form>
        <AdminTableWrap><table className="table table-dark table-striped align-middle mb-0"><thead><tr><th>Categoría</th><th>Descripción</th><th>Productos</th><th>Acciones</th></tr></thead><tbody>{categories.map((category) => <tr key={category.id}><td>{category.nombre}</td><td>{category.descripcion}</td><td>{products.filter((product) => product.categoriaId === category.id).length}</td><td className="admin-row-actions"><button className="btn btn-sm btn-outline-success" type="button" onClick={() => editCategory(category)}>Editar</button><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => deleteCategory(category)}>Eliminar</button></td></tr>)}</tbody></table></AdminTableWrap>
      </section>

      <section id="admin-users" className="admin-panel-section" aria-label="Gestión de usuarios">
        <div className="admin-section-heading"><Text variant="h2" className="admin-section-title">Usuarios</Text><Text className="admin-section-description">Administra cuentas y consulta el historial de compras.</Text></div>
        <form className="admin-product-form" onSubmit={submitUser}><Text variant="h3" className="admin-form-title">{editingUserId === null ? 'Nuevo usuario' : 'Editar usuario'}</Text><div className="admin-form-grid"><label>Nombre<input className="form-control" name="nombre" value={userForm.nombre} onChange={updateField(setUserForm)} required /></label><label>Apellidos<input className="form-control" name="apellidos" value={userForm.apellidos} onChange={updateField(setUserForm)} required /></label><label>Correo<input className="form-control" name="correo" type="email" value={userForm.correo} onChange={updateField(setUserForm)} required /></label><label>{editingUserId === null ? 'Contraseña' : 'Nueva contraseña (opcional)'}<input className="form-control" name="password" type="password" value={userForm.password} onChange={updateField(setUserForm)} required={editingUserId === null} /></label><label>Rol<select className="form-select" name="rol" value={userForm.rol} onChange={updateField(setUserForm)}><option value="cliente">Cliente</option><option value="admin">Administrador</option></select></label></div><div className="admin-form-actions"><button className="btn btn-success" type="submit">{editingUserId === null ? 'Crear usuario' : 'Guardar cambios'}</button>{editingUserId !== null && <button className="btn btn-outline-light" type="button" onClick={resetUserForm}>Cancelar</button>}</div></form>
        <AdminTableWrap><table className="table table-dark table-striped align-middle mb-0"><thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Compras</th><th>Acciones</th></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td>{user.nombre} {user.apellidos}</td><td>{user.correo}</td><td>{user.rol}</td><td><button className="btn btn-sm btn-outline-info" type="button" onClick={() => setSelectedUser(user)}>Historial</button></td><td className="admin-row-actions"><button className="btn btn-sm btn-outline-success" type="button" onClick={() => editUser(user)}>Editar</button><button className="btn btn-sm btn-outline-danger" type="button" disabled={user.id === currentUser?.id} onClick={() => deleteUser(user)}>Eliminar</button></td></tr>)}</tbody></table></AdminTableWrap>
        {selectedUser && <section className="admin-receipt" aria-label="Historial de compras"><div className="admin-section-heading"><Text variant="h3" className="admin-form-title">Compras de {selectedUser.nombre}</Text><button className="btn btn-sm btn-outline-light" type="button" onClick={() => setSelectedUser(null)}>Cerrar</button></div><AdminTableWrap><table className="table table-dark table-striped align-middle mb-0"><thead><tr><th>Orden</th><th>Fecha</th><th>Estado</th><th>Total</th></tr></thead><tbody>{sales.filter((sale) => sale.usuarioId === selectedUser.id).map((sale) => <tr key={sale.id}><td>{sale.id}</td><td>{sale.fecha}</td><td>{sale.estado}</td><td>{formatCLP(sale.total)}</td></tr>)}{!sales.some((sale) => sale.usuarioId === selectedUser.id) && <tr><td colSpan="4" className="text-center py-3">Este usuario aún no tiene compras.</td></tr>}</tbody></table></AdminTableWrap></section>}
      </section>

      <section id="admin-reports" className="admin-panel-section" aria-label="Reportes">
        <div className="admin-section-heading"><Text variant="h2" className="admin-section-title">Reportes por categoría</Text><Text className="admin-section-description">Unidades y monto vendido en órdenes completadas.</Text></div>
        <AdminTableWrap><table className="table table-dark table-striped align-middle mb-0"><thead><tr><th>Categoría</th><th>Unidades vendidas</th><th>Ingresos</th></tr></thead><tbody>{reportByCategory.map((report) => <tr key={report.id}><td>{report.nombre}</td><td>{report.units}</td><td>{formatCLP(report.revenue)}</td></tr>)}</tbody></table></AdminTableWrap>
      </section>

      <section id="admin-tickets" className="admin-panel-section" aria-label="Tickets de soporte">
        <div className="admin-section-heading"><Text variant="h2" className="admin-section-title">Tickets de soporte</Text><Text className="admin-section-description">Consultas recibidas desde el formulario de contacto.</Text></div>
        <AdminTableWrap><table className="table table-dark table-striped align-middle mb-0"><thead><tr><th>Fecha</th><th>Cliente</th><th>Correo</th><th>Mensaje</th><th>Estado</th><th>Acción</th></tr></thead><tbody>{tickets.map((ticket) => <tr key={ticket.id}><td>{new Date(ticket.fecha).toLocaleString('es-CL')}</td><td>{ticket.nombre}</td><td>{ticket.correo}</td><td className="admin-ticket-message">{ticket.mensaje}</td><td>{ticket.estado}</td><td><button className="btn btn-sm btn-outline-success" type="button" onClick={() => handleTicketStatus(ticket)}>{ticket.estado === 'Pendiente' ? 'Marcar resuelto' : 'Reabrir'}</button></td></tr>)}{tickets.length === 0 && <tr><td colSpan="6" className="text-center py-4">Aún no hay tickets; los nuevos mensajes de Contacto aparecerán aquí.</td></tr>}</tbody></table></AdminTableWrap>
      </section>
    </section>
  );
}

function AdminTableWrap({ children }) {
  return <div className="table-responsive admin-table-wrap">{children}</div>;
}

export default AdminPage;
