import { useNavigate } from 'react-router-dom';

function PaymentFailurePage() {
    const navigate = useNavigate();
    const attemptData = (() => {
        const failedData = localStorage.getItem('f4a_failed_order');
        if (failedData) {
            try {
                return JSON.parse(failedData);
            } catch (e) {
                console.error('Error al leer orden fallida:', e);
            }
        }
        return {
            nroBoleta: 20240705,
            cliente: {
                nombre: 'Pedro Hacker',
                correo: 'pedro.hacker20@example.com',
                calle: 'Los Crisantemos, Edificio Norte',
                departamento: 'Depto 603',
                region: 'Región Metropolitana de Santiago',
                comuna: 'Cerrillos',
                indicaciones: 'El martes no estaremos en el depto, pero puede dejárselo con el conserje.'
            },
            items: [
                { nombre: 'Minecraft', precio: 2695, cantidad: 4, subtotal: 10780 },
                { nombre: 'Red Dead Redemption 2', precio: 5999, cantidad: 1, subtotal: 5999 }
            ],
            total: 16779
        };
    })();

    return (
        <section className="route-page container my-5">
            <div className="blog-card-detail p-4 p-md-5 mx-auto">

                {/* ENCABEZADO DE ERROR */}
                <div className="text-center pb-3 mb-4 border-bottom border-secondary">
                    <h3 className="fw-bold text-danger mb-2">
                        ⊗ No se pudo realizar el pago. nro #{attemptData?.nroBoleta || '20240705'}
                    </h3>
                    <p className="text-secondary small mb-3">Detalle de la transacción rechazada por la pasarela de pago</p>

                    <button
                        className="btn btn-success btn-lg px-4 fw-bold"
                        onClick={() => navigate('/carrito')}
                    >
                        VOLVER A REALIZAR EL PAGO
                    </button>
                </div>

                {/* INFORMACIÓN DEL CLIENTE */}
                <h5 className="fw-bold mb-3">
                    Información del Cliente
                </h5>
                <div className="row g-3 mb-4">
                    <div className="col-12 col-md-6">
                        <label className="form-label small text-light">Nombre</label>
                        <input
                            type="text"
                            className="form-control form-control-sm bg-dark text-white border-secondary"
                            value={attemptData?.cliente?.nombre || ''}
                            disabled
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label small text-light">Correo</label>
                        <input
                            type="email"
                            className="form-control form-control-sm bg-dark text-white border-secondary"
                            value={attemptData?.cliente?.correo || ''}
                            disabled
                        />
                    </div>
                </div>

                {/* DIRECCIÓN DE ENTREGA */}
                <h5 className="fw-bold mb-3">
                    Dirección de entrega de los productos
                </h5>
                <div className="row g-3 mb-4">
                    <div className="col-12 col-md-8">
                        <label className="form-label small text-light">Calle</label>
                        <input
                            type="text"
                            className="form-control form-control-sm bg-dark text-white border-secondary"
                            value={attemptData?.cliente?.calle || ''}
                            disabled
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <label className="form-label small text-light">Departamento (opcional)</label>
                        <input
                            type="text"
                            className="form-control form-control-sm bg-dark text-white border-secondary"
                            value={attemptData?.cliente?.departamento || ''}
                            disabled
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label small text-light">Región</label>
                        <input
                            type="text"
                            className="form-control form-control-sm bg-dark text-white border-secondary"
                            value={attemptData?.cliente?.region || ''}
                            disabled
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label small text-light">Comuna</label>
                        <input
                            type="text"
                            className="form-control form-control-sm bg-dark text-white border-secondary"
                            value={attemptData?.cliente?.comuna || ''}
                            disabled
                        />
                    </div>
                    {attemptData?.cliente?.indicaciones && (
                        <div className="col-12">
                            <label className="form-label small text-light">Indicaciones para la entrega (opcional)</label>
                            <textarea
                                className="form-control form-control-sm bg-dark text-white border-secondary"
                                rows="2"
                                value={attemptData.cliente.indicaciones}
                                disabled
                            ></textarea>
                        </div>
                    )}
                </div>

                {/* TABLA DE PRODUCTOS */}
                <div className="table-responsive mb-4">
                    <table className="table table-dark align-middle mb-0">
                        <thead>
                            <tr className="text-secondary border-bottom border-secondary">
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th className="text-center">Precio</th>
                                <th className="text-center">Cantidad</th>
                                <th className="text-end">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attemptData?.items?.map((item, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <img
                                            src={item.imagen || 'https://via.placeholder.com/80x60'}
                                            alt={item.nombre}
                                            style={{ width: '45px', height: '35px', objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    </td>
                                    <td className="fw-bold text-white small">{item.nombre}</td>
                                    <td className="text-center small">${item.precio?.toLocaleString('es-CL')}</td>
                                    <td className="text-center small">{item.cantidad}</td>
                                    <td className="text-end fw-bold text-danger">
                                        ${(item.subtotal || item.precio * item.cantidad)?.toLocaleString('es-CL')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* TOTAL INTENTADO */}
                <div className="p-3 bg-dark rounded text-center mb-4 border border-secondary">
                    <h4 className="fw-bold text-white mb-0">
                        Total a pagar: <span className="text-danger">${attemptData?.total?.toLocaleString('es-CL')}</span>
                    </h4>
                </div>

            </div>
        </section>
    );
}

export default PaymentFailurePage;
