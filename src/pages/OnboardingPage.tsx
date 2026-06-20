import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Compass,
  TreePine,
  Mountain,
  MapPin,
  ChevronRight,
  Footprints,
  Bird,
  Telescope,
  Fish,
  Train,
  Building,
  MapPinned,
  Target,
  Camera,
  Flower2,
  Bell,
  Users,
  GraduationCap,
  Zap,
  Map,
} from "lucide-react";

const HOBBIES = [
  { label: "Hiking", icon: Footprints },
  { label: "Birdwatching", icon: Bird },
  { label: "Astronomy", icon: Telescope },
  { label: "Fishing", icon: Fish },
  { label: "Trains", icon: Train },
  { label: "Architecture", icon: Building },
  { label: "Urban Exploration", icon: MapPinned },
  { label: "Hunting", icon: Target },
  { label: "Photography", icon: Camera },
  { label: "Gardening", icon: Flower2 },
];

const SKILL_LEVELS = [
  {
    value: "beginner",
    title: "Beginner",
    description: "Just getting started and excited to learn the basics.",
    icon: GraduationCap,
  },
  {
    value: "intermediate",
    title: "Intermediate",
    description: "I have some experience and want to improve.",
    icon: Compass,
  },
  {
    value: "advanced",
    title: "Advanced",
    description: "Very experienced and looking for expert-level activities.",
    icon: Zap,
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState<string>("");
  const [location, setLocation] = useState("");
  const [classReminders, setClassReminders] = useState(true);
  const [groupActivity, setGroupActivity] = useState(true);

  const totalSteps = 5;

  const toggleHobby = (label: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(label) ? prev.filter((h) => h !== label) : [...prev, label]
    );
  };

  const handleSkip = () => {
    setStep(totalSteps);
  };

  const handleFinish = () => {
    localStorage.setItem("onboardingComplete", "true");
    navigate("/");
  };

  const StepDots = () => (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            i + 1 === step ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="w-12" />
        <StepDots />
        <button
          onClick={handleSkip}
          className="w-12 text-right text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-4">
              <Compass className="w-16 h-16 text-primary" strokeWidth={1.5} />
              <TreePine className="w-16 h-16 text-green-600" strokeWidth={1.5} />
              <Mountain className="w-16 h-16 text-sky-600" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome to Outings</h1>
              <p className="mt-3 text-muted-foreground text-lg">
                Discover outdoor hobbies, find local classes, and connect with a community that shares your passions.
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">What are you interested in?</h2>
              <p className="text-muted-foreground mt-1">Select all that apply</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {HOBBIES.map(({ label, icon: Icon }) => {
                const selected = selectedHobbies.includes(label);
                return (
                  <button
                    key={label}
                    onClick={() => toggleHobby(label)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors text-left",
                      selected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="leading-tight">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">What&apos;s your skill level?</h2>
              <p className="text-muted-foreground mt-1">This helps us recommend the right classes</p>
            </div>
            <div className="space-y-3">
              {SKILL_LEVELS.map(({ value, title, description, icon: Icon }) => {
                const selected = skillLevel === value;
                return (
                  <button
                    key={value}
                    onClick={() => setSkillLevel(value)}
                    className={cn(
                      "flex items-start gap-4 w-full rounded-xl border p-4 text-left transition-colors",
                      selected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="w-6 h-6 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">{title}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">{description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Where are you located?</h2>
              <p className="text-muted-foreground mt-1">We&apos;ll use this to find classes near you</p>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or ZIP code"
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    () => setLocation("Current location"),
                    () => setLocation("Current location")
                  );
                }
              }}
            >
              <Map className="w-4 h-4 mr-2" />
              Allow location access
            </Button>
          </div>
        )}

        {step === 5 && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center">
              <Bell className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-2xl font-bold">Stay in the loop</h2>
              <p className="text-muted-foreground mt-1">
                Get class reminders and group updates so you never miss out.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Class reminders</div>
                    <div className="text-sm text-muted-foreground">Alerts before your classes start</div>
                  </div>
                </div>
                <Switch
                  checked={classReminders}
                  onCheckedChange={setClassReminders}
                />
              </div>
              <div className="flex items-center justify-between rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Group activity</div>
                    <div className="text-sm text-muted-foreground">Updates from your hobby groups</div>
                  </div>
                </div>
                <Switch
                  checked={groupActivity}
                  onCheckedChange={setGroupActivity}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div className="px-6 pb-8 pt-2">
        {step === 1 && (
          <Button className="w-full" size="lg" onClick={() => setStep(2)}>
            Get Started
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
        {step === 2 && (
          <Button
            className="w-full"
            size="lg"
            disabled={selectedHobbies.length === 0}
            onClick={() => setStep(3)}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
        {step === 3 && (
          <Button
            className="w-full"
            size="lg"
            disabled={!skillLevel}
            onClick={() => setStep(4)}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
        {step === 4 && (
          <Button className="w-full" size="lg" onClick={() => setStep(5)}>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
        {step === 5 && (
          <Button className="w-full" size="lg" onClick={handleFinish}>
            Finish
          </Button>
        )}
      </div>
    </div>
  );
}
