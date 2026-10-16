import Enlaces from '../components/atoms/Enlaces';
import Text from '../components/atoms/Text';

function CartPage() {
  return (
    <section className="route-page">
      <Text variant="p" className="page-eyebrow">TU COMPRA</Text>
      <Text variant="h1" className="page-title">Carrito</Text>
      <div className="route-empty-state">
        <Text variant="h2" className="category-title">Tu carrito está vacío</Text>
        <Text className="page-description">
          Cuando agregues productos, aparecerán aquí.
        </Text>
        <Enlaces className="page-action" href="/">Volver a la tienda</Enlaces>
      </div>
    </section>
  );
}

export default CartPage;
