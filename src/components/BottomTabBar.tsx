import { Home, Compass, GraduationCap, User, MessageCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/explore', icon: Compass, label: 'Explore' },
  { path: '/classes', icon: GraduationCap, label: 'Classes' },
  { path: '/chat', icon: MessageCircle, label: 'Chat' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="tab-bar fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]" role="tablist" aria-label="Main navigation">
      <div className="max-w-2xl mx-auto flex items-center justify-around h-16 px-2">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = path === '/classes'
            ? location.pathname === path || location.pathname.startsWith('/class/')
            : location.pathname === path;
          return (
            <button
              key={path}
              role="tab"
              aria-selected={active}
              aria-label={label}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-4 sm:px-6 transition-colors ${
                active ? 'text-tab-active' : 'text-tab-inactive'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] sm:text-[11px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
