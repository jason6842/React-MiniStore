export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string; // ISO timestamp
  updatedAt: string;  // ISO timestamp
}

export type CategorySelectProps = {
  selectedCategory: number;
  onSelectCategory: (categoryId: number) => void;
}