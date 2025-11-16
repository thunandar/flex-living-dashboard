import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { NormalizedReview } from '@/src/types';

interface ReviewChartsProps {
  reviews: NormalizedReview[];
}

export function ReviewCharts({ reviews }: ReviewChartsProps) {
  // Prepare data for rating trend chart
  const monthlyData = reviews.reduce((acc: any[], review) => {
    const month = review.submittedAt.toLocaleDateString('en-US', { month: 'short' });
    const existing = acc.find(item => item.month === month);
    
    if (existing) {
      existing.ratings.push(review.overallRating);
      existing.average = existing.ratings.reduce((a: number, b: number) => a + b, 0) / existing.ratings.length;
    } else {
      acc.push({
        month,
        ratings: [review.overallRating],
        average: review.overallRating
      });
    }
    
    return acc;
  }, []).map(item => ({
    month: item.month,
    average: Number(item.average.toFixed(1))
  }));

  // Prepare data for category performance
  const categoryData = Object.keys(reviews[0]?.categories || {}).map(category => {
    const avg = reviews.reduce((acc, review) => acc + (review.categories[category] || 0), 0) / reviews.length;
    return {
      category: category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      average: Number(avg.toFixed(1))
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
      <Card>
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="text-sm lg:text-base">Rating Trend</CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:p-6 pt-0">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="text-sm lg:text-base">Category Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:p-6 pt-0">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="average" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}