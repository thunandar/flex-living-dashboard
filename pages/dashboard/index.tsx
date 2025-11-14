import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ReviewCharts } from '@/components/dashboard/ReviewCharts';
import { ReviewsTable } from '@/components/dashboard/ReviewsTable';
import { NormalizedReview } from '@/types';

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
        setReviews(data.result.map((review: any) => ({
          ...review,
          submittedAt: new Date(review.submittedAt)
        })));
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSelect = (reviewId: number) => {
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
      
      <main className="ml-64 flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Reviews Dashboard</h1>
            <p className="text-gray-600">Monitor and manage guest reviews across all properties</p>
          </div>

          <StatsCards reviews={reviews} />
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