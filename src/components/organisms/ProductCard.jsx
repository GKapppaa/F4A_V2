import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Boton from '../atoms/Boton'

function ProductCards({producto, onAddToCart}){
    const {nombre, imagen, categoria, precio } = producto;
    const formatoPrecio  = new Intl.NumberFormat("es-CL",{
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
    }).format(precio);
    return(
        <article className="tarjeta-producto">
            <Image
                src={imagen}
                alt={nombre}
                className="imagen-producto"
            />
            <Text variant="h3" className="titulo-producto">
                {nombre}
            </Text>

            <Text className="categoria-producto">
                {categoria}
            </Text>

            <Text className="precio-producto">
                {formatoPrecio}
            </Text>

            <Boton
                className="boton-carrito"
                onClick={() => onAddToCart(producto)}
            >
                Agregar al carrito
            </Boton>
        </article>
        
    );
}

export default ProductCards;