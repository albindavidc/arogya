export interface FrequencyDetail {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  reps?: string;
  sets?: string;
  frequency: string;
}

export interface Pose {
  sanskritName: string;
  englishName: string;
  subCategory?: string; // Optional sub-category for grouping within a phase
  schedule?: string[]; // New: Recommended days (e.g., ['Mon', 'Wed', 'Fri'])
  pronunciation: string;
  benefit: string;
  pranayama?: string[]; // Breath work
  mudra?: string[]; // Hand gestures
  imageUrl: string;
  imageUrls?: string[];
  imageUrlMale?: string;
  imageUrlsMale?: string[];
  stepsImageUrlMale?: string;
  stepsImageUrlFemale?: string;
  handImageUrlMale?: string;
  handImageUrlFemale?: string;
  howToDo: string[];
  howToDoMale?: string[];
  howToDoFemale?: string[];
  frequency: FrequencyDetail[];
  why: string[];
}

export interface PoseCategory {
  id: string;
  title: string;
  description: string;
  poses: Pose[];
}