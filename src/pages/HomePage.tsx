import { Search, Bell, Plus, Video } from 'lucide-react';
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
  { type: 'hobby' as const, image: hobbyTrains, title: 'Model Train Builders', description: 'Build, collect, and showcase miniature train landscapes with fellow enthusiasts.', members: 2340, isLive: true, viewers: 128 },
  { type: 'sponsored' as const, title: 'Join the Model Train Expo 2026!', description: 'The biggest model train event of the year. Register now for early bird pricing.', brand: 'TrainWorld Co.', image: hobbyTrains },
  { type: 'hobby' as const, image: hobbyForaging, title: 'Urban Foraging Network', description: 'Discover edible plants, mushrooms, and herbs growing in urban environments.', members: 1856, isLive: false },
  { type: 'hobby' as const, image: hobbyTypewriters, title: 'Vintage Typewriter Collectors', description: 'Restore, trade, and celebrate the art of mechanical typing.', members: 978, isLive: true, viewers: 42 },
  { type: 'hobby' as const, image: hobbyPottery, title: 'Ceramic Arts Circle', description: 'From wheel-throwing to glazing — share your pottery journey.', members: 3102, joined: true },
  { type: 'sponsored' as const, title: 'Premium Pottery Tools — 20% Off', description: 'Handcrafted tools for serious ceramic artists. Use code NICHE20.', brand: 'ClayMaster', image: hobbyPottery },
  { type: 'hobby' as const, image: hobbyBirdwatching, title: 'Birdwatching Adventures', description: 'Log sightings, share photos, and explore birding trails worldwide.', members: 4521 },
  { type: 'hobby' as const, image: hobbyStamps, title: 'Philately Society', description: 'Trade rare stamps and learn about postal history from every era.', members: 1234 },
];

const upcomingEvents = [
  { name: 'Train Expo Live', time: 'Today, 4:00 PM', isLive: true },
  { name: 'Pottery Workshop', time: 'Tomorrow, 2:00 PM', isLive: false },
  { name: 'Bird Count 2026', time: 'Mar 12, 8:00 AM', isLive: false },
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
            placeholder="Search hobbies, groups, or events..."
            className="w-full h-10 sm:h-11 pl-9 pr-4 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Search hobbies"
          />
        </div>
      </header>

      <div className="px-4 sm:px-6 pt-3 space-y-4 sm:space-y-5">
        {/* Upcoming Events */}
        <section aria-label="Upcoming events">
          <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-2.5">Upcoming Events</h2>
          <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {upcomingEvents.map((ev) => (
              <div
                key={ev.name}
                className="flex-shrink-0 bg-card rounded-xl border border-border px-3.5 py-2.5 min-w-[160px] sm:min-w-[200px] cursor-pointer hover:shadow-sm transition-shadow"
                onClick={() => {
                  if (ev.isLive) {
                    navigate('/live');
                  } else {
                    toast({ title: ev.name, description: `Starts ${ev.time}` });
                  }
                }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {ev.isLive && <span className="live-badge text-[9px] px-1.5 py-0">LIVE</span>}
                  <span className="text-muted-foreground text-[10px] sm:text-[11px]">{ev.time}</span>
                </div>
                <p className="font-heading font-medium text-card-foreground text-xs sm:text-sm">{ev.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feed */}
        <section aria-label="Your feed">
          <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-2.5">Your Feed</h2>
          {filteredFeed.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">No results for "{searchQuery}"</p>
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
              onClick={() => { setFabOpen(false); navigate('/live'); }}
              className="flex items-center gap-2 bg-card shadow-lg rounded-full px-4 py-2.5 text-sm font-medium text-foreground border border-border"
            >
              <Video size={16} className="text-live" /> Go Live
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
