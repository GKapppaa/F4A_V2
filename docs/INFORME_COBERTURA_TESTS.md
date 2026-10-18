# Informe de pruebas unitarias y cobertura — F4A

## Configuración

- **Runner y framework:** Karma + Jasmine.
- **Navegador:** Chromium Headless.
- **Renderizado e interacción React:** React Testing Library.
- **Transpilación:** Webpack + Babel.
- **Cobertura:** Babel Istanbul y `karma-coverage`.
- **Ejecución:** `npm test`.
- **Reporte HTML:** `coverage/Chrome Headless 154.0.0.0 (Linux 0.0.0)/index.html`.

## Alcance actual

La suite contiene **19 pruebas**:

| Área | Casos | Qué se verifica |
| --- | ---: | --- |
| Átomo `Button` | 3 | Renderizado/click, tipo predeterminado y combinación de clases. |
| Molécula `SearchBar` | 3 | Propagación de la consulta, prevención del envío nativo y callback opcional. |
| Organismo `ProductCard` | 3 | Datos y categoría visibles, callback de carrito y restricción para visitantes. |
| Template `MainLayout` | 3 | Composición Header/Outlet/Footer, carrito oculto y carrito visible por sesión. |
| `AdminPage` | 3 | Lectura de productos/ventas/tickets, creación de producto y resolución de ticket. |
| `ContactPage` | 1 | Envío válido crea un ticket mediante el servicio. |
| Servicios de datos | 3 | CRUD y nombre de categoría, creación de venta/descuento de stock y persistencia/estado de ticket. |
| **Total** | **19** | |

## Mocks y aislamiento

- Jasmine spies verifican callbacks de interacción (`onClick`, búsqueda y agregar al carrito).
- Las pruebas de Admin sustituyen métodos del servicio con spies (`getAllWithCategory`, `getAll`, `ticketService.getAll`) para controlar los datos mostrados y comprobar las acciones solicitadas.
- La prueba del formulario de contacto espía `ticketService.create` para comprobar el objeto enviado sin depender de un servidor.
- Las pruebas directas de `dbService` usan `localStorage` como persistencia de integración y limpian la base simulada antes de cada caso.

## Última ejecución registrada

Comandos ejecutados correctamente:

```text
npm run lint
npm test
npm run build
npm audit
pnpm audit
```

Resultado de Karma: **19 de 19 pruebas aprobadas**.

| Métrica | Cobertura |
| --- | ---: |
| Sentencias | 68,75 % (198/288) |
| Ramas | 42,44 % (73/172) |
| Funciones | 69,52 % (73/105) |
| Líneas | 69,53 % (178/256) |

Las auditorías npm y pnpm reportaron **0 vulnerabilidades conocidas** en esta ejecución.

## Interpretación y trabajo pendiente

La suite ya comprueba las interacciones principales de los componentes y algunos flujos administrativos. La cobertura de ramas es menor que la de sentencias: faltan escenarios como credenciales válidas/invalidas, autorización de ruta para roles, edición y eliminación de productos, checkout exitoso/fallido y errores de almacenamiento. El reporte mide el código alcanzado por estas pruebas; no significa que todo el comportamiento de la tienda esté validado.

Los datos y servicios son una simulación en `localStorage`, no una API ni una pasarela de pago real.
