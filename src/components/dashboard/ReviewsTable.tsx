import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { NormalizedReview } from '@/src/types';

interface ReviewsTableProps {
  reviews: NormalizedReview[];
  onToggleSelect: (reviewId: number) => void;
}

export function ReviewsTable({ reviews, onToggleSelect }: ReviewsTableProps) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredReviews = reviews.filter(review => {
    if (filter === 'selected') return review.isSelected;
    if (filter === 'unselected') return !review.isSelected;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') return b.submittedAt.getTime() - a.submittedAt.getTime();
    if (sortBy === 'oldest') return a.submittedAt.getTime() - b.submittedAt.getTime();
    if (sortBy === 'highest') return b.overallRating - a.overallRating;
    if (sortBy === 'lowest') return a.overallRating - b.overallRating;
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guest Reviews</CardTitle>
        <div className="flex gap-4 mt-4">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All Reviews</option>
            <option value="selected">Approved Only</option>
            <option value="unselected">Pending Approval</option>
          </select>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedReviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-semibold">{review.guestName}</span>
                    <span className="text-sm text-gray-500">{review.listingName}</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {review.channel}
                    </span>
                    <span className="text-sm text-gray-500">
                      {review.submittedAt.toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-lg font-bold text-yellow-600">
                      ⭐ {review.overallRating}
                    </span>
                    <div className="flex gap-4 text-sm">
                      {Object.entries(review.categories).map(([category, rating]) => (
                        <span key={category} className="text-gray-600">
                          {category.replace('_', ' ')}: <strong>{rating}/10</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700">{review.publicReview}</p>
                </div>
                
                <button
                  onClick={() => onToggleSelect(review.id)}
                  className={`ml-4 px-4 py-2 rounded-lg border ${
                    review.isSelected 
                      ? 'bg-green-100 text-green-800 border-green-300' 
                      : 'bg-gray-100 text-gray-800 border-gray-300'
                  }`}
                >
                  {review.isSelected ? '✅ Approved' : '⏳ Pending'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}