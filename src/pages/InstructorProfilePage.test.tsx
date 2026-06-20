import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import InstructorProfilePage from './InstructorProfilePage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderPage(route = '/instructor/inst-1') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/instructor/:id" element={<InstructorProfilePage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('InstructorProfilePage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders instructor name', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /Marcus Reed/i })).toBeInTheDocument();
  });

  it('renders back button and navigates back on click', () => {
    renderPage();
    const backBtn = screen.getByRole('button', { name: /Go back/i });
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('renders bio text', () => {
    renderPage();
    expect(
      screen.getByText(/Outdoor educator and certified wilderness guide/i)
    ).toBeInTheDocument();
  });

  it('renders stats row with classes, students, and rating', () => {
    renderPage();
    expect(screen.getByText('12 classes')).toBeInTheDocument();
    expect(screen.getByText('142 students')).toBeInTheDocument();
    expect(screen.getByText('4.9')).toBeInTheDocument();
    expect(screen.getByText('(36)')).toBeInTheDocument();
  });

  it('renders Specialties section with tags', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /Specialties/i })).toBeInTheDocument();
    const specialties = ['Hiking', 'Navigation', 'Wildlife', 'Camping', 'Orienteering'];
    specialties.forEach((specialty) => {
      expect(screen.getByText(specialty)).toBeInTheDocument();
    });
  });

  it('renders Upcoming Classes section with class cards', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { name: /Upcoming Classes/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Hiking 101')).toBeInTheDocument();
    expect(screen.getByText('Night Sky Astronomy')).toBeInTheDocument();
    expect(screen.getByText('Wildlife Tracking')).toBeInTheDocument();
  });

  it('clicking a class card navigates to class detail', () => {
    renderPage();
    const classBtn = screen.getByRole('button', { name: /View class Hiking 101/i });
    fireEvent.click(classBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/class/1');
  });

  it('renders Reviews section with reviewer details', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /Reviews/i })).toBeInTheDocument();
    expect(screen.getByText('Sarah J.')).toBeInTheDocument();
    expect(screen.getByText('David K.')).toBeInTheDocument();
    expect(screen.getByText('Emily R.')).toBeInTheDocument();
  });

  it('renders review dates and comments', () => {
    renderPage();
    expect(screen.getByText('Feb 15, 2026')).toBeInTheDocument();
    expect(
      screen.getByText(/Marcus is an incredible instructor/i)
    ).toBeInTheDocument();
  });

  it('renders Follow button that toggles to Following on click', () => {
    renderPage();
    const followBtn = screen.getByRole('button', { name: /Follow instructor/i });
    expect(followBtn).toBeInTheDocument();
    expect(followBtn).toHaveTextContent('Follow');
    fireEvent.click(followBtn);
    expect(followBtn).toHaveTextContent('Following');
  });

  it('clicking Following button toggles back to Follow', () => {
    renderPage();
    const followBtn = screen.getByRole('button', { name: /Follow instructor/i });
    fireEvent.click(followBtn);
    expect(followBtn).toHaveTextContent('Following');
    fireEvent.click(followBtn);
    expect(followBtn).toHaveTextContent('Follow');
  });

  it('renders avatar fallback with instructor initials', () => {
    renderPage();
    expect(screen.getByText('MR')).toBeInTheDocument();
  });
});
