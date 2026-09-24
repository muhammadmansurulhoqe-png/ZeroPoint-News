export type NewsCategory =
  | 'national'
  | 'politics'
  | 'international'
  | 'economy'
  | 'crime'
  | 'sports'
  | 'entertainment'
  | 'district'
  | 'special'
  | 'tech'
  | 'lifestyle'
  | 'opinion';

export interface NewsArticle {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string[];
  category: NewsCategory;
  categoryBn: string;
  image: string;
  imageCaption?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
    location: string;
  };
  publishedAt: string; // e.g. "১০ মিনিট আগে" or formatted date
  timestamp: number;
  readTime: string;
  views: number;
  isBreaking?: boolean;
  isLead?: boolean;
  isSpecialReport?: boolean;
  division?: string;
  district?: string;
  tags: string[];
  commentsCount: number;
}

export interface VideoNews {
  id: string;
  title: string;
  duration: string;
  views: string;
  publishedAt: string;
  thumbnail: string;
  videoUrl?: string; // YouTube embed or video URL
  category: string;
  programName?: string; // e.g. "ইনভেস্টিগেশন ৩৬০", "স্পেশাল বুলেটিন", "রাত বারোটার খবর"
}

export interface PollData {
  id: string;
  question: string;
  description?: string;
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
  totalVotes: number;
  userVotedOptionId?: string;
  expiresAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  userName: string;
  userLocation?: string;
  commentText: string;
  timestamp: string;
  likes: number;
}
