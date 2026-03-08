import { ReactNode } from 'react';
import BottomTabBar from './BottomTabBar';

export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen max-w-md mx-auto bg-background relative">
      <main className="pb-20">{children}</main>
      <BottomTabBar />
    </div>
  );
}
