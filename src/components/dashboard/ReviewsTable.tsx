import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { NormalizedReview } from '@/src/types';

interface ReviewsTableProps {
  reviews: NormalizedReview[];
  onToggleSelect: (reviewId: number) => void;
}

export function ReviewsTable({ reviews, onToggleSelect }: ReviewsTableProps) {
  // Existing states
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // New filter states
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minRating, setMinRating] = useState(0);

  // Extract unique values for filters
  const { properties, channels, categories } = useMemo(() => {
    const properties = Array.from(new Set(reviews.map(review => review.listingName)));
    const channels = Array.from(new Set(reviews.map(review => review.channel)));
    const allCategories = reviews.flatMap(review => Object.keys(review.categories));
    const categories = Array.from(new Set(allCategories));

    return { properties, channels, categories };
  }, [reviews]);

  // Apply all filters
  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    // Approval status filter (existing)
    if (filter === 'selected') result = result.filter(review => review.isSelected);
    if (filter === 'unselected') result = result.filter(review => !review.isSelected);

    // Property filter
    if (propertyFilter !== 'all') {
      result = result.filter(review => review.listingName === propertyFilter);
    }

    // Channel filter
    if (channelFilter !== 'all') {
      result = result.filter(review => review.channel === channelFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(review =>
        review.categories[categoryFilter] !== undefined
      );
    }

    // Date range filter
    if (startDate && endDate) {
      result = result.filter(review => {
        const reviewDate = new Date(review.submittedAt);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return reviewDate >= start && reviewDate <= end;
      });
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter(review => review.overallRating >= minRating);
    }

    return result;
  }, [reviews, filter, propertyFilter, channelFilter, categoryFilter, startDate, endDate, minRating]);

  // Sort reviews
  const sortedReviews = useMemo(() => {
    return [...filteredReviews].sort((a, b) => {
      if (sortBy === 'newest') return b.submittedAt.getTime() - a.submittedAt.getTime();
      if (sortBy === 'oldest') return a.submittedAt.getTime() - b.submittedAt.getTime();
      if (sortBy === 'highest') return b.overallRating - a.overallRating;
      if (sortBy === 'lowest') return a.overallRating - b.overallRating;
      return 0;
    });
  }, [filteredReviews, sortBy]);

  const resetFilters = () => {
    setPropertyFilter('all');
    setChannelFilter('all');
    setCategoryFilter('all');
    setStartDate('');
    setEndDate('');
    setMinRating(0);
    setFilter('all');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guest Reviews</CardTitle>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-4">
          {/* Approval Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Reviews</option>
              <option value="selected">Approved Only</option>
              <option value="unselected">Pending Approval</option>
            </select>
          </div>

          {/* Property Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property
            </label>
            <select
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Properties</option>
              {properties.map(property => (
                <option key={property} value={property}>{property}</option>
              ))}
            </select>
          </div>

          {/* Channel Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Channel
            </label>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Channels</option>
              {channels.map(channel => (
                <option key={channel} value={channel}>{channel}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>All Ratings</option>
              <option value={1}>1+ ⭐</option>
              <option value={2}>2+ ⭐</option>
              <option value={3}>3+ ⭐</option>
              <option value={4}>4+ ⭐</option>
              <option value={4.5}>4.5+ ⭐</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {sortedReviews.length} of {reviews.length} reviews
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {sortedReviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reviews match the current filters.
            </div>
          ) : (
            sortedReviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">{review.guestName}</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {review.listingName}
                      </span>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {review.channel}
                      </span>
                      <span className="text-sm text-gray-500">
                        {review.submittedAt.toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      <span className="text-lg font-bold text-yellow-600">
                        ⭐ {review.overallRating}/5
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
                    className={`ml-4 px-4 py-2 rounded-lg border transition-colors ${review.isSelected
                        ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                      }`}
                  >
                    {review.isSelected ? '✅ Approved' : '⏳ Pending'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}