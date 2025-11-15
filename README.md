# Flex Living - Reviews Dashboard

A professional full-stack dashboard for managing and displaying guest reviews, built as part of the Flex Living developer assessment.

## 🚀 Overview

This project implements a comprehensive Reviews Dashboard that helps property managers monitor guest feedback, analyze performance metrics, and curate reviews for public display. The application features a modern, responsive interface with real-time data visualization and intuitive review management.

## ✨ Features

### Manager Dashboard
- Performance Analytics: Track average ratings, review counts, and property performance
- Interactive Charts: Visualize rating trends and category performance over time
- Review Moderation: Approve or reject reviews for public display
- Advanced Filtering: Filter by property, channel, rating, and date range
- Real-time Metrics: Key performance indicators at a glance

### Public Property Page
- Professional Display: Clean, modern layout for showcasing approved reviews
- Guest-Centric Design: Focus on building trust with potential guests
- Consistent Branding: Matches Flex Living property page styling

### Technical Features
- Mock API Integration: Realistic Hostaway API simulation with normalized data
- Responsive Design: Works seamlessly across desktop and mobile devices
- Type Safety: Full TypeScript implementation for robust development

## 🛠 Tech Stack

- Framework: Next.js 16.0.3 with TypeScript
- Frontend: React 19.2.0, Tailwind CSS
- Charts: Recharts for data visualization
- Icons: Lucide React
- Development: ESLint, PostCSS, Autoprefixer

## 📁 Project Structure

```
flex-living-dashboard/
├── src/
│   ├── components/
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── ReviewCharts.tsx
│   │   │   ├── ReviewsTable.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── StatsCards.tsx
│   │   └── ui/                 # Reusable UI components
│   │       └── card.tsx
│   ├── lib/
│   │   └── data.ts            # Mock data and normalization logic
│   ├── pages/
│   │   ├── api/
│   │   │   └── reviews/
│   │   │       └── hostaway.ts # API endpoint
│   │   ├── dashboard/         # Manager dashboard
│   │   ├── property/          # Public property page
│   │   └── _app.tsx           # App wrapper with global styles
│   └── types/
│       └── index.ts           # TypeScript definitions
├── styles/
│   └── globals.css            # Global styles and Tailwind imports
└── Configuration files...
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd flex-living-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open your browser
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Design Decisions

### Architecture
- Full-Stack Next.js: Single codebase for frontend and API routes
- Component-Based Design: Reusable, maintainable React components
- TypeScript First: Full type safety throughout the application

### Data Handling
- Normalized Data Structure: Consistent data format across the application
- Mock API Simulation: Realistic Hostaway API behavior without external dependencies
- Client-Side State Management: React hooks for efficient state handling

### UI/UX
- Dashboard-First Approach: Prioritized manager workflow and data visualization
- Responsive Grid Layout: Adaptive design for various screen sizes
- Intuitive Navigation: Clear sidebar navigation between dashboard and public views

## 🔌 API Integration

### Hostaway Reviews API
- Endpoint: `GET /api/reviews/hostaway`
- Features: Filtering by property, channel, rating, and date range
- Response: Normalized review data with consistent structure

### Data Normalization
The API transforms raw review data into a standardized format:
```typescript
{
  id: number;
  overallRating: number;
  categories: { [key: string]: number };
  // ... other consistent fields
}
```

## 🔍 Google Reviews Integration Analysis

After thorough investigation of the Google Places API:

### Findings
- Technical Feasibility: Possible via Google Places API "Place Details" endpoint
- Authentication: Requires Google Cloud project and API key
- Cost Considerations: Strict quotas with pricing beyond free tier
- Functional Limitations: Read-only access to reviews

### Recommendations
1. Short-term: Focus on Hostaway integration as primary review source
2. Medium-term: Implement Google Reviews as supplemental data source
3. Long-term: Consider dedicated review aggregation service for multi-platform support

## 🎨 Component Architecture

### Dashboard Components
- StatsCards: Key metrics overview with visual indicators
- ReviewCharts: Trend analysis and category performance
- ReviewsTable: Interactive review management with filtering
- Sidebar: Persistent navigation and quick access

### UI Components
- Card System: Consistent container styling throughout the application
- Responsive Grid: Flexible layout adapts to content and screen size

## 🔮 Future Enhancements

- Real Database Integration: Replace mock data with persistent storage
- User Authentication: Role-based access for multiple property managers
- Advanced Analytics: Sentiment analysis and predictive insights
- Multi-language Support: Internationalization for global properties
- Mobile App: Native mobile experience for on-the-go management

## 📝 Development Notes

This project was developed with attention to:
- Code Quality: Clean, commented, and maintainable code
- User Experience: Intuitive interfaces with clear visual hierarchy
- Performance: Efficient rendering and data handling
- Scalability: Architecture that supports future feature additions

---

Built for the Flex Living Developer Assessment