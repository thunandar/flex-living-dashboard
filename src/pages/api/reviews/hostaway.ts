import { NextApiRequest, NextApiResponse } from 'next';
import { mockReviews, normalizeReviews } from '@/src/lib/data';

const API_KEY = process.env.HOSTAWAY_API_KEY;
const ACCOUNT_ID = process.env.HOSTAWAY_ACCOUNT_ID;
const HOSTAWAY_API_BASE = 'https://api.hostaway.com/v1';


if (!API_KEY) {
  console.warn('HOSTAWAY_API_KEY environment variable is not set');
}
if (!ACCOUNT_ID) {
  console.warn('HOSTAWAY_ACCOUNT_ID environment variable is not set');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    let reviewsData = mockReviews;
    let dataSource: 'mock' | 'hostaway_api' = 'mock';
    
    if (API_KEY && ACCOUNT_ID) {
      try {
        console.log('Attempting Hostaway API integration...');
        
        // Try different methods for account ID inclusion
        const headers: HeadersInit = {
          'Authorization': `Bearer ${API_KEY}`,
          'Cache-control': 'no-cache',
          'X-Account-ID': ACCOUNT_ID
        };
        
        const response = await fetch(`${HOSTAWAY_API_BASE}/reviews`, {
          headers,
        });

        if (response.ok) {
          const apiData = await response.json();
          console.log('Hostaway API response status:', apiData.status);
          
          if (apiData.status === 'success' && apiData.result && apiData.result.length > 0) {
            console.log(`Successfully fetched ${apiData.result.length} reviews from Hostaway API`);
            reviewsData = apiData.result;
            dataSource = 'hostaway_api'; 
          } else {
            console.log('Hostaway API returned no reviews, using mock data');
          }
        } else {
          console.warn(`Hostaway API returned ${response.status}: ${response.statusText}, using mock data`);
          // Log response body for more details
          try {
            const errorBody = await response.text();
            console.warn('API error response:', errorBody);
          } catch (e) {
            // Ignore if we can't read error body
          }
        }
      } catch (apiError) {
        console.warn('Hostaway API integration failed, using mock data:', apiError);
      }
    } else {
      console.warn('Missing API credentials, using mock data');
    }

    // Apply filters
    const { listing, channel, rating, startDate, endDate, type, category } = req.query;
    
    let filteredReviews = [...reviewsData];

    if (listing) {
      filteredReviews = filteredReviews.filter(review => 
        review.listingName?.includes(listing as string)
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

    if (type) {
      filteredReviews = filteredReviews.filter(review => 
        review.type === type
      );
    }

    if (category) {
      filteredReviews = filteredReviews.filter(review => 
        review.reviewCategory?.some((cat: any) => cat.category === category)
      );
    }

    const normalizedReviews = normalizeReviews(filteredReviews);

    res.status(200).json({
      status: 'success',
      result: normalizedReviews,
      total: normalizedReviews.length,
      averageRating: normalizedReviews.length > 0 
        ? normalizedReviews.reduce((acc, review) => acc + review.overallRating, 0) / normalizedReviews.length 
        : 0,
      dataSource: dataSource,
      debug: {
        hasApiKey: !!API_KEY,
        hasAccountId: !!ACCOUNT_ID,
        apiKeyLength: API_KEY?.length,
        accountId: ACCOUNT_ID ? '***' + ACCOUNT_ID.slice(-4) : undefined
      },
      message: dataSource === 'mock' 
        ? 'Using mock data (Hostaway API unavailable or returned no reviews)' 
        : 'Data fetched from Hostaway API'
    });
  } catch (error) {
    console.error('Failed to process reviews:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to fetch and process reviews'
    });
  }
}