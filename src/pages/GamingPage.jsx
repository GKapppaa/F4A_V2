import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../components/atoms/Text';
import { productoService } from '../services/dbService';

function GamingPage({ isLoggedIn }) {
  const navigate = useNavigate();
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Obtenemos los productos y filtramos los de la categoría Juegos (ID: 1)
    const todosLosProductos = productoService.getAll();
    const productosJuegos = todosLosProductos.filter(
      (prod) => prod.categoriaId === 1
    );

    setJuegos(productosJuegos);
    setCargando(false);
  }, []);

  const handleAgregarAlCarrito = (producto) => {
    // 1. Obtener el carrito actual desde localStorage (o un arreglo vacío si no existe)
    const cart = JSON.parse(localStorage.getItem('f4a_cart') || '[]');

    // 2. Comprobar si el producto ya fue agregado anteriormente
    const index = cart.findIndex((item) => item.id === producto.id);

    if (index >= 0) {
      // Si ya existe en el carrito, aumentamos su cantidad en 1
      cart[index].cantidad += 1;
    } else {
      // Si no existe, lo agregamos con una cantidad inicial de 1
      cart.push({ ...producto, cantidad: 1 });
    }

    // 3. Guardar la lista actualizada de vuelta en localStorage
    localStorage.setItem('f4a_cart', JSON.stringify(cart));

    alert(`¡Producto "${producto.nombre}" añadido al carrito con éxito!`);
  };

  return (
    <section className="route-page container my-4">
      <div className="mb-4">
        <Text variant="p" className="page-eyebrow">
          CATÁLOGO F4A
        </Text>
        <Text variant="h1" className="page-title display-5 fw-bold">
          Videojuegos
        </Text>
        <Text className="page-description text-secondary">
          Explora nuestra selección de llaves digitales y títulos disponibles.
        </Text>
      </div>

      {cargando ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando catálogo...</span>
          </div>
        </div>
      ) : juegos.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No hay videojuegos disponibles en este momento.
        </div>
      ) : (
        <div className="row g-4">
          {juegos.map((juego) => (
            <div key={juego.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              {/* 1. Evento onClick en toda la tarjeta con cursor pointer */}
              <div
                className="card catalog-product-card h-100 shadow-sm border-0"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/producto/${juego.id}`)}
              >
                <img
                  src={juego.imagen || 'https://via.placeholder.com/400x300'}
                  className="card-img-top catalog-product-image"
                  alt={juego.nombre}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-white fw-bold">{juego.nombre}</h5>

                  <p className="card-text small flex-grow-1">
                    {juego.descripcion}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h5 fw-bold mb-3">
                      ${juego.precio.toLocaleString('es-CL')}
                    </span>
                    {juego.esOferta && (
                      <span className="badge bg-danger">Oferta</span>
                    )}
                  </div>

                  <p className="card-text small mb-3">
                    <small className={juego.stock <= 5 ? 'text-danger fw-bold' : 'text-primary fw-bold'}>
                      Stock disponible: {juego.stock}
                    </small>
                  </p>

                  {/* 2. Detener la propagación en el botón para evitar que abra la vista de detalle */}
                  {isLoggedIn ? (
                    <button
                      className="btn btn-primary w-100 mt-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAgregarAlCarrito(juego);
                      }}
                      disabled={juego.stock === 0}
                    >
                      {juego.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                    </button>
                  ) : (
                    <div className="alert alert-warning text-center p-2 small mb-0 mt-auto">
                      <span className="d-block text-muted" style={{ fontSize: '0.85rem' }}>
                        Inicia sesión para poder comprar
                      </span>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default GamingPage;
