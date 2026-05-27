import React, { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Film, Ticket, Search, User, Menu, X, Globe } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTranslation } from '../../i18n/LanguageContext';
export function FloatingNav() {
  const { lang, setLang, t } = useTranslation();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 50);
  });
  const navLinks = [
  {
    name: t.nav.home,
    path: '/'
  },
  {
    name: t.nav.movies,
    path: '/#movies'
  },
  {
    name: t.nav.trailers,
    path: '/#trailers'
  },
  {
    name: t.nav.comingSoon,
    path: '/#coming-soon'
  }];

  return (
    <>
      <motion.nav
        variants={{
          visible: {
            y: 0,
            opacity: 1
          },
          hidden: {
            y: '-100%',
            opacity: 0
          }
        }}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{
          duration: 0.35,
          ease: 'easeInOut'
        }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'py-4' : 'py-6'
        )}>
        
        <div className="container mx-auto px-4 md:px-8">
          <div
            className={cn(
              'flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300',
              isScrolled ? 'glass-panel shadow-lg' : 'bg-transparent'
            )}>
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <Film className="w-8 h-8 text-cinema-red group-hover:animate-pulse" />
              <span className="font-heading text-2xl tracking-wider text-white">
                CANAL <span className="text-cinema-red">MANDJI</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) =>
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-white/70 hover:text-white hover:text-shadow-neon transition-all">
                
                  {link.name}
                </Link>
              )}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Toggle */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5">
                {(['en', 'fr'] as const).map((l) =>
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    'px-3 py-1 text-xs font-semibold uppercase rounded-full transition-all',
                    lang === l ?
                    'bg-cinema-red text-white shadow-neon-red' :
                    'text-white/60 hover:text-white'
                  )}>
                  
                    {l}
                  </button>
                )}
              </div>

              <button
                onClick={() => setIsTrackModalOpen(true)}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors mr-2">
                
                {t.nav.trackTicket}
              </button>
              <button className="text-white/70 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link
                to="/admin"
                className="text-white/70 hover:text-white transition-colors">
                
                <User className="w-5 h-5" />
              </Link>
              <Link
                to="/#movies"
                className="bg-cinema-red/10 text-cinema-red border border-cinema-red/30 hover:bg-cinema-red hover:text-white hover:shadow-neon-red px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
                
                <Ticket className="w-4 h-4" />
                {t.nav.tickets}
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen &&
      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="fixed inset-0 z-40 bg-cinema-black/95 backdrop-blur-xl pt-24 px-6">
        
          <div className="flex flex-col gap-6 text-center">
            {navLinks.map((link) =>
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-heading text-white/80 hover:text-cinema-red">
            
                {link.name}
              </Link>
          )}
            <div className="h-px bg-white/10 my-4" />

            {/* Mobile Language Toggle */}
            <div className="flex justify-center items-center bg-white/5 border border-white/10 rounded-full p-1 w-fit mx-auto">
              {(['en', 'fr'] as const).map((l) =>
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                'px-4 py-1.5 text-sm font-semibold uppercase rounded-full transition-all',
                lang === l ?
                'bg-cinema-red text-white shadow-neon-red' :
                'text-white/60'
              )}>
              
                  {l}
                </button>
            )}
            </div>

            <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-heading text-white/80 hover:text-cinema-red">
            
              {t.nav.adminDashboard}
            </Link>
            <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsTrackModalOpen(true);
            }}
            className="text-xl font-heading text-white/80 hover:text-cinema-red mt-4">
            
              {t.nav.trackTicket}
            </button>
          </div>
        </motion.div>
      }

      {/* Track Ticket Modal */}
      {isTrackModalOpen &&
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="glass-panel p-8 rounded-2xl w-full max-w-md relative">
          
            <button
            onClick={() => setIsTrackModalOpen(false)}
            className="absolute top-4 right-4 text-white/50 hover:text-white">
            
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-heading text-3xl mb-2">{t.track.title}</h3>
            <p className="text-white/50 text-sm mb-6">{t.track.sub}</p>

            <div className="space-y-4">
              <input
              type="text"
              placeholder={t.common.placeholderTrack}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cinema-red transition-colors uppercase" />
            
              <button
              onClick={() => setIsTrackModalOpen(false)}
              className="w-full bg-cinema-red text-white py-3 rounded-lg font-medium hover:bg-red-600 hover:shadow-neon-red transition-all">
              
                {t.track.findTicket}
              </button>
            </div>
          </motion.div>
        </div>
      }
    </>);

}