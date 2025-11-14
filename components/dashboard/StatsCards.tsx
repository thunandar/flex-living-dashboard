import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NormalizedReview } from '@/types';

interface StatsCardsProps {
  reviews: NormalizedReview[];
}

export function StatsCards({ reviews }: StatsCardsProps) {
  const averageRating = reviews.reduce((acc, review) => acc + review.overallRating, 0) / reviews.length;
  const selectedReviews = reviews.filter(review => review.isSelected);
  const properties = [...new Set(reviews.map(review => review.listingName))];

  const categoryAverages = Object.keys(reviews[0]?.categories || {}).map(category => {
    const avg = reviews.reduce((acc, review) => acc + (review.categories[category] || 0), 0) / reviews.length;
    return { category, average: avg };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          <span className="text-lg">📝</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{reviews.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <span className="text-lg">⭐</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRating.toFixed(1)}/5</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approved Reviews</CardTitle>
          <span className="text-lg">✅</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{selectedReviews.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Properties</CardTitle>
          <span className="text-lg">🏘️</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{properties.length}</div>
        </CardContent>
      </Card>
    </div>
  );
}