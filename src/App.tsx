import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import ClassesPage from "./pages/ClassesPage";
import ClassDetailPage from "./pages/ClassDetailPage";
import HobbyGroupPage from "./pages/HobbyGroupPage";
import PostDetailPage from "./pages/PostDetailPage";
import InstructorProfilePage from "./pages/InstructorProfilePage";
import ClassSignupPage from "./pages/ClassSignupPage";
import EventDetailPage from "./pages/EventDetailPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import OnboardingPage from "./pages/OnboardingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const OnboardingRedirect = () => {
  const location = useLocation();
  const onboardingComplete = localStorage.getItem("onboardingComplete");
  if (!onboardingComplete && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <OnboardingRedirect />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/class/:id" element={<ClassDetailPage />} />
          <Route path="/group/:id" element={<HobbyGroupPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/instructor/:id" element={<InstructorProfilePage />} />
          <Route path="/class/:id/signup" element={<ClassSignupPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
