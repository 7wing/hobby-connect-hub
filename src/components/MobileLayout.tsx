import { ReactNode } from 'react';
import BottomTabBar from './BottomTabBar';

interface MobileLayoutProps {
  children: ReactNode;
  hideTabBar?: boolean;
}

export default function MobileLayout({ children, hideTabBar }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Centered container that scales nicely on all screens */}
      <div className="max-w-2xl mx-auto">
        <main className={hideTabBar ? '' : 'pb-20'}>{children}</main>
      </div>
      {!hideTabBar && <BottomTabBar />}
    </div>
  );
}
