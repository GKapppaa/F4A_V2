// src/data/mockDatabase.js

export const initialDatabase = {
    usuarios: [
        {
            id: 1,
            nombre: "Pedro",
            apellidos: "Hacker",
            correo: "pedro.hacker20@example.com",
            password: "123",
            rol: "cliente", // 'cliente' o 'admin'
            direccion: {
                calle: "Los Crisantemos, Edificio Norte",
                departamento: "Depto 603",
                region: "Región Metropolitana de Santiago",
                comuna: "Cerrillos",
                indicaciones: "El martes no estaremos en el depto"
            }
        },
        {
            id: 2,
            nombre: "Admin",
            apellidos: "F4A",
            correo: "admin@f4a.cl",
            password: "admin",
            rol: "admin",
            direccion: {}
        }
    ],
    categorias: [
        { id: 1, nombre: "Juegos", descripcion: "Llaves digitales de videojuegos" },
        { id: 2, nombre: "Software", descripcion: "Licencias de software y utilidades" },
        { id: 3, nombre: "Subscripciones", descripcion: "Tarjetas de membresía y tiempo de juego" },
        { id: 4, nombre: "Llaves Aleatorias", descripcion: "Random Steam Keys" }
    ],
    productos: [
        {
            id: 101,
            nombre: "Minecraft",
            categoriaId: 1,
            precio: 13450,
            stock: 13,
            esOferta: true,
            imagen: "https://via.placeholder.com/400x300",
            descripcion: "Sandbox de construcción y aventura."
        },
        {
            id: 102,
            nombre: "Red Dead Redemption 2",
            categoriaId: 1,
            precio: 18990,
            stock: 17,
            esOferta: false,
            imagen: "https://via.placeholder.com/400x300",
            descripcion: "Aventura de acción en el lejano oeste."
        },
        {
            id: 201,
            nombre: "Windows 11 Pro",
            categoriaId: 2,
            precio: 50000,
            stock: 20, // Stock crítico para pruebas de admin
            esOferta: false,
            imagen: "https://via.placeholder.com/400x300",
            descripcion: "Windows 11 Pro."
        },
        {
            id: 202,
            nombre: "Microsoft Office 2021 Pro",
            categoriaId: 2,
            precio: 75000,
            stock: 15, // Stock crítico para pruebas de admin
            esOferta: false,
            imagen: "https://via.placeholder.com/400x300",
            descripcion: "Microsoft Office 2021 Pro."
        },
        {
            id: 301,
            nombre: "Ubisoft+",
            categoriaId: 3,
            precio: 6500,
            stock: 15, // Stock crítico para pruebas de admin
            esOferta: true,
            imagen: "https://via.placeholder.com/400x300",
            descripcion: "Ubisoft+."
        },
        {
            id: 302,
            nombre: "Xbox Game Pass",
            categoriaId: 3,
            precio: 6500,
            stock: 15, // Stock crítico para pruebas de admin
            esOferta: true,
            imagen: "https://via.placeholder.com/400x300",
            descripcion: "Xbox Game Pass."
        },
        {
            id: 401,
            nombre: "Random Steam Key",
            categoriaId: 4,
            precio: 990,
            stock: 5, // Stock crítico para pruebas de admin
            esOferta: true,
            imagen: "https://via.placeholder.com/400x300",
            descripcion: "Consigue una llave de juego aleatoria."
        },
        {
            id: 402,
            nombre: "Random XBOX Key",
            categoriaId: 4,
            precio: 1990,
            stock: 10, // Stock crítico para pruebas de admin
            esOferta: true,
            imagen: "https://via.placeholder.com/400x300",
            descripcion: "Consigue una llave de juego aleatoria para XBOX."
        },
        {
            id: 403,
            nombre: "Random Nintendo Switch Key",
            categoriaId: 4,
            precio: 2990,
            stock: 15, // Stock crítico para pruebas de admin
            esOferta: false,
            imagen: "https://via.placeholder.com/400x300",
            descripcion: "Consigue una llave de juego aleatoria para Nintendo Switch."
        },
        {
            id: 404,
            nombre: "Random PlayStation Key",
            categoriaId: 4,
            precio: 1490,
            stock: 15, // Stock crítico para pruebas de admin
            esOferta: false,
            imagen: "https://via.placeholder.com/400x300",
            descripcion: "Consigue una llave de juego aleatoria para PlayStation."
        }
    ],
    ventas: [
        {
            id: "ORDER12345",
            nroBoleta: 20240705,
            usuarioId: 1,
            fecha: "2026-10-16",
            cliente: {
                nombre: "Pedro Hacker",
                correo: "pedro.hacker20@example.com",
                calle: "Los Crisantemos, Edificio Norte",
                comuna: "Cerrillos",
                region: "Región Metropolitana de Santiago"
            },
            items: [
                { productoId: 101, nombre: "Minecraft", precio: 2695, cantidad: 4, subtotal: 10780 },
                { productoId: 102, nombre: "Red Dead Redemption 2", precio: 5999, cantidad: 1, subtotal: 5999 }
            ],
            total: 16779,
            estado: "Completado" // 'Completado', 'Fallido', 'Pendiente'
        }
    ],
    // NUEVA SECCIÓN DE BLOGS
    blogs: [
        {
            id: "1",
            titulo: "Guía Completa: Cómo activar tus llaves digitales en Steam",
            fecha: "15 de Octubre, 2026",
            autor: "Soporte F4A",
            categoria: "Tutoriales",
            imagen: "https://via.placeholder.com/600x350/0d1b2a/10b981?text=Steam+Key+Guide",
            resumen: "Aprende paso a paso cómo canjear tus Random Steam Keys e instalar tus videojuegos de forma rápida y segura.",
            contenido: `
Canjear una llave digital en Steam es un proceso sencillo que toma menos de un minuto. Sigue estos pasos para activar tu código recién adquirido en F4A:

1. Abre la aplicación de escritorio de Steam e inicia sesión en tu cuenta.
2. En el menú superior, haz clic en **Productos** y selecciona **Activar un producto en Steam...**
3. Sigue las instrucciones en pantalla, acepta el acuerdo de suscriptor e ingresa el código alfa-numérico enviado a tu correo.
4. ¡Listo! El juego se añadirá inmediatamente a tu biblioteca para comenzar la descarga.
            `
        },
        {
            id: "2",
            titulo: "Top 5 Software de Productividad recomendados para este 2026",
            fecha: "10 de Octubre, 2026",
            autor: "Equipo F4A",
            categoria: "Software",
            imagen: "https://via.placeholder.com/600x350/0d1b2a/10b981?text=Software+2026",
            resumen: "Descubre cuáles son las licencias digitales indispensables para optimizar tu trabajo y rendimiento este año.",
            contenido: `
Contar con licencias oficiales para tus herramientas de trabajo te garantiza estabilidad y actualizaciones de seguridad constantes. Aquí te presentamos nuestro top 5 en la tienda:

* **Sistemas Operativos:** Claves de activación para entornos de alto rendimiento.
* **Suites de Ofimática:** Herramientas esenciales para redacción de documentos y hojas de cálculo.
* **Utilidades y Antivirus:** Protección integral para tus dispositivos personales y corporativos.
            `
        },
        {
            id: "3",
            titulo: "¿Cómo funcionan las Random Keys y cómo aprovechar las Ofertas?",
            fecha: "02 de Octubre, 2026",
            autor: "Comunidad F4A",
            categoria: "Novedades",
            imagen: "https://via.placeholder.com/600x350/0d1b2a/10b981?text=Random+Keys+F4A",
            resumen: "Te explicamos la dinámica detrás de nuestros paquetes sorpresa y cómo asegurar títulos de calidad al mejor precio.",
            contenido: `
Las Llaves Aleatorias (Random Keys) son una excelente forma de expandir tu biblioteca de videojuegos a un precio reducido. Nuestro sistema selecciona de forma totalmente aleatoria una clave dentro del stock disponible de la categoría.

Adicionalmente, te recomendamos revisar semanalmente nuestra pestaña de **Ofertas y Promociones** para encontrar descuentos directos en licencias destacadas.
            `
        }
    ]
};