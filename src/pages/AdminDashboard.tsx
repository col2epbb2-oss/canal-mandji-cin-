import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Film,
  Ticket,
  Users,
  Settings,
  TrendingUp,
  Calendar,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  LogOut } from
'lucide-react';
import { movies } from '../data/mockData';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';
import { cn } from '../utils/cn';
import { useScreenInit } from '../useScreenInit';
import { Link } from 'react-router-dom';
export function AdminDashboard() {
  useScreenInit();
  const [activeTab, setActiveTab] = useState('dashboard');
  const menuItems = [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard'
  },
  {
    id: 'movies',
    icon: Film,
    label: 'Movies'
  },
  {
    id: 'sessions',
    icon: Calendar,
    label: 'Sessions'
  },
  {
    id: 'tickets',
    icon: Ticket,
    label: 'Tickets'
  },
  {
    id: 'users',
    icon: Users,
    label: 'Users & Comments'
  },
  {
    id: 'settings',
    icon: Settings,
    label: 'Settings'
  }];

  const stats = [
  {
    label: 'Total Revenue',
    value: '2.4M FCFA',
    trend: '+12.5%',
    isPositive: true
  },
  {
    label: 'Tickets Sold',
    value: '1,245',
    trend: '+8.2%',
    isPositive: true
  },
  {
    label: 'Active Movies',
    value: '12',
    trend: '0%',
    isPositive: true
  },
  {
    label: 'Occupancy Rate',
    value: '68%',
    trend: '-2.4%',
    isPositive: false
  }];

  return (
    <div className="min-h-screen bg-[#020202] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-cinema-black/50 backdrop-blur-xl flex flex-col fixed h-full z-20">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <Film className="w-6 h-6 text-cinema-red" />
            <span className="font-heading text-xl tracking-wider">
              CANAL <span className="text-cinema-red">MANDJI</span>
            </span>
          </Link>
          <div className="text-xs text-white/40 mt-1 tracking-widest uppercase">
            Admin Portal
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                  isActive ?
                  'bg-cinema-red/10 text-cinema-red shadow-[inset_4px_0_0_#E50914] bg-gradient-to-r from-cinema-red/10 to-transparent' :
                  'text-white/60 hover:bg-white/5 hover:text-white'
                )}>
                
                <Icon
                  className={cn(
                    'w-5 h-5',
                    isActive && 'drop-shadow-[0_0_8px_rgba(229,9,20,0.8)]'
                  )} />
                
                <span className="font-medium">{item.label}</span>
              </button>);

          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-heading text-3xl capitalize">{activeTab}</h1>
            <p className="text-white/50 text-sm">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass-panel px-4 py-2 rounded-lg text-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              System Online
            </div>
            <img
              src="https://i.pravatar.cc/150?u=admin"
              alt="Admin"
              className="w-10 h-10 rounded-full border border-white/20" />
            
          </div>
        </header>

        {activeTab === 'dashboard' &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="space-y-8">
          
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) =>
            <GlassCard key={i} className="p-6">
                  <div className="text-white/50 text-sm mb-2">{stat.label}</div>
                  <div className="flex items-end justify-between">
                    <div className="font-heading text-3xl">{stat.value}</div>
                    <div
                  className={cn(
                    'text-sm flex items-center gap-1',
                    stat.isPositive ? 'text-green-500' : 'text-red-500'
                  )}>
                  
                      {stat.isPositive ?
                  <TrendingUp className="w-4 h-4" /> :

                  <TrendingUp className="w-4 h-4 rotate-180" />
                  }
                      {stat.trend}
                    </div>
                  </div>
                </GlassCard>
            )}
            </div>

            {/* Charts Area (Placeholder) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <GlassCard className="p-6 lg:col-span-2 h-[400px] flex flex-col">
                <h3 className="font-medium mb-6">Revenue Overview</h3>
                <div className="flex-1 border border-white/5 rounded-lg bg-white/[0.02] flex items-center justify-center text-white/30">
                  [Chart Visualization Area]
                </div>
              </GlassCard>
              <GlassCard className="p-6 h-[400px] flex flex-col">
                <h3 className="font-medium mb-6">Popular Movies</h3>
                <div className="space-y-4 flex-1 overflow-auto hide-scrollbar">
                  {movies.slice(0, 4).map((movie) =>
                <div
                  key={movie.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  
                      <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded" />
                  
                      <div className="flex-1">
                        <div className="font-medium text-sm line-clamp-1">
                          {movie.title}
                        </div>
                        <div className="text-xs text-white/50 mt-1">
                          124 tickets today
                        </div>
                      </div>
                    </div>
                )}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        }

        {activeTab === 'movies' &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}>
          
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <input
                type="text"
                placeholder="Search movies..."
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cinema-red w-64" />
              
              </div>
              <NeonButton size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Movie
              </NeonButton>
            </div>

            <GlassCard className="overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 text-sm">
                    <th className="p-4 font-medium">Movie</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Release Date</th>
                    <th className="p-4 font-medium">Duration</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) =>
                <tr
                  key={movie.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-10 h-14 object-cover rounded" />
                      
                          <div>
                            <div className="font-medium">{movie.title}</div>
                            <div className="text-xs text-white/50">
                              {movie.genre[0]}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                      className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        movie.status === 'now_showing' ?
                        'bg-green-500/10 text-green-500 border border-green-500/20' :
                        'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                      )}>
                      
                          {movie.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-white/70">
                        {new Date(movie.releaseDate).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-sm text-white/70">
                        {movie.duration}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-white/10 rounded text-white/70 hover:text-white transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-red-500/20 rounded text-white/70 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </GlassCard>
          </motion.div>
        }

        {activeTab === 'sessions' && <SessionsView />}
        {activeTab === 'tickets' && <TicketsView />}
        {activeTab === 'users' && <UsersCommentsView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>
    </div>);

}
// ============ SESSIONS ============
function SessionsView() {
  const sessionsData = [
  {
    id: 'S-001',
    movie: movies[0],
    date: 'Today',
    time: '14:30',
    screen: 'Screen 1',
    format: 'IMAX 3D',
    sold: 78,
    capacity: 120,
    status: 'scheduled'
  },
  {
    id: 'S-002',
    movie: movies[1],
    date: 'Today',
    time: '17:00',
    screen: 'Screen 2',
    format: 'Standard',
    sold: 120,
    capacity: 120,
    status: 'sold_out'
  },
  {
    id: 'S-003',
    movie: movies[2],
    date: 'Today',
    time: '20:15',
    screen: 'Screen 3',
    format: 'VIP',
    sold: 8,
    capacity: 40,
    status: 'scheduled'
  },
  {
    id: 'S-004',
    movie: movies[3],
    date: 'Today',
    time: '22:45',
    screen: 'Screen 1',
    format: 'IMAX 2D',
    sold: 45,
    capacity: 120,
    status: 'scheduled'
  },
  {
    id: 'S-005',
    movie: movies[0],
    date: 'Tomorrow',
    time: '15:00',
    screen: 'Screen 1',
    format: 'IMAX 3D',
    sold: 0,
    capacity: 120,
    status: 'scheduled'
  },
  {
    id: 'S-006',
    movie: movies[1],
    date: 'Tomorrow',
    time: '18:30',
    screen: 'Screen 2',
    format: 'Standard',
    sold: 12,
    capacity: 120,
    status: 'scheduled'
  },
  {
    id: 'S-007',
    movie: movies[2],
    date: 'Yesterday',
    time: '20:15',
    screen: 'Screen 3',
    format: 'VIP',
    sold: 38,
    capacity: 40,
    status: 'completed'
  }];

  const statusColors: Record<string, string> = {
    scheduled: 'bg-green-500/10 text-green-500 border-green-500/20',
    sold_out: 'bg-cinema-red/10 text-cinema-red border-cinema-red/20',
    completed: 'bg-white/10 text-white/50 border-white/20',
    cancelled: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
        {
          label: "Today's Sessions",
          value: '4'
        },
        {
          label: 'This Week',
          value: '28'
        },
        {
          label: 'Avg Occupancy',
          value: '67%'
        },
        {
          label: 'Sold Out',
          value: '3'
        }].
        map((s, i) =>
        <GlassCard key={i} className="p-4">
            <div className="text-white/50 text-xs uppercase tracking-wider mb-1">
              {s.label}
            </div>
            <div className="font-heading text-2xl">{s.value}</div>
          </GlassCard>
        )}
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cinema-red">
            <option>All Dates</option>
            <option>Today</option>
            <option>Tomorrow</option>
            <option>This Week</option>
          </select>
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cinema-red">
            <option>All Screens</option>
            <option>Screen 1</option>
            <option>Screen 2</option>
            <option>Screen 3</option>
          </select>
        </div>
        <NeonButton size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Schedule Session
        </NeonButton>
      </div>

      <GlassCard className="overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-white/50 text-sm">
              <th className="p-4 font-medium">Session ID</th>
              <th className="p-4 font-medium">Movie</th>
              <th className="p-4 font-medium">Date / Time</th>
              <th className="p-4 font-medium">Screen</th>
              <th className="p-4 font-medium">Format</th>
              <th className="p-4 font-medium">Occupancy</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessionsData.map((s) => {
              const pct = Math.round(s.sold / s.capacity * 100);
              return (
                <tr
                  key={s.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  
                  <td className="p-4 text-sm font-mono text-white/70">
                    {s.id}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.movie.posterUrl}
                        alt=""
                        className="w-8 h-11 object-cover rounded" />
                      
                      <div className="font-medium text-sm line-clamp-1">
                        {s.movie.title}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <div className="font-medium">{s.date}</div>
                    <div className="text-white/50">{s.time}</div>
                  </td>
                  <td className="p-4 text-sm text-white/70">{s.screen}</td>
                  <td className="p-4 text-sm text-white/70">{s.format}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full',
                            pct >= 100 ?
                            'bg-cinema-red' :
                            pct > 70 ?
                            'bg-yellow-500' :
                            'bg-green-500'
                          )}
                          style={{
                            width: `${pct}%`
                          }} />
                        
                      </div>
                      <span className="text-xs text-white/70">
                        {s.sold}/{s.capacity}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium border capitalize',
                        statusColors[s.status]
                      )}>
                      
                      {s.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/10 rounded text-white/70 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-500/20 rounded text-white/70 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>);

            })}
          </tbody>
        </table>
      </GlassCard>
    </motion.div>);

}
// ============ TICKETS ============
function TicketsView() {
  const tickets = [
  {
    id: 'CMDJ-8X92',
    customer: 'Alex M.',
    email: 'alex@example.com',
    movie: movies[0].title,
    session: 'Today 20:15',
    seats: 'E5, E6',
    amount: 30000,
    status: 'paid',
    method: 'Mobile Money'
  },
  {
    id: 'CMDJ-2K47',
    customer: 'Sarah K.',
    email: 'sarah@example.com',
    movie: movies[1].title,
    session: 'Today 17:00',
    seats: 'C8',
    amount: 10000,
    status: 'used',
    method: 'Credit Card'
  },
  {
    id: 'CMDJ-9P13',
    customer: 'David O.',
    email: 'david@example.com',
    movie: movies[2].title,
    session: 'Tomorrow 14:30',
    seats: 'F3, F4, F5',
    amount: 45000,
    status: 'paid',
    method: 'Mobile Money'
  },
  {
    id: 'CMDJ-4M81',
    customer: 'Marie L.',
    email: 'marie@example.com',
    movie: movies[3].title,
    session: 'Today 22:45',
    seats: 'A1',
    amount: 10000,
    status: 'refunded',
    method: 'Credit Card'
  },
  {
    id: 'CMDJ-7Q23',
    customer: 'Jean P.',
    email: 'jean@example.com',
    movie: movies[0].title,
    session: 'Today 14:30',
    seats: 'D6, D7',
    amount: 20000,
    status: 'paid',
    method: 'Mobile Money'
  },
  {
    id: 'CMDJ-1V58',
    customer: 'Sophie T.',
    email: 'sophie@example.com',
    movie: movies[1].title,
    session: 'Yesterday 20:15',
    seats: 'F8',
    amount: 15000,
    status: 'used',
    method: 'Credit Card'
  }];

  const statusColors: Record<string, string> = {
    paid: 'bg-green-500/10 text-green-500 border-green-500/20',
    used: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    refunded: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    cancelled: 'bg-cinema-red/10 text-cinema-red border-cinema-red/20'
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
        {
          label: 'Total Tickets',
          value: '1,245',
          accent: 'text-white'
        },
        {
          label: 'Revenue Today',
          value: '420K FCFA',
          accent: 'text-green-500'
        },
        {
          label: 'Refunds (week)',
          value: '12',
          accent: 'text-yellow-500'
        },
        {
          label: 'Active Tickets',
          value: '342',
          accent: 'text-cinema-red'
        }].
        map((s, i) =>
        <GlassCard key={i} className="p-4">
            <div className="text-white/50 text-xs uppercase tracking-wider mb-1">
              {s.label}
            </div>
            <div className={cn('font-heading text-2xl', s.accent)}>
              {s.value}
            </div>
          </GlassCard>
        )}
      </div>

      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div className="flex gap-2 flex-1">
          <input
            type="text"
            placeholder="Search ticket ID, customer or email..."
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cinema-red w-80" />
          
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cinema-red">
            <option>All Status</option>
            <option>Paid</option>
            <option>Used</option>
            <option>Refunded</option>
          </select>
        </div>
        <NeonButton variant="glass" size="sm">
          Export CSV
        </NeonButton>
      </div>

      <GlassCard className="overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-white/50 text-sm">
              <th className="p-4 font-medium">Ticket ID</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Movie</th>
              <th className="p-4 font-medium">Session</th>
              <th className="p-4 font-medium">Seats</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Method</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) =>
            <tr
              key={t.id}
              className="border-b border-white/5 hover:bg-white/5 transition-colors group">
              
                <td className="p-4 font-mono text-sm text-cinema-red">
                  {t.id}
                </td>
                <td className="p-4">
                  <div className="font-medium text-sm">{t.customer}</div>
                  <div className="text-xs text-white/50">{t.email}</div>
                </td>
                <td className="p-4 text-sm text-white/70 line-clamp-1 max-w-[160px]">
                  {t.movie}
                </td>
                <td className="p-4 text-sm text-white/70">{t.session}</td>
                <td className="p-4 text-sm text-white/70">{t.seats}</td>
                <td className="p-4 text-sm font-medium">
                  {t.amount.toLocaleString()} FCFA
                </td>
                <td className="p-4 text-xs text-white/50">{t.method}</td>
                <td className="p-4">
                  <span
                  className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium border capitalize',
                    statusColors[t.status]
                  )}>
                  
                    {t.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                    className="p-2 hover:bg-white/10 rounded text-white/70 hover:text-white transition-colors"
                    title="View">
                    
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </GlassCard>
    </motion.div>);

}
// ============ USERS & COMMENTS ============
function UsersCommentsView() {
  const [subTab, setSubTab] = useState<'users' | 'comments'>('comments');
  const users = [
  {
    id: 'U-001',
    name: 'Alex M.',
    email: 'alex@example.com',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    joined: '2024-01-15',
    tickets: 12,
    spent: '180K FCFA',
    status: 'active'
  },
  {
    id: 'U-002',
    name: 'Sarah K.',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    joined: '2024-02-08',
    tickets: 8,
    spent: '120K FCFA',
    status: 'active'
  },
  {
    id: 'U-003',
    name: 'David O.',
    email: 'david@example.com',
    avatar: 'https://i.pravatar.cc/150?u=david',
    joined: '2023-11-22',
    tickets: 24,
    spent: '380K FCFA',
    status: 'vip'
  },
  {
    id: 'U-004',
    name: 'Marie L.',
    email: 'marie@example.com',
    avatar: 'https://i.pravatar.cc/150?u=marie',
    joined: '2024-03-12',
    tickets: 3,
    spent: '45K FCFA',
    status: 'active'
  },
  {
    id: 'U-005',
    name: 'Jean P.',
    email: 'jean@example.com',
    avatar: 'https://i.pravatar.cc/150?u=jean',
    joined: '2024-01-30',
    tickets: 0,
    spent: '0 FCFA',
    status: 'suspended'
  }];

  const pendingComments = [
  {
    id: 'PC-1',
    user: 'Marc T.',
    avatar: 'https://i.pravatar.cc/150?u=marc',
    movie: 'DUNE: PART TWO',
    rating: 5,
    text: 'A visual masterpiece. The sound design is incredible.',
    date: '2 hours ago'
  },
  {
    id: 'PC-2',
    user: 'Sophie L.',
    avatar: 'https://i.pravatar.cc/150?u=sophie',
    movie: 'OPPENHEIMER',
    rating: 1,
    text: 'This is spam — buy followers cheap link.example.com',
    date: '5 hours ago',
    flagged: true
  },
  {
    id: 'PC-3',
    user: 'Jean P.',
    avatar: 'https://i.pravatar.cc/150?u=jean',
    movie: 'INTERSTELLAR',
    rating: 5,
    text: 'Nolan at his best. Cillian Murphy deserves an Oscar.',
    date: '1 day ago'
  }];

  const userStatusColors: Record<string, string> = {
    active: 'bg-green-500/10 text-green-500 border-green-500/20',
    vip: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    suspended: 'bg-cinema-red/10 text-cinema-red border-cinema-red/20'
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}>
      
      {/* Sub-tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10">
        {[
        {
          id: 'comments',
          label: 'Comment Moderation',
          count: pendingComments.length
        },
        {
          id: 'users',
          label: 'Users',
          count: users.length
        }].
        map((t) =>
        <button
          key={t.id}
          onClick={() => setSubTab(t.id as any)}
          className={cn(
            'px-4 py-3 text-sm font-medium transition-all relative',
            subTab === t.id ?
            'text-cinema-red' :
            'text-white/50 hover:text-white'
          )}>
          
            {t.label}
            <span
            className={cn(
              'ml-2 text-xs px-2 py-0.5 rounded-full',
              subTab === t.id ?
              'bg-cinema-red/20 text-cinema-red' :
              'bg-white/10 text-white/50'
            )}>
            
              {t.count}
            </span>
            {subTab === t.id &&
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cinema-red shadow-neon-red" />
          }
          </button>
        )}
      </div>

      {subTab === 'comments' &&
      <div className="space-y-4">
          {pendingComments.map((c) =>
        <GlassCard
          key={c.id}
          className={cn('p-6', c.flagged && 'border border-cinema-red/30')}>
          
              <div className="flex items-start gap-4">
                <img
              src={c.avatar}
              alt={c.user}
              className="w-12 h-12 rounded-full border border-white/10" />
            
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium">{c.user}</span>
                    <span className="text-xs text-white/50">on</span>
                    <span className="text-xs font-medium text-cinema-red">
                      {c.movie}
                    </span>
                    {c.flagged &&
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-cinema-red/10 text-cinema-red border border-cinema-red/30">
                        Flagged
                      </span>
                }
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) =>
                  <div
                    key={i}
                    className={cn(
                      'w-3 h-3 rounded-sm',
                      i < c.rating ? 'bg-cinema-red' : 'bg-white/10'
                    )} />

                  )}
                    </div>
                    <span className="text-xs text-white/40">• {c.date}</span>
                  </div>
                  <p className="text-white/80 text-sm mb-4">"{c.text}"</p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20 text-sm font-medium transition-colors">
                      Approve
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-cinema-red/10 text-cinema-red border border-cinema-red/20 hover:bg-cinema-red hover:text-white text-sm font-medium transition-colors">
                      Reject
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 text-sm font-medium transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
        )}
        </div>
      }

      {subTab === 'users' &&
      <GlassCard className="overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-sm">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium">Tickets</th>
                <th className="p-4 font-medium">Total Spent</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) =>
            <tr
              key={u.id}
              className="border-b border-white/5 hover:bg-white/5 transition-colors group">
              
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-10 h-10 rounded-full border border-white/10" />
                  
                      <div>
                        <div className="font-medium text-sm">{u.name}</div>
                        <div className="text-xs text-white/50">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-white/70">
                    {new Date(u.joined).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-white/70">{u.tickets}</td>
                  <td className="p-4 text-sm font-medium">{u.spent}</td>
                  <td className="p-4">
                    <span
                  className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium border capitalize',
                    userStatusColors[u.status]
                  )}>
                  
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/10 rounded text-white/70 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-500/20 rounded text-white/70 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </GlassCard>
      }
    </motion.div>);

}
// ============ SETTINGS ============
function SettingsView() {
  const [notifs, setNotifs] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Cinema Info */}
        <GlassCard className="p-6">
          <h3 className="font-heading text-2xl mb-1">Cinema Information</h3>
          <p className="text-white/50 text-sm mb-6">
            Public details displayed across the site.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50">
                Cinema Name
              </label>
              <input
                defaultValue="Canal Mandji Cinema"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cinema-red" />
              
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50">
                Location
              </label>
              <input
                defaultValue="Port-Gentil, Gabon"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cinema-red" />
              
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50">
                Contact Email
              </label>
              <input
                defaultValue="contact@canalmandji.ga"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cinema-red" />
              
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50">
                Phone
              </label>
              <input
                defaultValue="+241 01 23 45 67"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cinema-red" />
              
            </div>
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-wider text-white/50">
                Tagline
              </label>
              <input
                defaultValue="Experience cinema differently in Port-Gentil"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cinema-red" />
              
            </div>
          </div>
        </GlassCard>

        {/* Pricing */}
        <GlassCard className="p-6">
          <h3 className="font-heading text-2xl mb-1">Ticket Pricing</h3>
          <p className="text-white/50 text-sm mb-6">Pricing tiers in FCFA.</p>

          <div className="space-y-3">
            {[
            {
              tier: 'Standard 2D',
              price: 8000
            },
            {
              tier: 'Standard 3D',
              price: 10000
            },
            {
              tier: 'IMAX 2D',
              price: 12000
            },
            {
              tier: 'IMAX 3D',
              price: 15000
            },
            {
              tier: 'VIP',
              price: 20000
            }].
            map((p, i) =>
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              
                <div className="font-medium text-sm">{p.tier}</div>
                <div className="flex items-center gap-2">
                  <input
                  defaultValue={p.price}
                  type="number"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm w-32 text-right focus:outline-none focus:border-cinema-red" />
                
                  <span className="text-xs text-white/50">FCFA</span>
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Payment Methods */}
        <GlassCard className="p-6">
          <h3 className="font-heading text-2xl mb-1">Payment Methods</h3>
          <p className="text-white/50 text-sm mb-6">
            Accepted methods at checkout.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
            {
              name: 'Airtel Money',
              enabled: true
            },
            {
              name: 'Moov Money',
              enabled: true
            },
            {
              name: 'Visa',
              enabled: true
            },
            {
              name: 'Mastercard',
              enabled: true
            },
            {
              name: 'PayPal',
              enabled: false
            },
            {
              name: 'Cash at counter',
              enabled: true
            }].
            map((m, i) =>
            <label
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
              
                <span className="text-sm font-medium">{m.name}</span>
                <Toggle defaultChecked={m.enabled} />
              </label>
            )}
          </div>
        </GlassCard>

        <div className="flex justify-end gap-3">
          <NeonButton variant="glass" size="md">
            Cancel
          </NeonButton>
          <NeonButton size="md">Save Changes</NeonButton>
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-6">
        {/* Notifications */}
        <GlassCard className="p-6">
          <h3 className="font-heading text-2xl mb-1">Notifications</h3>
          <p className="text-white/50 text-sm mb-6">
            Channels for admin alerts.
          </p>

          <div className="space-y-4">
            {[
            {
              key: 'email',
              label: 'Email alerts',
              desc: 'Booking confirmations & daily summary'
            },
            {
              key: 'sms',
              label: 'SMS alerts',
              desc: 'Urgent operational alerts only'
            },
            {
              key: 'push',
              label: 'Push notifications',
              desc: 'Real-time browser notifications'
            },
            {
              key: 'marketing',
              label: 'Marketing reports',
              desc: 'Weekly campaign performance'
            }].
            map((n) =>
            <div
              key={n.key}
              className="flex items-start justify-between gap-4">
              
                <div>
                  <div className="text-sm font-medium">{n.label}</div>
                  <div className="text-xs text-white/50 mt-0.5">{n.desc}</div>
                </div>
                <Toggle
                defaultChecked={notifs[n.key as keyof typeof notifs]}
                onChange={(v) =>
                setNotifs({
                  ...notifs,
                  [n.key]: v
                })
                } />
              
              </div>
            )}
          </div>
        </GlassCard>

        {/* Branding */}
        <GlassCard className="p-6">
          <h3 className="font-heading text-2xl mb-1">Branding</h3>
          <p className="text-white/50 text-sm mb-6">Visual identity assets.</p>

          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50">
                Logo
              </label>
              <div className="mt-2 flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-dashed border-white/20">
                <div className="w-12 h-12 rounded bg-cinema-red/10 flex items-center justify-center">
                  <Film className="w-6 h-6 text-cinema-red" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">canal-mandji.svg</div>
                  <div className="text-xs text-white/50">SVG • 12 KB</div>
                </div>
                <button className="text-xs text-cinema-red hover:underline">
                  Replace
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50">
                Accent Color
              </label>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-cinema-red shadow-neon-red border border-white/10" />
                <input
                  defaultValue="#E50914"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cinema-red" />
                
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Danger zone */}
        <GlassCard className="p-6 border border-cinema-red/20">
          <h3 className="font-heading text-xl mb-1 text-cinema-red">
            Danger Zone
          </h3>
          <p className="text-white/50 text-sm mb-4">Irreversible actions.</p>
          <button className="w-full px-4 py-2.5 rounded-lg bg-cinema-red/10 text-cinema-red border border-cinema-red/30 hover:bg-cinema-red hover:text-white text-sm font-medium transition-colors">
            Reset All Settings
          </button>
        </GlassCard>
      </div>
    </motion.div>);

}
// Small toggle component
function Toggle({
  defaultChecked,
  onChange



}: {defaultChecked?: boolean;onChange?: (v: boolean) => void;}) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <button
      onClick={() => {
        const v = !on;
        setOn(v);
        onChange?.(v);
      }}
      className={cn(
        'relative w-10 h-6 rounded-full transition-colors flex-shrink-0',
        on ? 'bg-cinema-red shadow-neon-red' : 'bg-white/10'
      )}>
      
      <div
        className={cn(
          'absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all',
          on ? 'left-[18px]' : 'left-0.5'
        )} />
      
    </button>);

}