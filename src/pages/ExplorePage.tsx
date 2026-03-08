import { Search, MapPin, Grid3X3, List, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import HobbyCard from '@/components/HobbyCard';
import LiveBadge from '@/components/LiveBadge';
import SponsoredBadge from '@/components/SponsoredBadge';
import hobbyTrains from '@/assets/hobby-trains.jpg';
import hobbyForaging from '@/assets/hobby-foraging.jpg';
import hobbyTypewriters from '@/assets/hobby-typewriters.jpg';
import hobbyPottery from '@/assets/hobby-pottery.jpg';
import hobbyBirdwatching from '@/assets/hobby-birdwatching.jpg';
import hobbyStamps from '@/assets/hobby-stamps.jpg';

const categories = ['All', 'Crafts', 'Outdoor', 'Collecting', 'Tech', 'Music', 'Art', 'Cooking'];

const featuredSponsors = [
  { name: 'TrainWorld Co.', tagline: 'Premium model train kits', image: hobbyTrains },
  { name: 'ClayMaster', tagline: 'Artisan pottery tools', image: hobbyPottery },
  { name: 'WildHarvest', tagline: 'Foraging field guides', image: hobbyForaging },
];

const hobbies = [
  { image: hobbyTrains, title: 'Model Train Builders', description: 'Build miniature train landscapes', members: 2340, isLive: true, viewers: 128 },
  { image: hobbyForaging, title: 'Urban Foraging Network', description: 'Find edible plants in the city', members: 1856 },
  { image: hobbyTypewriters, title: 'Vintage Typewriters', description: 'Restore & collect typewriters', members: 978, isLive: true, viewers: 42 },
  { image: hobbyPottery, title: 'Ceramic Arts Circle', description: 'Wheel-throwing & glazing', members: 3102 },
  { image: hobbyBirdwatching, title: 'Birdwatching Adventures', description: 'Birding trails worldwide', members: 4521 },
  { image: hobbyStamps, title: 'Philately Society', description: 'Trade rare stamps', members: 1234 },
];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMap, setShowMap] = useState(false);

  return (
    <MobileLayout>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg px-4 pt-[env(safe-area-inset-top)] pb-2">
        <div className="flex items-center justify-between pt-3 pb-2">
          <h1 className="font-heading font-bold text-foreground text-xl">Explore</h1>
          <div className="flex gap-1.5">
            <button
              onClick={() => setShowMap(!showMap)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${showMap ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
              aria-label="Toggle map view"
            >
              <MapPin size={16} />
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground"
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
            placeholder="Discover niche hobbies..."
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Search hobbies"
          />
        </div>

        {/* Filter chips */}
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

      <div className="px-4 pt-3 space-y-5">
        {/* Featured Sponsors */}
        <section aria-label="Featured sponsors">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-semibold text-sm text-foreground">Featured Sponsors</h2>
              <SponsoredBadge />
            </div>
            <button className="text-primary text-xs font-medium flex items-center gap-0.5">
              See all <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {featuredSponsors.map((s) => (
              <div key={s.name} className="flex-shrink-0 w-40 bg-card rounded-xl border border-border overflow-hidden">
                <img src={s.image} alt={s.name} className="w-full h-20 object-cover" loading="lazy" />
                <div className="p-2.5">
                  <p className="font-heading font-semibold text-card-foreground text-xs">{s.name}</p>
                  <p className="text-muted-foreground text-[10px] mt-0.5">{s.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Map placeholder */}
        {showMap && (
          <section className="bg-muted rounded-xl h-48 flex items-center justify-center" aria-label="Map view">
            <div className="text-center">
              <MapPin size={28} className="mx-auto text-muted-foreground mb-1.5" />
              <p className="text-muted-foreground text-xs">Map showing nearby hobby groups & live events</p>
            </div>
          </section>
        )}

        {/* Live Now */}
        <section aria-label="Live now">
          <h2 className="font-heading font-semibold text-sm text-foreground mb-2.5">🔴 Live Now</h2>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {hobbies.filter(h => h.isLive).map((h) => (
              <div key={h.title} className="flex-shrink-0 w-52 bg-card rounded-xl border border-border overflow-hidden relative">
                <div className="relative">
                  <img src={h.image} alt={h.title} className="w-full h-28 object-cover" loading="lazy" />
                  <div className="absolute top-2 left-2">
                    <LiveBadge viewers={h.viewers} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="p-2.5">
                  <p className="font-heading font-semibold text-card-foreground text-xs">{h.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Hobbies */}
        <section aria-label="Browse hobbies">
          <h2 className="font-heading font-semibold text-sm text-foreground mb-2.5">Browse Hobbies</h2>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-3">
              {hobbies.map((h) => (
                <div key={h.title} className="hobby-card">
                  <div className="relative">
                    <img src={h.image} alt={h.title} className="w-full h-24 object-cover" loading="lazy" />
                    {h.isLive && <div className="absolute top-1.5 left-1.5"><LiveBadge /></div>}
                  </div>
                  <div className="p-2.5">
                    <p className="font-heading font-semibold text-card-foreground text-xs leading-tight">{h.title}</p>
                    <p className="text-muted-foreground text-[10px] mt-0.5">{h.members.toLocaleString()} members</p>
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
