
export enum Mood {
  Good = 'Good',
  Neutral = 'Neutral',
  Low = 'Low',
  Anxious = 'Anxious'
}

export type Tab = 'home' | 'growth' | 'jobs' | 'connect' | 'garden';

export interface UserState {
  name: string;
  isOnboarded: boolean;
  level: number;
  exp: number;
  streak: number;
  sunlightCollected: boolean;
  currentMood: Mood;
  coins: number; // For rewards
  bingoCompleted: boolean; // New field to track bingo reward
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  isCompleted: boolean;
  category: 'health' | 'growth' | 'social';
}

export interface ShredderResponse {
  comfortMessage: string;
  actionItem: string;
}

export interface ExperienceTranslation {
  skill: string;
  description: string;
  originalText?: string;
}

export interface JobBuff {
  name: string;
  score: number; // 1-100, visual only, always high
  description: string;
}

export interface SocialScriptResponse {
  script: string;
  tips: string;
}

export interface BingoCell {
  id: number;
  label: string;
  isCompleted: boolean;
}

export interface FailurePost {
  id: number;
  content: string;
  cheers: number;
  isMine: boolean;
}

export interface CommunityPost {
  id: number;
  author: string;
  content: string;
  likes: number;
  comments: number;
  tag: string;
  timestamp: string;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  // Qualitative evaluation of successful candidates
  successfulSpecs: {
    category: string;
    items: string[];
    description: string; // "Qualitative description like: Most people had experience in community management..."
  };
}

export interface JobCoachingResponse {
  encouragement: string;
  gapAnalysis: string; // Gentle explanation of what is needed
  roadmap: {
    step: string;
    action: string;
  }[];
}
