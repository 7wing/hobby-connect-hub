import { Radio } from 'lucide-react';

export default function LiveBadge({ viewers }: { viewers?: number }) {
  return (
    <span className="live-badge" role="status" aria-label={`Live${viewers ? ` with ${viewers} viewers` : ''}`}>
      <Radio size={10} />
      LIVE
      {viewers !== undefined && <span className="ml-0.5">{viewers}</span>}
    </span>
  );
}
