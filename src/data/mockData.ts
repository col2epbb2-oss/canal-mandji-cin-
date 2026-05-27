export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  bannerUrl: string;
  rating: number;
  likes: number;
  duration: string;
  genre: string[];
  synopsis: string;
  director: string;
  cast: string[];
  releaseDate: string;
  status: 'now_showing' | 'coming_soon';
  trailerUrl?: string;
  reviews?: {
    id: string;
    user: string;
    avatar: string;
    rating: number;
    text: string;
    date: string;
  }[];
}

export const movies: Movie[] = [
{
  id: 'm1',
  title: 'DUNE: PART TWO',
  posterUrl:
  'https://img.youtube.com/vi/SUfv36bB5jA/maxresdefault.jpg',
  bannerUrl:
  'https://img.youtube.com/vi/SUfv36bB5jA/maxresdefault.jpg',
  rating: 4.8,
  likes: 12400,
  duration: '2h 46m',
  genre: ['Sci-Fi', 'Action', 'Adventure'],
  synopsis:
  'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
  director: 'Denis Villeneuve',
  cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
  releaseDate: '2024-03-01',
  status: 'now_showing',
  trailerUrl: 'https://youtu.be/SUfv36bB5jA?t=9',
  reviews: [
  {
    id: 'r1',
    user: 'Marc T.',
    avatar: 'https://i.pravatar.cc/150?u=marc',
    rating: 5,
    text: 'A visual masterpiece. The sound design is incredible.',
    date: '3 days ago'
  },
  {
    id: 'r2',
    user: 'Sophie L.',
    avatar: 'https://i.pravatar.cc/150?u=sophie',
    rating: 4,
    text: 'Great continuation of the story, though a bit long.',
    date: '1 week ago'
  }]

},
{
  id: 'm2',
  title: 'OPPENHEIMER',
  posterUrl:
  'https://img.youtube.com/vi/CoXtvSRpHgM/maxresdefault.jpg',
  bannerUrl:
  'https://img.youtube.com/vi/CoXtvSRpHgM/maxresdefault.jpg',
  rating: 4.9,
  likes: 8900,
  duration: '3h 0m',
  genre: ['Biography', 'Drama', 'History'],
  synopsis:
  'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
  director: 'Christopher Nolan',
  cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon'],
  releaseDate: '2023-07-21',
  status: 'now_showing',
  trailerUrl: 'https://youtu.be/CoXtvSRpHgM?t=37',
  reviews: [
  {
    id: 'r3',
    user: 'Jean P.',
    avatar: 'https://i.pravatar.cc/150?u=jean',
    rating: 5,
    text: 'Nolan at his best. Cillian Murphy deserves an Oscar.',
    date: '2 weeks ago'
  }]

},
{
  id: 'm3',
  title: 'INTERSTELLAR',
  posterUrl:
  'https://img.youtube.com/vi/HsPP6xSzQoE/maxresdefault.jpg',
  bannerUrl:
  'https://img.youtube.com/vi/HsPP6xSzQoE/maxresdefault.jpg',
  rating: 4.7,
  likes: 15200,
  duration: '2h 49m',
  genre: ['Sci-Fi', 'Adventure', 'Drama'],
  synopsis:
  "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  director: 'Christopher Nolan',
  cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
  releaseDate: '2014-11-07',
  status: 'now_showing',
  trailerUrl: 'https://youtu.be/HsPP6xSzQoE?t=4'
},
{
  id: 'm4',
  title: 'BLADE RUNNER 2049',
  posterUrl:
  'https://img.youtube.com/vi/O4C5cwSbXZ8/maxresdefault.jpg',
  bannerUrl:
  'https://img.youtube.com/vi/O4C5cwSbXZ8/maxresdefault.jpg',
  rating: 4.6,
  likes: 6700,
  duration: '2h 44m',
  genre: ['Sci-Fi', 'Action', 'Mystery'],
  synopsis:
  "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.",
  director: 'Denis Villeneuve',
  cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'],
  releaseDate: '2017-10-06',
  status: 'now_showing',
  trailerUrl: 'https://youtu.be/O4C5cwSbXZ8?t=42'
},
{
  id: 'm5',
  title: 'FURIOSA',
  posterUrl:
  'https://img.youtube.com/vi/XJMuhwVlca4/maxresdefault.jpg',
  bannerUrl:
  'https://img.youtube.com/vi/XJMuhwVlca4/maxresdefault.jpg',
  rating: 0,
  likes: 3400,
  duration: '2h 28m',
  genre: ['Action', 'Adventure', 'Sci-Fi'],
  synopsis:
  'The origin story of renegade warrior Furiosa before her encounter and teamup with Mad Max.',
  director: 'George Miller',
  cast: ['Anya Taylor-Joy', 'Chris Hemsworth', 'Tom Burke'],
  releaseDate: '2024-05-24',
  status: 'coming_soon',
  trailerUrl: 'https://youtu.be/XJMuhwVlca4'
},
{
  id: 'm6',
  title: 'DEADPOOL & WOLVERINE',
  posterUrl:
  'https://img.youtube.com/vi/AAWJ21wLN4A/maxresdefault.jpg',
  bannerUrl:
  'https://img.youtube.com/vi/AAWJ21wLN4A/maxresdefault.jpg',
  rating: 0,
  likes: 18900,
  duration: '2h 7m',
  genre: ['Action', 'Comedy', 'Sci-Fi'],
  synopsis:
  'Wolverine is recovering from his injuries when he crosses paths with the loudmouth, Deadpool.',
  director: 'Shawn Levy',
  cast: ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin'],
  releaseDate: '2024-07-26',
  status: 'coming_soon',
  trailerUrl: 'https://youtu.be/AAWJ21wLN4A'
},
// ============ KIDS / FAMILY ============
{
  id: 'm7',
  title: 'DREAMS',
  posterUrl: 'https://img.youtube.com/vi/5DVcLizUti0/maxresdefault.jpg',
  bannerUrl: 'https://img.youtube.com/vi/5DVcLizUti0/maxresdefault.jpg',
  rating: 4.5,
  likes: 4200,
  duration: '1h 32m',
  genre: ['Animation', 'Family', 'Adventure'],
  synopsis:
  'A young dreamer embarks on a magical journey through worlds beyond imagination, discovering the power of believing in oneself.',
  director: 'Sofia Mendes',
  cast: ['Vocal Cast', 'Live Animation', 'Family Friendly'],
  releaseDate: '2024-06-14',
  status: 'now_showing',
  trailerUrl: 'https://youtu.be/5DVcLizUti0?t=7',
  reviews: [
  {
    id: 'r-d1',
    user: 'Aïcha B.',
    avatar: 'https://i.pravatar.cc/150?u=aicha',
    rating: 5,
    text: 'My kids absolutely loved it! Beautiful animation and great message.',
    date: '4 days ago'
  },
  {
    id: 'r-d2',
    user: 'Marc T.',
    avatar: 'https://i.pravatar.cc/150?u=marctkids',
    rating: 4,
    text: 'Perfect family afternoon. Songs are catchy too.',
    date: '1 week ago'
  }]

},
{
  id: 'm8',
  title: 'TURBO WINS THE INDY',
  posterUrl: 'https://img.youtube.com/vi/Sr5vRyXaZk4/maxresdefault.jpg',
  bannerUrl: 'https://img.youtube.com/vi/Sr5vRyXaZk4/maxresdefault.jpg',
  rating: 4.3,
  likes: 3100,
  duration: '1h 36m',
  genre: ['Animation', 'Family', 'Comedy'],
  synopsis:
  'An ordinary garden snail with an extraordinary dream — to race in the Indianapolis 500. A heartwarming story about chasing the impossible.',
  director: 'David Soren',
  cast: ['Ryan Reynolds', 'Paul Giamatti', 'Michael Peña'],
  releaseDate: '2024-05-20',
  status: 'now_showing',
  trailerUrl: 'https://youtu.be/Sr5vRyXaZk4?t=320',
  reviews: [
  {
    id: 'r-t1',
    user: 'Lucas P.',
    avatar: 'https://i.pravatar.cc/150?u=lucaskids',
    rating: 5,
    text: 'Pure feel-good fun. The race scenes are amazing on the big screen.',
    date: '5 days ago'
  }]

},
{
  id: 'm9',
  title: 'VAIANA',
  posterUrl: 'https://img.youtube.com/vi/lMx-TRft1iA/maxresdefault.jpg',
  bannerUrl: 'https://img.youtube.com/vi/lMx-TRft1iA/maxresdefault.jpg',
  rating: 4.8,
  likes: 11200,
  duration: '1h 47m',
  genre: ['Animation', 'Family', 'Adventure', 'Musical'],
  synopsis:
  'Three years after the events of the first film, Vaiana sets sail on a new adventure across the vast Pacific to answer an ancestral call.',
  director: 'Ron Clements & John Musker',
  cast: ["Auli'i Cravalho", 'Dwayne Johnson', 'Hualālai Chung'],
  releaseDate: '2024-11-27',
  status: 'now_showing',
  trailerUrl: 'https://youtu.be/lMx-TRft1iA?t=82',
  reviews: [
  {
    id: 'r-v1',
    user: 'Fatou D.',
    avatar: 'https://i.pravatar.cc/150?u=fatou',
    rating: 5,
    text: 'Stunning visuals and a great soundtrack — the kids were mesmerized!',
    date: '2 days ago'
  },
  {
    id: 'r-v2',
    user: 'Sébastien L.',
    avatar: 'https://i.pravatar.cc/150?u=sebL',
    rating: 5,
    text: "Better than the first one, in my opinion. We're going back next weekend.",
    date: '6 days ago'
  },
  {
    id: 'r-v3',
    user: 'Marie K.',
    avatar: 'https://i.pravatar.cc/150?u=marieK',
    rating: 4,
    text: 'Beautiful animation. A few slow moments but overall fantastic.',
    date: '1 week ago'
  }]

},
{
  id: 'm10',
  title: 'DES MINIONS ET DES MONSTRES',
  posterUrl: 'https://img.youtube.com/vi/LtXJy2UNlQk/maxresdefault.jpg',
  bannerUrl: 'https://img.youtube.com/vi/LtXJy2UNlQk/maxresdefault.jpg',
  rating: 4.8,
  likes: 8500,
  duration: '1h 25m',
  genre: ['Animation', 'Family', 'Comedy'],
  synopsis: 'Des aventures hilarantes vous attendent dans "Des Minions et Des Monstres". Un concentré de rires pour les enfants et toute la famille !',
  director: 'Illumination',
  cast: ['Les Minions'],
  releaseDate: '2024-06-01',
  status: 'now_showing',
  trailerUrl: 'https://youtu.be/LtXJy2UNlQk?t=2'
}];


export const comments = [
{
  id: 'c1',
  user: 'Alex M.',
  avatar: 'https://i.pravatar.cc/150?u=alex',
  rating: 5,
  text: 'Incredible experience at Canal Mandji! The sound system is out of this world.',
  date: '2 days ago',
  likes: 24
},
{
  id: 'c2',
  user: 'Sarah K.',
  avatar: 'https://i.pravatar.cc/150?u=sarah',
  rating: 4,
  text: 'Best cinema in Port-Gentil by far. The VIP seats are so comfortable.',
  date: '1 week ago',
  likes: 12
},
{
  id: 'c3',
  user: 'David O.',
  avatar: 'https://i.pravatar.cc/150?u=david',
  rating: 5,
  text: 'The visual quality and the atmosphere here makes every movie feel like an event.',
  date: '2 weeks ago',
  likes: 8
},
{
  id: 'c4',
  user: 'Fatou D.',
  avatar: 'https://i.pravatar.cc/150?u=fatou',
  rating: 5,
  text: "I took my kids for Vaiana last Sunday — they're still talking about it. The kids' programming is fantastic.",
  date: '3 days ago',
  likes: 19
},
{
  id: 'c5',
  user: 'Jean-Paul N.',
  avatar: 'https://i.pravatar.cc/150?u=jeanpaul',
  rating: 5,
  text: 'Finally a world-class cinema in Port-Gentil. Booking online is so smooth and the QR ticket is genius.',
  date: '5 days ago',
  likes: 31
},
{
  id: 'c6',
  user: 'Aïcha B.',
  avatar: 'https://i.pravatar.cc/150?u=aicha',
  rating: 4,
  text: 'Great place for date night. The mobile money payment worked instantly.',
  date: '1 week ago',
  likes: 7
}];


export const sessions = [
{ id: 's1', time: '14:30', format: 'IMAX 3D', availableSeats: 45 },
{ id: 's2', time: '17:00', format: 'Standard', availableSeats: 120 },
{ id: 's3', time: '20:15', format: 'VIP', availableSeats: 12 },
{ id: 's4', time: '22:45', format: 'IMAX 2D', availableSeats: 80 }];