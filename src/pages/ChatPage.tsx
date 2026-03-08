import { useState } from 'react';
import { ArrowLeft, Phone, Video, Info, Send, Smile, Paperclip, Image, Radio, ChevronRight } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import SponsoredBadge from '@/components/SponsoredBadge';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  time: string;
  read?: boolean;
}

const chatList = [
  { name: 'Sarah Mitchell', initials: 'SM', lastMessage: 'That train layout looks amazing! 🚂', time: '2m', unread: 2, online: true },
  { name: 'Train Builders Group', initials: 'TB', lastMessage: 'Jake: Anyone joining the expo live stream?', time: '15m', unread: 5, online: false, isGroup: true, isLive: true },
  { name: 'Priya Kumar', initials: 'PK', lastMessage: 'I found some great mushrooms today', time: '1h', unread: 0, online: true },
  { name: 'Pottery Circle', initials: 'PC', lastMessage: 'Workshop starts in 30 min!', time: '2h', unread: 0, online: false, isGroup: true },
  { name: 'Tom Wilson', initials: 'TW', lastMessage: 'Thanks for the stamp trade!', time: '3h', unread: 0, online: false },
];

const messages: Message[] = [
  { id: 1, text: 'Hey! Did you see the new train set that dropped today?', isUser: false, time: '2:30 PM' },
  { id: 2, text: 'Yes! The HO scale Pacific locomotive looks incredible 🚂', isUser: true, time: '2:31 PM', read: true },
  { id: 3, text: 'I might stream building it tonight. Want to watch?', isUser: false, time: '2:32 PM' },
  { id: 4, text: 'Definitely! What time are you going live?', isUser: true, time: '2:33 PM', read: true },
  { id: 5, text: "Around 7 PM. I'll send you a link when I start.", isUser: false, time: '2:34 PM' },
  { id: 6, text: "Perfect. I'll be there! Maybe I'll share some tips from my last build.", isUser: true, time: '2:35 PM', read: false },
  { id: 7, text: 'That train layout looks amazing! 🚂', isUser: false, time: '2:38 PM' },
];

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  if (activeChat) {
    const chat = chatList.find(c => c.name === activeChat);
    return (
      <MobileLayout>
        {/* Chat thread header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border px-4 pt-[env(safe-area-inset-top)]">
          <div className="flex items-center gap-3 py-2.5">
            <button onClick={() => setActiveChat(null)} aria-label="Back to chat list">
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-heading font-semibold text-xs">{chat?.initials}</span>
              </div>
              {chat?.online && <div className="online-dot absolute -bottom-0.5 -right-0.5 w-2 h-2" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-semibold text-foreground text-sm truncate">{activeChat}</p>
              <p className="text-[10px] text-muted-foreground">{chat?.online ? 'Online' : 'Last seen 2h ago'}</p>
            </div>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground" aria-label="Voice call">
                <Phone size={16} />
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground" aria-label="Video call">
                <Video size={16} />
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground" aria-label="Chat info">
                <Info size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="px-4 py-3 space-y-3 min-h-[60vh]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[78%]">
                <div className={msg.isUser ? 'chat-bubble-user' : 'chat-bubble-other'}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <div className={`flex items-center gap-1 mt-0.5 ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-[9px] text-muted-foreground">{msg.time}</span>
                  {msg.isUser && msg.read && <span className="text-[9px] text-primary">✓✓</span>}
                  {msg.isUser && msg.read === false && <span className="text-[9px] text-muted-foreground">✓</span>}
                </div>
              </div>
            </div>
          ))}

          {/* Sponsored banner */}
          <div className="bg-card rounded-xl border border-sponsored/20 p-2.5 flex items-center gap-3 mt-4">
            <SponsoredBadge />
            <p className="text-[11px] text-muted-foreground flex-1">Check out TrainWorld's new HO scale collection!</p>
            <ChevronRight size={14} className="text-muted-foreground" />
          </div>

          {/* Live invite */}
          <div className="bg-primary/5 rounded-xl border border-primary/20 p-3 text-center">
            <Radio size={18} className="mx-auto text-primary mb-1" />
            <p className="text-xs font-heading font-semibold text-foreground">Start a group live stream?</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Invite {activeChat} to watch or co-host</p>
            <button className="mt-2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-medium">
              Go Live Together
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="sticky bottom-16 bg-background border-t border-border px-3 py-2">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground" aria-label="Attach file">
              <Paperclip size={18} />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground" aria-label="Send image">
              <Image size={18} />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full h-9 pl-3 pr-9 rounded-full bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Message input"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Emoji picker">
                <Smile size={16} />
              </button>
            </div>
            <button className="w-9 h-9 rounded-full bg-primary flex items-center justify-center" aria-label="Send message">
              <Send size={16} className="text-primary-foreground" />
            </button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg px-4 pt-[env(safe-area-inset-top)] pb-2">
        <div className="flex items-center justify-between pt-3 pb-2">
          <h1 className="font-heading font-bold text-foreground text-xl">Messages</h1>
          <button className="text-primary text-xs font-medium">New Chat</button>
        </div>
      </header>

      <div className="px-4">
        <div className="space-y-0.5">
          {chatList.map((chat) => (
            <button
              key={chat.name}
              onClick={() => setActiveChat(chat.name)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left"
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-heading font-semibold text-sm">{chat.initials}</span>
                </div>
                {chat.online && <div className="online-dot absolute -bottom-0.5 -right-0.5" />}
                {chat.isLive && (
                  <div className="absolute -top-1 -right-1">
                    <span className="live-badge text-[7px] px-1 py-0">LIVE</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-heading font-semibold text-foreground text-sm truncate">{chat.name}</p>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">{chat.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {chat.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
