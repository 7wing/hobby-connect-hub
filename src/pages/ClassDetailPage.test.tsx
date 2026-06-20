import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ClassDetailPage from './ClassDetailPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderPage(route = '/class/1') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/class/:id" element={<ClassDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ClassDetailPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the class title', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /Hiking 101/i })).toBeInTheDocument();
  });

  it('renders the cover image', () => {
    renderPage();
    const img = screen.getByAltText(/Hiking 101/i);
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe('IMG');
  });

  it('back button navigates to /classes', () => {
    renderPage();
    const backBtn = screen.getByRole('button', { name: /Go back to classes/i });
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/classes');
  });

  it('shows instructor name and navigates to instructor profile on click', () => {
    renderPage();
    const instructorBtn = screen.getByRole('button', { name: /View instructor profile for Marcus Reed/i });
    expect(instructorBtn).toBeInTheDocument();
    expect(screen.getByText('Marcus Reed')).toBeInTheDocument();
    fireEvent.click(instructorBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/instructor/inst-1');
  });

  it('displays rating and review count', () => {
    renderPage();
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('(24 reviews)')).toBeInTheDocument();
  });

  it('renders "What you\'ll learn" section with bullet items', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /What you'll learn/i })).toBeInTheDocument();
    expect(screen.getByText('How to choose the right trail for your fitness level')).toBeInTheDocument();
    expect(screen.getByText('Essential safety protocols for wilderness hiking')).toBeInTheDocument();
    expect(screen.getByText('Navigation basics using a map and compass')).toBeInTheDocument();
    expect(screen.getByText('Leave No Trace principles for eco-friendly trekking')).toBeInTheDocument();
    expect(screen.getByText('Packing techniques for day hikes and overnights')).toBeInTheDocument();
  });

  it('renders materials section', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /Materials to bring/i })).toBeInTheDocument();
    expect(screen.getByText(/Comfortable hiking boots or trail shoes/i)).toBeInTheDocument();
    expect(screen.getByText(/Water bottle/i)).toBeInTheDocument();
  });

  it('renders upcoming session dates', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /Upcoming sessions/i })).toBeInTheDocument();
    expect(screen.getByText('Mar 22, 2026')).toBeInTheDocument();
    expect(screen.getByText('Mar 29, 2026')).toBeInTheDocument();
  });

  it('displays price and spots left', () => {
    renderPage();
    expect(screen.getByText('$45')).toBeInTheDocument();
    expect(screen.getByText('5 spots left')).toBeInTheDocument();
  });

  it('renders reviews section with reviewer details', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /Reviews/i })).toBeInTheDocument();
    expect(screen.getByText('Sarah J.')).toBeInTheDocument();
    expect(screen.getByText('David K.')).toBeInTheDocument();
    expect(screen.getByText('Emily R.')).toBeInTheDocument();
    expect(screen.getByText('Feb 15, 2026')).toBeInTheDocument();
  });

  it('has a Book now button that navigates to signup', () => {
    renderPage();
    const bookBtn = screen.getByRole('button', { name: /Book now/i });
    expect(bookBtn).toBeInTheDocument();
    fireEvent.click(bookBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/class/1/signup');
  });
});
