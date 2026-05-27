import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Movie } from '../data/mockData';
import {
  Play,
  Star,
  Clock,
  Calendar,
  ChevronLeft,
  Ticket,
  Heart,
  MessageSquare } from
'lucide-react';
import { movies, sessions, comments } from '../data/mockData';
import { NeonButton } from '../components/ui/NeonButton';
import { GlassCard } from '../components/ui/GlassCard';
import { useScreenInit } from '../useScreenInit';
import { useTranslation } from '../i18n/LanguageContext';
export function MovieDetails() {
  useScreenInit();
  const { t } = useTranslation();
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  // In a real app, fetch movie by ID. Here we use mock data.
  const movie = movies.find((m) => m.id === id) || movies[0];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  if (!movie)
  return (
    <div className="min-h-screen bg-cinema-black flex items-center justify-center text-white">
        {t.common.movieNotFound}
      </div>);

  return (
    <div className="min-h-screen bg-cinema-black text-white pb-24">
      {/* HERO BANNER */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        <div className="absolute inset-0">
          <img
            src={movie.bannerUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-40" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-red mix-blend-screen opacity-50" />
        </div>

        {/* Top Nav */}
        <div className="absolute top-0 left-0 right-0 p-6 md:p-8 z-20 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="glass-panel p-3 rounded-full hover:bg-white/10 transition-colors group">
            
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 container mx-auto px-4 md:px-8 pb-12">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Poster */}
            <motion.img
              initial={{
                opacity: 0,
                y: 50
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              src={movie.posterUrl}
              alt={movie.title}
              className="w-48 md:w-64 rounded-xl shadow-2xl hidden md:block border border-white/10" />
            

            {/* Info */}
            <motion.div
              initial={{
                opacity: 0,
                x: 50
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              className="flex-1">
              
              <div className="flex items-center gap-4 mb-4">
                {movie.rating > 0 &&
                <div className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    {movie.rating}
                  </div>
                }
                <div className="flex items-center gap-1 text-cinema-red bg-cinema-red/10 px-3 py-1 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4 fill-current" />
                  {(movie.likes / 1000).toFixed(1)}K
                </div>
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
                  {t.genres[movie.genre[0] as keyof typeof t.genres] || movie.genre[0]}
                </span>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl mb-4">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm md:text-base mb-8">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {movie.duration}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />{' '}
                  {new Date(movie.releaseDate).getFullYear()}
                </span>
                <span>{movie.genre.map(g => t.genres[g as keyof typeof t.genres] || g).join(', ')}</span>
              </div>

              <div className="flex gap-4">
                <Link to={`/booking/${movie.id}`}>
                  <NeonButton size="lg" className="px-10">
                    <Ticket className="w-5 h-5 mr-2" />
                    {t.hero.bookTickets}
                  </NeonButton>
                </Link>
                <NeonButton variant="glass" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  {t.movie.officialTrailer}
                </NeonButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN: Details & Trailer */}
          <div className="lg:col-span-2 space-y-12">
            {/* Synopsis */}
            <section>
              <h3 className="font-heading text-3xl mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-cinema-red rounded-full inline-block" />
                {t.movie.synopsis}
              </h3>
              <p className="text-white/80 text-lg leading-relaxed font-light">
                {movie.synopsis}
              </p>
            </section>

            {/* Cast & Crew */}
            <section>
              <h3 className="font-heading text-3xl mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-cinema-red rounded-full inline-block" />
                {t.movie.castCrew}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4 rounded-xl">
                  <p className="text-white/50 text-sm mb-1">
                    {t.movie.director}
                  </p>
                  <p className="font-medium">{movie.director}</p>
                </div>
                {movie.cast.map((actor, i) =>
                <div key={i} className="glass-panel p-4 rounded-xl">
                    <p className="text-white/50 text-sm mb-1">
                      {t.movie.actor}
                    </p>
                    <p className="font-medium">{actor}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Trailer Embed */}
            <section>
              <h3 className="font-heading text-3xl mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-cinema-red rounded-full inline-block" />
                {t.movie.officialTrailer}
              </h3>
              <TrailerPlayer movie={movie} />
            </section>

            {/* Reviews & Ratings */}
            <section className="pt-8 border-t border-white/10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-heading text-3xl flex items-center gap-3">
                  <span className="w-1 h-6 bg-cinema-red rounded-full inline-block" />
                  {t.movie.reviewsRatings}
                </h3>
                <NeonButton variant="glass" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t.movie.addReview}
                </NeonButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(movie.reviews || comments.slice(0, 2)).map((review: any) =>
                <GlassCard key={review.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-10 h-10 rounded-full border border-white/10" />
                      
                        <div>
                          <p className="font-medium text-sm">{review.user}</p>
                          <p className="text-xs text-white/50">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 text-cinema-red">
                        {[...Array(5)].map((_, i) =>
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-white/20'}`} />

                      )}
                      </div>
                    </div>
                    <p className="text-white/80 text-sm italic">
                      "{review.text}"
                    </p>
                  </GlassCard>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Sessions & Booking */}
          <div className="space-y-8">
            <GlassCard className="p-6 md:p-8 sticky top-32">
              <h3 className="font-heading text-3xl mb-6">
                {t.movie.todaysSessions}
              </h3>

              <div className="space-y-4">
                {sessions.map((session) =>
                <Link
                  key={session.id}
                  to={`/booking/${movie.id}?session=${session.id}`}>
                  
                    <div className="group p-4 rounded-xl border border-white/10 hover:border-cinema-red/50 hover:bg-cinema-red/5 transition-all cursor-pointer flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-heading text-white group-hover:text-cinema-red transition-colors">
                          {session.time}
                        </p>
                        <p className="text-sm text-white/50">
                          {session.format}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white/80">
                          {session.availableSeats} {t.movie.seatsLeft}
                        </p>
                        <p className="text-xs text-cinema-red opacity-0 group-hover:opacity-100 transition-opacity">
                          {t.movie.selectSeat} →
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-center text-sm text-white/50 mb-4">
                  {t.movie.selectSession}
                </p>
              </div>

              {/* Future Sessions */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="font-heading text-2xl mb-4">
                  {t.movie.futureSessions}
                </h3>
                <div className="space-y-3">
                  {[
                  {
                    date: t.movie.tomorrow,
                    times: ['14:30', '17:00', '20:15']
                  },
                  {
                    date: t.movie.saturday,
                    times: ['11:00', '14:30', '17:00', '22:45']
                  },
                  {
                    date: t.movie.sunday,
                    times: ['14:30', '17:00', '20:15']
                  }].
                  map((day, idx) =>
                  <div key={idx} className="bg-white/5 rounded-lg p-3">
                      <p className="text-sm font-medium text-white/70 mb-2">
                        {day.date}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {day.times.map((time, i) =>
                      <Link
                        key={i}
                        to={`/booking/${movie.id}?date=${day.date}&time=${time}`}>
                        
                            <span className="text-xs px-2 py-1 bg-white/10 hover:bg-cinema-red hover:text-white rounded transition-colors cursor-pointer">
                              {time}
                            </span>
                          </Link>
                      )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>);

}
// ============ TRAILER PLAYER ============
// Click-to-play YouTube embed. Parses the videoId + optional start time
// from the movie.trailerUrl (supports youtu.be/<id>?t=N and youtube.com/watch?v=<id>&t=N).
function TrailerPlayer({ movie }: {movie: Movie;}) {
  const [playing, setPlaying] = useState(false);
  const { videoId, start } = useMemo(
    () => parseYouTube(movie.trailerUrl),
    [movie.trailerUrl]
  );
  if (!videoId) {
    return (
      <div className="aspect-video rounded-2xl overflow-hidden relative border border-white/10 flex items-center justify-center bg-white/5 text-white/40">
        {t.common.trailerUnavailable}
      </div>);

  }
  if (playing) {
    return (
      <div className="aspect-video rounded-2xl overflow-hidden relative border border-white/10 bg-black">
        <iframe
          title={`${movie.title} trailer`}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1${start ? `&start=${start}` : ''}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="w-full h-full"
          frameBorder={0} />
        
      </div>);

  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="aspect-video w-full rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10">
      
      <img
        src={movie.bannerUrl}
        alt={`${movie.title} trailer`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/40 transition-colors">
        <div className="w-20 h-20 rounded-full bg-cinema-red/90 flex items-center justify-center pl-2 transform group-hover:scale-110 transition-transform shadow-neon-red">
          <Play className="w-10 h-10 fill-current" />
        </div>
      </div>
    </button>);

}
function parseYouTube(url?: string): {
  videoId?: string;
  start?: number;
} {
  if (!url) return {};
  try {
    const u = new URL(url);
    const startParam = u.searchParams.get('t') || u.searchParams.get('start');
    const start = startParam ?
    parseInt(startParam.replace('s', ''), 10) :
    undefined;
    // youtu.be/<id>
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace(/^\//, '').split('/')[0];
      return {
        videoId: id || undefined,
        start
      };
    }
    // youtube.com/watch?v=<id> or /embed/<id>
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v)
      return {
        videoId: v,
        start
      };
      const embedMatch = u.pathname.match(/\/embed\/([^/?]+)/);
      if (embedMatch)
      return {
        videoId: embedMatch[1],
        start
      };
    }
  } catch {

    // ignore — invalid URL
  }return {};
}