import React, { useState, useEffect } from 'react';
import Text from '../components/atoms/Text';

function ContactPage({ isLoggedIn }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cargar y autocompletar datos si el usuario inició sesión
  useEffect(() => {
    const session = localStorage.getItem('f4a_session') || localStorage.getItem('usuario_sesion');
    if (session) {
      try {
        const usuarioLogueado = JSON.parse(session);
        setFormData((prev) => ({
          ...prev,
          nombre: `${usuarioLogueado.nombre || ''} ${usuarioLogueado.apellidos || ''}`.trim(),
          correo: usuarioLogueado.correo || ''
        }));
      } catch (err) {
        console.error('Error al parsear los datos de sesión:', err);
      }
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const nombreLimpio = formData.nombre.trim();
    const correoLimpio = formData.correo.trim().toLowerCase();
    const mensajeLimpio = formData.mensaje.trim();

    // Validaciones
    const regexTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
    const regexCorreo = /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    if (!regexTexto.test(nombreLimpio)) {
      setError('Por favor, ingresa un nombre válido (al menos 2 caracteres y solo letras).');
      return;
    }

    if (!regexCorreo.test(correoLimpio)) {
      setError('Por favor, ingresa un correo electrónico válido (ej. usuario@dominio.cl).');
      return;
    }

    if (mensajeLimpio.length < 10) {
      setError('El mensaje debe tener al menos 10 caracteres para detallar tu consulta.');
      return;
    }

    // Simulación de envío de mensaje al equipo de soporte F4A
    console.log('Mensaje de contacto enviado:', {
      nombre: nombreLimpio,
      correo: correoLimpio,
      mensaje: mensajeLimpio,
      fecha: new Date().toISOString()
    });

    setSuccess('¡Tu mensaje ha sido enviado con éxito! Los encargados de F4A te responderán a la brevedad.');

    // Limpiar mensaje si no está logueado o solo el área de texto si sí lo está
    setFormData((prev) => ({
      ...prev,
      mensaje: ''
    }));
  };

  return (
    <section className="route-page container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">

          <div className="text-center mb-4">
            <Text variant="p" className="page-eyebrow" style={{ color: '#10b981' }}>
              ATENCIÓN DIRECTA
            </Text>
            <Text variant="h1" className="page-title display-5 fw-bold" style={{ color: '#10b981' }}>
              Contacto
            </Text>
            <Text className="page-description text-secondary">
              ¿Tienes dudas con tu compra o licencias digitales? Completa el formulario para comunicarte directamente con los encargados de la tienda F4A.
            </Text>
          </div>

          {error && (
            <div className="alert alert-danger text-center p-2 mb-3" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success text-center p-2 mb-3" role="alert">
              {success}
            </div>
          )}

          <div className="card-contacto">
            <form onSubmit={handleSubmit}>

              <h5 className="mb-3 fw-bold">
                Formulario de Mensaje
              </h5>

              <div className="mb-3">
                <label className="form-label small fw-bold">Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Ej. Pedro Hacker"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Correo Electrónico</label>
                <input
                  type="email"
                  name="correo"
                  className="form-control"
                  placeholder="Ej. pedro.hacker20@example.com"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold">Mensaje o Consulta</label>
                <textarea
                  name="mensaje"
                  className="form-control"
                  rows="4"
                  placeholder="Escribe aquí tu duda, problema técnico o consulta sobre tus claves y productos..."
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-auth-submit">
                Enviar mensaje a soporte
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactPage;