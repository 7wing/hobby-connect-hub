import { Search, MapPin, Grid3X3, List, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import HobbyCard from '@/components/HobbyCard';
import hobbyTrains from '@/assets/hobby-trains.jpg';
import hobbyForaging from '@/assets/hobby-foraging.jpg';
import hobbyTypewriters from '@/assets/hobby-typewriters.jpg';
import hobbyPottery from '@/assets/hobby-pottery.jpg';
import hobbyBirdwatching from '@/assets/hobby-birdwatching.jpg';
import hobbyStamps from '@/assets/hobby-stamps.jpg';

const categories = ['All', 'Hiking', 'Birdwatching', 'Astronomy', 'Fishing', 'Trains', 'Architecture', 'Urban Exploration', 'Hunting'];

const categoryMap: Record<string, string[]> = {
  Hiking: ['Urban Foraging Network'],
  Birdwatching: ['Birdwatching Adventures'],
  Astronomy: [],
  Fishing: [],
  Trains: ['Model Train Builders'],
  Architecture: [],
  'Urban Exploration': ['Urban Foraging Network'],
  Hunting: [],
};

const featuredInstructors = [
  { name: 'Marcus Chen', specialty: 'Model Trains', image: hobbyTrains },
  { name: 'Elena Rossi', specialty: 'Pottery & Ceramics', image: hobbyPottery },
  { name: 'Sam Whitmore', specialty: 'Urban Foraging', image: hobbyForaging },
];

const allHobbies = [
  { id: '1', image: hobbyTrains, title: 'Model Train Builders', description: 'Build miniature train landscapes', members: 2340 },
  { id: '2', image: hobbyForaging, title: 'Urban Foraging Network', description: 'Find edible plants in the city', members: 1856 },
  { id: '3', image: hobbyTypewriters, title: 'Vintage Typewriters', description: 'Restore & collect typewriters', members: 978 },
  { id: '4', image: hobbyPottery, title: 'Ceramic Arts Circle', description: 'Wheel-throwing & glazing', members: 3102 },
  { id: '5', image: hobbyBirdwatching, title: 'Birdwatching Adventures', description: 'Birding trails worldwide', members: 4521 },
  { id: '6', image: hobbyStamps, title: 'Philately Society', description: 'Trade rare stamps', members: 1234 },
];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMap, setShowMap] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  let hobbies = allHobbies;

  // Filter by category
  if (activeCategory !== 'All') {
    const matchingTitles = categoryMap[activeCategory] || [];
    hobbies = hobbies.filter(h => matchingTitles.includes(h.title));
  }

  // Filter by search
  if (searchQuery.trim()) {
    hobbies = hobbies.filter(h =>
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <MobileLayout>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg px-4 sm:px-6 pt-[env(safe-area-inset-top)] pb-2">
        <div className="flex items-center justify-between pt-3 pb-2">
          <h1 className="font-heading font-bold text-foreground text-xl sm:text-2xl">Explore</h1>
          <div className="flex gap-1.5">
            <button
              onClick={() => setShowMap(!showMap)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-colors ${showMap ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
              aria-label="Toggle map view"
            >
              <MapPin size={16} />
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground"
              aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
            >
              {viewMode === 'grid' ? <List size={16} /> : <Grid3X3 size={16} />}
            </button>
          </div>
        </div>

        <div className="relative mt-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search classes, groups, instructors..."
            className="w-full h-10 sm:h-11 pl-9 pr-4 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Search hobbies"
          />
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-chip flex-shrink-0 ${activeCategory === cat ? 'filter-chip-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="px-4 sm:px-6 pt-3 space-y-5">
        {/* Featured Instructors */}
        <section aria-label="Featured instructors">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground">Featured Instructors</h2>
            <button
              onClick={() => navigate('/search?tab=instructors')}
              className="text-primary text-xs font-medium flex items-center gap-0.5"
            >
              See all <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {featuredInstructors.map((i) => (
              <div
                key={i.name}
                onClick={() => navigate('/search?tab=instructors')}
                className="flex-shrink-0 w-40 sm:w-48 bg-card rounded-xl border border-border overflow-hidden cursor-pointer hover:shadow-sm transition-shadow"
              >
                <img src={i.image} alt={i.name} className="w-full h-20 sm:h-24 object-cover" loading="lazy" />
                <div className="p-2.5">
                  <p className="font-heading font-semibold text-card-foreground text-xs sm:text-sm">{i.name}</p>
                  <p className="text-muted-foreground text-[10px] sm:text-[11px] mt-0.5">{i.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {showMap && (
          <section className="bg-muted rounded-xl h-48 sm:h-64 flex items-center justify-center" aria-label="Map view">
            <div className="text-center">
              <MapPin size={28} className="mx-auto text-muted-foreground mb-1.5" />
              <p className="text-muted-foreground text-xs sm:text-sm">Map showing nearby hobby groups & live events</p>
            </div>
          </section>
        )}

        {/* All Hobbies */}
        <section aria-label="Browse hobbies">
          <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-2.5">Browse Hobbies</h2>
          {hobbies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">No hobbies found</p>
              <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="text-primary text-xs font-medium mt-2">Clear filters</button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hobbies.map((h) => (
                <div
                  key={h.title}
                  className="hobby-card cursor-pointer"
                  onClick={() => navigate(`/group/${h.title.toLowerCase().replace(/\s+/g, '-')}`)}
                >
                  <div className="relative">
                    <img src={h.image} alt={h.title} className="w-full h-24 sm:h-32 object-cover" loading="lazy" />
                  </div>
                  <div className="p-2.5">
                    <p className="font-heading font-semibold text-card-foreground text-xs sm:text-sm leading-tight">{h.title}</p>
                    <p className="text-muted-foreground text-[10px] sm:text-[11px] mt-0.5">{h.members.toLocaleString()} members</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2.5">
              {hobbies.map((h) => (
                <HobbyCard key={h.title} {...h} />
              ))}
            </div>
          )}
        </section>
      </div>
    </MobileLayout>
  );
}
