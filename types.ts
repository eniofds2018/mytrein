
export enum UserRole {
  STUDENT = 'student',
  TRAINER = 'trainer',
  ADMIN = 'admin'
}

export type Language = 'en' | 'pt';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: string;
  description?: string;
}

export interface SessionEntry {
  id: string;
  exerciseId: string;
  sets: SetDetail[];
}

export interface SetDetail {
  reps: number;
  weight: number;
  timestamp: string;
}

export interface Session {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  entries: SessionEntry[];
}

export interface AIWorkoutSuggestion {
  routineName: string;
  exercises: {
    name: string;
    sets: number;
    reps: string;
    focus: string;
  }[];
  advice: string;
}
