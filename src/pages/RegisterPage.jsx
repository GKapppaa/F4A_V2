import Text from '../components/atoms/Text';

function RegisterPage() {
  return (
    <section className="route-page">
      <Text variant="p" className="page-eyebrow">ÚNETE A F4A</Text>
      <Text variant="h1" className="page-title">Crear cuenta</Text>
      <Text className="page-description">
        El registro aún no está conectado. Esta página queda preparada para integrar el formulario y la autenticación.
      </Text>
    </section>
  );
}

export default RegisterPage;
