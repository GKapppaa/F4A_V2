import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../components/atoms/Text';
import { ventaService, initDB } from '../services/dbService';

function CartPage({ isLoggedIn }) {
  const navigate = useNavigate();

  // Estado del carrito de compras
  const [cartItems, setCartItems] = useState([]);

  // Estado del formulario de checkout
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    departamento: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    indicaciones: ''
  });

  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // 1. Cargar carrito y autocompletar usuario al montar
  useEffect(() => {
    initDB();

    // Cargar productos del carrito guardados en localStorage
    const savedCart = localStorage.getItem('f4a_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error al leer el carrito:', e);
      }
    }

    // Autocompletar datos del cliente si hay sesión activa
    const session = localStorage.getItem('f4a_session') || localStorage.getItem('usuario_sesion');
    if (session) {
      try {
        const user = JSON.parse(session);
        setFormData((prev) => ({
          ...prev,
          nombre: user.nombre || '',
          apellidos: user.apellidos || '',
          correo: user.correo || '',
          calle: user.direccion?.calle || '',
          departamento: user.direccion?.departamento || '',
          region: user.direccion?.region || 'Región Metropolitana de Santiago',
          comuna: user.direccion?.comuna || 'Cerrillos',
          indicaciones: user.direccion?.indicaciones || ''
        }));
      } catch (e) {
        console.error('Error al leer la sesión:', e);
      }
    }
  }, [isLoggedIn]);

  // Actualizar localStorage cada vez que cambia el carrito
  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('f4a_cart', JSON.stringify(newCart));
  };

  // Modificar cantidad de un producto
  const handleCantidadChange = (id, cambio) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const nuevaCantidad = item.cantidad + cambio;
        return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : item;
      }
      return item;
    });
    updateCart(updated);
  };

  // Eliminar un producto del carrito
  const handleRemoveItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  // Vaciar carrito
  const handleClearCart = () => {
    updateCart([]);
  };

  // Calcular total general
  const totalPagar = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Procesar la orden de compra (Soporta simulación de éxito o fallo)
  const handleSubmitOrden = (e, simularError = false) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });

    if (cartItems.length === 0) {
      setMensaje({
        tipo: 'danger',
        texto: 'El carrito está vacío. Agrega productos antes de realizar la compra.'
      });
      return;
    }

    // Preparar objeto con los datos de la orden
    const datosOrden = {
      nroBoleta: Math.floor(20240000 + Math.random() * 10000),
      cliente: {
        nombre: `${formData.nombre} ${formData.apellidos}`.trim(),
        correo: formData.correo,
        calle: formData.calle,
        departamento: formData.departamento,
        region: formData.region,
        comuna: formData.comuna,
        indicaciones: formData.indicaciones
      },
      items: cartItems.map((item) => ({
        productoId: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
        subtotal: item.precio * item.cantidad,
        imagen: item.imagen
      })),
      total: totalPagar,
      estado: simularError ? 'Fallido' : 'Completado'
    };

    // SI SE PRESIONÓ EL BOTÓN DE SIMULAR ERROR
    if (simularError) {
      localStorage.setItem('f4a_failed_order', JSON.stringify(datosOrden));
      navigate('/pago-error');
      return;
    }

    // FLUJO NORMAL / PAGO EXITOSO
    try {
      const nuevaVenta = ventaService.crearOrden(datosOrden);
      handleClearCart();
      navigate('/pago-exitoso');
    } catch (err) {
      console.error('Error al procesar la compra:', err);
      localStorage.setItem('f4a_failed_order', JSON.stringify(datosOrden));
      navigate('/pago-error');
    }
  };

  return (
    <section className="route-page container my-5">
      <div className="mb-4">
        <Text variant="p" className="page-eyebrow">
          CHECKOUT & CARRITO
        </Text>
        <Text variant="h1" className="page-title display-5 fw-bold">
          Carrito de Compras
        </Text>
        <Text className="page-description text-secondary">
          Revisa tus productos seleccionados e ingresa tus datos de envío para finalizar la compra.
        </Text>
      </div>

      {mensaje.texto && (
        <div className={`alert alert-${mensaje.tipo} text-center p-3 mb-4`} role="alert">
          {mensaje.texto}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="blog-card-detail p-5 text-center my-4">
          <h4 className="text-white fw-bold mb-3">Tu carrito está vacío</h4>
          <p className="text-secondary mb-4">
            Explora nuestro catálogo digital y añade tus videojuegos, licencias o suscripciones favoritas[cite: 3].
          </p>
          <button className="btn btn-success px-4 fw-bold" onClick={() => navigate('/categorias')}>
            Explorar Catálogo →
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {/* TABLA / LISTA DE PRODUCTOS */}
          <div className="col-12 col-lg-7">
            <div className="blog-card-detail">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-white mb-0">Productos en tu Carrito</h5>
                <button
                  className="btn btn-danger"
                  onClick={handleClearCart}
                >
                  Vaciar Carrito
                </button>
              </div>

              <div className="table-responsive">
                <table className="table-striped-dark align-middle mb-0">
                  <thead>
                    <tr className="text-secondary border-bottom border-secondary">
                      <th>Producto</th>
                      <th className="text-center">Precio</th>
                      <th className="text-center">Cantidad</th>
                      <th className="text-end">Subtotal</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={item.imagen || 'https://via.placeholder.com/80x60'}
                              alt={item.nombre}
                              style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                            <span className="fw-bold text-white">{item.nombre}</span>
                          </div>
                        </td>
                        <td className="text-center small">${item.precio.toLocaleString('es-CL')}</td>
                        <td className="text-center">
                          <div className="btn-group btn-group-sm" role="group">
                            <button
                              className="btn btn-outline-secondary text-white"
                              onClick={() => handleCantidadChange(item.id, -1)}
                            >
                              -
                            </button>
                            <span className="btn text-white px-3 fw-bold">
                              {item.cantidad}
                            </span>
                            <button
                              className="btn btn-outline-secondary text-white"
                              onClick={() => handleCantidadChange(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-end fw-bold">
                          ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleRemoveItem(item.id)}
                            title="Eliminar producto"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary">
                <span className="h5 text-white fw-bold">Total a Pagar:</span>
                <span className="detalle-producto-precio">
                  ${totalPagar.toLocaleString('es-CL')}
                </span>
              </div>
            </div>
          </div>

          {/* FORMULARIO DE CHECKOUT / INFORMACIÓN DEL CLIENTE */}
          <div className="col-12 col-lg-5">
            <div className="blog-card-detail">
              <h5 className="fw-bold mb-3">
                Información del Cliente y Despacho
              </h5>
              <p className="small text-light">Datos obligatorios</p>

              <form onSubmit={handleSubmitOrden}>
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-white">Nombre*</label>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control form-control-sm"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold text-white">Apellidos*</label>
                    <input
                      type="text"
                      name="apellidos"
                      className="form-control form-control-sm"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-white">Correo Electrónico*</label>
                  <input
                    type="email"
                    name="correo"
                    className="form-control form-control-sm"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <h6 className="fw-bold mt-4 mb-3">
                  Dirección de Entrega
                </h6>

                <div className="row g-2 mb-3">
                  <div className="col-8">
                    <label className="form-label small fw-bold text-white">Calle y Número*</label>
                    <input
                      type="text"
                      name="calle"
                      className="form-control form-control-sm"
                      placeholder="Ej. Los Crisantemos 123"
                      value={formData.calle}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label small fw-bold text-white">Depto</label>
                    <input
                      type="text"
                      name="departamento"
                      className="form-control form-control-sm"
                      placeholder="603"
                      value={formData.departamento}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-white">Región*</label>
                    <select
                      name="region"
                      className="form-select form-select-sm"
                      value={formData.region}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Región Metropolitana de Santiago">
                        Región Metropolitana
                      </option>
                      <option value="Valparaíso">Valparaíso</option>
                      <option value="Biobío">Biobío</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold text-white">Comuna*</label>
                    <input
                      type="text"
                      name="comuna"
                      className="form-control form-control-sm"
                      value={formData.comuna}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold text-white">
                    Indicaciones
                  </label>
                  <textarea
                    name="indicaciones"
                    className="form-control form-control-sm"
                    rows="2"
                    placeholder="Ej. Dejar en conserjería..."
                    value={formData.indicaciones}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                {/* BOTONES DE PAGO Y SIMULACIÓN */}
                <div className="d-flex flex-column gap-2 mt-4">
                  <button
                    type="submit"
                    className="btn btn-success w-100 py-2 fw-bold"
                    style={{ backgroundColor: '#10b981', borderColor: '#10b981' }}
                    onClick={(e) => handleSubmitOrden(e, false)}
                  >
                    Pagar Ahora ${totalPagar.toLocaleString('es-CL')}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-danger w-100 py-1 small fw-bold"
                    onClick={(e) => handleSubmitOrden(e, true)}
                  >
                    ⊗ Simular Pago Fallido (Prueba)
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CartPage;