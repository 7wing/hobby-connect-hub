import React from 'react';
import { Sparkles } from 'lucide-react';

const SponsoredBadge = React.forwardRef<HTMLSpanElement>((_, ref) => {
  return (
    <span ref={ref} className="sponsored-badge" role="note" aria-label="Sponsored content">
      <Sparkles size={10} />
      Sponsored
    </span>
  );
});

SponsoredBadge.displayName = 'SponsoredBadge';
export default SponsoredBadge;
