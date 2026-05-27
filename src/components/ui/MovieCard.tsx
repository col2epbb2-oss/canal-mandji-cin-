import React from 'react';
import { motion } from 'framer-motion';
import { Play, Heart, Star, Clock } from 'lucide-react';
import { Movie } from '../../data/mockData';
import { GlassCard } from './GlassCard';
import { NeonButton } from './NeonButton';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
interface MovieCardProps {
  movie: Movie;
  index?: number;
}
export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        margin: '-50px'
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1
      }}
      className="group relative h-[450px] w-full rounded-2xl overflow-hidden">
      
      {/* Poster Image */}
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        {movie.rating > 0 &&
        <div className="glass-panel px-2 py-1 rounded-md flex items-center gap-1 text-sm font-medium text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span>{movie.rating}</span>
          </div>
        }
        <button className="glass-panel p-2 rounded-full text-white/70 hover:text-cinema-red hover:bg-white/10 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-heading text-3xl text-white mb-2 line-clamp-1">
          {movie.title}
        </h3>

        <div className="flex items-center gap-3 text-sm text-white/70 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {movie.duration}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="line-clamp-1">{movie.genre.map(g => t.genres[g as keyof typeof t.genres] || g).join(', ')}</span>
        </div>

        {/* Hover Actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <Link to={`/booking/${movie.id}`} className="flex-1">
            <NeonButton variant="primary" size="sm" fullWidth>
              {t.sections.bookNow}
            </NeonButton>
          </Link>
          <Link to={`/movie/${movie.id}`}>
            <NeonButton variant="glass" size="sm" className="px-3">
              <Play className="w-4 h-4" />
            </NeonButton>
          </Link>
        </div>
      </div>

      {/* Neon Border Effect on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cinema-red/50 rounded-2xl transition-colors duration-300 pointer-events-none group-hover:shadow-neon-red" />
    </motion.div>);

}