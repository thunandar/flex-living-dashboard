# Flex Living Reviews Dashboard - Technical Documentation

## 1. Tech Stack Used

### Frontend
- **Next.js 16.0.3** - Full-stack React framework with Pages Router
- **React 19.2.0** - UI library
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework with custom brand colors
- **Recharts** - Data visualization library for dashboard charts
- **Lucide React** - Comprehensive icon library

### Backend & Deployment
- **Next.js API Routes** - Serverless backend endpoints
- **localStorage** - Client-side persistence for review selections
- **Vercel** - Deployment platform with CI/CD
- **Environment Variables** - Secure API credential management

## 2. Key Design and Logic Decisions

### Architecture Decisions
- **Full-Stack Next.js**: Single codebase for frontend and API routes, simplifying deployment and maintenance
- **Component-Based Design**: Reusable React components with clear separation of concerns
- **TypeScript First**: Comprehensive type definitions ensuring data consistency

### Data Flow & State Management
- **Normalized Data Structure**: Transformed API responses into consistent `NormalizedReview` interface
- **Client-Side Persistence**: Used localStorage for review selections to survive page refreshes
- **Optimistic Updates**: Immediate UI feedback when toggling review approvals

### UI/UX Decisions
- **Dashboard-First Approach**: Prioritized manager workflow with comprehensive filtering
- **Progressive Disclosure**: Advanced filters hidden behind clean default view
- **Visual Hierarchy**: Clear distinction between metrics, charts, and individual reviews
- **Responsive Design**: Mobile-friendly interface for on-the-go management
- **Property Page Replication**: Pixel-perfect match of Flex Living website design
- **Dynamic Header**: Scroll-based color transition for better UX
- **Component Reusability**: Modular UI components for consistency
- **Brand Consistency**: Custom color system matching Flex Living brand guidelines

## 3. API Behaviors

### Hostaway API Integration

**Implementation Strategy:**

```typescript
// Attempt real API first, fall back to mock data
try {
  const response = await fetch(HOSTAWAY_API_URL, {
    headers: { 'Authorization': `Bearer ${API_KEY}` }
  });
  if (response.ok && hasData(apiData)) {
    return apiData; // Use real API data
  }
} catch (error) {
  // Fall back to mock data
  return mockReviews;
}
```

**Key Behaviors:**

- **Authentication**: Uses Bearer token with provided API key
- **Error Handling**: Graceful fallback to mock data when API unavailable
- **Data Normalization**: Consistent output format regardless of data source
- **Filter Support**: Query parameters for listing, channel, rating, and date range

**Sandbox Environment Handling:**

The implementation expects the sandbox API to return no reviews, which aligns with the assessment note: *"Note: the API is sandboxed and contains no reviews."* The fallback to mock data ensures the application remains fully functional.

### Response Structure

All API responses follow this consistent format:

```typescript
{
  status: 'success' | 'error';
  result: NormalizedReview[];
  total: number;
  averageRating: number;
  dataSource: 'mock' | 'hostaway_api' | 'mock_fallback';
  message: string; // Descriptive status message
}
```

## 4. Property Page Design Replication

### Flex Living Website Replication

The property page (`/property`) is a complete replication of the Flex Living website property details page with the following features:

**Header:**
- Dynamic background: White initially, transitions to brand green (`#284e4c`) on scroll
- Logo switching: Green logo when header is white, white logo when scrolled
- Navigation menu with icons: Landlords, About Us, Careers, Contact, Language, Currency
- Smooth transitions and hover effects

**Property Content:**
- Image gallery: Responsive grid with main image and thumbnail grid
- Property details: Guests, bedrooms, bathrooms, beds with icons
- About section: Expandable text with "Read more/less" functionality
- Amenities: Grid layout with icons for all property features
- Stay Policies: 
  - Check-in & Check-out times in side-by-side layout
  - House rules with visual icons
  - Cancellation policy organized by stay duration
- Location: Embedded Google Maps with styled location link
- Guest Reviews: Dedicated section showing only approved reviews

**Booking Widget:**
- Sticky positioning: Stays visible while scrolling
- Header section: Brand-colored header with title and subtitle
- Input fields: Side-by-side date and guest selection with icons
- Action buttons: Check availability (disabled) and Send Inquiry
- Confirmation indicator: Checkmark icon with instant booking message

**Footer:**
- Newsletter signup: Form with first name, last name, email, and phone
- Company information: The Flex description and social links
- Quick Links: Blog, Careers, Terms & Conditions, Privacy Policy
- Locations: London, Paris, Algiers
- Contact Us: Phone numbers for UK, Algeria, France, and email
- Copyright notice

**Additional Features:**
- WhatsApp FAB: Fixed floating action button for customer support
- Responsive design: Works seamlessly across all device sizes
- Brand colors: Custom Tailwind colors matching Flex Living brand

## 5. Google Reviews Findings

### Technical Investigation

After exploring Google Places API integration:

**Feasibility Assessment:**

- ✅ **Technically Possible** via Google Places API "Place Details" endpoint
- ✅ **Data Available** Review text, ratings, and author information accessible
- ❌ **Cost Prohibitive** $0.032 per request beyond 1,000 daily free tier
- ❌ **Implementation Complexity** Requires Google Cloud project setup
- ❌ **Read-Only Access** Cannot post curated reviews back to Google

**Specific Limitations:**

1. **Quota Restrictions**: 1,000 free requests/day, then pay-per-use
2. **Authentication Overhead**: API keys, billing accounts, and security measures
3. **Data Licensing**: Google's terms of service restrictions
4. **Review Moderation**: No ability to sync approval status back to Google

**Recommendation:**

For the MVP, focus on Hostaway integration as the primary review source. Google Reviews integration should be considered as a phase 2 feature once the platform gains traction and budget allocation.

## 6. Problem-Solving Initiatives

### Undefined Requirements Addressed

1. **Review Selection Persistence**
   - Implemented localStorage solution without database requirement
   - Ensures approved reviews remain visible after browser refresh

2. **Recurring Issues Detection**
   - Automated analysis of low-rated categories across properties
   - Threshold-based alerting for ratings below 7/10
   - Identifies patterns needing managerial attention

3. **Comprehensive Filtering**
   - Extended beyond basic requirements to include category and date range filters
   - Combined filter logic for precise data exploration

### Technical Challenges Overcome

- **Date Handling**: Consistent Date object conversion across API responses
- **Type Safety**: Comprehensive TypeScript interfaces for data normalization
- **State Synchronization**: Real-time updates between dashboard and property views
- **Error Resilience**: Graceful degradation when external APIs unavailable

## 7. Evaluation Criteria Alignment

### Code Clarity & Structure
- Consistent naming conventions and folder structure
- Comprehensive TypeScript definitions
- Clear separation between UI, business logic, and data layers

### UX/UI Design Quality
- Intuitive navigation between dashboard and public views
- Responsive design working across device sizes
- Visual hierarchy emphasizing key metrics and actions

### Insightful Dashboard Features
- Recurring issues detection for proactive management
- Multi-dimensional filtering for deep data exploration
- Visual trends spotting through interactive charts

### Problem-Solving Initiative
- Anticipated need for persistent review selections
- Implemented comprehensive filtering beyond basic requirements
- Documented Google Reviews integration constraints thoroughly

---

*Documentation prepared for Flex Living Developer Assessment*

