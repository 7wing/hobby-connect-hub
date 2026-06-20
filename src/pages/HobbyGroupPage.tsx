import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Calendar,
  MapPin,
  Users,
  FileText,
  ChevronRight,
} from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import hobbyForaging from '@/assets/hobby-foraging.jpg';

const mockGroup = {
  slug: 'austin-hikers',
  name: 'Austin Hikers',
  description:
    'A community of hiking enthusiasts exploring trails around Austin, TX. All skill levels welcome!',
  coverImage: hobbyForaging,
  memberCount: 1247,
  postCount: 342,
  upcomingEventCount: 3,
  classes: [
    {
      id: 'c1',
      title: 'Hiking 101: Beginner Trails',
      date: 'Mar 22, 2026',
      instructor: 'Marcus Reed',
    },
    {
      id: 'c2',
      title: 'Wildflower Identification Walk',
      date: 'Apr 5, 2026',
      instructor: 'Sarah Jenkins',
    },
    {
      id: 'c3',
      title: 'Sunset Peak Challenge',
      date: 'Apr 12, 2026',
      instructor: 'David Ko',
    },
  ],
  members: [
    { id: 'm1', name: 'Marcus Reed', initials: 'MR' },
    { id: 'm2', name: 'Sarah Jenkins', initials: 'SJ' },
    { id: 'm3', name: 'David Ko', initials: 'DK' },
    { id: 'm4', name: 'Elena Rossi', initials: 'ER' },
    { id: 'm5', name: 'Sam Whitmore', initials: 'SW' },
  ],
  extraMembers: 42,
  recentPosts: [
    {
      id: 'p1',
      author: { name: 'Sarah Jenkins', initials: 'SJ' },
      timestamp: '2h ago',
      text: 'Just got back from the Barton Creek trail — the wildflowers are absolutely stunning right now! Highly recommend the east loop if you want the best views.',
      likes: 24,
      comments: 8,
    },
    {
      id: 'p2',
      author: { name: 'David Ko', initials: 'DK' },
      timestamp: '5h ago',
      text: 'Reminder: sunscreen and extra water are must-haves this weekend. Temps are hitting 95°F on the ridge trails. Stay safe out there!',
      likes: 56,
      comments: 12,
    },
    {
      id: 'p3',
      author: { name: 'Elena Rossi', initials: 'ER' },
      timestamp: '1d ago',
      text: 'Does anyone have recommendations for hiking poles? Looking for something lightweight and collapsible for the upcoming Sunset Peak Challenge.',
      likes: 15,
      comments: 6,
    },
  ],
  upcomingEvents: [
    {
      id: 'e1',
      title: 'Group Hike: Mount Bonnell',
      date: 'Mar 28, 2026',
      location: 'Mount Bonnell Trailhead, Austin, TX',
    },
    {
      id: 'e2',
      title: 'Sunset Social & Potluck',
      date: 'Apr 2, 2026',
      location: 'Zilker Park Picnic Area',
    },
  ],
};

export default function HobbyGroupPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [joined, setJoined] = useState(false);

  const group = mockGroup;

  const handleJoinToggle = () => {
    setJoined((prev) => {
      const next = !prev;
      toast({
        title: next ? 'Joined Group' : 'Left Group',
        description: next
          ? `You're now a member of ${group.name}`
          : `You left ${group.name}`,
      });
      return next;
    });
  };

  const handleMembersClick = () => {
    toast({
      title: 'Members',
      description: `${group.memberCount.toLocaleString()} members in this group`,
    });
    navigate(`/group/${slug}/members`);
  };

  return (
    <MobileLayout>
      {/* Header / Back button */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg px-4 sm:px-6 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center pt-3 pb-2">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>

      {/* Cover image */}
      <div className="relative w-full h-48 sm:h-64">
        <img
          src={group.coverImage}
          alt={group.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            {group.name}
          </h1>
          <p className="text-white/90 text-sm mt-1">
            {group.memberCount.toLocaleString()} members
          </p>
        </div>
      </div>

      {/* Description + Join */}
      <div className="px-4 sm:px-6 pt-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {group.description}
        </p>
        <div className="pt-3">
          <Button
            className="w-full"
            size="lg"
            variant={joined ? 'secondary' : 'default'}
            onClick={handleJoinToggle}
          >
            {joined ? 'Joined' : 'Join Group'}
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 sm:px-6 pt-5">
        <div className="flex items-center justify-around rounded-xl border bg-card p-3">
          <div className="flex flex-col items-center gap-0.5">
            <Users size={18} className="text-muted-foreground" />
            <span className="text-sm font-semibold text-card-foreground">
              {group.memberCount.toLocaleString()}
            </span>
            <span className="text-[10px] text-muted-foreground">Members</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex flex-col items-center gap-0.5">
            <FileText size={18} className="text-muted-foreground" />
            <span className="text-sm font-semibold text-card-foreground">
              {group.postCount.toLocaleString()}
            </span>
            <span className="text-[10px] text-muted-foreground">Posts</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex flex-col items-center gap-0.5">
            <Calendar size={18} className="text-muted-foreground" />
            <span className="text-sm font-semibold text-card-foreground">
              {group.upcomingEventCount}
            </span>
            <span className="text-[10px] text-muted-foreground">Events</span>
          </div>
        </div>
      </div>

      {/* CLASSES IN THIS GROUP */}
      <section className="px-4 sm:px-6 pt-6" aria-label="Classes in this group">
        <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-2.5">
          CLASSES IN THIS GROUP
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {group.classes.map((cls) => (
            <div
              key={cls.id}
              onClick={() => navigate(`/class/${cls.id}`)}
              className="flex-shrink-0 w-56 sm:w-64 rounded-xl border bg-card overflow-hidden cursor-pointer hover:shadow-sm transition-shadow"
            >
              <div className="p-3">
                <p className="font-heading font-semibold text-card-foreground text-xs sm:text-sm leading-tight">
                  {cls.title}
                </p>
                <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                  {cls.date}
                </p>
                <p className="text-muted-foreground text-[10px] sm:text-xs mt-0.5">
                  Instructor: {cls.instructor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERS */}
      <section className="px-4 sm:px-6 pt-6" aria-label="Members">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground">
            MEMBERS
          </h2>
          <button
            onClick={handleMembersClick}
            className="text-primary text-xs font-medium flex items-center gap-0.5"
          >
            See all <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {group.members.map((member) => (
              <button
                key={member.id}
                onClick={() =>
                  toast({
                    title: member.name,
                    description: `Viewing ${member.name}'s profile`,
                  })
                }
                className="relative z-0 hover:z-10 transition-transform hover:scale-110"
              >
                <Avatar className="h-9 w-9 border-2 border-background">
                  <AvatarFallback className="text-[10px]">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            +{group.extraMembers} more
          </span>
        </div>
      </section>

      {/* RECENT POSTS */}
      <section className="px-4 sm:px-6 pt-6" aria-label="Recent posts">
        <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-2.5">
          RECENT POSTS
        </h2>
        <div className="space-y-3">
          {group.recentPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              className="rounded-xl border bg-card p-3 cursor-pointer hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-[10px]">
                    {post.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-medium text-card-foreground">
                    {post.author.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {post.timestamp}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {post.text}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Heart size={14} />
                  <span className="text-xs">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MessageCircle size={14} />
                  <span className="text-xs">{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="px-4 sm:px-6 pt-6 pb-8" aria-label="Upcoming events">
        <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-2.5">
          UPCOMING EVENTS
        </h2>
        <div className="space-y-3">
          {group.upcomingEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/event/${event.id}`)}
              className="rounded-xl border bg-card p-3 cursor-pointer hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
                  <Calendar size={16} className="text-primary" />
                  <span className="text-[10px] font-semibold text-primary mt-0.5">
                    {event.date.split(' ')[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground leading-tight">
                    {event.title}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                    <MapPin size={12} />
                    <span className="text-[11px] truncate">{event.location}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {event.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MobileLayout>
  );
}
