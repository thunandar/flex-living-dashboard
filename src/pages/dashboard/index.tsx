import { useState, useEffect } from 'react';
import { Sidebar } from '@/src/components/dashboard/Sidebar';
import { StatsCards } from '@/src/components/dashboard/StatsCards';
import { ReviewCharts } from '@/src/components/dashboard/ReviewCharts';
import { ReviewsTable } from '@/src/components/dashboard/ReviewsTable';
import { NormalizedReview } from '@/src/types';
import { getSelectedReviewIds, toggleReviewSelection } from '@/src/lib/storage';
import { RecurringIssues } from '@/src/components/dashboard/RecurringIssues';

export default function Dashboard() {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews/hostaway');
      const data = await response.json();
      if (data.status === 'success') {
        const selectedReviewIds = getSelectedReviewIds();
        
        // Merge API data with persisted selections
        const reviewsWithSelection = data.result.map((review: any) => ({
          ...review,
          submittedAt: new Date(review.submittedAt),
          isSelected: selectedReviewIds.includes(review.id)
        }));
        
        setReviews(reviewsWithSelection);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSelect = (reviewId: number) => {
    // Update localStorage
    const updatedSelection = toggleReviewSelection(reviewId);
    
    // Update local state
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, isSelected: !review.isSelected }
        : review
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="lg:ml-64 flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Reviews Dashboard</h1>
            <p className="text-sm lg:text-base text-gray-600">Monitor and manage guest reviews across all properties</p>
          </div>

          <StatsCards reviews={reviews} />
          <RecurringIssues reviews={reviews} /> 
          <ReviewCharts reviews={reviews} />
          <ReviewsTable 
            reviews={reviews} 
            onToggleSelect={handleToggleSelect} 
          />
        </div>
      </main>
    </div>
  );
}