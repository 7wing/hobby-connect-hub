import React from 'react';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import LiveBadge from './LiveBadge';
import SponsoredBadge from './SponsoredBadge';

interface HobbyCardProps {
  image: string;
  title: string;
  description: string;
  members: number;
  isLive?: boolean;
  viewers?: number;
  isSponsored?: boolean;
  sponsorName?: string;
  joined?: boolean;
}

const HobbyCard = React.forwardRef<HTMLElement, HobbyCardProps>(
  ({ image, title, description, members, isLive, viewers, isSponsored, sponsorName, joined }, ref) => {
    const navigate = useNavigate();
    const [isJoined, setIsJoined] = React.useState(joined ?? false);

    return (
      <article ref={ref} className="hobby-card" aria-label={`${title} hobby group`}>
        <div
          className={`relative ${isLive ? 'cursor-pointer' : ''}`}
          onClick={() => {
            if (isLive) navigate('/live');
          }}
        >
          <img src={image} alt={title} className="w-full h-36 sm:h-44 object-cover" loading="lazy" />
          <div className="absolute top-2 left-2 flex gap-1.5">
            {isLive && <LiveBadge viewers={viewers} />}
          </div>
          {isSponsored && (
            <div className="absolute top-2 right-2">
              <SponsoredBadge />
            </div>
          )}
        </div>
        <div className="p-3.5">
          <h3 className="font-heading font-semibold text-card-foreground text-[15px] leading-tight">{title}</h3>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1 line-clamp-2">{description}</p>
          {isSponsored && sponsorName && (
            <p className="text-sponsored text-[11px] font-medium mt-1.5">Sponsored by {sponsorName}</p>
          )}
          <div className="flex items-center justify-between mt-3">
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <Users size={13} />
              {members.toLocaleString()} members
            </span>
            <Button
              size="sm"
              variant={isJoined ? 'secondary' : 'default'}
              className="h-7 text-xs px-3 rounded-full"
              onClick={() => {
                setIsJoined(!isJoined);
                toast({
                  title: isJoined ? `Left ${title}` : `Joined ${title}!`,
                  description: isJoined ? 'You can rejoin anytime.' : 'Welcome to the group!',
                });
              }}
            >
              {isJoined ? 'Joined' : 'Join'}
            </Button>
          </div>
        </div>
      </article>
    );
  }
);

HobbyCard.displayName = 'HobbyCard';
export default HobbyCard;
