import { useState, useEffect } from 'react';
import { NormalizedReview } from '@/src/types';

export default function PropertyPage() {
  const [approvedReviews, setApprovedReviews] = useState<NormalizedReview[]>([]);

  useEffect(() => {
    fetch('/api/reviews/hostaway')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const approved = data.result
            .filter((review: any) => review.isSelected)
            .map((review: any) => ({
              ...review,
              submittedAt: new Date(review.submittedAt) 
            }));
          setApprovedReviews(approved);
        }
      })
      .catch(error => {
        console.error('Failed to fetch reviews:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Property Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">2B N1 A - 29 Shoreditch Heights</h1>
          <p className="text-xl opacity-90">Luxury Apartment in the Heart of Shoreditch</p>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-2xl font-bold">⭐ 4.5/5</span>
            <span className="text-lg">({approvedReviews.length} reviews)</span>
          </div>
        </div>
      </header>

      {/* Property Details */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img 
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="Property" 
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Property Features</h2>
            <ul className="space-y-2">
              <li>✅ 2 Bedrooms</li>
              <li>✅ 2 Bathrooms</li>
              <li>✅ Fully Equipped Kitchen</li>
              <li>✅ High-Speed WiFi</li>
              <li>✅ Central Location</li>
            </ul>
          </div>
        </div>

        {/* Approved Reviews Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-8">Guest Reviews</h2>
          
          {approvedReviews.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No approved reviews to display yet.
            </div>
          ) : (
            <div className="grid gap-6">
              {approvedReviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-blue-600">
                        {review.guestName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{review.guestName}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600">⭐ {review.overallRating}</span>
                        <span className="text-gray-500">
                          {/* Safe date formatting */}
                          {review.submittedAt && review.submittedAt.toLocaleDateString 
                            ? review.submittedAt.toLocaleDateString() 
                            : new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg">{review.publicReview}</p>
                  
                  <div className="flex gap-6 mt-4 text-sm text-gray-600">
                    {Object.entries(review.categories).map(([category, rating]) => (
                      <span key={category}>
                        {category.replace('_', ' ')}: <strong>{rating}/10</strong>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}