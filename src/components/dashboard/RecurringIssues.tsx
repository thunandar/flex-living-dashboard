import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { NormalizedReview } from '@/src/types';

interface RecurringIssuesProps {
  reviews: NormalizedReview[];
}

export function RecurringIssues({ reviews }: RecurringIssuesProps) {
  // Analyze reviews for recurring issues
  const issues = analyzeRecurringIssues(reviews);

  return (
    <Card className={`mb-6 lg:mb-8 ${issues.length === 0 ? 'border-flex/30 bg-flex/5' : 'border-yellow-200 bg-yellow-50'}`}>
      <CardHeader className="p-4 lg:p-6">
        <CardTitle className={`${issues.length === 0 ? 'text-flex' : 'text-yellow-800'} flex items-center gap-2 text-sm lg:text-base`}>
          {issues.length === 0 ? '✅ No Recurring Issues' : '⚠️ Recurring Issues Needing Attention'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-6 pt-0">
        {issues.length === 0 ? (
          <p className="text-flex/80 text-xs lg:text-sm leading-relaxed">
            Great news! No recurring issues detected. All category ratings are above the threshold (7/10) or issues haven't appeared frequently enough to be considered recurring.
          </p>
        ) : (
          <div className="space-y-4">
            {issues.map((issue, index) => (
              <div key={index} className="border-l-4 border-yellow-400 pl-4 py-1">
                <h4 className="font-semibold text-yellow-800">{issue.issue}</h4>
                <p className="text-sm text-yellow-700">
                  Affected {issue.affectedProperties.length} propert
                  {issue.affectedProperties.length === 1 ? 'y' : 'ies'}: {issue.affectedProperties.join(', ')}
                </p>
                <p className="text-sm text-yellow-600">
                  Average rating: {issue.averageRating.toFixed(1)}/10
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function analyzeRecurringIssues(reviews: NormalizedReview[]) {
  const issues: Array<{
    issue: string;
    affectedProperties: string[];
    averageRating: number;
  }> = [];

  // Analyze low-rated categories
  const categoryThreshold = 7; // Consider ratings below 7 as problematic
  const categoryIssues: { [key: string]: { properties: Set<string>; ratings: number[] } } = {};

  reviews.forEach(review => {
    Object.entries(review.categories).forEach(([category, rating]) => {
      if (rating < categoryThreshold) {
        if (!categoryIssues[category]) {
          categoryIssues[category] = { properties: new Set(), ratings: [] };
        }
        categoryIssues[category].properties.add(review.listingName);
        categoryIssues[category].ratings.push(rating);
      }
    });
  });

  // Convert to issue format
  Object.entries(categoryIssues).forEach(([category, data]) => {
    if (data.ratings.length >= 2) { // At least 2 occurrences to be "recurring"
      issues.push({
        issue: `Low ${category.replace('_', ' ')} ratings`,
        affectedProperties: Array.from(data.properties),
        averageRating: data.ratings.reduce((a, b) => a + b, 0) / data.ratings.length
      });
    }
  });

  return issues;
}