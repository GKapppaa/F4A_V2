import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/pages/Pages.css';
import MainLayout from './components/templates/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import GamingPage from './pages/GamingPage.jsx';
import SoftwarePage from './pages/SoftwarePage.jsx';
import CartPage from './pages/CartPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import InfoPage from './pages/InfoPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="gaming" element={<GamingPage />} />
        <Route path="software" element={<SoftwarePage />} />
        <Route path="carrito" element={<CartPage />} />
        <Route path="registro" element={<RegisterPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="categorias" element={<CategoriesPage />} />
        <Route path="subscripciones" element={<InfoPage title="Suscripciones" description="Estamos preparando esta categoría de productos digitales." />} />
        <Route path="regalos" element={<InfoPage title="Regalos digitales" description="Pronto podrás explorar opciones de regalo en F4A." />} />
        <Route path="randomkey" element={<InfoPage title="Claves aleatorias" description="Esta categoría se encuentra en preparación." />} />
        <Route path="faqs" element={<InfoPage title="Preguntas frecuentes" description="Consulta las preguntas frecuentes en el inicio de F4A." />} />
        <Route path="terminos" element={<InfoPage title="Términos y condiciones" description="El contenido legal de F4A estará disponible aquí próximamente." />} />
        <Route path="privacidad" element={<InfoPage title="Privacidad" description="La política de privacidad de F4A estará disponible próximamente." />} />
        <Route path="politica-cookies" element={<InfoPage title="Política de cookies" description="La información sobre cookies estará disponible próximamente." />} />
        <Route path="politica-devoluciones" element={<InfoPage title="Política de devoluciones" description="Las condiciones de devolución estarán disponibles próximamente." />} />
        <Route
          path="ofertas"
          element={
            <InfoPage
              title="Ofertas"
              description="Pronto encontrarás aquí las ofertas y promociones de F4A."
            />
          }
        />
        <Route
          path="nosotros"
          element={
            <InfoPage
              title="Sobre F4A"
              description="Estamos preparando más información sobre nuestro proyecto."
            />
          }
        />
        <Route
          path="blog"
          element={
            <InfoPage
              title="Blog"
              description="Muy pronto compartiremos novedades y contenido sobre productos digitales."
            />
          }
        />
        <Route path="inicio" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
