export interface Review {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: {
    category: string;
    rating: number;
  }[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  channel?: string;
}

export interface NormalizedReview {
  id: number;
  type: string;
  status: string;
  overallRating: number;
  publicReview: string;
  categories: {
    [key: string]: number;
  };
  submittedAt: Date;
  guestName: string;
  listingName: string;
  channel: string;
  isSelected: boolean;
}