import React from 'react';
import { Radio } from 'lucide-react';

interface LiveBadgeProps {
  viewers?: number;
}

const LiveBadge = React.forwardRef<HTMLSpanElement, LiveBadgeProps>(
  ({ viewers }, ref) => {
    return (
      <span ref={ref} className="live-badge" role="status" aria-label={`Live${viewers ? ` with ${viewers} viewers` : ''}`}>
        <Radio size={10} />
        LIVE
        {viewers !== undefined && <span className="ml-0.5">{viewers}</span>}
      </span>
    );
  }
);

LiveBadge.displayName = 'LiveBadge';
export default LiveBadge;
