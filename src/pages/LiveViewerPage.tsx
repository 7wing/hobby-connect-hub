import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import {
  ArrowLeft, Users, Heart, MessageCircle, Share2, DollarSign,
  MoreVertical, Volume2, VolumeX, Maximize, Minimize,
  Send, Shield, Flag, UserX, X, Smile
} from 'lucide-react';
import LiveBadge from '@/components/LiveBadge';
import SponsoredBadge from '@/components/SponsoredBadge';
import hobbyTrains from '@/assets/hobby-trains.jpg';

const reactions = ['❤️', '🔥', '👏', '🚂', '😍', '💯'];

interface ChatMsg {
  id: number;
  user: string;
  initials: string;
  text: string;
  time: string;
}

const initialLiveChat: ChatMsg[] = [
  { id: 1, user: 'Sarah M.', initials: 'SM', text: 'This layout is incredible!', time: '2s ago' },
  { id: 2, user: 'Jake R.', initials: 'JR', text: 'How did you get the bridge to curve like that? 🌉', time: '5s ago' },
  { id: 3, user: 'Priya K.', initials: 'PK', text: 'Can you zoom in on the station?', time: '12s ago' },
  { id: 4, user: 'Tom W.', initials: 'TW', text: '🔥🔥🔥', time: '18s ago' },
  { id: 5, user: 'Lily C.', initials: 'LC', text: 'I just joined the group because of this stream!', time: '25s ago' },
  { id: 6, user: 'Mark D.', initials: 'MD', text: 'What scale are you using?', time: '30s ago' },
  { id: 7, user: 'Anna B.', initials: 'AB', text: 'The mountain scenery looks so realistic', time: '45s ago' },
  { id: 8, user: 'Chris L.', initials: 'CL', text: 'Donated $5! Keep up the awesome work 💪', time: '1m ago' },
];

const viewerList = [
  { name: 'Sarah M.', initials: 'SM' },
  { name: 'Jake R.', initials: 'JR' },
  { name: 'Priya K.', initials: 'PK' },
  { name: 'Tom W.', initials: 'TW' },
];

export default function LiveViewerPage() {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showTipModal, setShowTipModal] = useState(false);
  const [showModTools, setShowModTools] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [liked, setLiked] = useState(false);
  const [selectedTip, setSelectedTip] = useState<string | null>(null);
  const [liveChatMessages, setLiveChatMessages] = useState<ChatMsg[]>(initialLiveChat);
  const [floatingReactions, setFloatingReactions] = useState<{ id: number; emoji: string }[]>([]);

  const sendReaction = (emoji: string) => {
    const id = Date.now();
    setFloatingReactions(prev => [...prev, { id, emoji }]);
    setTimeout(() => setFloatingReactions(prev => prev.filter(r => r.id !== id)), 2000);
  };

  const sendLiveChat = () => {
    if (!chatMessage.trim()) return;
    setLiveChatMessages(prev => [{
      id: Date.now(),
      user: 'You',
      initials: 'AJ',
      text: chatMessage.trim(),
      time: 'now',
    }, ...prev]);
    setChatMessage('');
  };

  const handleTip = (amount: string) => {
    setSelectedTip(amount);
    toast({ title: `Tip sent! ${amount}`, description: 'Thank you for supporting the streamer!' });
    setShowTipModal(false);
    setSelectedTip(null);
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-foreground">
        <div className="relative w-full h-full">
          <img src={hobbyTrains} alt="Live stream" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/40" />

          <div className="absolute top-0 left-0 right-0 p-4 pt-[env(safe-area-inset-top)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LiveBadge viewers={342} />
              <span className="text-primary-foreground text-xs font-medium bg-foreground/30 backdrop-blur-sm px-2 py-1 rounded-full">
                Model Train Builders
              </span>
            </div>
            <button onClick={() => setIsFullscreen(false)} className="w-9 h-9 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center" aria-label="Exit fullscreen">
              <Minimize size={18} className="text-primary-foreground" />
            </button>
          </div>

          <div className="absolute right-4 bottom-32 space-y-2 pointer-events-none">
            {floatingReactions.map(r => (
              <div key={r.id} className="text-2xl animate-bounce">{r.emoji}</div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 pb-[env(safe-area-inset-bottom)]">
            {showChat && (
              <div className="mb-3 max-h-40 overflow-y-auto space-y-1.5">
                {liveChatMessages.slice(0, 4).map(msg => (
                  <div key={msg.id} className="flex items-start gap-2 bg-foreground/20 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
                    <span className="text-primary-foreground/70 text-[10px] font-semibold flex-shrink-0">{msg.user}</span>
                    <span className="text-primary-foreground text-[11px]">{msg.text}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                {reactions.slice(0, 4).map(emoji => (
                  <button key={emoji} onClick={() => sendReaction(emoji)} className="w-9 h-9 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center text-lg active:scale-90 transition-transform">
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="flex-1" />
              <button onClick={() => setShowChat(!showChat)} className="w-9 h-9 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center" aria-label="Toggle chat">
                <MessageCircle size={16} className="text-primary-foreground" />
              </button>
              <button onClick={() => setIsMuted(!isMuted)} className="w-9 h-9 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center" aria-label={isMuted ? 'Unmute' : 'Mute'}>
                {isMuted ? <VolumeX size={16} className="text-primary-foreground" /> : <Volume2 size={16} className="text-primary-foreground" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Video Section */}
        <div className="relative">
          <img src={hobbyTrains} alt="Live stream — Model Train Builders competition" className="w-full aspect-video object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-foreground/30" />

          <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 pt-[env(safe-area-inset-top)] flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center" aria-label="Go back">
              <ArrowLeft size={18} className="text-primary-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <LiveBadge viewers={342} />
              <button onClick={() => setIsFullscreen(true)} className="w-8 h-8 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center" aria-label="Enter fullscreen">
                <Maximize size={14} className="text-primary-foreground" />
              </button>
              <button onClick={() => setShowModTools(!showModTools)} className="w-8 h-8 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center" aria-label="More options">
                <MoreVertical size={14} className="text-primary-foreground" />
              </button>
            </div>
          </div>

          <div className="absolute right-3 bottom-16 space-y-1 pointer-events-none">
            {floatingReactions.map(r => (
              <div key={r.id} className="text-3xl animate-bounce">{r.emoji}</div>
            ))}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <button onClick={() => setIsMuted(!isMuted)} className="w-9 h-9 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center" aria-label={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? <VolumeX size={16} className="text-primary-foreground" /> : <Volume2 size={16} className="text-primary-foreground" />}
            </button>
            <div className="flex gap-1.5">
              {reactions.map(emoji => (
                <button key={emoji} onClick={() => sendReaction(emoji)} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center text-lg active:scale-90 transition-transform" aria-label={`React with ${emoji}`}>
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stream Info */}
        <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-border">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="font-heading font-bold text-foreground text-lg sm:text-xl leading-tight">Model Train Building Competition</h1>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">Hosted by <span className="text-primary font-medium cursor-pointer" onClick={() => toast({ title: 'TrainMaster_Dave', description: 'View host profile' })}>TrainMaster_Dave</span></p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${liked ? 'bg-destructive/10' : 'bg-muted'}`}
                aria-label="Like stream"
                onClick={() => {
                  setLiked(!liked);
                  toast({ title: liked ? 'Unliked' : 'Liked!', description: liked ? 'Removed from favorites' : 'Added to favorites' });
                }}
              >
                <Heart size={16} className={liked ? 'text-destructive fill-destructive' : 'text-muted-foreground'} />
              </button>
              <button
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"
                aria-label="Share stream"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({ title: 'Link copied!', description: 'Stream link copied to clipboard' });
                }}
              >
                <Share2 size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex -space-x-2">
              {viewerList.map(v => (
                <div key={v.name} className="w-7 h-7 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center">
                  <span className="text-primary text-[8px] font-bold">{v.initials}</span>
                </div>
              ))}
            </div>
            <span className="text-muted-foreground text-xs">
              <Users size={12} className="inline mr-1" />342 watching
            </span>
          </div>

          <button
            onClick={() => setShowTipModal(!showTipModal)}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-sponsored/10 text-sponsored rounded-xl py-2.5 sm:py-3 text-sm font-semibold transition-colors hover:bg-sponsored/20"
          >
            <DollarSign size={16} /> Tip the Streamer
          </button>

          {showTipModal && (
            <div className="mt-3 bg-card rounded-xl border border-border p-4 animate-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-semibold text-foreground text-sm">Send a Tip</h3>
                <button onClick={() => setShowTipModal(false)} aria-label="Close tip modal">
                  <X size={16} className="text-muted-foreground" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {['$1', '$5', '$10', '$25'].map(amount => (
                  <button
                    key={amount}
                    onClick={() => handleTip(amount)}
                    className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                      selectedTip === amount
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-primary hover:text-primary-foreground text-foreground'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <div className="relative">
                <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="number"
                  placeholder="Custom amount"
                  className="w-full h-10 pl-8 pr-4 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value;
                      if (val) handleTip(`$${val}`);
                    }
                  }}
                />
              </div>
              <button
                className="mt-3 w-full bg-sponsored text-sponsored-foreground rounded-xl py-2.5 text-sm font-semibold"
                onClick={() => handleTip('$5')}
              >
                Send Tip
              </button>
            </div>
          )}
        </div>

        {/* Sponsored Banner */}
        <div className="px-4 sm:px-6 py-3 border-b border-border">
          <div
            className="flex items-center gap-3 bg-card rounded-xl border border-sponsored/20 p-3 cursor-pointer hover:shadow-sm transition-shadow"
            onClick={() => toast({ title: 'TrainWorld Co.', description: 'Opening sponsor store...' })}
          >
            <SponsoredBadge />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-card-foreground">TrainWorld Co. — Official Sponsor</p>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground">Get 20% off model train kits with code LIVE20</p>
            </div>
            <button className="text-primary text-xs font-medium flex-shrink-0">Shop</button>
          </div>
        </div>

        {/* Moderation Tools */}
        {showModTools && (
          <div className="px-4 sm:px-6 py-3 border-b border-border animate-in slide-in-from-top-1">
            <h3 className="font-heading font-semibold text-sm text-foreground mb-2 flex items-center gap-1.5">
              <Shield size={14} className="text-primary" /> Moderation Tools
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => toast({ title: 'Ban User', description: 'Select a user to ban from chat' })}
                className="flex items-center gap-2 bg-card rounded-lg border border-border p-2.5 text-xs text-foreground font-medium hover:bg-muted transition-colors"
              >
                <UserX size={14} className="text-destructive" /> Ban User
              </button>
              <button
                onClick={() => toast({ title: 'Flag Content', description: 'Content flagged for review' })}
                className="flex items-center gap-2 bg-card rounded-lg border border-border p-2.5 text-xs text-foreground font-medium hover:bg-muted transition-colors"
              >
                <Flag size={14} className="text-sponsored" /> Flag Content
              </button>
              <button
                onClick={() => toast({ title: 'Mute User', description: 'Select a user to mute' })}
                className="flex items-center gap-2 bg-card rounded-lg border border-border p-2.5 text-xs text-foreground font-medium hover:bg-muted transition-colors"
              >
                <VolumeX size={14} className="text-muted-foreground" /> Mute User
              </button>
              <button
                onClick={() => toast({ title: 'Slow Mode', description: 'Slow mode enabled — 10s between messages' })}
                className="flex items-center gap-2 bg-card rounded-lg border border-border p-2.5 text-xs text-foreground font-medium hover:bg-muted transition-colors"
              >
                <Shield size={14} className="text-success" /> Slow Mode
              </button>
            </div>
          </div>
        )}

        {/* Live Chat */}
        <div className="px-4 sm:px-6 pt-3 pb-24">
          <h3 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-3 flex items-center gap-2">
            <MessageCircle size={16} className="text-primary" /> Live Chat
            <span className="text-muted-foreground text-[10px] font-normal ml-auto">342 viewers</span>
          </h3>

          <div className="space-y-2.5 max-h-[50vh] overflow-y-auto">
            {liveChatMessages.map(msg => (
              <div key={msg.id} className="flex items-start gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-[9px] sm:text-[10px] font-bold">{msg.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-foreground text-xs font-semibold">{msg.user}</span>
                    <span className="text-[9px] text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-2.5 pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground"
                aria-label="Emoji"
                onClick={() => toast({ title: 'Emoji Picker', description: 'Coming soon!' })}
              >
                <Smile size={18} />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendLiveChat()}
                  placeholder="Say something..."
                  className="w-full h-9 sm:h-10 pl-3 pr-4 rounded-full bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Live chat message"
                />
              </div>
              <button
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center"
                aria-label="Send chat message"
                onClick={sendLiveChat}
              >
                <Send size={16} className="text-primary-foreground" />
              </button>
              <button
                onClick={() => setShowTipModal(true)}
                className="w-9 h-9 rounded-full bg-sponsored/20 flex items-center justify-center"
                aria-label="Tip streamer"
              >
                <DollarSign size={16} className="text-sponsored" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
