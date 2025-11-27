
export interface Pose {
  sanskritName: string;
  englishName: string;
  benefit: string;
  imageUrl: string;
}

export interface PoseCategory {
  id: string;
  title: string;
  description: string;
  poses: Pose[];
}
