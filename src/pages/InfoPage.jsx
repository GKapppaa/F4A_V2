import Text from '../components/atoms/Text';

function InfoPage({ title, description }) {
  return (
    <section className="route-page">
      <Text variant="p" className="page-eyebrow">F4A</Text>
      <Text variant="h1" className="page-title">{title}</Text>
      <Text className="page-description">{description}</Text>
    </section>
  );
}

export default InfoPage;
