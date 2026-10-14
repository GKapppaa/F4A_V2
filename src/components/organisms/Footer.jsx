import '../../styles/organisms/Footer.css';
import Enlaces from '../atoms/Enlaces';
import Logo from '../atoms/Logo';
import Text from '../atoms/Text';

const footerGroups = [
  {
    id: 'store',
    title: 'Explora F4A',
    links: [
      { label: 'Videojuegos', href: '/gaming' },
      { label: 'Software', href: '/software' },
      { label: 'Suscripciones', href: '/subscripciones' },
      { label: 'Regalos digitales', href: '/regalos' },
    ],
  },
  {
    id: 'help',
    title: 'Ayuda',
    links: [
      { label: 'Preguntas frecuentes', href: '#faq' },
      { label: 'Cómo comprar', href: '/faqs' },
      { label: 'Contacto', href: '/contacto' },
      { label: 'Problemas con una clave', href: '/contacto' },
    ],
  },
  {
    id: 'about',
    title: 'Sobre F4A',
    links: [
      { label: 'Quiénes somos', href: '/nosotros' },
      { label: 'Ofertas', href: '/ofertas' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    links: [
      { label: 'Términos y condiciones', href: '/terminos' },
      { label: 'Privacidad', href: '/privacidad' },
      { label: 'Política de cookies', href: '/politica-cookies' },
    ],
  },
];

const productTypes = [
  { label: 'Juegos', href: '/gaming' },
  { label: 'Software', href: '/software' },
  { label: 'Suscripciones', href: '/subscripciones' },
  { label: 'Claves digitales', href: '/randomkey' },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-showcase">
          <div className="footer-brand">
            <Logo alt="F4A, inicio" className="footer-logo" />
            <Text className="footer-description">
              Tu espacio para descubrir juegos, software y productos digitales.
            </Text>
          </div>

          <div className="footer-product-types" aria-label="Categorías de productos">
            <Text className="footer-kicker">ENCUENTRA TU PRÓXIMA EXPERIENCIA</Text>
            <div className="footer-chips">
              {productTypes.map((item) => (
                <Enlaces className="footer-chip" href={item.href} key={item.label}>
                  {item.label}
                </Enlaces>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-link-grid">
          {footerGroups.map((group) => (
            <section className="footer-link-group" key={group.id}>
              <Text variant="h3" className="footer-group-title">
                {group.title}
              </Text>
              <ul>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Enlaces className="footer-link" href={link.href}>
                      {link.label}
                    </Enlaces>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="footer-support">
            <Text variant="h3" className="footer-group-title">
              ¿Necesitas ayuda?
            </Text>
            <Text className="footer-support-copy">
              Estamos para orientarte con tu compra o tus productos digitales.
            </Text>
            <Enlaces className="footer-support-link" href="/contacto">
              Contactar soporte <span aria-hidden="true">→</span>
            </Enlaces>
          </section>
        </div>

        <div className="footer-bottom">
          <Text className="footer-copyright">
            © {new Date().getFullYear()} F4A. Todos los derechos reservados.
          </Text>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
