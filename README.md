# F4A — Tienda de productos digitales

Proyecto académico de tienda online para videojuegos, software, suscripciones y llaves digitales. La versión actual migra la interfaz a React y organiza la UI con componentes reutilizables inspirados en Atomic Design.

> **Estado académico:** el catálogo, las cuentas y las compras usan datos simulados en `localStorage`. No hay backend ni pasarela de pago real. No uses datos personales o contraseñas reales en esta aplicación.

## Tecnologías

- React 19 y JavaScript
- Vite
- React Router para navegación
- Bootstrap 5 y CSS propio para estilos responsive
- Vitest, React Testing Library y jsdom para pruebas

## Requisitos

- Node.js 20 o superior
- npm

## Instalación y ejecución

Clona el repositorio e instala sus dependencias:

```bash
git clone https://github.com/GKapppaa/F4A_V2.git
cd F4A_V2
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará la dirección local —normalmente `http://localhost:5173`— en la terminal.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia Vite en modo desarrollo. |
| `npm run build` | Genera la compilación de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación generada. |
| `npm test` | Ejecuta las pruebas unitarias con Vitest. |
| `npm run test:watch` | Ejecuta Vitest en modo observación. |
| `npm run lint` | Revisa el código con ESLint. |

## Funcionalidades actuales

- Navegación SPA con páginas para inicio, categorías, videojuegos, software, suscripciones, llaves aleatorias, ofertas, blog, registro, contacto y carrito.
- Catálogos alimentados por una base de datos de prueba local, con categorías, precios, stock, imágenes y ofertas.
- Vista de detalle de producto.
- Registro e inicio de sesión simulados.
- Carrito persistido en `localStorage`, cambio de cantidades y simulación de pago exitoso o fallido.
- Validaciones de formulario en registro y contacto.
- FAQ en la página de inicio y páginas de resultado de pago.
- Diseño adaptable basado en el grid y utilidades de Bootstrap, complementado con CSS del proyecto.

Las compras y los mensajes de contacto son demostraciones locales: no procesan pagos ni envían información a un servidor.

## Estructura del proyecto

```text
src/
├── components/
│   ├── atoms/          # Primitivas: Button, Input, Text, Image, Link y Logo
│   ├── molecules/      # Composiciones pequeñas: SearchBar y AuthDropdown
│   ├── organisms/      # Secciones: Header, Footer, FAQ y ProductCard
│   └── templates/      # MainLayout compartido por las rutas
├── pages/              # Vistas asociadas a rutas
├── services/           # Acceso a la base de datos simulada
├── data/               # Datos iniciales para la demostración
├── styles/             # CSS por nivel de componente y páginas
└── test/               # Pruebas unitarias
```

`src/main.jsx` inicializa la base de datos local y monta la aplicación dentro de `BrowserRouter`. `src/App.jsx` declara las rutas y `MainLayout` comparte Header, contenido de ruta y Footer.

## Datos y persistencia de demostración

`src/data/mockDatabase.js` contiene usuarios, categorías, productos, ventas y entradas de blog de ejemplo. `src/services/dbService.js` proporciona funciones de acceso y operaciones CRUD apoyadas en `localStorage`.

Las claves de almacenamiento usadas por la aplicación incluyen `f4a_database`, `f4a_session` y `f4a_cart`. Borrar los datos del sitio en el navegador reinicia esta persistencia local.

## Pruebas

Las pruebas actuales se ejecutan con **Vitest** y React Testing Library; cubren renderizado y comportamiento básico de átomos como botones, inputs, enlaces, imágenes, texto y logo.

```bash
npm test
```

La pauta académica solicita Jasmine/Karma y 10 pruebas. La configuración actual no debe confundirse con ese requisito: el script `npm test` usa Vitest. Antes de entregar, confirma con el equipo docente el runner aceptado y completa las pruebas requeridas, mocks y reporte de cobertura.

## Responsividad

Bootstrap aporta el sistema de columnas y utilidades responsive; los estilos específicos están en `src/styles/` y `src/styles/pages/`. Para verificar cambios visuales, prueba al menos un ancho móvil, uno de tablet y uno de escritorio.

## Entregables académicos pendientes

- Actualizar el ERS con los requisitos y alcance implementados.
- Alinear el runner y el número de pruebas con la rúbrica.
- Generar y explicar un reporte de cobertura.
- Preparar el archivo comprimido solicitado para la entrega.
