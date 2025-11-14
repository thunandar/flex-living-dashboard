import { Review, NormalizedReview } from '@/types';

export const mockReviews: Review[] = [
  {
    id: 7453,
    type: "host-to-guest",
    status: "published",
    rating: 4.5,
    publicReview: "Shane and family are wonderful! Would definitely host again :)",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2024-01-15 22:45:14",
    guestName: "Shane Finkelstein",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    channel: "Airbnb"
  },
  {
    id: 7454,
    type: "guest-to-host",
    status: "published",
    rating: 4.2,
    publicReview: "Great location and comfortable stay. Would recommend!",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 }
    ],
    submittedAt: "2024-01-10 14:30:00",
    guestName: "Maria Garcia",
    listingName: "1B Studio - Downtown Loft",
    channel: "Booking.com"
  },
  {
    id: 7455,
    type: "guest-to-host",
    status: "published",
    rating: 3.8,
    publicReview: "Good value but could be cleaner",
    reviewCategory: [
      { category: "cleanliness", rating: 6 },
      { category: "communication", rating: 8 },
      { category: "respect_house_rules", rating: 9 }
    ],
    submittedAt: "2024-01-08 09:15:00",
    guestName: "James Wilson",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    channel: "Airbnb"
  }
];

export function normalizeReviews(reviews: Review[]): NormalizedReview[] {
  return reviews.map(review => {
    const categories = review.reviewCategory.reduce((acc, category) => {
      acc[category.category] = category.rating;
      return acc;
    }, {} as any);

    const overallRating = review.rating || 
      Object.values(categories).reduce((a: number, b: number) => a + b, 0) / Object.values(categories).length;

    return {
      id: review.id,
      type: review.type,
      status: review.status,
      overallRating: Math.round(overallRating * 10) / 10,
      publicReview: review.publicReview,
      categories,
      submittedAt: new Date(review.submittedAt),
      guestName: review.guestName,
      listingName: review.listingName,
      channel: review.channel || 'Hostaway',
      isSelected: Math.random() > 0.3 // Random selection for demo
    };
  });
}