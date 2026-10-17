import React, { useState, useEffect } from 'react';
import Text from '../components/atoms/Text';
import { productoService } from '../services/dbService';

function GamingPage({ isLoggedIn }) {
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
    // Aquí puedes integrar la lógica para guardar el producto en el carrito del localStorage
    alert(`¡Producto "${producto.nombre}" añadido al carrito con éxito!`);
  };

  return (
    <section className="route-page container my-4">
      <div className="mb-4">
        <Text variant="p" className="page-eyebrow text-uppercase text-muted fw-bold">
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
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={juego.imagen || 'https://via.placeholder.com/400x300'}
                  className="card-img-top"
                  alt={juego.nombre}
                  style={{ objectFit: 'cover', height: '180px' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{juego.nombre}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {juego.descripcion}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h5 mb-0 fw-bold text-success">
                      ${juego.precio.toLocaleString('es-CL')}
                    </span>
                    {juego.esOferta && (
                      <span className="badge bg-danger">Oferta</span>
                    )}
                  </div>

                  <p className="card-text small mb-3">
                    <small className={juego.stock <= 5 ? 'text-danger fw-bold' : 'text-muted'}>
                      Stock disponible: {juego.stock}
                    </small>
                  </p>

                  {/* RENDERIZADO CONDICIONAL: Igual que en tu Header */}
                  {isLoggedIn ? (
                    <button
                      className="btn btn-primary w-100 mt-auto"
                      onClick={() => handleAgregarAlCarrito(juego)}
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