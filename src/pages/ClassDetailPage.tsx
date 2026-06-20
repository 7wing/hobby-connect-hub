import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, CheckCircle2 } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import hobbyForaging from '@/assets/hobby-foraging.jpg';

const classData = {
  id: '1',
  title: 'Hiking 101',
  coverImage: hobbyForaging,
  instructor: { id: 'inst-1', name: 'Marcus Reed', initials: 'MR' },
  rating: 4.8,
  reviewCount: 24,
  price: '$45',
  spotsLeft: 5,
  waitlist: false,
  whatYoullLearn: [
    'How to choose the right trail for your fitness level',
    'Essential safety protocols for wilderness hiking',
    'Navigation basics using a map and compass',
    'Leave No Trace principles for eco-friendly trekking',
    'Packing techniques for day hikes and overnights',
  ],
  materials: [
    'Comfortable hiking boots or trail shoes',
    'Water bottle (at least 1 liter)',
    'Weather-appropriate clothing layers',
    'Small backpack for personal items',
  ],
  sessions: [
    { date: 'Mar 22, 2026', time: '9:00 AM – 12:00 PM' },
    { date: 'Mar 29, 2026', time: '9:00 AM – 12:00 PM' },
  ],
  reviews: [
    {
      id: 'r1',
      name: 'Sarah J.',
      rating: 5,
      date: 'Feb 15, 2026',
      comment:
        'Marcus is an incredible instructor. I learned so much about trail safety and felt confident on my first solo hike!',
    },
    {
      id: 'r2',
      name: 'David K.',
      rating: 4,
      date: 'Jan 28, 2026',
      comment:
        'Great class with practical tips. The navigation section was especially helpful. Would recommend to any beginner.',
    },
    {
      id: 'r3',
      name: 'Emily R.',
      rating: 5,
      date: 'Jan 10, 2026',
      comment:
        'Loved the group hike at the end. Met some great people and the instructor was very patient and knowledgeable.',
    },
  ],
};

export default function ClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <MobileLayout>
      {/* Header / Back button */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg px-4 sm:px-6 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center pt-3 pb-2">
          <button
            onClick={() => navigate('/classes')}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
            aria-label="Go back to classes"
          >
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>

      {/* Cover image */}
      <div className="relative w-full h-56 sm:h-72">
        <img
          src={classData.coverImage}
          alt={classData.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <div className="px-4 sm:px-6 pt-4">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
          {classData.title}
        </h1>
      </div>

      {/* Instructor row */}
      <div className="px-4 sm:px-6 pt-3">
        <button
          onClick={() => navigate(`/instructor/${classData.instructor.id}`)}
          className="flex items-center gap-3 group"
          aria-label={`View instructor profile for ${classData.instructor.name}`}
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-xs">
              {classData.instructor.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            {classData.instructor.name}
          </span>
        </button>
      </div>

      {/* Rating row */}
      <div className="px-4 sm:px-6 pt-2 flex items-center gap-1.5">
        <Star size={16} className="fill-amber-500 text-amber-500" />
        <span className="text-sm font-semibold text-foreground">
          {classData.rating}
        </span>
        <span className="text-sm text-muted-foreground">
          ({classData.reviewCount} reviews)
        </span>
      </div>

      {/* What you'll learn */}
      <section className="px-4 sm:px-6 pt-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-3">
          What you&apos;ll learn
        </h2>
        <ul className="space-y-2">
          {classData.whatYoullLearn.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Materials */}
      <section className="px-4 sm:px-6 pt-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-3">
          Materials to bring
        </h2>
        <ul className="space-y-2">
          {classData.materials.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Session dates */}
      <section className="px-4 sm:px-6 pt-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-3">
          Upcoming sessions
        </h2>
        <div className="space-y-2">
          {classData.sessions.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border bg-card p-3"
            >
              <span className="text-sm font-medium text-card-foreground">
                {session.date}
              </span>
              <span className="text-sm text-muted-foreground">
                {session.time}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Spots / waitlist + Price */}
      <section className="px-4 sm:px-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-foreground">
              {classData.price}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {classData.spotsLeft > 0
                ? `${classData.spotsLeft} spots left`
                : classData.waitlist
                ? 'Waitlist available'
                : 'Class full'}
            </p>
          </div>
        </div>
      </section>

      {/* Book now CTA */}
      <div className="px-4 sm:px-6 pt-4 pb-2">
        <Button
          className="w-full"
          size="lg"
          onClick={() => navigate(`/class/${id}/signup`)}
        >
          Book now
        </Button>
      </div>

      {/* Reviews */}
      <section className="px-4 sm:px-6 pt-6 pb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-3">
          Reviews
        </h2>
        <div className="space-y-4">
          {classData.reviews.map((review) => (
            <div key={review.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-[10px]">
                      {review.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-card-foreground">
                    {review.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {review.date}
                </span>
              </div>
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < review.rating
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-muted-foreground'
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </section>
    </MobileLayout>
  );
}
