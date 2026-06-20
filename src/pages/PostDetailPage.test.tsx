import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PostDetailPage from './PostDetailPage';

const mockNavigate = vi.fn();
const mockToast = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/hooks/use-toast', () => ({
  toast: (...args: unknown[]) => mockToast(...args),
}));

function renderPage(route = '/post/p1') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('PostDetailPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockToast.mockClear();
  });

  it('renders the back button and navigates back on click', () => {
    renderPage();
    const backBtn = screen.getByRole('button', { name: /Go back/i });
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('renders the original post author and timestamp', () => {
    renderPage();
    expect(screen.getAllByText('Sarah Jenkins').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('2h ago')).toBeInTheDocument();
  });

  it('renders the original post text', () => {
    renderPage();
    expect(
      screen.getByText(/Just got back from the Barton Creek trail/i)
    ).toBeInTheDocument();
  });

  it('renders the post image', () => {
    renderPage();
    const img = screen.getByAltText(/Post attachment/i);
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe('IMG');
  });

  it('renders the reaction bar with like, comment, and share buttons', () => {
    renderPage();
    expect(screen.getByLabelText(/Like post/i)).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByLabelText(/Share post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Save post/i)).toBeInTheDocument();
  });

  it('toggles like state and updates count', () => {
    renderPage();
    const likeBtn = screen.getByLabelText(/Like post/i);
    expect(screen.getByText('24')).toBeInTheDocument();
    fireEvent.click(likeBtn);
    expect(screen.getByText('25')).toBeInTheDocument();
    fireEvent.click(likeBtn);
    expect(screen.getByText('24')).toBeInTheDocument();
  });

  it('toggles save state and shows toast', () => {
    renderPage();
    const saveBtn = screen.getByLabelText(/Save post/i);
    fireEvent.click(saveBtn);
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Saved' })
    );
    fireEvent.click(saveBtn);
    expect(mockToast).toHaveBeenLastCalledWith(
      expect.objectContaining({ title: 'Unsaved' })
    );
  });

  it('shows toast on share click', () => {
    renderPage();
    const shareBtn = screen.getByLabelText(/Share post/i);
    fireEvent.click(shareBtn);
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Shared' })
    );
  });

  it('renders COMMENTS section with total count', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /COMMENTS/i })).toBeInTheDocument();
  });

  it('renders comment input and post button', () => {
    renderPage();
    expect(screen.getByPlaceholderText(/Write a comment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Post comment/i)).toBeInTheDocument();
  });

  it('posts a comment and clears input when text is provided', () => {
    renderPage();
    const input = screen.getByPlaceholderText(/Write a comment/i) as HTMLInputElement;
    const postBtn = screen.getByLabelText(/Post comment/i);

    fireEvent.change(input, { target: { value: 'Nice post!' } });
    expect(input.value).toBe('Nice post!');

    fireEvent.click(postBtn);
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Comment posted' })
    );
    expect(input.value).toBe('');
  });

  it('does not post an empty comment', () => {
    renderPage();
    const postBtn = screen.getByLabelText(/Post comment/i);
    fireEvent.click(postBtn);
    expect(mockToast).not.toHaveBeenCalled();
  });

  it('renders all mock comments', () => {
    renderPage();
    expect(screen.getAllByText('Marcus Reed').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('David Ko').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Elena Rossi').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Sam Whitmore')).toBeInTheDocument();
  });

  it('renders comment text content', () => {
    renderPage();
    expect(screen.getByText(/Great photos! What time did you start?/i)).toBeInTheDocument();
    expect(screen.getByText(/The east loop is my favorite/i)).toBeInTheDocument();
    expect(screen.getByText(/Thanks for the tip!/i)).toBeInTheDocument();
    expect(screen.getByText(/Bring plenty of water/i)).toBeInTheDocument();
  });

  it('renders comment timestamps', () => {
    renderPage();
    expect(screen.getAllByText('1h ago').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('45m ago').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('20m ago')).toBeInTheDocument();
  });

  it('renders comment like counts', () => {
    renderPage();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getAllByText('4').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('6').length).toBeGreaterThanOrEqual(1);
  });

  it('renders nested replies', () => {
    renderPage();
    expect(
      screen.getByText(/Around 7 AM — perfect light and fewer people/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/They were in full bloom last weekend too!/i)
    ).toBeInTheDocument();
  });

  it('renders reply authors', () => {
    renderPage();
    expect(screen.getAllByText('Sarah Jenkins').length).toBeGreaterThanOrEqual(1);
  });

  it('renders RELATED CLASS section', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /RELATED CLASS/i })).toBeInTheDocument();
    expect(screen.getByText('Hiking 101: Beginner Trails')).toBeInTheDocument();
    expect(screen.getByText(/Instructor: Marcus Reed/i)).toBeInTheDocument();
    expect(screen.getByText('$45')).toBeInTheDocument();
  });

  it('navigates to class detail when related class card is clicked', () => {
    renderPage();
    const classCard = screen.getByText('Hiking 101: Beginner Trails').closest('div');
    expect(classCard).toBeInTheDocument();
    fireEvent.click(classCard!);
    expect(mockNavigate).toHaveBeenCalledWith('/class/c1');
  });

  it('renders MORE FROM THIS GROUP section', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { name: /MORE FROM THIS GROUP/i })
    ).toBeInTheDocument();
  });

  it('renders more-from-group post previews', () => {
    renderPage();
    expect(screen.getByText(/Reminder: sunscreen and extra water/i)).toBeInTheDocument();
    expect(screen.getByText(/Does anyone have recommendations for hiking poles/i)).toBeInTheDocument();
    expect(screen.getByText(/New trail map uploaded for the April group hike/i)).toBeInTheDocument();
  });

  it('navigates to post detail when more-from-group card is clicked', () => {
    renderPage();
    const postCard = screen.getByText(/Reminder: sunscreen and extra water/i).closest('div');
    expect(postCard).toBeInTheDocument();
    fireEvent.click(postCard!);
    expect(mockNavigate).toHaveBeenCalledWith('/post/p2');
  });

  it('renders like and comment counts for more-from-group posts', () => {
    renderPage();
    expect(screen.getByText('56')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getAllByText('6').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('32')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
  });
});
