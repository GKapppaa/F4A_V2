import { useParams, useNavigate } from 'react-router-dom';
import Text from '../components/atoms/Text';
import { productoService } from '../services/dbService';

function ProductDetailPage({ isLoggedIn }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const producto = productoService.getById(id);

    const handleAgregarAlCarrito = (producto, cantidadSeleccionada = 1) => {
        // 1. Obtener el carrito actual desde localStorage
        const cart = JSON.parse(localStorage.getItem('f4a_cart') || '[]');

        // 2. Comprobar si el producto ya existe en el carrito
        const index = cart.findIndex((item) => item.id === producto.id);

        if (index >= 0) {
            // Si ya existe, sumamos la cantidad seleccionada
            cart[index].cantidad += cantidadSeleccionada;
        } else {
            // Si es nuevo, lo agregamos con la cantidad seleccionada
            cart.push({ ...producto, cantidad: cantidadSeleccionada });
        }

        // 3. Guardar el carrito actualizado en localStorage
        localStorage.setItem('f4a_cart', JSON.stringify(cart));

        alert(`¡${cantidadSeleccionada} unidad(es) de "${producto.nombre}" añadida(s) al carrito con éxito!`);
    };

    if (!producto) {
        return (
            <div className="container my-5 text-center">
                <div className="alert alert-warning" role="alert">
                    El producto solicitado no existe o no fue encontrado.
                </div>
                <button
                    className="btn btn-outline-light mt-3"
                    onClick={() => navigate(-1)}
                >
                    ← Volver al catálogo
                </button>
            </div>
        );
    }

    return (
        <section className="route-page container my-5">
            {/* Botón para regresar al catálogo anterior */}
            <button
                className="btn btn-link text-decoration-none mb-4 p-0 fw-bold"
                onClick={() => navigate(-1)}
            >
                ← Volver atrás
            </button>

            <div className="detalle-producto">
                <div className="row g-4 align-items-center">

                    {/* Imagen del producto */}
                    <div className="col-12 col-md-6 text-center">
                        <img
                            src={producto.imagen || 'https://via.placeholder.com/500x350'}
                            alt={producto.nombre}
                            className="img-fluid rounded border border-secondary shadow"
                            style={{ maxHeight: '380px', width: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Información detallada */}
                    <div className="col-12 col-md-6 d-flex flex-column justify-content-between">
                        <div>
                            <Text variant="p" className="page-eyebrow mb-1">
                                DETALLE DEL PRODUCTO
                            </Text>

                            <Text variant="h1" className="page-title h2 fw-bold text-white mb-3">
                                {producto.nombre}
                            </Text>

                            <div className="d-flex align-items-center gap-3 mb-4">
                                <span className="detalle-producto-precio">
                                    ${producto.precio?.toLocaleString('es-CL')}
                                </span>
                                {producto.esOferta && (
                                    <span className="badge bg-danger fs-6">¡OFERTA ESPECIAL!</span>
                                )}
                            </div>

                            <h6 className="fw-bold mb-2">Descripción:</h6>
                            <p className="card-custom-text mb-4">
                                {producto.descripcion}
                            </p>

                            <div className="mb-4">
                                <span className={`badge ${producto.stock <= 5 ? 'bg-danger' : 'bg-secondary'} p-2`}>
                                    Stock disponible: {producto.stock} unidades
                                </span>
                            </div>
                        </div>

                        {/* Renderizado condicional del botón de compra según la sesión */}
                        <div>
                            {isLoggedIn ? (
                                <button
                                    className="btn-auth-submit py-3 fs-5 w-100 fw-bold"
                                    onClick={() => handleAgregarAlCarrito(producto, 1)}
                                    disabled={producto.stock === 0}
                                >
                                    {producto.stock > 0 ? '🛒 Añadir al Carrito' : 'Agotado'}
                                </button>
                            ) : (
                                <div className="alert alert-warning text-center p-3 mb-0" role="alert">
                                    <span className="d-block fw-semibold mb-1">¿Quieres adquirir este producto?</span>
                                    <span className="small text-muted">
                                        Inicia sesión desde el menú superior para poder realizar compras.
                                    </span>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}

export default ProductDetailPage;
