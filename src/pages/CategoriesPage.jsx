import Enlaces from '../components/atoms/Enlaces';
import Text from '../components/atoms/Text';

const categories = [
  { label: 'Videojuegos', href: '/gaming' },
  { label: 'Software', href: '/software' },
];

function CategoriesPage() {
  return (
    <section className="route-page">
      <Text variant="p" className="page-eyebrow">CATÁLOGO F4A</Text>
      <Text variant="h1" className="page-title">Categorías</Text>
      <div className="category-grid">
        {categories.map((category) => (
          <Enlaces className="category-card" href={category.href} key={category.href}>
            <Text variant="h2" className="category-title">{category.label}</Text>
            <Text className="category-action">Ver categoría →</Text>
          </Enlaces>
        ))}
      </div>
    </section>
  );
}

export default CategoriesPage;
