import Header from '../organisms/Header'
import Footer from '../organisms/Footer'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
      <Header />
      <main className="route-main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
