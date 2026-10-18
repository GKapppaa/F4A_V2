import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../components/atoms/Text';
import { ventaService, initDB } from '../services/dbService';

function PaymentSuccessPage() {
    const navigate = useNavigate();
    const [ultimaOrden, setUltimaOrden] = useState(null);

    useEffect(() => {
        initDB();
        // Obtener las ventas de la base de datos simulada
        const ventas = ventaService.getAll();
        if (ventas && ventas.length > 0) {
            // Tomar la última orden registrada
            setUltimaOrden(ventas[ventas.length - 1]);
        }
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const handleSendEmail = () => {
        alert(`Se ha enviado una copia de la boleta al correo: ${ultimaOrden?.cliente?.correo || 'cliente'}`);
    };

    if (!ultimaOrden) {
        return (
            <section className="route-page container my-5 text-center">
                <div className="card-custom-dark p-5">
                    <h4 className="text-white mb-3">No hay registros de compra recientes</h4>
                    <button className="btn btn-success fw-bold" onClick={() => navigate('/gaming')}>
                        Ir al Catálogo
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="route-page container my-5">
            <div className="blog-card-detail p-4 p-md-5 mx-auto">

                {/* ENCABEZADO DE ÉXITO */}
                <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom border-secondary">
                    <div>
                        <h3 className="mb-3 fw-bold">
                            ✓ Se ha realizado la compra. nro #{ultimaOrden.nroBoleta}
                        </h3>
                        <p className="text-secondary small mb-0">Resumen detallado del comprobante digital</p>
                    </div>
                    <span className="badge border p-2">
                        Código orden: {ultimaOrden.id}
                    </span>
                </div>

                {/* INFORMACIÓN DEL CLIENTE */}
                <h5 className="fw-bold mb-3">
                    Información del Cliente
                </h5>
                <div className="row g-3 mb-4">
                    <div className="col-12 col-md-4">
                        <label className="form-label small text-light">Nombre Completo</label>
                        <input
                            type="text"
                            className="form-control form-control-sm bg-dark text-white border-secondary"
                            value={ultimaOrden.cliente?.nombre || 'Cliente'}
                            disabled
                        />
                    </div>
                    <div className="col-12 col-md-8">
                        <label className="form-label small text-light">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control form-control-sm bg-dark text-white border-secondary"
                            value={ultimaOrden.cliente?.correo || ''}
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
                            value={ultimaOrden.cliente?.calle || ''}
                            disabled
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <label className="form-label small text-light">Departamento (opcional)</label>
                        <input
                            type="text"
                            className="form-control form-control-sm bg-dark text-white border-secondary"
                            value={ultimaOrden.cliente?.departamento || 'N/A'}
                            disabled
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label small text-light">Región</label>
                        <input
                            type="text"
                            className="form-control form-control-sm bg-dark text-white border-secondary"
                            value={ultimaOrden.cliente?.region || ''}
                            disabled
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label small text-light">Comuna</label>
                        <input
                            type="text"
                            className="form-control form-control-sm bg-dark text-white border-secondary"
                            value={ultimaOrden.cliente?.comuna || ''}
                            disabled
                        />
                    </div>
                    {ultimaOrden.cliente?.indicaciones && (
                        <div className="col-12">
                            <label className="form-label small text-light">Indicaciones para la entrega</label>
                            <textarea
                                className="form-control form-control-sm bg-dark text-white border-secondary"
                                rows="2"
                                value={ultimaOrden.cliente.indicaciones}
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
                            {ultimaOrden.items?.map((item, idx) => (
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
                                    <td className="text-end mb-3 fw-bold">
                                        ${(item.subtotal || item.precio * item.cantidad)?.toLocaleString('es-CL')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* TOTAL PAGADO */}
                <div className="p-3 bg-dark rounded text-center mb-4 border border-secondary">
                    <h4 className="fw-bold text-white mb-0">
                        Total pagado: <span className="mb-3 fw-bold">${ultimaOrden.total?.toLocaleString('es-CL')}</span>
                    </h4>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                    <button className="btn btn-danger px-4 fw-bold" onClick={handlePrint}>
                        Imprimir boleta en PDF
                    </button>
                    <button className="btn btn-success px-4 fw-bold" onClick={handleSendEmail}>
                        Enviar boleta por email
                    </button>
                    <button className="btn btn-outline-light px-4 fw-bold" onClick={() => navigate('/')}>
                        Volver a la Tienda
                    </button>
                </div>

            </div>
        </section>
    );
}

export default PaymentSuccessPage;