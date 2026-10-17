import React, { useState, useEffect } from 'react';
import Text from '../components/atoms/Text';
import { productoService } from '../services/dbService';

function OffersPage({ isLoggedIn }) {
    const [ofertas, setOfertas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // Obtenemos todos los productos y filtramos únicamente los que están en oferta (esOferta === true)
        const todosLosProductos = productoService.getAll();
        const productosEnOferta = todosLosProductos.filter(
            (prod) => prod.esOferta === true
        );

        setOfertas(productosEnOferta);
        setCargando(false);
    }, []);

    const handleAgregarAlCarrito = (producto) => {
        alert(`¡Oferta "${producto.nombre}" añadida al carrito con éxito!`);
    };

    return (
        <section className="route-page container my-4">
            <div className="mb-4">
                <Text variant="p" className="page-eyebrow">
                    CATÁLOGO F4A
                </Text>
                <Text variant="h1" className="page-title display-5 fw-bold">
                    Ofertas y Promociones
                </Text>
                <Text className="page-description text-secondary">
                    Aprovecha nuestros descuentos especiales en llaves digitales, software y suscripciones.
                </Text>
            </div>

            {cargando ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando ofertas...</span>
                    </div>
                </div>
            ) : ofertas.length === 0 ? (
                <div className="alert alert-info text-center" role="alert">
                    No hay ofertas disponibles en este momento. ¡Vuelve pronto!
                </div>
            ) : (
                <div className="row g-4">
                    {ofertas.map((item) => (
                        <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card h-100 shadow-sm border-0">
                                <img
                                    src={item.imagen || 'https://via.placeholder.com/400x300'}
                                    className="card-img-top"
                                    alt={item.nombre}
                                    style={{ objectFit: 'cover', height: '180px' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold">{item.nombre}</h5>
                                    <p className="card-text text-muted small flex-grow-1">
                                        {item.descripcion}
                                    </p>

                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="h5 mb-0 fw-bold text-success">
                                            ${item.precio.toLocaleString('es-CL')}
                                        </span>
                                        <span className="badge bg-danger">¡Oferta!</span>
                                    </div>

                                    <p className="card-text small mb-3">
                                        <small className={item.stock <= 5 ? 'text-danger fw-bold' : 'text-muted'}>
                                            Stock disponible: {item.stock}
                                        </small>
                                    </p>

                                    {/* Renderizado condicional según sesión */}
                                    {isLoggedIn ? (
                                        <button
                                            className="btn btn-primary w-100 mt-auto"
                                            onClick={() => handleAgregarAlCarrito(item)}
                                            disabled={item.stock === 0}
                                        >
                                            {item.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
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

export default OffersPage;