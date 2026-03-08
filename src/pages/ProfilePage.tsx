import { Settings, Edit3, Video, LogOut, MapPin, Calendar, Activity, Award, Sun, Moon, Monitor, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/MobileLayout';
import LiveBadge from '@/components/LiveBadge';
import SponsoredBadge from '@/components/SponsoredBadge';
import { useTheme } from '@/hooks/useTheme';
import hobbyTrains from '@/assets/hobby-trains.jpg';
import hobbyPottery from '@/assets/hobby-pottery.jpg';
import hobbyBirdwatching from '@/assets/hobby-birdwatching.jpg';

const myHobbies = [
  { name: 'Model Trains', emoji: '🚂' },
  { name: 'Pottery', emoji: '🏺' },
  { name: 'Birdwatching', emoji: '🐦' },
  { name: 'Stamp Collecting', emoji: '📮' },
  { name: 'Urban Foraging', emoji: '🌿' },
];

const connections = [
  { name: 'Sarah M.', initials: 'SM', online: true },
  { name: 'Jake R.', initials: 'JR', online: false },
  { name: 'Priya K.', initials: 'PK', online: true },
  { name: 'Tom W.', initials: 'TW', online: false },
  { name: 'Lily C.', initials: 'LC', online: true },
  { name: 'Mark D.', initials: 'MD', online: false },
];

const liveHistory = [
  { title: 'Train Building Session #12', date: 'Mar 5, 2026', viewers: 234, duration: '1h 23m', image: hobbyTrains },
  { title: 'Pottery Wheel Demo', date: 'Feb 28, 2026', viewers: 189, duration: '45m', image: hobbyPottery },
  { title: 'Spring Bird Count', date: 'Feb 20, 2026', viewers: 567, duration: '2h 10m', image: hobbyBirdwatching },
];

const sponsoredDeals = [
  { brand: 'TrainWorld Co.', offer: '15% off starter kits', code: 'NICHE15' },
  { brand: 'ClayMaster', offer: 'Free shipping on tools', code: 'NCFREE' },
];

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();

  return (
    <MobileLayout>
      {/* Header */}
      <header className="bg-gradient-to-b from-primary/10 to-background px-4 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between pt-3 pb-2">
          <h1 className="font-heading font-bold text-foreground text-xl">Profile</h1>
          <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center" aria-label="Settings">
            <Settings size={18} className="text-foreground" />
          </button>
        </div>

        {/* Profile card */}
        <div className="flex items-start gap-4 mt-2 pb-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-heading font-bold text-2xl">AJ</span>
            </div>
            <div className="online-dot absolute -bottom-0.5 -right-0.5" />
          </div>
          <div className="flex-1 pt-1">
            <h2 className="font-heading font-bold text-foreground text-lg">Alex Johnson</h2>
            <p className="text-muted-foreground text-xs mt-0.5">Hobby enthusiast & collector</p>
            <div className="flex items-center gap-3 mt-2 text-muted-foreground text-[11px]">
              <span className="flex items-center gap-1"><MapPin size={11} /> Portland, OR</span>
              <span className="flex items-center gap-1"><Calendar size={11} /> Joined Jan 2025</span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 space-y-5 pt-2">
        {/* Action buttons */}
        <div className="flex gap-2">
          <Button variant="default" size="sm" className="flex-1 rounded-xl h-9 gap-1.5">
            <Edit3 size={14} /> Edit Profile
          </Button>
          <Button variant="outline" size="sm" className="flex-1 rounded-xl h-9 gap-1.5">
            <Video size={14} /> Go Live
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Hobbies', value: '5', icon: Activity },
            { label: 'Connections', value: '48', icon: Award },
            { label: 'Live Streams', value: '12', icon: Video },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-3 text-center">
              <stat.icon size={16} className="mx-auto text-primary mb-1" />
              <p className="font-heading font-bold text-foreground text-lg leading-tight">{stat.value}</p>
              <p className="text-muted-foreground text-[10px]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* About Me */}
        <section aria-label="About me">
          <h3 className="font-heading font-semibold text-sm text-foreground mb-2">About Me</h3>
          <p className="text-muted-foreground text-xs leading-relaxed bg-card rounded-xl border border-border p-3">
            Passionate about niche hobbies since childhood. I love building model train layouts, 
            throwing pottery on the wheel, and birdwatching on weekend mornings. Always looking 
            to connect with fellow hobbyists and learn something new!
          </p>
        </section>

        {/* My Hobbies */}
        <section aria-label="My hobbies">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-semibold text-sm text-foreground">My Hobbies</h3>
            <button className="text-primary text-xs font-medium">+ Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {myHobbies.map((h) => (
              <span key={h.name} className="bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-medium">
                {h.emoji} {h.name}
              </span>
            ))}
          </div>
        </section>

        {/* Connections */}
        <section aria-label="Connections">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-semibold text-sm text-foreground">Connections</h3>
            <button className="text-primary text-xs font-medium flex items-center gap-0.5">
              See all <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {connections.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground font-heading font-semibold text-xs">{c.initials}</span>
                  </div>
                  {c.online && <div className="online-dot absolute -bottom-0.5 -right-0.5" />}
                </div>
                <span className="text-[10px] text-muted-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Live History */}
        <section aria-label="Live stream history">
          <h3 className="font-heading font-semibold text-sm text-foreground mb-2">Live History</h3>
          <div className="space-y-2.5">
            {liveHistory.map((stream) => (
              <div key={stream.title} className="flex gap-3 bg-card rounded-xl border border-border p-2.5">
                <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={stream.image} alt={stream.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                    <Play size={16} className="text-card fill-card" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-medium text-card-foreground text-xs truncate">{stream.title}</p>
                  <p className="text-muted-foreground text-[10px] mt-0.5">{stream.date} · {stream.duration}</p>
                  <p className="text-muted-foreground text-[10px]">{stream.viewers} viewers</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsored Deals */}
        <section aria-label="Sponsored deals">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-heading font-semibold text-sm text-foreground">Deals for You</h3>
            <SponsoredBadge />
          </div>
          <div className="space-y-2">
            {sponsoredDeals.map((deal) => (
              <div key={deal.brand} className="bg-card rounded-xl border border-sponsored/20 p-3 flex items-center justify-between">
                <div>
                  <p className="font-heading font-medium text-card-foreground text-xs">{deal.brand}</p>
                  <p className="text-muted-foreground text-[10px] mt-0.5">{deal.offer}</p>
                </div>
                <span className="bg-sponsored/10 text-sponsored font-mono text-[11px] font-semibold px-2.5 py-1 rounded-lg">{deal.code}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Theme Toggle */}
        <section aria-label="Appearance settings">
          <h3 className="font-heading font-semibold text-sm text-foreground mb-2">Appearance</h3>
          <div className="bg-card rounded-xl border border-border p-1 flex gap-1">
            {[
              { value: 'light' as const, icon: Sun, label: 'Light' },
              { value: 'dark' as const, icon: Moon, label: 'Dark' },
              { value: 'system' as const, icon: Monitor, label: 'System' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                  theme === opt.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label={`${opt.label} mode`}
              >
                <opt.icon size={14} />
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 text-destructive text-sm font-medium py-3 mb-4">
          <LogOut size={16} /> Log out
        </button>
      </div>
    </MobileLayout>
  );
}
