import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { MovieDetails } from './pages/MovieDetails';
import { Booking } from './pages/Booking';
import { AdminDashboard } from './pages/AdminDashboard';
import { FloatingNav } from './components/layout/FloatingNav';
import { LanguageProvider } from './i18n/LanguageContext';
// A wrapper to conditionally show the nav
function Layout({ children }: {children: React.ReactNode;}) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <>
      {!isAdmin && <FloatingNav />}
      {children}
    </>);

}
export function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>);

}