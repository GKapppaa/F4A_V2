import Enlaces from '../components/atoms/Enlaces';
import Text from '../components/atoms/Text';
import FaqSection from '../components/organisms/FaqSection';

const categories = [
  { label: 'Videojuegos', href: '/gaming', description: 'Juegos para tu próxima aventura.' },
  { label: 'Software', href: '/software', description: 'Herramientas y licencias digitales.' },
  { label: 'Suscripciones', href: '/subscripciones', description: 'Servicios digitales en un solo lugar.' },
];

function HomePage() {
  return (
    <>
      <div className="home-content">
        <section className="home-hero">
          <Text variant="p" className="page-eyebrow">BIENVENIDO A F4A</Text>
          <Text variant="h1" className="home-title">Tu próximo mundo digital empieza aquí</Text>
          <Text className="home-description">
            Explora videojuegos, software y productos digitales desde un solo lugar.
          </Text>
        </section>

        <section className="home-categories" aria-label="Categorías de la tienda">
          <Text variant="h2" className="page-title">
            Explora nuestras categorías
          </Text>
          <div className="category-grid">
            {categories.map((category) => (
              <Enlaces className="category-card" href={category.href} key={category.href}>
                <Text variant="h3" className="category-title">{category.label}</Text>
                <Text className="category-description">{category.description}</Text>
                <span className="category-action" aria-hidden="true">Explorar →</span>
              </Enlaces>
            ))}
          </div>
        </section>
      </div>
      <FaqSection />
    </>
  );
}

export default HomePage;
