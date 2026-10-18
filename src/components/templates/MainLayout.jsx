import { Outlet } from 'react-router-dom';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

function MainLayout({ isRegistered, currentUser }) {
  return (
    <>
      <Header isRegistered={isRegistered} currentUser={currentUser} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
