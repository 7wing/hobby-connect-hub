import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Users, BookOpen, Calendar } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const instructorData = {
  id: 'inst-1',
  name: 'Marcus Reed',
  initials: 'MR',
  bio: 'Outdoor educator and certified wilderness guide with over 10 years of experience leading hikes, navigation workshops, and wildlife observation trips across the Pacific Northwest. Passionate about helping beginners build confidence in nature.',
  classesTaught: 12,
  totalStudents: 142,
  rating: 4.9,
  reviewCount: 36,
  specialties: ['Hiking', 'Navigation', 'Wildlife', 'Camping', 'Orienteering'],
  classes: [
    {
      id: '1',
      title: 'Hiking 101',
      date: 'Mar 22, 2026',
      price: '$45',
    },
    {
      id: '3',
      title: 'Night Sky Astronomy',
      date: 'Apr 5, 2026',
      price: 'Free',
    },
    {
      id: '7',
      title: 'Wildlife Tracking',
      date: 'Apr 18, 2026',
      price: '$60',
    },
  ],
  reviews: [
    {
      id: 'r1',
      name: 'Sarah J.',
      initials: 'SJ',
      rating: 5,
      date: 'Feb 15, 2026',
      comment:
        'Marcus is an incredible instructor. I learned so much about trail safety and felt confident on my first solo hike!',
    },
    {
      id: 'r2',
      name: 'David K.',
      initials: 'DK',
      rating: 4,
      date: 'Jan 28, 2026',
      comment:
        'Great class with practical tips. The navigation section was especially helpful. Would recommend to any beginner.',
    },
    {
      id: 'r3',
      name: 'Emily R.',
      initials: 'ER',
      rating: 5,
      date: 'Jan 10, 2026',
      comment:
        'Loved the group hike at the end. Met some great people and the instructor was very patient and knowledgeable.',
    },
  ],
};

export default function InstructorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);

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

      {/* Cover banner */}
      <div className="relative w-full h-40 sm:h-52 bg-gradient-to-br from-primary/30 to-secondary/30" />

      {/* Avatar overlapping cover */}
      <div className="px-4 sm:px-6 -mt-12 sm:-mt-16 flex flex-col items-center">
        <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background">
          <AvatarFallback className="text-xl sm:text-2xl font-heading font-bold text-primary bg-primary/10">
            {instructorData.initials}
          </AvatarFallback>
        </Avatar>
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground mt-3">
          {instructorData.name}
        </h1>
      </div>

      {/* Bio */}
      <div className="px-4 sm:px-6 pt-3">
        <p className="text-sm text-muted-foreground leading-relaxed text-center max-w-lg mx-auto">
          {instructorData.bio}
        </p>
      </div>

      {/* Stats row */}
      <div className="px-4 sm:px-6 pt-4">
        <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BookOpen size={14} />
            <span>{instructorData.classesTaught} classes</span>
          </div>
          <span className="text-border">·</span>
          <div className="flex items-center gap-1.5">
            <Users size={14} />
            <span>{instructorData.totalStudents} students</span>
          </div>
          <span className="text-border">·</span>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-amber-500 text-amber-500" />
            <span className="font-medium text-foreground">
              {instructorData.rating}
            </span>
            <span>({instructorData.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Follow button */}
      <div className="px-4 sm:px-6 pt-4 flex justify-center">
        <Button
          variant={following ? 'outline' : 'default'}
          size="sm"
          className="rounded-full px-6 h-9"
          onClick={() => setFollowing((prev) => !prev)}
          aria-label={following ? 'Unfollow instructor' : 'Follow instructor'}
        >
          {following ? 'Following' : 'Follow'}
        </Button>
      </div>

      {/* Specialties section */}
      <section className="px-4 sm:px-6 pt-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-3">
          Specialties
        </h2>
        <div className="flex flex-wrap gap-2">
          {instructorData.specialties.map((specialty) => (
            <span
              key={specialty}
              className="bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium"
            >
              {specialty}
            </span>
          ))}
        </div>
      </section>

      {/* Upcoming Classes */}
      <section className="px-4 sm:px-6 pt-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-3">
          Upcoming Classes
        </h2>
        <div className="space-y-2.5">
          {instructorData.classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => navigate(`/class/${cls.id}`)}
              className="w-full flex items-center justify-between bg-card rounded-xl border border-border p-3 sm:p-4 text-left transition-shadow hover:shadow-sm"
              aria-label={`View class ${cls.title}`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-heading font-medium text-card-foreground text-sm sm:text-base truncate">
                  {cls.title}
                </p>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-0.5">
                  <Calendar size={12} />
                  <span>{cls.date}</span>
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground flex-shrink-0 ml-3">
                {cls.price}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-4 sm:px-6 pt-6 pb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground mb-3">
          Reviews
        </h2>
        <div className="space-y-4">
          {instructorData.reviews.map((review) => (
            <div key={review.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-[10px]">
                      {review.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-card-foreground">
                    {review.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{review.date}</span>
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
