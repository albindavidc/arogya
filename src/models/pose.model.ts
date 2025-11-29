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
  pronunciation: string;
  benefit: string;
  imageUrl: string;
  imageUrls?: string[];
  imageUrlMale?: string;
  imageUrlsMale?: string[];
  stepsImageUrlMale?: string;
  stepsImageUrlFemale?: string;
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