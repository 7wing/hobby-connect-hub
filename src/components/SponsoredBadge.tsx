import { Sparkles } from 'lucide-react';

export default function SponsoredBadge() {
  return (
    <span className="sponsored-badge" role="note" aria-label="Sponsored content">
      <Sparkles size={10} />
      Sponsored
    </span>
  );
}
