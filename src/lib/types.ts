// Type definitions for PromptNest AI

export interface Post {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  images: {
    url: string;
    alt: string;
    width: number;
    height: number;
    thumb: string;
  }[];
  prompt: {
    title: string;
    text: string;
    model: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    cost?: number;
  };
  tags: string[];
  category: Category;
  author: UserProfile;
  stats: {
    views: number;
    likes: number;
    saves: number;
    shares: number;
    comments: number;
  };
  isFeatured: boolean;
  isTrending: boolean;
  status: "draft" | "published" | "archived";
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  avatar: string;
  bio: string;
  website?: string;
  username: string;
  isCreator: boolean;
  isAdmin: boolean;
  followerCount: number;
  followingCount: number;
  savedCount: number;
  postCount: number;
  createdAt: string;
  updatedAt: string;
  stats: {
    viewsThisMonth: number;
    savesThisMonth: number;
    followersGain: number;
  };
}

export interface Comment {
  id: string;
  postId: string;
  author: Pick<UserProfile, "uid" | "displayName" | "avatar" | "username">;
  content: string;
  likes: number;
  parentId?: string;
  replies?: Comment[];
  createdAt: string;
  isApproved: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  postCount: number;
  color: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  owner: Pick<UserProfile, "uid" | "displayName" | "avatar" | "username">;
  posts: string[]; // post IDs
  isPublic: boolean;
  coverImage: string;
  createdAt: string;
}

export interface SearchFilters {
  query: string;
  category?: string;
  tags?: string[];
  sortBy: "recent" | "popular" | "trending";
  isFeatured?: boolean;
  isTrending?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  cursor?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
    nextCursor?: string;
  };
}

export interface DashboardStats {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalSaves: number;
  totalUsers: number;
  totalComments: number;
  newPostsThisWeek: number;
  newUsersThisWeek: number;
  viewsChart: { date: string; views: number }[];
  topPosts: Pick<Post, "id" | "title" | "slug" | "stats" | "featuredImage">[];
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: "post_published" | "comment_added" | "user_followed" | "post_featured";
  message: string;
  timestamp: string;
  relatedId?: string;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

export type SortOption = "recent" | "popular" | "trending" | "oldest";
export type AIModel = "Midjourney" | "DALL-E 3" | "Stable Diffusion" | "ChatGPT" | "Claude" | "Gemini" | "Other";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
