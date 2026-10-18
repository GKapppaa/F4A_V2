import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../components/atoms/Text';
import { usuarioService, initDB } from '../data/dbService';

function RegisterPage() {
  const navigate = useNavigate();

  // Estado para el formulario alineado con el esquema de la base de datos
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    confirmPassword: '',
    calle: '',
    departamento: '',
    region: 'Región Metropolitana de Santiago',
    comuna: '',
    indicaciones: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

    // 1. Limpieza de espacios en blanco en los campos
    const nombreLimpio = formData.nombre.trim();
    const apellidosLimpios = formData.apellidos.trim();
    const correoLimpio = formData.correo.trim().toLowerCase();
    const calleLimpia = formData.calle.trim();
    const comunaLimpia = formData.comuna.trim();
    const regionLimpia = formData.region.trim();
    const deptoLimpio = formData.departamento.trim();
    const indicacionesLimpias = formData.indicaciones.trim();

    // Expresiones regulares de validación
    const regexTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/; // Solo letras y espacios, mínimo 2 caracteres
    const regexCorreo = /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;  // Formato de correo válido

    // --- VALIDACIONES POR CAMPO ---

    // Validar Nombre (evita puntos, números o solo 1 letra)
    if (!regexTexto.test(nombreLimpio)) {
      setError('El nombre debe tener al menos 2 caracteres y contener solo letras.');
      return;
    }

    // Validar Apellidos (evita puntos, números o solo 1 letra)
    if (!regexTexto.test(apellidosLimpios)) {
      setError('El apellido debe tener al menos 2 caracteres y contener solo letras.');
      return;
    }

    // Validar Correo Electrónico
    if (!regexCorreo.test(correoLimpio)) {
      setError('Por favor, ingresa un correo electrónico válido (ej. usuario@dominio.com).');
      return;
    }

    // Validar Contraseña (mínimo 3 caracteres)
    if (formData.password.length < 3) {
      setError('La contraseña debe tener al menos 3 caracteres.');
      return;
    }

    // Validar Coincidencia de Contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Validar Calle y Número
    if (calleLimpia.length < 4) {
      setError('Por favor, ingresa una dirección de calle y número válida.');
      return;
    }

    // Validar Comuna
    if (!regexTexto.test(comunaLimpia)) {
      setError('La comuna debe tener al menos 2 caracteres y contener solo letras.');
      return;
    }

    // Validar Región
    if (!regionLimpia) {
      setError('Por favor, ingresa una región válida.');
      return;
    }

    // Inicializar DB en localStorage si no existe
    initDB();

    // Verificar si el correo ya está registrado en la base de datos
    const usuariosActuales = usuarioService.getAll();
    const existeUsuario = usuariosActuales.find(
      (u) => u.correo.toLowerCase() === correoLimpio
    );

    if (existeUsuario) {
      setError('El correo electrónico ya se encuentra registrado.');
      return;
    }

    // Construir el objeto de usuario con la estructura exacta requerida por la base de datos
    const nuevoUsuario = {
      nombre: nombreLimpio,
      apellidos: apellidosLimpios,
      correo: correoLimpio,
      password: formData.password,
      rol: 'cliente', // Por defecto los registros públicos son clientes
      direccion: {
        calle: calleLimpia,
        departamento: deptoLimpio,
        region: regionLimpia,
        comuna: comunaLimpia,
        indicaciones: indicacionesLimpias
      }
    };

    // Guardar en el localStorage a través del servicio
    usuarioService.create(nuevoUsuario);

    setSuccess('¡Cuenta creada con éxito! Redirigiendo al inicio de sesión...');

    // Redirigir tras un breve retraso
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 2000);
  };

  return (
    <section className="route-page container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">

          <div className="text-center mb-4">
            <Text variant="p" className="page-eyebrow">ÚNETE A F4A</Text>
            <Text variant="h1" className="page-title">Crear cuenta</Text>
            <Text className="page-description">
              Regístrate para acceder al catálogo completo, realizar compras y gestionar tus llaves digitales.
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

          <div className="card-custom-dark">
            <form onSubmit={handleSubmit}>

              <h5 className="mb-3 fw-bold">Información Personal</h5>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">Apellidos</label>
                  <input
                    type="text"
                    name="apellidos"
                    className="form-control"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Correo Electrónico</label>
                <input
                  type="email"
                  name="correo"
                  className="form-control"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">Confirmar Contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <hr className="my-4 text-muted" />
              <h5 className="mb-3 fw-bold">Dirección de Despacho</h5>

              <div className="mb-3">
                <label className="form-label small fw-bold">Calle y Número</label>
                <input
                  type="text"
                  name="calle"
                  className="form-control"
                  placeholder="Ej. Los Crisantemos, Edificio Norte"
                  value={formData.calle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">Departamento / Oficina (Opcional)</label>
                  <input
                    type="text"
                    name="departamento"
                    className="form-control"
                    placeholder="Ej. Depto 603"
                    value={formData.departamento}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">Comuna</label>
                  <input
                    type="text"
                    name="comuna"
                    className="form-control"
                    placeholder="Ej. Cerrillos"
                    value={formData.comuna}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Región</label>
                <input
                  type="text"
                  name="region"
                  className="form-control"
                  value={formData.region}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold">Indicaciones de entrega (Opcional)</label>
                <textarea
                  name="indicaciones"
                  className="form-control"
                  rows="2"
                  placeholder="Ej. Dejar en conserjería"
                  value={formData.indicaciones}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn-auth-submit">
                Registrarse en F4A
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
