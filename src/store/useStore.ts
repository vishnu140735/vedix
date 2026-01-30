import { create } from 'zustand';

interface UserProgress {
  mudrasLearned: number;
  practiceSessions: number;
  totalTime: number;
  accuracy: number;
}

interface AppState {
  userProgress: UserProgress;
  currentMudra: string | null;
  isPracticeActive: boolean;
  settings: {
    notifications: boolean;
    soundEffects: boolean;
    darkMode: boolean;
    autoSave: boolean;
  };
  setCurrentMudra: (mudra: string | null) => void;
  setPracticeActive: (active: boolean) => void;
  updateProgress: (progress: Partial<UserProgress>) => void;
  updateSettings: (settings: Partial<AppState['settings']>) => void;
}

export const useStore = create<AppState>((set) => ({
  userProgress: {
    mudrasLearned: 6,
    practiceSessions: 24,
    totalTime: 43200, // seconds
    accuracy: 87,
  },
  currentMudra: null,
  isPracticeActive: false,
  settings: {
    notifications: true,
    soundEffects: true,
    darkMode: true,
    autoSave: true,
  },
  setCurrentMudra: (mudra) => set({ currentMudra: mudra }),
  setPracticeActive: (active) => set({ isPracticeActive: active }),
  updateProgress: (progress) =>
    set((state) => ({
      userProgress: { ...state.userProgress, ...progress },
    })),
  updateSettings: (settings) =>
    set((state) => ({
      settings: { ...state.settings, ...settings },
    })),
}));

