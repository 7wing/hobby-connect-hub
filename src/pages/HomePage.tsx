import { Search, Bell, Plus, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import HobbyCard from '@/components/HobbyCard';
import SponsoredCard from '@/components/SponsoredCard';
import MobileLayout from '@/components/MobileLayout';
import hobbyTrains from '@/assets/hobby-trains.jpg';
import hobbyForaging from '@/assets/hobby-foraging.jpg';
import hobbyTypewriters from '@/assets/hobby-typewriters.jpg';
import hobbyPottery from '@/assets/hobby-pottery.jpg';
import hobbyBirdwatching from '@/assets/hobby-birdwatching.jpg';
import hobbyStamps from '@/assets/hobby-stamps.jpg';

const allFeedItems = [
  { type: 'hobby' as const, id: '1', image: hobbyTrains, title: 'Model Train Builders', description: 'Build, collect, and showcase miniature train landscapes with fellow enthusiasts.', members: 2340 },
  { type: 'sponsored' as const, title: 'Join the Model Train Expo 2026!', description: 'The biggest model train event of the year. Register now for early bird pricing.', brand: 'TrainWorld Co.', image: hobbyTrains },
  { type: 'hobby' as const, id: '2', image: hobbyForaging, title: 'Urban Foraging Network', description: 'Discover edible plants, mushrooms, and herbs growing in urban environments.', members: 1856 },
  { type: 'hobby' as const, id: '3', image: hobbyTypewriters, title: 'Vintage Typewriter Collectors', description: 'Restore, trade, and celebrate the art of mechanical typing.', members: 978 },
  { type: 'hobby' as const, id: '4', image: hobbyPottery, title: 'Ceramic Arts Circle', description: 'From wheel-throwing to glazing — share your pottery journey.', members: 3102, joined: true },
  { type: 'sponsored' as const, title: 'Premium Pottery Tools — 20% Off', description: 'Handcrafted tools for serious ceramic artists. Use code NICHE20.', brand: 'ClayMaster', image: hobbyPottery },
  { type: 'hobby' as const, id: '5', image: hobbyBirdwatching, title: 'Birdwatching Adventures', description: 'Log sightings, share photos, and explore birding trails worldwide.', members: 4521 },
  { type: 'hobby' as const, id: '6', image: hobbyStamps, title: 'Philately Society', description: 'Trade rare stamps and learn about postal history from every era.', members: 1234 },
];

const upcomingClasses = [
  { id: 1, title: 'Intro to Pottery', instructor: 'Sarah Chen', date: 'Mar 15, 10:00 AM', price: '$45', image: hobbyPottery },
  { id: 2, title: 'Urban Foraging 101', instructor: 'Miles Green', date: 'Mar 16, 2:00 PM', price: '$30', image: hobbyForaging },
  { id: 3, title: 'Birdwatching Basics', instructor: 'Dr. Ana Reyes', date: 'Mar 18, 8:00 AM', price: '$25', image: hobbyBirdwatching },
];

export default function HomePage() {
  const [fabOpen, setFabOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredFeed = searchQuery.trim()
    ? allFeedItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description?.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allFeedItems;

  return (
    <MobileLayout>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg px-4 sm:px-6 pt-[env(safe-area-inset-top)] pb-2">
        <div className="flex items-center justify-between pt-3 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => navigate('/profile')}>
              <span className="text-primary font-heading font-bold text-sm">AJ</span>
            </div>
            <div>
              <p className="text-muted-foreground text-[11px] sm:text-xs">Welcome back</p>
              <h1 className="font-heading font-bold text-foreground text-base sm:text-lg leading-tight">Alex Johnson</h1>
            </div>
          </div>
          <button
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center"
            aria-label="Notifications"
            onClick={() => toast({ title: 'Notifications', description: 'You have 3 new notifications' })}
          >
            <Bell size={18} className="text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-live" />
          </button>
        </div>

        {/* Search */}
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
      </header>

      <div className="px-4 sm:px-6 pt-3 space-y-4 sm:space-y-5">
        {/* Upcoming Classes */}
        <section aria-label="Upcoming classes">
          <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-2.5">Upcoming Classes</h2>
          <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {upcomingClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex-shrink-0 bg-card rounded-xl border border-border overflow-hidden min-w-[180px] sm:min-w-[220px] cursor-pointer hover:shadow-sm transition-shadow"
                onClick={() => navigate(`/class/${cls.id}`)}
              >
                <img src={cls.image} alt={cls.title} className="w-full h-24 sm:h-28 object-cover" />
                <div className="p-3">
                  <p className="font-heading font-medium text-card-foreground text-xs sm:text-sm">{cls.title}</p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs mt-0.5">{cls.instructor}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-muted-foreground text-[10px] sm:text-[11px]">{cls.date}</span>
                    <span className="text-primary font-semibold text-[10px] sm:text-xs bg-primary/10 px-1.5 py-0.5 rounded">{cls.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feed */}
        <section aria-label="Your feed">
          <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-2.5">Your Feed</h2>
          {filteredFeed.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">No results for &quot;{searchQuery}&quot;</p>
              <button onClick={() => setSearchQuery('')} className="text-primary text-xs font-medium mt-2">Clear search</button>
            </div>
          ) : (
            <div className="space-y-3.5 sm:space-y-4">
              {filteredFeed.map((item, i) =>
                item.type === 'sponsored' ? (
                  <SponsoredCard key={i} title={item.title} description={item.description!} brand={item.brand!} image={item.image!} />
                ) : (
                  <HobbyCard key={i} {...item} />
                )
              )}
            </div>
          )}
        </section>
      </div>

      {/* FAB */}
      <div className="fixed bottom-20 right-4 sm:right-6 z-50">
        {fabOpen && (
          <div className="mb-3 space-y-2 animate-in slide-in-from-bottom-2 fade-in">
            <button
              onClick={() => {
                setFabOpen(false);
                toast({ title: 'Create Group', description: 'Group creation coming soon!' });
              }}
              className="flex items-center gap-2 bg-card shadow-lg rounded-full px-4 py-2.5 text-sm font-medium text-foreground border border-border"
            >
              <Plus size={16} className="text-primary" /> New Group
            </button>
            <button
              onClick={() => { setFabOpen(false); navigate('/classes'); }}
              className="flex items-center gap-2 bg-card shadow-lg rounded-full px-4 py-2.5 text-sm font-medium text-foreground border border-border"
            >
              <BookOpen size={16} className="text-primary" /> Browse Classes
            </button>
          </div>
        )}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className={`fab transition-transform ${fabOpen ? 'rotate-45' : ''}`}
          aria-label="Create new"
        >
          <Plus size={24} />
        </button>
      </div>
    </MobileLayout>
  );
}
