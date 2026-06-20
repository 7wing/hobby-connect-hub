import { useState } from 'react';
import { ArrowLeft, Phone, Video, Info, Send, Smile, Paperclip, Image, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import MobileLayout from '@/components/MobileLayout';
import SponsoredBadge from '@/components/SponsoredBadge';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  time: string;
  read?: boolean;
}

const chatList = [
  { name: 'Sarah Mitchell', initials: 'SM', lastMessage: 'That train layout looks amazing! 🚂', time: '2m', unread: 2, online: true },
  { name: 'Train Builders Group', initials: 'TB', lastMessage: 'Jake: Anyone joining the expo live stream?', time: '15m', unread: 5, online: false, isGroup: true },
  { name: 'Priya Kumar', initials: 'PK', lastMessage: 'I found some great mushrooms today', time: '1h', unread: 0, online: true },
  { name: 'Pottery Circle', initials: 'PC', lastMessage: 'Workshop starts in 30 min!', time: '2h', unread: 0, online: false, isGroup: true },
  { name: 'Tom Wilson', initials: 'TW', lastMessage: 'Thanks for the stamp trade!', time: '3h', unread: 0, online: false },
];

const initialMessages: Message[] = [
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
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const navigate = useNavigate();

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: newMessage.trim(),
      isUser: true,
      time: timeStr,
      read: false,
    }]);
    setNewMessage('');

    // Simulate reply after 1.5s
    setTimeout(() => {
      const replies = [
        'That sounds great! 🎉',
        "I totally agree with you on that.",
        'Have you tried the new technique?',
        'Let me check and get back to you!',
        "Awesome! Can't wait to see it.",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: reply,
        isUser: false,
        time: replyTime,
      }]);
    }, 1500);
  };

  if (activeChat) {
    const chat = chatList.find(c => c.name === activeChat);
    return (
      <MobileLayout>
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border px-4 sm:px-6 pt-[env(safe-area-inset-top)]">
          <div className="flex items-center gap-3 py-2.5">
            <button onClick={() => setActiveChat(null)} aria-label="Back to chat list">
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <div className="relative cursor-pointer" onClick={() => toast({ title: chat?.name || '', description: chat?.online ? 'Online now' : 'Last seen 2h ago' })}>
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
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground"
                aria-label="Voice call"
                onClick={() => toast({ title: 'Voice Call', description: `Calling ${activeChat}...` })}
              >
                <Phone size={16} />
              </button>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground"
                aria-label="Video call"
                onClick={() => toast({ title: 'Video Call', description: `Starting video with ${activeChat}...` })}
              >
                <Video size={16} />
              </button>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground"
                aria-label="Chat info"
                onClick={() => toast({ title: 'Chat Info', description: `Conversation with ${activeChat}` })}
              >
                <Info size={16} />
              </button>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 py-3 space-y-3 min-h-[60vh]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[78%] sm:max-w-[65%]">
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

          <div
            className="bg-card rounded-xl border border-sponsored/20 p-2.5 flex items-center gap-3 mt-4 cursor-pointer hover:shadow-sm transition-shadow"
            onClick={() => toast({ title: 'TrainWorld Collection', description: 'Opening sponsor page...' })}
          >
            <SponsoredBadge />
            <p className="text-[11px] text-muted-foreground flex-1">Check out TrainWorld's new HO scale collection!</p>
            <ChevronRight size={14} className="text-muted-foreground" />
          </div>

        </div>

        <div className="sticky bottom-16 bg-background border-t border-border px-3 sm:px-5 py-2">
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground"
              aria-label="Attach file"
              onClick={() => toast({ title: 'Attach File', description: 'File picker coming soon!' })}
            >
              <Paperclip size={18} />
            </button>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground"
              aria-label="Send image"
              onClick={() => toast({ title: 'Send Image', description: 'Image picker coming soon!' })}
            >
              <Image size={18} />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="w-full h-9 sm:h-10 pl-3 pr-9 rounded-full bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Message input"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label="Emoji picker"
                onClick={() => toast({ title: 'Emoji Picker', description: 'Coming soon!' })}
              >
                <Smile size={16} />
              </button>
            </div>
            <button
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center"
              aria-label="Send message"
              onClick={sendMessage}
            >
              <Send size={16} className="text-primary-foreground" />
            </button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg px-4 sm:px-6 pt-[env(safe-area-inset-top)] pb-2">
        <div className="flex items-center justify-between pt-3 pb-2">
          <h1 className="font-heading font-bold text-foreground text-xl sm:text-2xl">Messages</h1>
          <button
            className="text-primary text-xs sm:text-sm font-medium"
            onClick={() => toast({ title: 'New Chat', description: 'Start a conversation with a connection!' })}
          >
            New Chat
          </button>
        </div>
      </header>

      <div className="px-4 sm:px-6">
        <div className="space-y-0.5">
          {chatList.map((chat) => (
            <button
              key={chat.name}
              onClick={() => setActiveChat(chat.name)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left"
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-heading font-semibold text-sm">{chat.initials}</span>
                </div>
                {chat.online && <div className="online-dot absolute -bottom-0.5 -right-0.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-heading font-semibold text-foreground text-sm truncate">{chat.name}</p>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">{chat.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground truncate mt-0.5">{chat.lastMessage}</p>
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
