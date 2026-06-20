import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import OnboardingPage from './OnboardingPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/onboarding']}>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('OnboardingPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  it('renders the Welcome screen on initial load', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /Welcome to Outings/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
  });

  it('advances to Pick Hobbies screen after clicking Get Started', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    expect(screen.getByRole('heading', { name: /What are you interested in\?/i })).toBeInTheDocument();
  });

  it('renders all hobby chips on Pick Hobbies screen', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    const hobbies = [
      'Hiking',
      'Birdwatching',
      'Astronomy',
      'Fishing',
      'Trains',
      'Architecture',
      'Urban Exploration',
      'Hunting',
      'Photography',
      'Gardening',
    ];
    hobbies.forEach((hobby) => {
      expect(screen.getByRole('button', { name: new RegExp(hobby, 'i') })).toBeInTheDocument();
    });
  });

  it('toggles hobby selection and highlights selected chips', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    const hikingChip = screen.getByRole('button', { name: /Hiking/i });
    fireEvent.click(hikingChip);
    expect(hikingChip).toHaveClass('border-primary');
    fireEvent.click(hikingChip);
    expect(hikingChip).not.toHaveClass('border-primary');
  });

  it('disables Next on Pick Hobbies if none selected', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    const nextBtn = screen.getByRole('button', { name: /^Next$/i });
    expect(nextBtn).toBeDisabled();
  });

  it('enables Next on Pick Hobbies after selecting a hobby', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    fireEvent.click(screen.getByRole('button', { name: /Hiking/i }));
    const nextBtn = screen.getByRole('button', { name: /^Next$/i });
    expect(nextBtn).not.toBeDisabled();
  });

  it('advances to Skill Level screen after Pick Hobbies', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    fireEvent.click(screen.getByRole('button', { name: /Hiking/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    expect(screen.getByRole('heading', { name: /What.s your skill level\?/i })).toBeInTheDocument();
  });

  it('renders skill level options', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    fireEvent.click(screen.getByRole('button', { name: /Hiking/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    expect(screen.getByRole('button', { name: /Beginner/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Intermediate/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Advanced/i })).toBeInTheDocument();
  });

  it('disables Next on Skill Level if none selected', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    fireEvent.click(screen.getByRole('button', { name: /Hiking/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    const nextBtn = screen.getByRole('button', { name: /^Next$/i });
    expect(nextBtn).toBeDisabled();
  });

  it('advances to Location screen after Skill Level', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    fireEvent.click(screen.getByRole('button', { name: /Hiking/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    fireEvent.click(screen.getByRole('button', { name: /Beginner/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    expect(screen.getByRole('heading', { name: /Where are you located\?/i })).toBeInTheDocument();
  });

  it('renders location input and allow location access button', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    fireEvent.click(screen.getByRole('button', { name: /Hiking/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    fireEvent.click(screen.getByRole('button', { name: /Beginner/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    expect(screen.getByPlaceholderText(/City or ZIP code/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Allow location access/i })).toBeInTheDocument();
  });

  it('advances to Notifications screen after Location', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    fireEvent.click(screen.getByRole('button', { name: /Hiking/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    fireEvent.click(screen.getByRole('button', { name: /Beginner/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    expect(screen.getByRole('heading', { name: /Stay in the loop/i })).toBeInTheDocument();
  });

  it('renders notification toggles defaulting to on', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    fireEvent.click(screen.getByRole('button', { name: /Hiking/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    fireEvent.click(screen.getByRole('button', { name: /Beginner/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    expect(screen.getAllByText(/Class reminders/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Group activity/i).length).toBeGreaterThanOrEqual(1);
    const switches = screen.getAllByRole('switch');
    expect(switches.length).toBe(2);
    switches.forEach((sw) => {
      expect(sw).toHaveAttribute('data-state', 'checked');
    });
  });

  it('saves onboardingComplete to localStorage and navigates home on Finish', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    fireEvent.click(screen.getByRole('button', { name: /Hiking/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    fireEvent.click(screen.getByRole('button', { name: /Beginner/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/i }));
    fireEvent.click(screen.getByRole('button', { name: /Finish/i }));
    expect(localStorage.getItem('onboardingComplete')).toBe('true');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('clicking Skip jumps to the last step', () => {
    renderPage();
    fireEvent.click(screen.getByText(/Skip/i));
    expect(screen.getByRole('heading', { name: /Stay in the loop/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Finish/i })).toBeInTheDocument();
  });

  it('renders step indicator dots', () => {
    renderPage();
    const dots = screen.getAllByText('', { selector: 'div' }).filter(
      (el) => el.className.includes('rounded-full') && el.className.includes('h-2')
    );
    expect(dots.length).toBe(5);
  });
});
