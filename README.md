# Flex Living - Reviews Dashboard

A professional full-stack dashboard for managing and displaying guest reviews, built as part of the Flex Living developer assessment.

## 🟢 Live Deployment

The application is successfully deployed and accessible at:  
🔗 **Live URL**: https://flex-living-dashboard-drab.vercel.app/

### Access Points:
- **Main Dashboard**: https://flex-living-dashboard-drab.vercel.app/dashboard
- **Public Property Page**: https://flex-living-dashboard-drab.vercel.app/property

## 🚀 Overview

This project implements a comprehensive Reviews Dashboard that helps property managers monitor guest feedback, analyze performance metrics, and curate reviews for public display.

## ✨ Features

### Manager Dashboard
- **Performance Analytics**: Track average ratings, review counts, and property performance
- **Interactive Charts**: Visualize rating trends and category performance over time  
- **Review Moderation**: Approve or reject reviews for public display
- **Advanced Filtering**: Filter by property, channel, category, rating, and date range
- **Recurring Issues Detection**: Automatically identify patterns needing attention
- **Real-time Metrics**: Key performance indicators at a glance

### Public Property Page
- **Professional Display**: Clean, modern layout for showcasing approved reviews
- **Guest-Centric Design**: Focus on building trust with potential guests
- **Persistent Selections**: Approved reviews remain visible after page refresh

## 🛠 Tech Stack

- **Framework**: Next.js 16.0.3 with TypeScript
- **Frontend**: React 19.2.0, Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **State Persistence**: localStorage
- **Deployment**: Vercel

## 🔌 API Integration

### Hostaway Reviews API
- **Endpoint**: `GET /api/reviews/hostaway`
- **Implementation**: Attempts real Hostaway API call with provided credentials
- **Sandbox Handling**: Falls back to mock data when API returns empty (expected in sandbox environment)
- **Response**: Normalized review data with consistent structure and data source metadata

### API Behavior

The API route follows this intelligent flow:

1. **Attempts Hostaway API** with Account ID `61148` and provided API key
2. **Handles Sandbox Environment**: When API returns empty results (expected), uses mock data
3. **Normalizes Data**: Transforms both API and mock data into consistent format
4. **Provides Metadata**: Response includes `dataSource` field indicating data origin

### Example API Response

```json
{
  "status": "success",
  "result": [...normalized reviews...],
  "total": 15,
  "averageRating": 4.3,
  "dataSource": "mock",
  "message": "Using mock data (Hostaway API unavailable or returned no reviews)"
}
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

## 📁 Project Structure

```
flex-living-dashboard/
├── src/
│   ├── components/
│   │   ├── dashboard/          # Dashboard components
│   │   └── ui/                 # Reusable UI components
│   ├── lib/
│   │   ├── data.ts            # Mock data and normalization
│   │   └── storage.ts         # localStorage utilities
│   ├── pages/
│   │   ├── api/
│   │   │   └── reviews/
│   │   │       └── hostaway.ts # API endpoint
│   │   ├── dashboard/         # Manager dashboard
│   │   └── property/          # Public property page
│   └── types/
│       └── index.ts           # TypeScript definitions
└── Configuration files...
```

## 🔮 Future Enhancements

- Real Database Integration
- User Authentication & Role Management  
- Advanced Analytics & Sentiment Analysis
- Multi-language Support
- Mobile App Experience

---

**Built for the Flex Living Developer Assessment**

