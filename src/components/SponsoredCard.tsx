import React, { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import SponsoredBadge from './SponsoredBadge';
import { toast } from '@/hooks/use-toast';

interface SponsoredCardProps {
  title: string;
  description: string;
  brand: string;
  image: string;
}

const SponsoredCard = React.forwardRef<HTMLElement, SponsoredCardProps>(
  ({ title, description, brand, image }, ref) => {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
      <article ref={ref} className="hobby-card border-sponsored/20" aria-label={`Sponsored content from ${brand}`}>
        <div className="relative">
          <img src={image} alt={title} className="w-full h-28 object-cover opacity-90" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          <button
            onClick={() => {
              setDismissed(true);
              toast({ title: 'Ad dismissed', description: `You won't see this ad again.` });
            }}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-card/60 flex items-center justify-center"
            aria-label="Close ad"
          >
            <X size={12} className="text-muted-foreground" />
          </button>
        </div>
        <div className="p-3.5">
          <div className="flex items-center gap-2 mb-1.5">
            <SponsoredBadge />
            <span className="text-muted-foreground text-[11px]">by {brand}</span>
          </div>
          <h3 className="font-heading font-semibold text-card-foreground text-sm">{title}</h3>
          <p className="text-muted-foreground text-xs mt-1">{description}</p>
          <button
            onClick={() => toast({ title: `Opening ${brand}`, description: 'Redirecting to sponsor page...' })}
            className="flex items-center gap-1 text-primary text-xs font-medium mt-2.5 hover:underline"
          >
            Learn more <ExternalLink size={11} />
          </button>
        </div>
      </article>
    );
  }
);

SponsoredCard.displayName = 'SponsoredCard';
export default SponsoredCard;
