import { Review, NormalizedReview } from '@/src/types';

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
  }
];

export function normalizeReviews(reviews: Review[]): NormalizedReview[] {
  return reviews.map(review => {

    const categories: { [key: string]: number } = {};
    review.reviewCategory.forEach(category => {
      categories[category.category] = category.rating;
    });

    const categoryValues = Object.values(categories);
    const overallRating = review.rating || 
      (categoryValues.reduce((a, b) => a + b, 0) / categoryValues.length);

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
      isSelected: false
    };
  });
}