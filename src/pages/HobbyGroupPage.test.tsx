import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HobbyGroupPage from './HobbyGroupPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

function renderPage(route = '/group/austin-hikers') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/group/:slug" element={<HobbyGroupPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('HobbyGroupPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the group name and member count', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /Austin Hikers/i })).toBeInTheDocument();
    expect(screen.getByText(/1,247 members/i)).toBeInTheDocument();
  });

  it('renders the cover image', () => {
    renderPage();
    const img = screen.getByAltText(/Austin Hikers/i);
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe('IMG');
  });

  it('back button navigates back', () => {
    renderPage();
    const backBtn = screen.getByRole('button', { name: /Go back/i });
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('renders the description', () => {
    renderPage();
    expect(screen.getByText(/A community of hiking enthusiasts exploring trails around Austin, TX/i)).toBeInTheDocument();
  });

  it('renders the Join Group button and toggles to Joined', () => {
    renderPage();
    const joinBtn = screen.getByRole('button', { name: /Join Group/i });
    expect(joinBtn).toBeInTheDocument();
    fireEvent.click(joinBtn);
    expect(screen.getByRole('button', { name: /Joined/i })).toBeInTheDocument();
  });

  it('renders stats row with members, posts, and events', () => {
    renderPage();
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('1,247')).toBeInTheDocument();
    expect(screen.getByText('342')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders CLASSES IN THIS GROUP section', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /CLASSES IN THIS GROUP/i })).toBeInTheDocument();
    expect(screen.getByText('Hiking 101: Beginner Trails')).toBeInTheDocument();
    expect(screen.getByText('Wildflower Identification Walk')).toBeInTheDocument();
    expect(screen.getByText('Sunset Peak Challenge')).toBeInTheDocument();
  });

  it('class card navigates to class detail', () => {
    renderPage();
    const classCard = screen.getByText('Hiking 101: Beginner Trails').closest('div');
    expect(classCard).toBeInTheDocument();
    fireEvent.click(classCard!);
    expect(mockNavigate).toHaveBeenCalledWith('/class/c1');
  });

  it('renders MEMBERS section with avatars and extra count', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /MEMBERS/i })).toBeInTheDocument();
    expect(screen.getByText('+42 more')).toBeInTheDocument();
  });

  it('members See all button navigates to members page', () => {
    renderPage();
    const seeAllBtn = screen.getByRole('button', { name: /See all/i });
    expect(seeAllBtn).toBeInTheDocument();
    fireEvent.click(seeAllBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/group/austin-hikers/members');
  });

  it('renders RECENT POSTS section', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /RECENT POSTS/i })).toBeInTheDocument();
    expect(screen.getByText(/Barton Creek trail/i)).toBeInTheDocument();
    expect(screen.getByText(/sunscreen and extra water/i)).toBeInTheDocument();
    expect(screen.getByText(/hiking poles/i)).toBeInTheDocument();
  });

  it('post card navigates to post detail', () => {
    renderPage();
    const postCard = screen.getByText(/Barton Creek trail/i).closest('div');
    expect(postCard).toBeInTheDocument();
    fireEvent.click(postCard!);
    expect(mockNavigate).toHaveBeenCalledWith('/post/p1');
  });

  it('renders post like and comment counts', () => {
    renderPage();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('56')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('renders UPCOMING EVENTS section', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /UPCOMING EVENTS/i })).toBeInTheDocument();
    expect(screen.getByText('Group Hike: Mount Bonnell')).toBeInTheDocument();
    expect(screen.getByText('Sunset Social & Potluck')).toBeInTheDocument();
  });

  it('event card navigates to event detail', () => {
    renderPage();
    const eventCard = screen.getByText('Group Hike: Mount Bonnell').closest('div');
    expect(eventCard).toBeInTheDocument();
    fireEvent.click(eventCard!);
    expect(mockNavigate).toHaveBeenCalledWith('/event/e1');
  });

  it('renders event locations', () => {
    renderPage();
    expect(screen.getByText(/Mount Bonnell Trailhead/i)).toBeInTheDocument();
    expect(screen.getByText(/Zilker Park Picnic Area/i)).toBeInTheDocument();
  });
});
