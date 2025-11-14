import { NextApiRequest, NextApiResponse } from 'next';
import { mockReviews, normalizeReviews } from '@/lib/data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { listing, channel, rating, startDate, endDate } = req.query;
    
    let filteredReviews = [...mockReviews];

    // Apply filters
    if (listing) {
      filteredReviews = filteredReviews.filter(review => 
        review.listingName.includes(listing as string)
      );
    }

    if (channel) {
      filteredReviews = filteredReviews.filter(review => 
        review.channel === channel
      );
    }

    if (rating) {
      const minRating = parseFloat(rating as string);
      filteredReviews = filteredReviews.filter(review => 
        (review.rating || 0) >= minRating
      );
    }

    if (startDate && endDate) {
      filteredReviews = filteredReviews.filter(review => {
        const reviewDate = new Date(review.submittedAt);
        return reviewDate >= new Date(startDate as string) && 
               reviewDate <= new Date(endDate as string);
      });
    }

    const normalizedReviews = normalizeReviews(filteredReviews);

    res.status(200).json({
      status: 'success',
      result: normalizedReviews,
      total: normalizedReviews.length,
      averageRating: normalizedReviews.reduce((acc, review) => acc + review.overallRating, 0) / normalizedReviews.length
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to fetch reviews' 
    });
  }
}