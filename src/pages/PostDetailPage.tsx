import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Send,
} from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import hobbyForaging from '@/assets/hobby-foraging.jpg';

interface Reply {
  id: string;
  author: { name: string; initials: string };
  timestamp: string;
  text: string;
  likes: number;
}

interface Comment {
  id: string;
  author: { name: string; initials: string };
  timestamp: string;
  text: string;
  likes: number;
  replies?: Reply[];
}

interface Post {
  id: string;
  author: { name: string; initials: string };
  timestamp: string;
  text: string;
  image?: string;
  likes: number;
  comments: number;
  commentList: Comment[];
}

const mockPost: Post = {
  id: 'p1',
  author: { name: 'Sarah Jenkins', initials: 'SJ' },
  timestamp: '2h ago',
  text: 'Just got back from the Barton Creek trail — the wildflowers are absolutely stunning right now! Highly recommend the east loop if you want the best views. Don\'t forget your sunscreen!',
  image: hobbyForaging,
  likes: 24,
  comments: 4,
  commentList: [
    {
      id: 'c1',
      author: { name: 'Marcus Reed', initials: 'MR' },
      timestamp: '1h ago',
      text: 'Great photos! What time did you start?',
      likes: 5,
      replies: [
        {
          id: 'r1',
          author: { name: 'Sarah Jenkins', initials: 'SJ' },
          timestamp: '45m ago',
          text: 'Around 7 AM — perfect light and fewer people.',
          likes: 3,
        },
      ],
    },
    {
      id: 'c2',
      author: { name: 'David Ko', initials: 'DK' },
      timestamp: '1h ago',
      text: 'The east loop is my favorite. Did you see the bluebonnets near the creek crossing?',
      likes: 8,
      replies: [
        {
          id: 'r2',
          author: { name: 'Elena Rossi', initials: 'ER' },
          timestamp: '30m ago',
          text: 'They were in full bloom last weekend too!',
          likes: 2,
        },
      ],
    },
    {
      id: 'c3',
      author: { name: 'Elena Rossi', initials: 'ER' },
      timestamp: '45m ago',
      text: 'Thanks for the tip! Planning to go this weekend.',
      likes: 4,
    },
    {
      id: 'c4',
      author: { name: 'Sam Whitmore', initials: 'SW' },
      timestamp: '20m ago',
      text: 'Bring plenty of water. It gets hot fast out there.',
      likes: 6,
    },
  ],
};

const relatedClass = {
  id: 'c1',
  title: 'Hiking 101: Beginner Trails',
  instructor: 'Marcus Reed',
  price: '$45',
};

const moreFromGroup = [
  {
    id: 'p2',
    author: { name: 'David Ko', initials: 'DK' },
    timestamp: '5h ago',
    text: 'Reminder: sunscreen and extra water are must-haves this weekend. Temps are hitting 95°F on the ridge trails. Stay safe out there!',
    likes: 56,
    comments: 12,
  },
  {
    id: 'p3',
    author: { name: 'Elena Rossi', initials: 'ER' },
    timestamp: '1d ago',
    text: 'Does anyone have recommendations for hiking poles? Looking for something lightweight and collapsible for the upcoming Sunset Peak Challenge.',
    likes: 15,
    comments: 6,
  },
  {
    id: 'p4',
    author: { name: 'Marcus Reed', initials: 'MR' },
    timestamp: '2d ago',
    text: 'New trail map uploaded for the April group hike. Check the files section and let me know if you have questions about the route.',
    likes: 32,
    comments: 9,
  },
];

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(mockPost.likes);
  const [commentText, setCommentText] = useState('');

  const handleLikeToggle = () => {
    setLiked((prev) => {
      const next = !prev;
      setLikeCount((count) => (next ? count + 1 : count - 1));
      return next;
    });
  };

  const handleSaveToggle = () => {
    setSaved((prev) => {
      const next = !prev;
      toast({
        title: next ? 'Saved' : 'Unsaved',
        description: next ? 'Post saved to your collection.' : 'Post removed from your collection.',
      });
      return next;
    });
  };

  const handleShare = () => {
    toast({
      title: 'Shared',
      description: 'Post link copied to clipboard.',
    });
  };

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    toast({
      title: 'Comment posted',
      description: 'Your comment has been added.',
    });
    setCommentText('');
  };

  const totalComments = mockPost.commentList.reduce(
    (sum, c) => sum + 1 + (c.replies?.length ?? 0),
    0
  );

  return (
    <MobileLayout>
      {/* Header / Back button */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg px-4 sm:px-6 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center pt-3 pb-2">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>

      {/* Original post card */}
      <div className="px-4 sm:px-6 pt-2">
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-xs">{mockPost.author.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-card-foreground">{mockPost.author.name}</p>
              <p className="text-xs text-muted-foreground">{mockPost.timestamp}</p>
            </div>
          </div>

          <p className="text-sm text-card-foreground leading-relaxed mb-3">{mockPost.text}</p>

          {mockPost.image && (
            <img
              src={mockPost.image}
              alt="Post attachment"
              className="w-full h-48 sm:h-56 object-cover rounded-lg mb-3"
            />
          )}

          {/* Reaction bar */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLikeToggle}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  liked ? 'text-red-500' : 'text-muted-foreground'
                }`}
                aria-label="Like post"
              >
                <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                <span>{likeCount}</span>
              </button>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MessageCircle size={18} />
                <span>{mockPost.comments}</span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Share post"
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>

            <button
              onClick={handleSaveToggle}
              className={`text-sm transition-colors ${
                saved ? 'text-primary' : 'text-muted-foreground'
              }`}
              aria-label="Save post"
            >
              <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {/* COMMENTS section */}
      <section className="px-4 sm:px-6 pt-6" aria-label="Comments">
        <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-3">
          COMMENTS ({totalComments})
        </h2>

        {/* Comment input */}
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" variant="ghost" onClick={handlePostComment} aria-label="Post comment">
            <Send size={18} />
          </Button>
        </div>

        {/* Comment list */}
        <div className="space-y-4">
          {mockPost.commentList.map((comment) => (
            <div key={comment.id}>
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 mt-0.5">
                  <AvatarFallback className="text-[10px]">{comment.author.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="rounded-lg border bg-card p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-card-foreground">{comment.author.name}</p>
                      <p className="text-[10px] text-muted-foreground">{comment.timestamp}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1 ml-1">
                    <button
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`Like comment by ${comment.author.name}`}
                    >
                      <Heart size={12} />
                      <span>{comment.likes}</span>
                    </button>
                  </div>

                  {/* Nested replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-2 ml-4 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="h-7 w-7 mt-0.5">
                            <AvatarFallback className="text-[10px]">{reply.author.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="rounded-lg border bg-card p-3">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-xs font-medium text-card-foreground">{reply.author.name}</p>
                                <p className="text-[10px] text-muted-foreground">{reply.timestamp}</p>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">{reply.text}</p>
                            </div>
                            <div className="flex items-center gap-3 mt-1 ml-1">
                              <button
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={`Like reply by ${reply.author.name}`}
                              >
                                <Heart size={12} />
                                <span>{reply.likes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related class card */}
      <section className="px-4 sm:px-6 pt-6" aria-label="Related class">
        <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-3">
          RELATED CLASS
        </h2>
        <div
          onClick={() => navigate(`/class/${relatedClass.id}`)}
          className="rounded-xl border bg-card p-4 cursor-pointer hover:shadow-sm transition-shadow"
        >
          <p className="font-heading font-semibold text-card-foreground text-sm sm:text-base leading-tight">
            {relatedClass.title}
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Instructor: {relatedClass.instructor}
          </p>
          <p className="text-muted-foreground text-xs mt-0.5">{relatedClass.price}</p>
        </div>
      </section>

      {/* More from this group */}
      <section className="px-4 sm:px-6 pt-6 pb-8" aria-label="More from this group">
        <h2 className="font-heading font-semibold text-sm sm:text-base text-foreground mb-3">
          MORE FROM THIS GROUP
        </h2>
        <div className="space-y-3">
          {moreFromGroup.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              className="rounded-xl border bg-card p-3 cursor-pointer hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-[10px]">{post.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-medium text-card-foreground">{post.author.name}</p>
                  <p className="text-[10px] text-muted-foreground">{post.timestamp}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{post.text}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Heart size={14} />
                  <span className="text-xs">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MessageCircle size={14} />
                  <span className="text-xs">{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MobileLayout>
  );
}
