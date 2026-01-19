import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Tips from './pages/Tips';
import Shop from './pages/Shop';
import { PageRoute } from './types';

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-stone-900 dark:text-stone-200 bg-stone-50 dark:bg-customDark selection:bg-stone-200 dark:selection:bg-stone-700 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path={PageRoute.HOME} element={<Home />} />
          <Route
            path={PageRoute.PHOTOGRAPHY}
            element={<Portfolio title="Fotografía" subtitle="Colección Seleccionada" category="photo" />}
          />
          <Route
            path={PageRoute.COMMERCIAL}
            element={<Portfolio title="Comercial" subtitle="Productos & Interiores" category="commercial" />}
          />
          <Route path={PageRoute.SHOP} element={<Shop />} />
          <Route path={PageRoute.ABOUT} element={<About />} />
          <Route path={PageRoute.CONTACT} element={<Contact />} />
          <Route path={PageRoute.TIPS} element={<Tips />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;