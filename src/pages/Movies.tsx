import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { movies } from '../data/mockData';
import { MovieCard } from '../components/ui/MovieCard';
import { useScreenInit } from '../useScreenInit';
import { useTranslation } from '../i18n/LanguageContext';
import { cn } from '../utils/cn';
type StatusFilter = 'all' | 'now_showing' | 'coming_soon';
export function Movies() {
  useScreenInit();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [genre, setGenre] = useState<string>('all');
  const allGenres = useMemo(() => {
    const set = new Set<string>();
    movies.forEach((m) => m.genre.forEach((g) => set.add(g)));
    return ['all', ...Array.from(set)];
  }, []);
  const filtered = useMemo(() => {
    return movies.filter((m) => {
      if (status !== 'all' && m.status !== status) return false;
      if (genre !== 'all' && !m.genre.includes(genre)) return false;
      if (query && !m.title.toLowerCase().includes(query.toLowerCase()))
      return false;
      return true;
    });
  }, [query, status, genre]);
  const statusOptions: {
    id: StatusFilter;
    label: string;
  }[] = [
  {
    id: 'all',
    label: t.sections.viewAll
  },
  {
    id: 'now_showing',
    label: t.sections.nowShowing
  },
  {
    id: 'coming_soon',
    label: t.sections.comingSoon
  }];

  return (
    <div className="min-h-screen bg-cinema-black text-white pt-32 pb-24">
      {/* Ambient red glow */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cinema-red/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="mb-12">
          
          <span className="inline-block py-1 px-3 rounded-full border border-cinema-red/30 bg-cinema-red/10 text-cinema-red text-xs font-medium tracking-widest uppercase mb-4">
            {t.nav.movies}
          </span>
          <h1 className="font-heading text-5xl md:text-7xl mb-4">
            {t.nav.movies}
          </h1>
          <p className="text-white/50 text-lg max-w-2xl">
            {t.sections.nowShowingSub}
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.1
          }}
          className="glass-panel rounded-2xl p-4 md:p-6 mb-12 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.nav.movies + '...'}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cinema-red transition-colors" />
            
          </div>

          {/* Status pills */}
          <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1">
            {statusOptions.map((opt) =>
            <button
              key={opt.id}
              onClick={() => setStatus(opt.id)}
              className={cn(
                'px-3 py-1.5 md:px-4 md:py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap',
                status === opt.id ?
                'bg-cinema-red text-white shadow-neon-red' :
                'text-white/60 hover:text-white'
              )}>
              
                {opt.label}
              </button>
            )}
          </div>

          {/* Genre select */}
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cinema-red transition-colors capitalize">
              
              {allGenres.map((g) =>
              <option key={g} value={g} className="bg-cinema-black">
                  {t.genres[g as keyof typeof t.genres] || g}
                </option>
              )}
            </select>
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-white/50">
            <span className="text-white font-medium">{filtered.length}</span> /{' '}
            {movies.length}
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((movie, i) =>
          <MovieCard key={movie.id} movie={movie} index={i} />
          )}
          </div> :

        <div className="text-center py-24 text-white/40">
            <p className="text-lg">{t.common.noMovies}</p>
          </div>
        }
      </div>
    </div>);

}