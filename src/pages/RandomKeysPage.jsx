import React, { useState, useEffect } from 'react';
import Text from '../components/atoms/Text';
import { productoService } from '../services/dbService';

function RandomKeysPage({ isLoggedIn }) {
    const [randomKeys, setRandomKeys] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // Obtenemos los productos y filtramos los pertenecientes a Llaves Aleatorias (ID: 4)
        const todosLosProductos = productoService.getAll();
        const productosRandom = todosLosProductos.filter(
            (prod) => prod.categoriaId === 4
        );

        setRandomKeys(productosRandom);
        setCargando(false);
    }, []);

    const handleAgregarAlCarrito = (producto) => {
        alert(`Producto "${producto.nombre}" añadido al carrito.`);
    };

    return (
        <section className="route-page container my-4">
            <div className="mb-4">
                <Text variant="p" className="page-eyebrow text-uppercase text-muted fw-bold">
                    CATÁLOGO F4A
                </Text>
                <Text variant="h1" className="page-title display-5 fw-bold">
                    Llaves Aleatorias (Random Keys)
                </Text>
                <Text className="page-description text-secondary">
                    Pon a prueba tu suerte y consigue llaves digitales sorpresa al mejor precio.
                </Text>
            </div>

            {cargando ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando catálogo...</span>
                    </div>
                </div>
            ) : randomKeys.length === 0 ? (
                <div className="alert alert-info text-center" role="alert">
                    No hay llaves aleatorias disponibles en este momento.
                </div>
            ) : (
                <div className="row g-4">
                    {randomKeys.map((item) => (
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
                                        {item.esOferta && (
                                            <span className="badge bg-danger">Oferta</span>
                                        )}
                                    </div>

                                    <p className="card-text small mb-3">
                                        <small className={item.stock <= 5 ? 'text-danger fw-bold' : 'text-muted'}>
                                            Stock disponible: {item.stock}
                                        </small>
                                    </p>

                                    {/* Renderizado condicional basado en la sesión */}
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

export default RandomKeysPage;