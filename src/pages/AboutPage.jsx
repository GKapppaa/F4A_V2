import Text from '../components/atoms/Text';
import '../styles/pages/Pages.css'; // Asegúrate de importar tus estilos

function AboutPage() {
  return (
    <section className="route-page container my-5">
      <div className="mb-5 text-center">
        <Text variant="p" className="page-eyebrow">
          SOBRE NOSOTROS
        </Text>
        <Text variant="h1" className="page-title display-4 fw-bold">
          Conoce el Proyecto F4A
        </Text>
        <Text className="page-description text-secondary lead mx-auto" style={{ maxWidth: '700px' }}>
          Somos una plataforma especializada en la venta segura y eficiente de productos digitales, licencias y llaves aleatorias de videojuegos.
        </Text>
      </div>

      <div className="row g-4 mt-2">
        {/* Misión */}
        <div className="col-md-6">
          <div className="card-custom-dark h-100">
            <div className="card-body p-0">
              <h3 className="mb-3 fw-bold">Nuestra Misión</h3>
              <p className="card-custom-text">
                Brindar a los usuarios una experiencia de compra rápida, confiable y accesible para adquirir videojuegos, software y suscripciones digitales con entrega inmediata y un soporte transparente.
              </p>
            </div>
          </div>
        </div>

        {/* Compromiso / Características de la Tienda (Reemplazo del Stack Tecnológico) */}
        <div className="col-md-6">
          <div className="card-custom-dark h-100">
            <div className="card-body p-0">
              <h3 className="mb-3 fw-bold">Nuestro Catálogo y Servicios</h3>
              <p className="card-custom-text mb-2">
                Nos enfocamos en ofrecer soluciones digitales adaptadas a las necesidades de los jugadores y profesionales:
              </p>
              <ul className="card-custom-text ps-3 mb-0">
                <li><strong>Llaves Digitales y Random Keys:</strong> Títulos de estreno y sorpresas garantizadas para Steam y más[cite: 3].</li>
                <li><strong>Licencias de Software:</strong> Herramientas de productividad y sistemas operativos oficiales.</li>
                <li><strong>Suscripciones y Membresías:</strong> Accesos mensuales a servicios de entretenimiento y juego en la nube.</li>
                <li><strong>Entrega Automatizada:</strong> Procesamiento instantáneo de compras y control de stock en tiempo real.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Equipo de Desarrollo */}
      <div className="card-custom-dark mt-4 text-center p-4">
        <h4 className="mb-3 fw-bold">Equipo de Desarrollo</h4>
        <p className="card-custom-text mb-0">
          Desarrollado en el marco de la asignatura de Desarrollo Fullstack por <strong>Daniel Pinto</strong> y <strong>Gustavo Oporto</strong>.
        </p>
      </div>
    </section>
  );
}

export default AboutPage;
