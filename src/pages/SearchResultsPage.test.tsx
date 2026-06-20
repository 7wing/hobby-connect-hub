import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SearchResultsPage from './SearchResultsPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderPage(initialRoute = '/search') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('SearchResultsPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders back button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /Go back/i })).toBeInTheDocument();
  });

  it('navigates back on back button click', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /Go back/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('renders search input', () => {
    renderPage();
    expect(screen.getByRole('searchbox', { name: /Search/i })).toBeInTheDocument();
  });

  it('clears search input when X is clicked', () => {
    renderPage('/search?q=hike');
    const input = screen.getByRole('searchbox', { name: /Search/i }) as HTMLInputElement;
    expect(input.value).toBe('hike');
    const clearBtn = screen.getAllByRole('button', { name: /Clear search/i }).find(
      (b) => b.classList.contains('absolute')
    );
    expect(clearBtn).toBeDefined();
    fireEvent.click(clearBtn!);
    expect(input.value).toBe('');
  });

  it('renders all category tabs', () => {
    renderPage();
    ['All', 'Hobbies', 'Classes', 'Instructors', 'Groups'].forEach((tab) => {
      expect(screen.getByRole('button', { name: tab })).toBeInTheDocument();
    });
  });

  it('highlights the active tab', () => {
    renderPage();
    const hobbiesTab = screen.getByRole('button', { name: 'Hobbies' });
    fireEvent.click(hobbiesTab);
    expect(hobbiesTab).toHaveClass('filter-chip-active');
    expect(screen.getByRole('button', { name: 'All' })).not.toHaveClass('filter-chip-active');
  });

  it('loads initial query from URL', () => {
    renderPage('/search?q=bird');
    const input = screen.getByRole('searchbox', { name: /Search/i }) as HTMLInputElement;
    expect(input.value).toBe('bird');
  });

  it('loads initial tab from URL', () => {
    renderPage('/search?tab=Classes');
    expect(screen.getByRole('button', { name: 'Classes' })).toHaveClass('filter-chip-active');
  });

  it('shows hobby results in All view', () => {
    renderPage();
    expect(screen.getByText('Hiking Enthusiasts')).toBeInTheDocument();
    expect(screen.getByText('Birdwatching Adventures')).toBeInTheDocument();
  });

  it('shows class results in All view', () => {
    renderPage();
    expect(screen.getByText('Hiking 101')).toBeInTheDocument();
    expect(screen.getByText('Birdwatching Basics')).toBeInTheDocument();
  });

  it('shows instructor results in All view', () => {
    renderPage();
    // Use heading role to specifically target instructor name headings
    expect(screen.getByRole('heading', { name: 'Marcus Reed' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Dr. Ana Reyes' })).toBeInTheDocument();
  });

  it('shows group results in All view', () => {
    renderPage();
    expect(screen.getByText('Urban Exploration Squad')).toBeInTheDocument();
    expect(screen.getByText('Model Train Builders')).toBeInTheDocument();
  });

  it('clicking See all Hobbies switches to Hobbies tab', () => {
    renderPage();
    const seeAll = screen.getAllByRole('button', { name: /See all/i }).find(
      (b) => b.getAttribute('aria-label') === 'See all hobbies'
    );
    expect(seeAll).toBeDefined();
    fireEvent.click(seeAll!);
    expect(screen.getByRole('button', { name: 'Hobbies' })).toHaveClass('filter-chip-active');
  });

  it('clicking See all Classes switches to Classes tab', () => {
    renderPage();
    const seeAll = screen.getAllByRole('button', { name: /See all/i }).find(
      (b) => b.getAttribute('aria-label') === 'See all classes'
    );
    expect(seeAll).toBeDefined();
    fireEvent.click(seeAll!);
    expect(screen.getByRole('button', { name: 'Classes' })).toHaveClass('filter-chip-active');
  });

  it('clicking See all Instructors switches to Instructors tab', () => {
    renderPage();
    const seeAll = screen.getAllByRole('button', { name: /See all/i }).find(
      (b) => b.getAttribute('aria-label') === 'See all instructors'
    );
    expect(seeAll).toBeDefined();
    fireEvent.click(seeAll!);
    expect(screen.getByRole('button', { name: 'Instructors' })).toHaveClass('filter-chip-active');
  });

  it('clicking See all Groups switches to Groups tab', () => {
    renderPage();
    const seeAll = screen.getAllByRole('button', { name: /See all/i }).find(
      (b) => b.getAttribute('aria-label') === 'See all groups'
    );
    expect(seeAll).toBeDefined();
    fireEvent.click(seeAll!);
    expect(screen.getByRole('button', { name: 'Groups' })).toHaveClass('filter-chip-active');
  });

  it('navigates to group page when hobby card clicked', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /View hobby Hiking Enthusiasts/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/group/hiking-enthusiasts');
  });

  it('navigates to class page when class card clicked', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /View class Hiking 101/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/class/c1');
  });

  it('navigates to instructor page when instructor card clicked', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /View instructor Marcus Reed/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/instructor/i1');
  });

  it('navigates to group page when group card clicked', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /View group Urban Exploration Squad/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/group/urban-exploration-squad');
  });

  it('filters results by search query', () => {
    renderPage();
    const input = screen.getByRole('searchbox', { name: /Search/i });
    fireEvent.change(input, { target: { value: 'Hiking' } });
    expect(screen.getByText('Hiking Enthusiasts')).toBeInTheDocument();
    expect(screen.queryByText('Birdwatching Adventures')).not.toBeInTheDocument();
  });

  it('shows only Hobbies when Hobbies tab selected', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Hobbies' }));
    expect(screen.getByText('Hiking Enthusiasts')).toBeInTheDocument();
    expect(screen.queryByText('Hiking 101')).not.toBeInTheDocument();
    expect(screen.queryByText('Marcus Reed')).not.toBeInTheDocument();
  });

  it('shows only Classes when Classes tab selected', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Classes' }));
    expect(screen.getByText('Hiking 101')).toBeInTheDocument();
    expect(screen.queryByText('Hiking Enthusiasts')).not.toBeInTheDocument();
  });

  it('shows only Instructors when Instructors tab selected', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Instructors' }));
    expect(screen.getByText('Marcus Reed')).toBeInTheDocument();
    expect(screen.queryByText('Hiking Enthusiasts')).not.toBeInTheDocument();
  });

  it('shows only Groups when Groups tab selected', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Groups' }));
    expect(screen.getByText('Urban Exploration Squad')).toBeInTheDocument();
    expect(screen.queryByText('Hiking Enthusiasts')).not.toBeInTheDocument();
  });

  it('displays member counts for hobbies', () => {
    renderPage();
    expect(screen.getByText('8,450 members')).toBeInTheDocument();
    expect(screen.getByText('4,521 members')).toBeInTheDocument();
  });

  it('displays instructor ratings', () => {
    renderPage();
    expect(screen.getAllByText('4.9').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('4.7')).toBeInTheDocument();
  });

  it('displays class prices and dates', () => {
    renderPage();
    expect(screen.getByText('$45')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Mar 22, 2026')).toBeInTheDocument();
  });

  it('displays instructor initials', () => {
    renderPage();
    expect(screen.getByText('MR')).toBeInTheDocument();
    expect(screen.getByText('AR')).toBeInTheDocument();
  });

  it('shows empty state when search has no matches', () => {
    renderPage();
    const input = screen.getByRole('searchbox', { name: /Search/i });
    fireEvent.change(input, { target: { value: 'zzzzzzzzz' } });
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
