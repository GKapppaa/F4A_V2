import Text from '../components/atoms/Text';
import { productoService } from '../data/dbService';
import ProductCard from '../components/organisms/ProductCard';

function SoftwarePage({ isLoggedIn }) {
  const softwareList = productoService.getAllWithCategory().filter(
    (producto) => producto.categoriaId === 2
  );

  const handleAgregarAlCarrito = (producto) => {
    // 1. Obtener el carrito actual desde localStorage (o un arreglo vacío si no existe)
    const cart = JSON.parse(localStorage.getItem('f4a_cart') || '[]');

    // 2. Comprobar si el producto ya fue agregado anteriormente
    const index = cart.findIndex((item) => item.id === producto.id);

    if (index >= 0) {
      // Si ya existe en el carrito, aumentamos su cantidad en 1
      cart[index].cantidad += 1;
    } else {
      // Si no existe, lo agregamos con una cantidad inicial de 1
      cart.push({ ...producto, cantidad: 1 });
    }

    // 3. Guardar la lista actualizada de vuelta en localStorage
    localStorage.setItem('f4a_cart', JSON.stringify(cart));

    alert(`¡Producto "${producto.nombre}" añadido al carrito con éxito!`);
  };

  return (
    <section className="route-page container my-4">
      <div className="mb-4">
        <Text variant="p" className="page-eyebrow">
          CATÁLOGO F4A
        </Text>
        <Text variant="h1" className="page-title display-5 fw-bold">
          Software y Licencias
        </Text>
        <Text className="page-description text-secondary">
          Explora nuestra selección de utilidades y software digital disponible.
        </Text>
      </div>

      {softwareList.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No hay software disponible en este momento.
        </div>
      ) : (
        <div className="row g-4">
          {softwareList.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard
                producto={item}
                isLoggedIn={isLoggedIn}
                onAddToCart={handleAgregarAlCarrito}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SoftwarePage;
