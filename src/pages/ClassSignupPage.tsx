import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, CalendarPlus, Loader2 } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

interface SessionOption {
  id: string;
  date: string;
  time: string;
}

interface ClassInfo {
  id: string;
  title: string;
  price: string;
  sessions: SessionOption[];
}

const mockClasses: Record<string, ClassInfo> = {
  '1': {
    id: '1',
    title: 'Hiking 101',
    price: '$45',
    sessions: [
      { id: 's1', date: 'Mar 22, 2026', time: '9:00 AM – 12:00 PM' },
      { id: 's2', date: 'Mar 29, 2026', time: '9:00 AM – 12:00 PM' },
      { id: 's3', date: 'Apr 5, 2026', time: '9:00 AM – 12:00 PM' },
    ],
  },
  '2': {
    id: '2',
    title: 'Birdwatching Basics',
    price: 'Free',
    sessions: [
      { id: 's1', date: 'Mar 24, 2026', time: '10:00 AM – 12:30 PM' },
      { id: 's2', date: 'Apr 7, 2026', time: '10:00 AM – 12:30 PM' },
    ],
  },
  '3': {
    id: '3',
    title: 'Night Sky Astronomy',
    price: '$30',
    sessions: [
      { id: 's1', date: 'Mar 25, 2026', time: '8:00 PM – 12:00 AM' },
      { id: 's2', date: 'Apr 1, 2026', time: '8:00 PM – 12:00 AM' },
      { id: 's3', date: 'Apr 8, 2026', time: '8:00 PM – 12:00 AM' },
    ],
  },
};

const defaultClass: ClassInfo = {
  id: '0',
  title: 'Unknown Class',
  price: '$0',
  sessions: [
    { id: 's1', date: 'TBD', time: 'TBD' },
    { id: 's2', date: 'TBD', time: 'TBD' },
  ],
};

type BookingStep = 'form' | 'loading' | 'success';

export default function ClassSignupPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const classInfo = mockClasses[id ?? ''] ?? defaultClass;

  const [step, setStep] = useState<BookingStep>('form');
  const [selectedSessionId, setSelectedSessionId] = useState<string>(classInfo.sessions[0]?.id ?? '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const selectedSession = classInfo.sessions.find((s) => s.id === selectedSessionId) ?? classInfo.sessions[0];

  const handleBook = () => {
    setStep('loading');
    setTimeout(() => {
      setStep('success');
    }, 1200);
  };

  const handleAddToCalendar = () => {
    toast('Added to your calendar');
  };

  if (step === 'success') {
    return (
      <MobileLayout hideTabBar>
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-primary" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
            You're booked!
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            {classInfo.title}
          </p>

          {selectedSession && (
            <Card className="w-full mb-8">
              <CardContent className="p-4 flex flex-col items-center gap-1">
                <span className="text-sm font-medium text-card-foreground">
                  {selectedSession.date}
                </span>
                <span className="text-xs text-muted-foreground">
                  {selectedSession.time}
                </span>
              </CardContent>
            </Card>
          )}

          <div className="w-full space-y-3">
            <Button variant="outline" className="w-full" onClick={handleAddToCalendar}>
              <CalendarPlus size={16} className="mr-2" />
              Add to calendar
            </Button>
            <Button className="w-full" onClick={() => navigate('/profile')}>
              View my classes
            </Button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideTabBar>
      {/* Header / Back button */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg px-4 sm:px-6 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center pt-3 pb-2">
          <button
            onClick={() => navigate(`/class/${id}`)}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
            aria-label="Go back to class details"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="ml-3 font-heading font-bold text-lg text-foreground">
            Book class
          </h1>
        </div>
      </div>

      <div className="px-4 sm:px-6 pt-4 pb-8 space-y-6">
        {/* Session picker */}
        <section>
          <h2 className="font-heading font-semibold text-base text-foreground mb-3">
            Select a session
          </h2>
          <div className="space-y-2">
            {classInfo.sessions.map((session) => {
              const isSelected = session.id === selectedSessionId;
              return (
                <button
                  key={session.id}
                  onClick={() => setSelectedSessionId(session.id)}
                  className={`w-full flex items-center justify-between rounded-lg border p-3 text-left transition-colors ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-primary' : 'border-muted-foreground'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <span className="text-sm font-medium text-card-foreground">
                      {session.date}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {session.time}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Attendee details */}
        <section>
          <h2 className="font-heading font-semibold text-base text-foreground mb-3">
            Attendee details
          </h2>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Payment UI */}
        <section>
          <h2 className="font-heading font-semibold text-base text-foreground mb-3">
            Payment
          </h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="card-number">Card number</Label>
                <Input
                  id="card-number"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <div className="space-y-1.5 flex-1">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input
                    id="expiry"
                    placeholder="MM / YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 flex-1">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Order summary */}
        <section>
          <h2 className="font-heading font-semibold text-base text-foreground mb-3">
            Order summary
          </h2>
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Class</span>
                <span className="font-medium text-card-foreground">{classInfo.title}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Session</span>
                <span className="font-medium text-card-foreground">
                  {selectedSession?.date} · {selectedSession?.time}
                </span>
              </div>
              <div className="border-t pt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-card-foreground">{classInfo.price}</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Book button */}
        <Button
          className="w-full"
          size="lg"
          onClick={handleBook}
          disabled={step === 'loading'}
        >
          {step === 'loading' ? (
            <>
              <Loader2 size={18} className="animate-spin mr-2" />
              Processing...
            </>
          ) : (
            'Complete Booking'
          )}
        </Button>
      </div>
    </MobileLayout>
  );
}
