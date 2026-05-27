import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, Star, Quote, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { movies, comments } from '../data/mockData';
import { NeonButton } from '../components/ui/NeonButton';
import { MovieCard } from '../components/ui/MovieCard';
import { GlassCard } from '../components/ui/GlassCard';
import { cn } from '../utils/cn';
import { useScreenInit } from '../useScreenInit';
import { useTranslation } from '../i18n/LanguageContext';
// Hero slideshow slides — 1 looping cinema mp4 + 2 movie poster images + 2 YouTube background videos.
// Cycles forever (loops back to the first slide after the last).
type HeroSlide =
{
  type: 'video';
  src: string;
  poster?: string;
} |
{
  type: 'image';
  src: string;
} |
{
  type: 'youtube';
  videoId: string;
  start?: number;
};
const HERO_SLIDES: HeroSlide[] = [
{
  type: 'video',
  src: 'https://cdn.coverr.co/videos/coverr-a-cinema-screen-7106/1080p.mp4',
  poster:
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format&fit=crop'
},
{
  type: 'youtube',
  videoId: 'oBqqI6NMeaM'
},
{
  type: 'youtube',
  videoId: 'hlN-epiRI-k',
  start: 89
},
{
  type: 'youtube',
  videoId: 'v4qAW7xuKNQ',
  start: 101
},
{
  type: 'youtube',
  videoId: 'v4qAW7xuKNQ',
  start: 170
},
{
  type: 'youtube',
  videoId: 'v4qAW7xuKNQ',
  start: 372
}];

const SLIDE_DURATION = 8000;
export function Home() {
  useScreenInit();
  const { t, lang } = useTranslation();
  const nowShowing = movies.filter((m) => m.status === 'now_showing');
  const comingSoon = movies.filter((m) => m.status === 'coming_soon');
  const [activeDay, setActiveDay] = useState(0);
  const daysKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  
  // Make schedule dynamic based on active day
  const dailyMovies = useMemo(() => {
    const shuffled = [...nowShowing].sort((a, b) => {
       const valA = parseInt(a.id.replace(/\D/g, '') || '0');
       const valB = parseInt(b.id.replace(/\D/g, '') || '0');
       return activeDay % 2 === 0 ? valA - valB : valB - valA;
    });
    const start = activeDay % Math.max(1, shuffled.length - 3);
    return shuffled.slice(start, start + 4);
  }, [nowShowing, activeDay]);

  const dailyTimes = useMemo(() => {
    const timesMatrix = [
      ['14:30', '17:00', '20:15'],
      ['11:00', '15:15', '19:30', '22:00'],
      ['13:00', '16:45', '21:00'],
      ['10:30', '14:00', '18:15', '20:45'],
      ['15:00', '17:30', '20:00', '22:30'],
      ['11:00', '14:00', '17:00', '20:00', '23:00'],
      ['10:00', '13:30', '16:45', '19:15']
    ];
    return timesMatrix[activeDay % 7];
  }, [activeDay]);

  // Slideshow state — cycles through HERO_SLIDES every SLIDE_DURATION ms and loops back to 0
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);
  // Audio mute state — applies to the mp4 <video> AND every YouTube iframe.
  // YouTube embeds require mute=1 in the URL to autoplay, so we always START muted
  // and unmute on-demand via the YouTube IFrame API (postMessage).
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  // Apply mute state to whichever media element is currently showing.
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
      if (!muted) {
        // Browsers may have started it muted; ensure it plays after unmute.
        videoRef.current.play().catch(() => {});
      }
    }
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const cmd = muted ? 'mute' : 'unMute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: cmd,
          args: ''
        }),
        '*'
      );
    }
  }, [muted, slideIndex]);
  // Smooth scroll for hash links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element)
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const currentSlide = HERO_SLIDES[slideIndex];
  const dateLocale = lang === 'fr' ? 'fr-FR' : 'en-US';
  return (
    <div className="min-h-screen bg-cinema-black text-white selection:bg-cinema-red selection:text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Slideshow Background — crossfade between slides */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={slideIndex}
              initial={{
                opacity: 0,
                scale: 1.08
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 1
              }}
              transition={{
                duration: 1.2,
                ease: 'easeInOut'
              }}
              className="absolute inset-0">
              
              {currentSlide.type === 'video' ?
              <video
                ref={videoRef}
                autoPlay
                muted={muted}
                loop
                playsInline
                className="w-full h-full object-cover opacity-60"
                poster={currentSlide.poster}>
                
                  <source src={currentSlide.src} type="video/mp4" />
                </video> :
              currentSlide.type === 'youtube' ?
              <div className="absolute inset-0 overflow-hidden opacity-60 pointer-events-none">
                  {/* YouTube iframe scaled to fully cover the hero (crops the 16:9 video to fill). */}
                  <iframe
                  ref={iframeRef}
                  title="Hero background video"
                  src={`https://www.youtube.com/embed/${currentSlide.videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&enablejsapi=1&playlist=${currentSlide.videoId}${currentSlide.start ? `&start=${currentSlide.start}` : ''}`}
                  allow="autoplay; encrypted-media"
                  frameBorder={0}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[100vh] min-w-full min-h-full pointer-events-none" />
                
                </div> :

              <img
                src={currentSlide.src}
                alt="Cinema background"
                className="w-full h-full object-cover opacity-60" />

              }
            </motion.div>
          </AnimatePresence>

          {/* Overlays — sit on top of every slide */}
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="absolute inset-0 bg-radial-red mix-blend-screen" />
        </div>

        {/* Mute toggle (top-right of hero) */}
        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute top-28 right-6 md:right-10 z-30 glass-panel p-3 rounded-full hover:bg-white/10 hover:shadow-neon-red transition-all group"
          aria-label={muted ? 'Unmute background' : 'Mute background'}
          title={muted ? 'Activer le son' : 'Couper le son'}>
          
          {muted ?
          <VolumeX className="w-5 h-5 text-white/70 group-hover:text-cinema-red transition-colors" /> :

          <Volume2 className="w-5 h-5 text-cinema-red" />
          }
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) =>
          <button
            key={i}
            onClick={() => setSlideIndex(i)}
            className="group relative h-1 w-8 md:w-12 rounded-full bg-white/20 overflow-hidden"
            aria-label={`Slide ${i + 1}`}>
            
              {i === slideIndex &&
            <motion.div
              className="absolute inset-0 bg-cinema-red shadow-neon-red"
              initial={{
                width: 0
              }}
              animate={{
                width: '100%'
              }}
              transition={{
                duration: SLIDE_DURATION / 1000,
                ease: 'linear'
              }} />

            }
              {i < slideIndex &&
            <div className="absolute inset-0 bg-cinema-red/40" />
            }
            </button>
          )}
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center mt-20">
          {/* Floating Mini Thumbnails */}
          <motion.div
            animate={{
              y: [0, -20, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: 'easeInOut'
            }}
            className="absolute top-0 left-[10%] hidden lg:block w-32 h-48 rounded-2xl overflow-hidden glass-panel shadow-2xl rotate-[-12deg]">
            
            <img
              src={movies[0].posterUrl}
              alt="Movie"
              className="w-full h-full object-cover opacity-80" />
            
          </motion.div>

          <motion.div
            animate={{
              y: [0, 25, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: 'easeInOut',
              delay: 1
            }}
            className="absolute top-20 right-[15%] hidden lg:block w-40 h-56 rounded-2xl overflow-hidden glass-panel shadow-2xl rotate-[8deg]">
            
            <img
              src={movies[1].posterUrl}
              alt="Movie"
              className="w-full h-full object-cover opacity-80" />
            
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: 'easeInOut',
              delay: 2
            }}
            className="absolute bottom-20 left-[20%] hidden lg:block w-36 h-24 rounded-2xl overflow-hidden glass-panel shadow-2xl rotate-[5deg]">
            
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-80">
              
              <source
                src="https://cdn.coverr.co/videos/coverr-a-cinema-screen-7106/1080p.mp4"
                type="video/mp4" />
              
            </video>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
            className="max-w-4xl mx-auto">
            
            <motion.span
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.4
              }}
              className="inline-block py-1 px-3 rounded-full border border-cinema-red/30 bg-cinema-red/10 text-cinema-red text-sm font-medium tracking-widest uppercase mb-6">
              
              {t.hero.badge}
            </motion.span>

            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl tracking-wider mb-6 drop-shadow-2xl">
              {t.hero.title1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-cinema-red">
                {t.hero.title2}
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-white/80 font-light mb-10 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link to={`/booking/${nowShowing[0]?.id || ''}`} className="w-full sm:w-auto">
                <NeonButton size="lg" fullWidth>
                  {t.hero.bookTickets}
                </NeonButton>
              </Link>
              <a href="#trailers" className="w-full sm:w-auto">
                <NeonButton variant="glass" size="lg" fullWidth>
                  <Play className="w-5 h-5 mr-2" />
                  {t.hero.watchTrailers}
                </NeonButton>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 2
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50">
          
          <div className="w-[30px] h-[50px] rounded-full border-2 border-white/20 flex justify-center p-2">
            <div className="w-1 h-3 bg-cinema-red rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* WEEKLY SCHEDULE SECTION */}
      <section id="schedule" className="py-24 relative z-10 bg-cinema-dark border-b border-white/5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-cinema-red rounded-full inline-block" />
                {t.sections.weeklySchedule}
              </h2>
              <p className="text-white/50 mt-2">{t.sections.weeklyScheduleSub}</p>
            </div>
          </div>
          
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 mb-8">
            {daysKeys.map((dayKey, idx) => (
               <button 
                  key={dayKey} 
                  onClick={() => setActiveDay(idx)}
                  className={cn(
                    "px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-xl font-medium transition-all whitespace-nowrap", 
                    activeDay === idx 
                      ? "bg-cinema-red text-white shadow-neon-red" 
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  )}>
                  {t.days[dayKey]}
               </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {dailyMovies.map((movie, idx) => (
                <motion.div
                  key={`${movie.id}-${activeDay}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <GlassCard className="p-3 md:p-4 flex gap-4 md:gap-6 items-center hover:bg-white/5 transition-colors group">
                     <div className="w-20 h-28 md:w-24 md:h-36 shrink-0 rounded-lg overflow-hidden relative">
                       <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <div className="flex-1 py-1 md:py-2">
                        <h3 className="font-heading text-xl md:text-2xl text-white mb-2 md:mb-3 line-clamp-1">{movie.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-2 md:mb-4">
                           {dailyTimes.map(time => (
                              <Link key={time} to={`/booking/${movie.id}?date=${t.days[daysKeys[activeDay]]}&time=${time}`}>
                                 <span className="px-2 py-1 md:px-3 text-xs md:text-sm bg-white/10 border border-white/10 text-white/80 rounded-md hover:border-cinema-red hover:bg-cinema-red/10 hover:text-cinema-red transition-all cursor-pointer shadow-sm">
                                   {time}
                                 </span>
                              </Link>
                           ))}
                        </div>
                        <p className="text-xs text-white/40">
                          {movie.genre.map(g => t.genres[g as keyof typeof t.genres] || g).join(', ')} • {movie.duration}
                        </p>
                     </div>
                  </GlassCard>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* NOW SHOWING SECTION */}
      <section id="movies" className="py-24 relative z-10 bg-cinema-black">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-cinema-red rounded-full inline-block" />
                {t.sections.nowShowing}
              </h2>
              <p className="text-white/50 mt-2">{t.sections.nowShowingSub}</p>
            </div>
            <Link
              to="/movies"
              className="hidden md:flex items-center gap-2 text-cinema-red hover:text-white transition-colors font-medium">
              
              {t.sections.viewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nowShowing.map((movie, index) =>
            <MovieCard key={movie.id} movie={movie} index={index} />
            )}
          </div>
        </div>
      </section>

      {/* TRAILERS SECTION */}
      <section id="trailers" className="py-24 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cinema-red/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl text-white flex items-center gap-3 mb-12">
            <span className="w-2 h-8 bg-cinema-red rounded-full inline-block" />
            {t.sections.latestTrailers}
          </h2>

          <div className="flex overflow-x-auto hide-scrollbar gap-6 pb-8 snap-x snap-mandatory">
            {nowShowing.map((movie, index) =>
            <motion.div
              key={movie.id}
              initial={{
                opacity: 0,
                x: 50
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: index * 0.1
              }}
              className="min-w-[300px] md:min-w-[600px] snap-center relative group rounded-2xl overflow-hidden cursor-pointer">
              
                <div className="aspect-video relative rounded-2xl overflow-hidden group">
                  {movie.trailerUrl ? (() => {
                    const videoId = movie.trailerUrl.split('youtu.be/')[1]?.split('?')[0];
                    return (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&modestbranding=1`}
                        title={`${movie.title} Trailer`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0 absolute inset-0"
                      />
                    );
                  })() : (
                    <img
                      src={movie.bannerUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent pointer-events-none">
                    <h3 className="font-heading text-2xl text-white drop-shadow-lg">
                      {movie.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* COMING SOON SECTION */}
      <section id="coming-soon" className="py-24 relative z-10 bg-cinema-dark">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl md:text-5xl text-white flex items-center gap-3 mb-12">
            <span className="w-2 h-8 bg-cinema-red rounded-full inline-block" />
            {t.sections.comingSoon}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comingSoon.map((movie) =>
            <GlassCard
              key={movie.id}
              hoverEffect
              className="flex flex-col sm:flex-row gap-6 p-6">
              
                <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full sm:w-40 h-60 object-cover rounded-xl shadow-lg" />
              
                <div className="flex flex-col justify-center flex-1">
                  <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-cinema-red mb-3 w-fit">
                    {t.sections.releases}{' '}
                    {new Date(movie.releaseDate).toLocaleDateString(
                    dateLocale,
                    {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }
                  )}
                  </div>
                  <h3 className="font-heading text-3xl text-white mb-2">
                    {movie.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-6 line-clamp-3">
                    {movie.synopsis}
                  </p>
                  <div className="mt-auto">
                    <NeonButton variant="outline" size="sm">
                      {t.sections.notifyMe}
                    </NeonButton>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </section>

      {/* COMMENTS SECTION */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">
              {t.sections.testimonialsTitle}
            </h2>
            <p className="text-white/50">{t.sections.testimonialsSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comments.map((comment, index) =>
            <motion.div
              key={comment.id}
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: index * 0.1
              }}>
              
                <GlassCard className="p-8 h-full flex flex-col">
                  <Quote className="w-10 h-10 text-cinema-red/20 mb-4" />
                  <p className="text-white/80 italic mb-6 flex-1">
                    "{comment.text}"
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-12 h-12 rounded-full border-2 border-white/10" />
                  
                    <div>
                      <h4 className="font-medium text-white">{comment.user}</h4>
                      <div className="flex items-center gap-1 text-cinema-red">
                        {[...Array(5)].map((_, i) =>
                      <Star
                        key={i}
                        className={cn(
                          'w-3 h-3',
                          i < comment.rating ?
                          'fill-current' :
                          'text-white/20'
                        )} />

                      )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <span className="font-heading text-3xl tracking-wider text-white">
                  CANAL <span className="text-cinema-red">MANDJI</span>
                </span>
              </Link>
              <p className="text-white/50 max-w-md mb-6">
                {t.sections.cinemaTagline}
              </p>
            </div>

            <div>
              <h4 className="font-heading text-xl text-white mb-6">
                {t.sections.quickLinks}
              </h4>
              <ul className="space-y-3 text-white/60">
                <li>
                  <a
                    href="#movies"
                    className="hover:text-cinema-red transition-colors">
                    
                    {t.sections.nowShowing}
                  </a>
                </li>
                <li>
                  <a
                    href="#coming-soon"
                    className="hover:text-cinema-red transition-colors">
                    
                    {t.sections.comingSoon}
                  </a>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-cinema-red transition-colors">
                    
                    {t.nav.adminDashboard}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-xl text-white mb-6">
                {t.sections.newsletter}
              </h4>
              <p className="text-white/50 text-sm mb-4">
                {t.sections.newsletterSub}
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t.sections.yourEmail}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white w-full focus:outline-none focus:border-cinema-red transition-colors" />
                
                <NeonButton variant="primary" size="sm">
                  {t.sections.subscribe}
                </NeonButton>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center text-white/40 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>
              &copy; {new Date().getFullYear()} Canal Mandji Cinema.{' '}
              {t.sections.allRightsReserved}
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                {t.sections.terms}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t.sections.privacy}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>);

}