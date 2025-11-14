# Flex Living Reviews Dashboard - Documentation

## Tech Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Deployment**: Vercel

## Key Design Decisions

### 1. Data Normalization
- Created a unified `NormalizedReview` interface for consistent data handling
- Transformed category arrays into key-value objects for easier access
- Calculated overall ratings from categories when direct rating is missing

### 2. Dashboard Architecture
- Sidebar navigation for easy access to different sections
- Stats cards for quick overview of key metrics
- Interactive charts for trend analysis
- Filterable and sortable reviews table

### 3. API Design
- RESTful endpoint at `/api/reviews/hostaway`
- Support for filtering by listing, channel, rating, and date range
- Proper error handling and status codes

## Google Reviews Integration Findings

After investigating the Google Places API:
- **Feasibility**: Technically possible via Places API
- **Limitations**: 
  - Strict quotas and pricing beyond free tier
  - Requires Google Cloud project and billing setup
  - Reviews are read-only, cannot post back to Google
- **Recommendation**: For MVP, focus on Hostaway integration. Google Reviews can be added later if budget allows.

## Local Setup
1. Clone repository
2. Run `npm install`
3. Run `npm run dev`
4. Visit `http://localhost:3000`

## AI Usage Disclosure
This project was developed with assistance from AI tools for:
- Code structure and architecture planning
- Component implementation suggestions
- Documentation template creation

All business logic, design decisions, and implementation were reviewed and customized for the specific requirements.