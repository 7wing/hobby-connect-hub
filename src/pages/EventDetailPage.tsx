import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import hobbyForaging from '@/assets/hobby-foraging.jpg';

const eventData = {
  id: '1',
  title: 'Group Hike: Barton Creek Greenbelt',
  coverImage: hobbyForaging,
  date: 'Sunday, June 28, 2026',
  time: '8:00 AM – 11:00 AM',
  location: 'Barton Creek Greenbelt Trailhead, Austin, TX',
  description:
    'Join us for a scenic morning hike along the Barton Creek Greenbelt. We\'ll explore shaded trails, spot local wildlife, and enjoy a group breakfast at the overlook. All skill levels are welcome — just bring water and comfortable shoes!',
  schedule: [
    { time: '8:00 AM', activity: 'Meet at the trailhead and group warmup' },
    { time: '8:30 AM', activity: 'Start hike — Barton Creek Loop (3.2 mi)' },
    { time: '10:00 AM', activity: 'Scenic overlook break and group photo' },
    { time: '10:30 AM', activity: 'Return loop and cool-down stretch' },
  ],
  attendees: [
    { initials: 'SM', name: 'Sarah Mitchell' },
    { initials: 'JR', name: 'Jake Reed' },
    { initials: 'PK', name: 'Priya Kumar' },
    { initials: 'TW', name: 'Tom Wilson' },
    { initials: 'LC', name: 'Lily Chen' },
    { initials: 'MR', name: 'Marcus Reed' },
    { initials: 'AR', name: 'Ana Reyes' },
    { initials: 'DK', name: 'David Kim' },
  ],
  relatedClass: {
    id: '1',
    title: 'Hiking 101',
    instructor: 'Marcus Reed',
    price: '$45',
    image: hobbyForaging,
  },
  comments: [
    {
      id: 'c1',
      name: 'Sarah Mitchell',
      initials: 'SM',
      timestamp: '2 days ago',
      text: 'Can\'t wait for this! The overlook is gorgeous in the morning light.',
    },
    {
      id: 'c2',
      name: 'Jake Reed',
      initials: 'JR',
      timestamp: '1 day ago',
      text: 'Bringing my new camera — hoping to get some wildlife shots.',
    },
    {
      id: 'c3',
      name: 'Priya Kumar',
      initials: 'PK',
      timestamp: '5 hours ago',
      text: 'Is there parking nearby? First timer here.',
    },
  ],
};

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rsvp, setRsvp] = useState<'going' | 'interested' | null>(null);

  const handleRsvp = (type: 'going' | 'interested') => {
    if (rsvp === type) {
      setRsvp(null);
      toast({
        title: type === 'going' ? 'RSVP removed' : 'Interest removed',
        description: `You are no longer ${type === 'going' ? 'going' : 'interested'} in this event.`,
      });
    } else {
      setRsvp(type);
      toast({
        title: type === 'going' ? 'You\'re going!' : 'You\'re interested!',
        description: `RSVP updated for "${eventData.title}"`,
      });
    }
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
      <div className="relative w-full h-56 sm:h-72">
        <img
          src={eventData.coverImage}
          alt={eventData.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title and metadata */}
      <div className="px-4 sm:px-6 pt-4">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
          {eventData.title}
        </h1>
      </div>

      <div className="px-4 sm:px-6 pt-3 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={16} className="text-primary flex-shrink-0" />
          <span className="font-medium text-foreground">{eventData.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={16} className="text-primary flex-shrink-0" />
          <span>{eventData.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} className="text-primary flex-shrink-0" />
          <span>{eventData.location}</span>
        </div>
      </div>

      {/* RSVP buttons */}
      <div className="px-4 sm:px-6 pt-4 flex gap-3">
        <Button
          variant={rsvp === 'going' ? 'default' : 'outline'}
          className="flex-1"
          size="lg"
          onClick={() => handleRsvp('going')}
        >
          Going
        </Button>
        <Button
          variant={rsvp === 'interested' ? 'default' : 'outline'}
          className="flex-1"
          size="lg"
          onClick={() => handleRsvp('interested')}
        >
          Interested
        </Button>
      </div>

      {/* Description */}
      <section className="px-4 sm:px-6 pt-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-2">
          About
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {eventData.description}
        </p>
      </section>

      {/* Schedule */}
      <section className="px-4 sm:px-6 pt-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-3">
          Schedule
        </h2>
        <div className="space-y-3">
          {eventData.schedule.map((item, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                {index < eventData.schedule.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-1" />
                )}
              </div>
              <div className="pb-3">
                <p className="text-sm font-semibold text-foreground">
                  {item.time}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.activity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Attendees */}
      <section className="px-4 sm:px-6 pt-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-3">
          Attendees
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {eventData.attendees.slice(0, 5).map((attendee, index) => (
              <Avatar
                key={index}
                className="h-8 w-8 border-2 border-background"
              >
                <AvatarFallback className="text-[10px]">
                  {attendee.initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            +{eventData.attendees.length - 5} more
          </span>
        </div>
      </section>

      {/* Related class */}
      <section className="px-4 sm:px-6 pt-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-3">
          Related Class
        </h2>
        <Card
          className="cursor-pointer overflow-hidden"
          onClick={() => navigate(`/class/${eventData.relatedClass.id}`)}
        >
          <div className="flex items-center gap-3 p-3">
            <img
              src={eventData.relatedClass.image}
              alt={eventData.relatedClass.title}
              className="w-16 h-16 rounded-md object-cover flex-shrink-0"
            />
            <CardContent className="p-0 flex-1">
              <p className="text-sm font-semibold text-foreground">
                {eventData.relatedClass.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {eventData.relatedClass.instructor}
              </p>
              <p className="text-xs font-medium text-primary mt-0.5">
                {eventData.relatedClass.price}
              </p>
            </CardContent>
          </div>
        </Card>
      </section>

      {/* Comments */}
      <section className="px-4 sm:px-6 pt-6 pb-8">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-3">
          Comments
        </h2>
        <div className="space-y-4">
          {eventData.comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="text-[10px]">
                  {comment.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {comment.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MobileLayout>
  );
}
