import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/pages/Pages.css';
import MainLayout from './components/templates/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import GamingPage from './pages/GamingPage.jsx';
import SoftwarePage from './pages/SoftwarePage.jsx';
import CartPage from './pages/CartPage.jsx';
import PaymentSuccessPage from './pages/PaymentSuccessPage.jsx';
import PaymentFailurePage from './pages/PaymentFailurePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import InfoPage from './pages/InfoPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SubscriptionPage from './pages/SubscriptionPage.jsx';
import RandomKeysPage from './pages/RandomKeysPage.jsx';
import OffersPage from './pages/OffersPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
function readCurrentUser(){
  try{
    const savedUser =
      localStorage.getItem('f4a_session') ||
      localStorage.getItem('usuario_sesion');
    return savedUser ? JSON.parse(savedUser) : null;
  }catch{
    return null;
  }
}

function App() {
  const [currentUser] = useState(readCurrentUser);
  const isRegistered = Boolean(currentUser);
  const isAdmin = currentUser?.rol === 'admin';

  return (
    <Routes>
      {/* Pasamos isRegistered a MainLayout para que el Header muestre u oculte el botón de carrito */}
      <Route element={<MainLayout isRegistered={isRegistered} currentUser={currentUser} />}>
        <Route index element={<HomePage />} />

        {/* Pasamos isLoggedIn a las páginas de productos para habilitar/bloquear el botón de compra */}
        <Route path="gaming" element={<GamingPage isLoggedIn={isRegistered} />} />
        <Route path="producto/:id" element={<ProductDetailPage isLoggedIn={isRegistered} />} />
        <Route path="software" element={<SoftwarePage isLoggedIn={isRegistered} />} />
        <Route path="carrito" element={<CartPage isLoggedIn={isRegistered} />} />
        <Route path="pago-exitoso" element={<PaymentSuccessPage />} />
        <Route path="pago-error" element={<PaymentFailurePage />} />
        <Route path="registro" element={<RegisterPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="categorias" element={<CategoriesPage />} />
        <Route path="subscripciones" element={<SubscriptionPage isLoggedIn={isRegistered} />} />
        <Route path="regalos" element={<InfoPage title="Regalos digitales" description="Pronto podrás explorar opciones de regalo en F4A." />} />
        <Route path="randomkey" element={<RandomKeysPage isLoggedIn={isRegistered} />} />
        <Route path="faqs" element={<InfoPage title="Preguntas frecuentes" description="Consulta las preguntas frecuentes en el inicio de F4A." />} />
        <Route path="terminos" element={<InfoPage title="Términos y condiciones" description="El contenido legal de F4A estará disponible aquí próximamente." />} />
        <Route path="privacidad" element={<InfoPage title="Privacidad" description="La política de privacidad de F4A estará disponible próximamente." />} />
        <Route path="politica-cookies" element={<InfoPage title="Política de cookies" description="La información sobre cookies estará disponible próximamente." />} />
        <Route path="politica-devoluciones" element={<InfoPage title="Política de devoluciones" description="Las condiciones de devolución estarán disponibles próximamente." />} />
        <Route path="ofertas" element={<OffersPage title="Ofertas" description="Pronto encontrarás aquí las ofertas y promociones de F4A." isLoggedIn={isRegistered} />} />
        <Route path="nosotros" element={<AboutPage title="Sobre F4A" description="Estamos preparando más información sobre nuestro proyecto." />} />
        <Route path="blog" element={<BlogPage title="Blog" description="Muy pronto compartiremos novedades y contenido sobre productos digitales." />} />
        <Route path="blog/:id" element={<BlogDetailPage title="Blog" description="Muy pronto compartiremos novedades y contenido sobre productos digitales." />} />
        <Route path="inicio" element={<Navigate to="/" replace />} />
        <Route
          path="admin"
          element={isAdmin ? <AdminPage currentUser={currentUser} /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
