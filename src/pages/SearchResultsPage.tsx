import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Search, X, ChevronRight, Users, Star, Calendar } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import hobbyBirdwatching from '@/assets/hobby-birdwatching.jpg';
import hobbyForaging from '@/assets/hobby-foraging.jpg';
import hobbyTypewriters from '@/assets/hobby-typewriters.jpg';
import hobbyPottery from '@/assets/hobby-pottery.jpg';
import hobbyStamps from '@/assets/hobby-stamps.jpg';
import hobbyTrains from '@/assets/hobby-trains.jpg';

type Category = 'All' | 'Hobbies' | 'Classes' | 'Instructors' | 'Groups';
const categories: Category[] = ['All', 'Hobbies', 'Classes', 'Instructors', 'Groups'];

interface HobbyResult {
  type: 'hobby';
  slug: string;
  title: string;
  description: string;
  members: number;
  image: string;
}

interface ClassResult {
  type: 'class';
  id: string;
  title: string;
  instructor: string;
  date: string;
  price: string;
  image: string;
}

interface InstructorResult {
  type: 'instructor';
  id: string;
  name: string;
  initials: string;
  specialty: string;
  rating: number;
}

interface GroupResult {
  type: 'group';
  slug: string;
  name: string;
  description: string;
  members: number;
  image: string;
}

type SearchResult = HobbyResult | ClassResult | InstructorResult | GroupResult;

const mockResults: SearchResult[] = [
  // Hobbies
  {
    type: 'hobby',
    slug: 'hiking-enthusiasts',
    title: 'Hiking Enthusiasts',
    description: 'Explore trails and conquer peaks together',
    members: 8450,
    image: hobbyForaging,
  },
  {
    type: 'hobby',
    slug: 'birdwatching-adventures',
    title: 'Birdwatching Adventures',
    description: 'Spot rare birds in their natural habitats',
    members: 4521,
    image: hobbyBirdwatching,
  },
  {
    type: 'hobby',
    slug: 'night-sky-astronomy',
    title: 'Night Sky Astronomy',
    description: 'Stargazing and astrophotography community',
    members: 3120,
    image: hobbyTypewriters,
  },
  {
    type: 'hobby',
    slug: 'fly-fishing-network',
    title: 'Fly Fishing Network',
    description: 'Cast lines and share fishing stories',
    members: 1890,
    image: hobbyPottery,
  },
  // Classes
  {
    type: 'class',
    id: 'c1',
    title: 'Hiking 101',
    instructor: 'Marcus Reed',
    date: 'Mar 22, 2026',
    price: '$45',
    image: hobbyForaging,
  },
  {
    type: 'class',
    id: 'c2',
    title: 'Birdwatching Basics',
    instructor: 'Dr. Ana Reyes',
    date: 'Mar 24, 2026',
    price: 'Free',
    image: hobbyBirdwatching,
  },
  {
    type: 'class',
    id: 'c3',
    title: 'Night Sky Astronomy',
    instructor: 'Sam Whitmore',
    date: 'Mar 25, 2026',
    price: '$30',
    image: hobbyTypewriters,
  },
  {
    type: 'class',
    id: 'c4',
    title: 'Fly Fishing Masterclass',
    instructor: 'Elena Rossi',
    date: 'Mar 28, 2026',
    price: '$85',
    image: hobbyPottery,
  },
  // Instructors
  {
    type: 'instructor',
    id: 'i1',
    name: 'Marcus Reed',
    initials: 'MR',
    specialty: 'Hiking & Navigation',
    rating: 4.9,
  },
  {
    type: 'instructor',
    id: 'i2',
    name: 'Dr. Ana Reyes',
    initials: 'AR',
    specialty: 'Birdwatching & Ornithology',
    rating: 4.8,
  },
  {
    type: 'instructor',
    id: 'i3',
    name: 'Sam Whitmore',
    initials: 'SW',
    specialty: 'Astronomy & Astrophotography',
    rating: 4.7,
  },
  {
    type: 'instructor',
    id: 'i4',
    name: 'Elena Rossi',
    initials: 'ER',
    specialty: 'Fly Fishing & Conservation',
    rating: 4.9,
  },
  // Groups
  {
    type: 'group',
    slug: 'urban-exploration-squad',
    name: 'Urban Exploration Squad',
    description: 'Discover hidden cityscapes and abandoned places',
    members: 2341,
    image: hobbyStamps,
  },
  {
    type: 'group',
    slug: 'model-train-builders',
    name: 'Model Train Builders',
    description: 'Craft miniature railways and scenic layouts',
    members: 1567,
    image: hobbyTrains,
  },
  {
    type: 'group',
    slug: 'wildlife-photographers',
    name: 'Wildlife Photographers',
    description: 'Capture stunning shots of animals in the wild',
    members: 3890,
    image: hobbyBirdwatching,
  },
  {
    type: 'group',
    slug: 'backpacking-nomads',
    name: 'Backpacking Nomads',
    description: 'Multi-day wilderness treks and camping trips',
    members: 5120,
    image: hobbyForaging,
  },
];

function isHobby(r: SearchResult): r is HobbyResult {
  return r.type === 'hobby';
}

function isClass(r: SearchResult): r is ClassResult {
  return r.type === 'class';
}

function isInstructor(r: SearchResult): r is InstructorResult {
  return r.type === 'instructor';
}

function isGroup(r: SearchResult): r is GroupResult {
  return r.type === 'group';
}

export default function SearchResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get('q') ?? '';
  const initialTab = (params.get('tab') as Category) ?? 'All';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<Category>(
    categories.includes(initialTab) ? initialTab : 'All'
  );

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const q = p.get('q') ?? '';
    const tab = p.get('tab') as Category;
    setSearchQuery(q);
    if (tab && categories.includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return mockResults;
    return mockResults.filter((r) => {
      if (r.type === 'hobby') {
        return (
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query)
        );
      }
      if (r.type === 'class') {
        return (
          r.title.toLowerCase().includes(query) ||
          r.instructor.toLowerCase().includes(query)
        );
      }
      if (r.type === 'instructor') {
        return (
          r.name.toLowerCase().includes(query) ||
          r.specialty.toLowerCase().includes(query)
        );
      }
      return (
        r.name.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const hobbies = filteredResults.filter(isHobby);
  const classes = filteredResults.filter(isClass);
  const instructors = filteredResults.filter(isInstructor);
  const groups = filteredResults.filter(isGroup);

  const HobbyCard = ({ hobby }: { hobby: HobbyResult }) => (
    <button
      onClick={() => navigate(`/group/${hobby.slug}`)}
      className="w-full text-left hobby-card overflow-hidden flex flex-col sm:flex-row"
      aria-label={`View hobby ${hobby.title}`}
    >
      <div className="w-full sm:w-32 flex-shrink-0">
        <img
          src={hobby.image}
          alt={hobby.title}
          className="w-full h-36 sm:h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3.5 flex-1 min-w-0">
        <h3 className="font-heading font-semibold text-card-foreground text-sm sm:text-base leading-tight">
          {hobby.title}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1 line-clamp-2">
          {hobby.description}
        </p>
        <span className="flex items-center gap-1 text-muted-foreground text-xs mt-2">
          <Users size={13} />
          {hobby.members.toLocaleString()} members
        </span>
      </div>
    </button>
  );

  const ClassCard = ({ cls }: { cls: ClassResult }) => (
    <button
      onClick={() => navigate(`/class/${cls.id}`)}
      className="w-full text-left hobby-card overflow-hidden flex flex-col sm:flex-row"
      aria-label={`View class ${cls.title}`}
    >
      <div className="w-full sm:w-32 flex-shrink-0">
        <img
          src={cls.image}
          alt={cls.title}
          className="w-full h-36 sm:h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3.5 flex-1 min-w-0">
        <h3 className="font-heading font-semibold text-card-foreground text-sm sm:text-base leading-tight">
          {cls.title}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
          {cls.instructor}
        </p>
        <div className="flex items-center gap-3 text-xs mt-2">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Calendar size={13} />
            {cls.date}
          </span>
          <span className="font-semibold text-primary">{cls.price}</span>
        </div>
      </div>
    </button>
  );

  const InstructorCard = ({ instructor }: { instructor: InstructorResult }) => (
    <button
      onClick={() => navigate(`/instructor/${instructor.id}`)}
      className="w-full text-left hobby-card overflow-hidden flex items-center p-3.5 gap-3"
      aria-label={`View instructor ${instructor.name}`}
    >
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarFallback className="text-sm font-heading font-bold text-primary bg-primary/10">
          {instructor.initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-semibold text-card-foreground text-sm sm:text-base leading-tight">
          {instructor.name}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm">{instructor.specialty}</p>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-amber-500 flex-shrink-0">
        <Star size={14} className="fill-amber-500" />
        <span>{instructor.rating}</span>
      </div>
    </button>
  );

  const GroupCard = ({ group }: { group: GroupResult }) => (
    <button
      onClick={() => navigate(`/group/${group.slug}`)}
      className="w-full text-left hobby-card overflow-hidden flex flex-col sm:flex-row"
      aria-label={`View group ${group.name}`}
    >
      <div className="w-full sm:w-32 flex-shrink-0">
        <img
          src={group.image}
          alt={group.name}
          className="w-full h-36 sm:h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3.5 flex-1 min-w-0">
        <h3 className="font-heading font-semibold text-card-foreground text-sm sm:text-base leading-tight">
          {group.name}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1 line-clamp-2">
          {group.description}
        </p>
        <span className="flex items-center gap-1 text-muted-foreground text-xs mt-2">
          <Users size={13} />
          {group.members.toLocaleString()} members
        </span>
      </div>
    </button>
  );

  const SectionHeader = ({
    title,
    category,
    count,
  }: {
    title: string;
    category: Category;
    count: number;
  }) => (
    <div className="flex items-center justify-between mb-2.5">
      <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground">
        {title} <span className="text-muted-foreground font-normal">({count})</span>
      </h2>
      <button
        onClick={() => setActiveTab(category)}
        className="text-primary text-xs font-medium flex items-center gap-0.5"
        aria-label={`See all ${title.toLowerCase()}`}
      >
        See all <ChevronRight size={12} />
      </button>
    </div>
  );

  const renderResultsForTab = (tab: Category) => {
    switch (tab) {
      case 'Hobbies':
        return hobbies.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {hobbies.map((h) => (
              <HobbyCard key={h.slug} hobby={h} />
            ))}
          </div>
        );
      case 'Classes':
        return classes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {classes.map((c) => (
              <ClassCard key={c.id} cls={c} />
            ))}
          </div>
        );
      case 'Instructors':
        return instructors.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {instructors.map((i) => (
              <InstructorCard key={i.id} instructor={i} />
            ))}
          </div>
        );
      case 'Groups':
        return groups.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {groups.map((g) => (
              <GroupCard key={g.slug} group={g} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const EmptyState = () => (
    <div className="text-center py-8">
      <p className="text-muted-foreground text-sm">No results found</p>
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="text-primary text-xs font-medium mt-2"
        >
          Clear search
        </button>
      )}
    </div>
  );

  return (
    <MobileLayout hideTabBar>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg px-4 sm:px-6 pt-[env(safe-area-inset-top)] pb-2">
        <div className="flex items-center gap-3 pt-3 pb-2">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hobbies, classes, instructors..."
              className="w-full h-10 sm:h-11 pl-9 pr-9 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide mt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`filter-chip flex-shrink-0 ${activeTab === cat ? 'filter-chip-active' : ''}`}
              aria-pressed={activeTab === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Results */}
      <div className="px-4 sm:px-6 pt-3 pb-6 space-y-5">
        {activeTab === 'All' ? (
          <>
            {hobbies.length > 0 && (
              <section aria-label="Hobbies results">
                <SectionHeader title="HOBBIES" category="Hobbies" count={hobbies.length} />
                <div className="space-y-3">
                  {hobbies.slice(0, 3).map((h) => (
                    <HobbyCard key={h.slug} hobby={h} />
                  ))}
                </div>
              </section>
            )}

            {classes.length > 0 && (
              <section aria-label="Classes results">
                <SectionHeader title="CLASSES" category="Classes" count={classes.length} />
                <div className="space-y-3">
                  {classes.slice(0, 3).map((c) => (
                    <ClassCard key={c.id} cls={c} />
                  ))}
                </div>
              </section>
            )}

            {instructors.length > 0 && (
              <section aria-label="Instructors results">
                <SectionHeader
                  title="INSTRUCTORS"
                  category="Instructors"
                  count={instructors.length}
                />
                <div className="space-y-3">
                  {instructors.slice(0, 3).map((i) => (
                    <InstructorCard key={i.id} instructor={i} />
                  ))}
                </div>
              </section>
            )}

            {groups.length > 0 && (
              <section aria-label="Groups results">
                <SectionHeader title="GROUPS" category="Groups" count={groups.length} />
                <div className="space-y-3">
                  {groups.slice(0, 3).map((g) => (
                    <GroupCard key={g.slug} group={g} />
                  ))}
                </div>
              </section>
            )}

            {hobbies.length === 0 &&
              classes.length === 0 &&
              instructors.length === 0 &&
              groups.length === 0 && <EmptyState />}
          </>
        ) : (
          renderResultsForTab(activeTab)
        )}
      </div>
    </MobileLayout>
  );
}
