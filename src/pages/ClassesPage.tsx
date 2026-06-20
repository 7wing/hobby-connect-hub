import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import hobbyForaging from '@/assets/hobby-foraging.jpg';
import hobbyBirdwatching from '@/assets/hobby-birdwatching.jpg';
import hobbyTypewriters from '@/assets/hobby-typewriters.jpg';
import hobbyPottery from '@/assets/hobby-pottery.jpg';
import hobbyStamps from '@/assets/hobby-stamps.jpg';
import hobbyTrains from '@/assets/hobby-trains.jpg';

interface ClassItem {
  id: string;
  title: string;
  instructor: string;
  instructorInitials: string;
  date: string;
  duration: string;
  price: string;
  spots: number;
  rating: number;
  format: 'In-Person' | 'Virtual';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
}

const classes: ClassItem[] = [
  {
    id: '1',
    title: 'Hiking 101',
    instructor: 'Marcus Reed',
    instructorInitials: 'MR',
    date: 'Mar 22, 2026',
    duration: '3 hrs',
    price: '$45',
    spots: 8,
    rating: 4.8,
    format: 'In-Person',
    level: 'Beginner',
    image: hobbyForaging,
  },
  {
    id: '2',
    title: 'Birdwatching Basics',
    instructor: 'Dr. Ana Reyes',
    instructorInitials: 'AR',
    date: 'Mar 24, 2026',
    duration: '2.5 hrs',
    price: 'Free',
    spots: 12,
    rating: 4.9,
    format: 'In-Person',
    level: 'Beginner',
    image: hobbyBirdwatching,
  },
  {
    id: '3',
    title: 'Night Sky Astronomy',
    instructor: 'Sam Whitmore',
    instructorInitials: 'SW',
    date: 'Mar 25, 2026',
    duration: '4 hrs',
    price: '$30',
    spots: 5,
    rating: 4.7,
    format: 'Virtual',
    level: 'Intermediate',
    image: hobbyTypewriters,
  },
  {
    id: '4',
    title: 'Fly Fishing Masterclass',
    instructor: 'Elena Rossi',
    instructorInitials: 'ER',
    date: 'Mar 28, 2026',
    duration: '5 hrs',
    price: '$85',
    spots: 3,
    rating: 4.9,
    format: 'In-Person',
    level: 'Advanced',
    image: hobbyPottery,
  },
  {
    id: '5',
    title: 'Urban Sketching',
    instructor: 'Leo Tanaka',
    instructorInitials: 'LT',
    date: 'Mar 30, 2026',
    duration: '2 hrs',
    price: '$25',
    spots: 10,
    rating: 4.6,
    format: 'Virtual',
    level: 'Beginner',
    image: hobbyStamps,
  },
  {
    id: '6',
    title: 'Model Train Engineering',
    instructor: 'Gary Olsen',
    instructorInitials: 'GO',
    date: 'Apr 2, 2026',
    duration: '3.5 hrs',
    price: '$55',
    spots: 6,
    rating: 4.8,
    format: 'In-Person',
    level: 'Intermediate',
    image: hobbyTrains,
  },
];

const filters = ['All', 'Free', 'Paid', 'Beginner', 'Intermediate', 'Advanced', 'In-Person', 'Virtual'] as const;
type Filter = (typeof filters)[number];

export default function ClassesPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const navigate = useNavigate();

  const filteredClasses = classes.filter((c) => {
    switch (activeFilter) {
      case 'Free':
        return c.price === 'Free';
      case 'Paid':
        return c.price !== 'Free';
      case 'Beginner':
      case 'Intermediate':
      case 'Advanced':
        return c.level === activeFilter;
      case 'In-Person':
      case 'Virtual':
        return c.format === activeFilter;
      default:
        return true;
    }
  });

  return (
    <MobileLayout>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg px-4 sm:px-6 pt-[env(safe-area-inset-top)] pb-2">
        <div className="flex items-center justify-between pt-3 pb-2">
          <h1 className="font-heading font-bold text-foreground text-xl sm:text-2xl">Classes</h1>
          <button
            onClick={() => navigate('/search?tab=classes')}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
            aria-label="Search classes"
          >
            <Search size={18} />
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-chip flex-shrink-0 ${activeFilter === filter ? 'filter-chip-active' : ''}`}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* Class list */}
      <div className="px-4 sm:px-6 pt-3 space-y-3.5">
        {filteredClasses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">No classes found</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="text-primary text-xs font-medium mt-2"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredClasses.map((c) => (
            <div
              key={c.id}
              className="hobby-card flex flex-col sm:flex-row overflow-hidden"
            >
              {/* Image */}
              <div className="w-full sm:w-40 md:w-48 flex-shrink-0">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-40 sm:h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading font-semibold text-base text-card-foreground leading-tight truncate">
                      {c.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-medium text-amber-500 flex-shrink-0">
                      <Star size={14} className="fill-amber-500" />
                      <span>{c.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-[10px]">{c.instructorInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground truncate">{c.instructor}</span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {c.date} &middot; {c.duration}
                  </p>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-semibold text-primary">
                      {c.price}
                    </span>
                    <span className="text-muted-foreground">
                      {c.spots} spots left
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-end">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/class/${c.id}`)}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </MobileLayout>
  );
}
