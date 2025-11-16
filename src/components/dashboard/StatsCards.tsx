import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { NormalizedReview } from '@/src/types';

interface StatsCardsProps {
  reviews: NormalizedReview[];
}

export function StatsCards({ reviews }: StatsCardsProps) {
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.overallRating, 0) / reviews.length 
    : 0;
  
  const selectedReviews = reviews.filter(review => review.isSelected);
  
  // Fixed Set iteration
  const properties = Array.from(new Set(reviews.map(review => review.listingName)));

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs lg:text-sm font-medium">Total Reviews</CardTitle>
          <span className="text-base lg:text-lg">📝</span>
        </CardHeader>
        <CardContent>
          <div className="text-xl lg:text-2xl font-bold">{reviews.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs lg:text-sm font-medium">Average Rating</CardTitle>
          <span className="text-base lg:text-lg">⭐</span>
        </CardHeader>
        <CardContent>
          <div className="text-xl lg:text-2xl font-bold">{averageRating.toFixed(1)}/5</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs lg:text-sm font-medium">Approved Reviews</CardTitle>
          <span className="text-base lg:text-lg">✅</span>
        </CardHeader>
        <CardContent>
          <div className="text-xl lg:text-2xl font-bold">{selectedReviews.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs lg:text-sm font-medium">Properties</CardTitle>
          <span className="text-base lg:text-lg">🏘️</span>
        </CardHeader>
        <CardContent>
          <div className="text-xl lg:text-2xl font-bold">{properties.length}</div>
        </CardContent>
      </Card>
    </div>
  );
}