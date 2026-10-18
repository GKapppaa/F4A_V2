import Enlaces from '../atoms/Enlaces';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Boton from '../atoms/Boton';
import '../../styles/organisms/ProductCard.css';

function ProductCard({ producto, onAddToCart, isLoggedIn }) {
  const { id, nombre, imagen, categoria, precio, descripcion, esOferta, stock } = producto;
  const formatoPrecio = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(precio);

  return (
    <article className="card catalog-product-card h-100 shadow-sm border-0">
      <Image
        src={imagen}
        alt={nombre}
        className="card-img-top catalog-product-image"
      />

      <div className="card-body d-flex flex-column">
        <Text className="categoria-producto">{categoria}</Text>

        <Enlaces className="product-card-title-link" href={`/producto/${id}`}>
          <Text variant="h3" className="titulo-producto">
            {nombre}
          </Text>
        </Enlaces>

        {descripcion && (
          <Text className="product-card-description">{descripcion}</Text>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Text className="precio-producto">{formatoPrecio}</Text>
          {esOferta && <span className="badge bg-danger">Oferta</span>}
        </div>

        <Text className={`product-card-stock ${stock <= 5 ? 'text-danger fw-bold' : 'text-primary fw-bold'}`}>
          Stock disponible: {stock}
        </Text>

        {isLoggedIn ? (
          stock > 0 ? (
            <Boton
              className="boton-carrito btn btn-primary w-100 mt-auto"
              onClick={() => onAddToCart(producto)}
            >
              Agregar al carrito
            </Boton>
          ) : (
            <Text className="alert alert-secondary text-center small mb-0 mt-auto">
              Agotado
            </Text>
          )
        ) : (
          <Text className="alert alert-warning text-center small mb-0 mt-auto">
            Inicia sesión para comprar
          </Text>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
