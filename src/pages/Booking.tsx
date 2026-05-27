import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, Check, CreditCard, Download } from 'lucide-react';
import { movies } from '../data/mockData';
import { NeonButton } from '../components/ui/NeonButton';
import { GlassCard } from '../components/ui/GlassCard';
import { cn } from '../utils/cn';
import { useScreenInit } from '../useScreenInit';
import { useTranslation } from '../i18n/LanguageContext';
// Mock Seat Data Generator
const generateSeats = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  const seats = [];
  for (let r = 0; r < rows.length; r++) {
    for (let s = 1; s <= seatsPerRow; s++) {
      // Create a gap in the middle (aisle)
      if (s === 6 || s === 7) continue;
      const isVip = r >= 4 && r <= 6; // Rows E, F, G are VIP
      // Randomly assign occupied status
      const isOccupied = Math.random() > 0.7;
      seats.push({
        id: `${rows[r]}${s}`,
        row: rows[r],
        number: s,
        type: isVip ? 'vip' : 'standard',
        status: isOccupied ? 'occupied' : 'available',
        price: isVip ? 15000 : 10000 // CFA Francs roughly
      });
    }
  }
  return seats;
};
export function Booking() {
  useScreenInit();
  const { t } = useTranslation();
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id) || movies[0];
  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [step, setStep] = useState<'seats' | 'payment' | 'ticket'>('seats');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const toggleSeat = (seatId: string) => {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat || seat.status === 'occupied') return;
    setSelectedSeats((prev) =>
    prev.includes(seatId) ?
    prev.filter((id) => id !== seatId) :
    [...prev, seatId]
    );
  };
  const selectedSeatDetails = seats.filter((s) => selectedSeats.includes(s.id));
  const totalPrice = selectedSeatDetails.reduce(
    (sum, seat) => sum + seat.price,
    0
  );
  return (
    <div className="min-h-screen bg-cinema-black text-white pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {step !== 'ticket' &&
          <button
            onClick={() =>
            step === 'payment' ? setStep('seats') : navigate(-1)
            }
            className="glass-panel p-3 rounded-full hover:bg-white/10 transition-colors">
            
              <ChevronLeft className="w-5 h-5" />
            </button>
          }
          <div>
            <h1 className="font-heading text-3xl md:text-4xl">{movie.title}</h1>
            <p className="text-white/50">{t.booking.today}, 20:15 • IMAX 3D</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area */}
          <div
            className={cn(
              'transition-all duration-500',
              step === 'ticket' ?
              'lg:col-span-3 flex justify-center' :
              'lg:col-span-2'
            )}>
            
            <AnimatePresence mode="wait">
              {step === 'seats' ?
              <motion.div
                key="seats"
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: -20
                }}
                className="space-y-8">
                
                  {/* Screen Curve */}
                  <div className="relative w-full max-w-2xl mx-auto mb-16 mt-8">
                    <div className="h-2 w-full bg-gradient-to-r from-transparent via-cinema-red to-transparent rounded-[100%] shadow-[0_10px_30px_rgba(229,9,20,0.5)]" />
                    <p className="text-center text-white/30 text-sm mt-4 tracking-[0.5em] uppercase">
                      {t.booking.screen}
                    </p>
                  </div>

                  {/* Seat Grid */}
                  <div className="overflow-x-auto pb-8 hide-scrollbar">
                    <div className="min-w-[600px] flex flex-col items-center gap-4">
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((row) =>
                    <div key={row} className="flex items-center gap-4">
                          <span className="w-6 text-center text-white/30 font-medium">
                            {row}
                          </span>
                          <div className="flex gap-2">
                            {seats.
                        filter((s) => s.row === row).
                        map((seat, i) => {
                          // Add gap for aisle
                          const isAisle = i === 4;
                          const isSelected = selectedSeats.includes(
                            seat.id
                          );
                          return (
                            <Fragment key={seat.id}>
                                    <motion.button
                                whileHover={
                                seat.status === 'available' ?
                                {
                                  scale: 1.1
                                } :
                                {}
                                }
                                whileTap={
                                seat.status === 'available' ?
                                {
                                  scale: 0.9
                                } :
                                {}
                                }
                                onClick={() => toggleSeat(seat.id)}
                                disabled={seat.status === 'occupied'}
                                className={cn(
                                  'w-8 h-8 md:w-10 md:h-10 rounded-t-lg rounded-b-sm flex items-center justify-center text-xs transition-colors duration-200',
                                  seat.status === 'occupied' &&
                                  'bg-white/10 text-transparent cursor-not-allowed',
                                  seat.status === 'available' &&
                                  !isSelected &&
                                  seat.type === 'standard' &&
                                  'bg-white/20 hover:bg-white/40',
                                  seat.status === 'available' &&
                                  !isSelected &&
                                  seat.type === 'vip' &&
                                  'bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/40',
                                  isSelected &&
                                  'bg-cinema-red text-white shadow-neon-red'
                                )}>
                                
                                      {isSelected &&
                                <Check className="w-4 h-4" />
                                }
                                    </motion.button>
                                    {isAisle && <div className="w-8" />}
                                  </Fragment>);

                        })}
                          </div>
                          <span className="w-6 text-center text-white/30 font-medium">
                            {row}
                          </span>
                        </div>
                    )}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-t-lg rounded-b-sm bg-white/20" />
                      <span className="text-sm text-white/70">
                        {t.booking.standard}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-t-lg rounded-b-sm bg-yellow-500/20 border border-yellow-500/50" />
                      <span className="text-sm text-white/70">
                        {t.booking.vip}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-t-lg rounded-b-sm bg-cinema-red shadow-neon-red" />
                      <span className="text-sm text-white/70">
                        {t.booking.selected}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-t-lg rounded-b-sm bg-white/10" />
                      <span className="text-sm text-white/70">
                        {t.booking.occupied}
                      </span>
                    </div>
                  </div>
                </motion.div> :
              step === 'ticket' ?
              <motion.div
                key="ticket"
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                className="w-full max-w-2xl">
                
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8" />
                    </div>
                    <h2 className="font-heading text-4xl mb-2">
                      {t.booking.paymentSuccessful}
                    </h2>
                    <p className="text-white/50">{t.booking.ticketsReady}</p>
                  </div>

                  {/* Digital Ticket */}
                  <div className="relative bg-white text-cinema-black rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                    <div className="p-8 flex-1 border-b md:border-b-0 md:border-r border-dashed border-gray-300 relative">
                      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-cinema-black rounded-full hidden md:block" />
                      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-cinema-black rounded-full hidden md:block" />

                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
                            Canal Mandji
                          </p>
                          <h3 className="font-heading text-3xl">
                            {movie.title}
                          </h3>
                        </div>
                        <span className="bg-cinema-black text-white text-xs font-bold px-2 py-1 rounded">
                          IMAX 3D
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">
                            {t.booking.date}
                          </p>
                          <p className="font-bold">{t.booking.today}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">
                            {t.booking.time}
                          </p>
                          <p className="font-bold">20:15</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">
                            {t.booking.screen}
                          </p>
                          <p className="font-bold">04</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">
                            {t.booking.seats}
                          </p>
                          <p className="font-bold text-cinema-red">
                            {selectedSeats.join(', ')}
                          </p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 uppercase mb-1">
                          {t.booking.bookingReference}
                        </p>
                        <p className="font-mono font-bold text-lg tracking-widest">
                          CMDJ-8X92
                        </p>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col items-center justify-center bg-gray-50 min-w-[250px]">
                      <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CMDJ-8X92"
                      alt="Ticket QR Code"
                      className="w-32 h-32 mb-4 mix-blend-multiply" />
                    
                      <p className="text-xs text-gray-500 text-center mb-6">
                        {t.booking.scanEntrance}
                      </p>

                      <NeonButton
                      variant="outline"
                      size="sm"
                      className="w-full text-cinema-black border-gray-300 hover:bg-gray-200 hover:text-cinema-black hover:shadow-none">
                      
                        <Download className="w-4 h-4 mr-2" />
                        {t.booking.downloadPDF}
                      </NeonButton>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <button
                    onClick={() => navigate('/')}
                    className="text-white/50 hover:text-white transition-colors underline">
                    
                      {t.booking.returnHome}
                    </button>
                  </div>
                </motion.div> :
              null}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          {step !== 'ticket' &&
          <div>
              <GlassCard className="p-6 sticky top-32">
                <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
                  <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-20 rounded-lg object-cover" />
                
                  <div>
                    <h3 className="font-heading text-xl">{movie.title}</h3>
                    <p className="text-sm text-white/50 mt-1">IMAX 3D</p>
                    <p className="text-sm text-white/50">
                      {t.booking.today}, 20:15
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">
                      {t.booking.tickets} ({selectedSeats.length})
                    </span>
                    <span>
                      {selectedSeats.length > 0 ?
                    selectedSeats.join(', ') :
                    '-'}
                    </span>
                  </div>

                  {selectedSeatDetails.map((seat) =>
                <div key={seat.id} className="flex justify-between text-sm">
                      <span className="text-white/50">
                        {t.booking.seats} {seat.id} ({seat.type})
                      </span>
                      <span>{seat.price.toLocaleString()} FCFA</span>
                    </div>
                )}
                </div>

                <div className="pt-6 border-t border-white/10 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-white/70">{t.booking.total}</span>
                    <span className="font-heading text-3xl text-cinema-red">
                      {totalPrice.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>

                {step === 'seats' ?
              <NeonButton
                fullWidth
                disabled={selectedSeats.length === 0}
                onClick={() => setStep('payment')}
                className={
                selectedSeats.length === 0 ?
                'opacity-50 cursor-not-allowed' :
                ''
                }>
                
                    {t.booking.continueToPayment}
                  </NeonButton> :

              <NeonButton fullWidth onClick={() => setStep('ticket')}>
                    {t.booking.confirmPay}
                  </NeonButton>
              }

                <div className="mt-4 flex items-start gap-2 text-xs text-white/40">
                  <Info className="w-4 h-4 shrink-0" />
                  <p>{t.booking.ticketsNonRefundable}</p>
                </div>
              </GlassCard>
            </div>
          }
        </div>
      </div>
    </div>);

}