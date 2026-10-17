import { Outlet } from 'react-router-dom';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

function MainLayout({ isRegistered }) {
  return (
    <>
      <Header isRegistered={isRegistered} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;