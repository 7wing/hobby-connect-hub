import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ClassesPage from './ClassesPage';

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
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<ClassesPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ClassesPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the Classes header', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /Classes/i })).toBeInTheDocument();
  });

  it('shows search button that navigates to search page', () => {
    renderPage();
    const searchBtn = screen.getByRole('button', { name: /Search classes/i });
    expect(searchBtn).toBeInTheDocument();
    fireEvent.click(searchBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/search?tab=classes');
  });

  it('renders all filter chips', () => {
    renderPage();
    const chips = ['All', 'Free', 'Paid', 'Beginner', 'Intermediate', 'Advanced', 'In-Person', 'Virtual'];
    chips.forEach((chip) => {
      expect(screen.getByRole('button', { name: chip })).toBeInTheDocument();
    });
  });

  it('highlights the active filter chip', () => {
    renderPage();
    const beginnerChip = screen.getByRole('button', { name: 'Beginner' });
    fireEvent.click(beginnerChip);
    expect(beginnerChip).toHaveClass('filter-chip-active');
    expect(screen.getByRole('button', { name: 'All' })).not.toHaveClass('filter-chip-active');
  });

  it('renders all 6 class cards by default', () => {
    renderPage();
    expect(screen.getByText('Hiking 101')).toBeInTheDocument();
    expect(screen.getByText('Birdwatching Basics')).toBeInTheDocument();
    expect(screen.getByText('Night Sky Astronomy')).toBeInTheDocument();
    expect(screen.getByText('Fly Fishing Masterclass')).toBeInTheDocument();
    expect(screen.getByText('Urban Sketching')).toBeInTheDocument();
    expect(screen.getByText('Model Train Engineering')).toBeInTheDocument();
  });

  it('shows instructor names', () => {
    renderPage();
    expect(screen.getByText('Marcus Reed')).toBeInTheDocument();
    expect(screen.getByText('Dr. Ana Reyes')).toBeInTheDocument();
    expect(screen.getByText('Sam Whitmore')).toBeInTheDocument();
  });

  it('shows prices and spots remaining', () => {
    renderPage();
    expect(screen.getByText('$45')).toBeInTheDocument();
    expect(screen.getAllByText('Free').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('3 spots left')).toBeInTheDocument();
    expect(screen.getByText('12 spots left')).toBeInTheDocument();
  });

  it('shows star ratings', () => {
    renderPage();
    expect(screen.getAllByText('4.8').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('4.9').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('4.7')).toBeInTheDocument();
    expect(screen.getByText('4.6')).toBeInTheDocument();
  });

  it('has Sign Up buttons for each class', () => {
    renderPage();
    const signUpButtons = screen.getAllByRole('button', { name: /Sign Up/i });
    expect(signUpButtons.length).toBe(6);
  });

  it('clicking Sign Up navigates to class detail page', () => {
    renderPage();
    const signUpButtons = screen.getAllByRole('button', { name: /Sign Up/i });
    fireEvent.click(signUpButtons[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/class/1');
  });

  it('filters to show only Free classes', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Free' }));
    expect(screen.getByText('Birdwatching Basics')).toBeInTheDocument();
    expect(screen.queryByText('Hiking 101')).not.toBeInTheDocument();
    expect(screen.queryByText('Fly Fishing Masterclass')).not.toBeInTheDocument();
  });

  it('filters to show only Paid classes', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Paid' }));
    expect(screen.queryByText('Birdwatching Basics')).not.toBeInTheDocument();
    expect(screen.getByText('Hiking 101')).toBeInTheDocument();
    expect(screen.getByText('Fly Fishing Masterclass')).toBeInTheDocument();
  });

  it('filters by level Beginner', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Beginner' }));
    expect(screen.getByText('Hiking 101')).toBeInTheDocument();
    expect(screen.getByText('Birdwatching Basics')).toBeInTheDocument();
    expect(screen.getByText('Urban Sketching')).toBeInTheDocument();
    expect(screen.queryByText('Night Sky Astronomy')).not.toBeInTheDocument();
  });

  it('filters by level Advanced', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Advanced' }));
    expect(screen.getByText('Fly Fishing Masterclass')).toBeInTheDocument();
    expect(screen.queryByText('Hiking 101')).not.toBeInTheDocument();
  });

  it('filters by format In-Person', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'In-Person' }));
    expect(screen.getByText('Hiking 101')).toBeInTheDocument();
    expect(screen.queryByText('Urban Sketching')).not.toBeInTheDocument();
    expect(screen.queryByText('Night Sky Astronomy')).not.toBeInTheDocument();
  });

  it('filters by format Virtual', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Virtual' }));
    expect(screen.getByText('Night Sky Astronomy')).toBeInTheDocument();
    expect(screen.getByText('Urban Sketching')).toBeInTheDocument();
    expect(screen.queryByText('Hiking 101')).not.toBeInTheDocument();
  });

  it('displays date and duration for each class', () => {
    renderPage();
    expect(screen.getByText(/Mar 22, 2026/)).toBeInTheDocument();
    expect(screen.getByText(/3 hrs/)).toBeInTheDocument();
  });

  it('displays instructor avatar fallback for each class', () => {
    renderPage();
    expect(screen.getByText('MR')).toBeInTheDocument();
    expect(screen.getByText('AR')).toBeInTheDocument();
    expect(screen.getByText('SW')).toBeInTheDocument();
  });
});
