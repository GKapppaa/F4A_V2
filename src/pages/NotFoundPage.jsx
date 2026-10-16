import Enlaces from '../components/atoms/Enlaces';
import Text from '../components/atoms/Text';

function NotFoundPage() {
  return (
    <section className="route-page">
      <Text variant="p" className="page-eyebrow">ERROR 404</Text>
      <Text variant="h1" className="page-title">No encontramos esa página</Text>
      <Text className="page-description">El enlace puede estar desactualizado o la página aún no existe.</Text>
      <Enlaces className="page-action" href="/">Volver al inicio</Enlaces>
    </section>
  );
}

export default NotFoundPage;
