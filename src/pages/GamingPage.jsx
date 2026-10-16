import Text from '../components/atoms/Text';

function GamingPage() {
  return (
    <section className="route-page">
      <Text variant="p" className="page-eyebrow">CATÁLOGO F4A</Text>
      <Text variant="h1" className="page-title">Videojuegos</Text>
      <Text className="page-description">
        Estamos preparando el catálogo de videojuegos. Vuelve pronto para descubrir los productos disponibles.
      </Text>
    </section>
  );
}

export default GamingPage;
