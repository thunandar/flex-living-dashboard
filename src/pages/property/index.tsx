import { useState, useEffect } from 'react';
import { NormalizedReview } from '@/src/types';
import { getSelectedReviewIds } from '@/src/lib/storage';
import InfoSection from '@/src/components/ui/InfoSection';
import ReadMoreText from '@/src/components/ui/ReadMoreText';
import PolicyBox from '@/src/components/ui/PolicyBox';
import TimeDisplay from '@/src/components/ui/TimeDisplay';
import RuleItem from '@/src/components/ui/RuleItem';
import { propertyData, propertyImages } from '@/src/data/propertyData';
import { Users, Bed, Bath, Home, Calendar, ChevronDown, MessageCircle, Tv, Wifi, Radio, UtensilsCrossed, WashingMachine, Building2, Clock, Thermometer, Droplets, Building, Info, FileText, Mail, Globe, PoundSterling, Shield, Ban, Circle, Sparkles } from 'lucide-react';

export default function PropertyPage() {
  const [allReviews, setAllReviews] = useState<NormalizedReview[]>([]);
  const [approvedReviews, setApprovedReviews] = useState<NormalizedReview[]>([]);

  useEffect(() => {
    fetch('/api/reviews/hostaway')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const reviewsWithDates = data.result.map((review: any) => ({
            ...review,
            submittedAt: new Date(review.submittedAt)
          }));
          setAllReviews(reviewsWithDates);

          const selectedReviewIds = getSelectedReviewIds();
          const approved = reviewsWithDates.filter((review: any) =>
            selectedReviewIds.includes(review.id)
          );
          setApprovedReviews(approved);
        }
      })
      .catch(error => {
        console.error('Failed to fetch reviews:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: 'rgb(40, 78, 76)' } as React.CSSProperties}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img
                src="https://theflex.global/_next/image?url=https%3A%2F%2Flsmvmmgkpbyqhthzdexc.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fwebsite%2FUploads%2FWhite_V3%2520Symbol%2520%26%2520Wordmark.png&w=128&q=75"
                alt="Flex Living"
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center gap-12">
              <nav className="flex items-center gap-20 text-sm text-white font-semibold">
                <a href="#" className="hover:opacity-80 flex items-center gap-1.5">
                  <Building className="w-4 h-4" />
                  Landlords
                  <ChevronDown className="w-3 h-3" />
                </a>
                <a href="#" className="hover:opacity-80 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  About Us
                </a>
                <a href="#" className="hover:opacity-80 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Careers
                </a>
                <a href="#" className="hover:opacity-80 flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
                <a href="#" className="hover:opacity-80 flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  GB English
                </a>
                <a href="#" className="hover:opacity-80 flex items-center gap-1.5">
                  <PoundSterling className="w-4 h-4" />
                   GBP
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Property Content */}
      <main className="relative">
        {/* Image Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-12 h-full max-w-7xl mx-auto px-6">
          <div className="col-span-2 row-span-2">
            <img
              src={propertyImages[0]}
              alt="Property main"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {propertyImages.slice(1).map((image, index) => (
            <div key={index} className="col-span-1 row-span-1">
              <img
                src={image}
                alt="property image"
              className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Property Details Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              {/* Property Title */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-6 text-[#333333]">
                  {propertyData.title}
                </h1>
              </div>
              
              {/* Property Details */}
              <div className="flex gap-8 mb-8 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">{propertyData.details.guests} Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">{propertyData.details.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">{propertyData.details.beds} beds</span>
                </div>
              </div>

              {/* About this property */}
              <InfoSection title="About this property">
                <ReadMoreText text={propertyData.description} />
              </InfoSection>

              {/* Amenities */}
              <InfoSection title="Amenities" actionText="View all amenities >">
                <div className="grid grid-cols-3 gap-4">
                  {propertyData.amenities.map((amenity, index) => {
                    const iconMap: { [key: string]: React.ReactNode } = {
                      'Cable TV': <Tv className="w-5 h-5 text-gray-600" />,
                      'Internet': <Wifi className="w-5 h-5 text-gray-600" />,
                      'Wireless': <Radio className="w-5 h-5 text-gray-600" />,
                      'Kitchen': <UtensilsCrossed className="w-5 h-5 text-gray-600" />,
                      'Washing Machine': <WashingMachine className="w-5 h-5 text-gray-600" />,
                      'Elevator': <Building2 className="w-5 h-5 text-gray-600" />,
                      '24-Hour Checkin': <Clock className="w-5 h-5 text-gray-600" />,
                      'Hair Dryer': <Droplets className="w-5 h-5 text-gray-600" />,
                      'Heating': <Thermometer className="w-5 h-5 text-gray-600" />
                    };
                    return (
                      <div key={index} className="flex items-center gap-2">
                        {iconMap[amenity] || <Home className="w-5 h-5 text-gray-600" />}
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </InfoSection>

              {/* Stay Policies */}
              <InfoSection title="Stay Policies">
                <div className="space-y-4">
                  {/* Check-in & Check-out */}
                  <PolicyBox icon={Clock} title="Check-in & Check-out">
                    <div className="grid grid-cols-2 gap-4">
                      <TimeDisplay label="Check-in Time" time="3:00 PM" />
                      <TimeDisplay label="Check-out Time" time="10:00 AM" />
                    </div>
                  </PolicyBox>

                  {/* House Rules */}
                  <PolicyBox icon={Shield} title="House Rules">
                    <div className="grid grid-cols-2 gap-3">
                      <RuleItem icon={Ban} text="No smoking" />
                      <RuleItem icon={Circle} text="No pets" />
                      <RuleItem icon={Sparkles} text="No parties or events" />
                      <RuleItem icon={Shield} text="Security deposit required" />
                    </div>
                  </PolicyBox>
                </div>
              </InfoSection>

              {/* Cancellation Policy */}
              <InfoSection title="Cancellation Policy">
                <div className="space-y-4">
                  <PolicyBox title="For stays less than 28 days">
                    <ul className="list-disc list-inside space-y-1 text-sm text-[#5C5C5A] ml-2">
                      <li>Full refund up to 14 days before check-in</li>
                      <li>No refund for bookings less than 14 days before check-in</li>
                    </ul>
                  </PolicyBox>
                  <PolicyBox title="For stays of 28 days or more">
                    <ul className="list-disc list-inside space-y-1 text-sm text-[#5C5C5A] ml-2">
                      <li>Full refund up to 30 days before check-in</li>
                      <li>No refund for bookings less than 30 days before check-in</li>
                    </ul>
                  </PolicyBox>
                </div>
              </InfoSection>

              {/* Location */}
              <InfoSection title="Location">
                <div className="space-y-4">
                  <div className="w-full h-96 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2490.5!2d-0.308!3d51.412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760c7b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sKingston%20Upon%20Thames!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  </div>
                  <a 
                    href="#" 
                    className="hover:text-green-700 text-sm font-medium inline-block"
                  >
                    Browse more <span className="underline">short stay flats in London</span>
                  </a>
                </div>
              </InfoSection>

              {/* Guest Reviews */}
              <InfoSection title="Guest Reviews">
                {approvedReviews.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-6xl mb-4">⭐️</div>
                    <p className="text-lg">No approved reviews to display yet.</p>
                    <p className="text-sm mt-2">Reviews will appear here once approved by the property manager.</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {approvedReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="font-semibold text-green-600 text-sm">
                              {review.guestName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-lg text-[#333333]">{review.guestName}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>⭐️ {review.overallRating}</span>
                                <span>•</span>
                                <span>
                                  {review.submittedAt && review.submittedAt.toLocaleDateString
                                    ? review.submittedAt.toLocaleDateString()
                                    : new Date().toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-[#5C5C5A] leading-relaxed">{review.publicReview}</p>

                            {review.categories && Object.keys(review.categories).length > 0 && (
                              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                                {Object.entries(review.categories).map(([category, rating]) => (
                                  <span key={category} className="bg-gray-100 px-3 py-1 rounded">
                                    {category.replace(/_/g, ' ')}: <strong>{rating}/10</strong>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </InfoSection>
            </div>

            {/* Sticky Booking Box - Right Side */}
            <div className="relative">
              <div className="sticky" style={{ top: '100px' }}>
                <div 
                  className="rounded-lg p-6 text-white shadow-lg"
                  style={{ backgroundColor: 'rgb(40, 78, 76)' } as React.CSSProperties}
                >
                  <h2 className="text-xl font-bold mb-2 text-white">Book Your Stay</h2>
                  <div className="text-sm text-white/90 mb-4">Select dates to see prices</div>

                  {/* Date Input */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 border border-white/20">
                      <Calendar className="w-5 h-5 text-white flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Select dates"
                        className="bg-transparent text-white placeholder-white/70 flex-1 outline-none text-sm"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Guest Input */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 border border-white/20">
                      <Users className="w-5 h-5 text-white flex-shrink-0" />
                      <input
                        type="text"
                        value={propertyData.details.guests}
                        className="bg-transparent text-white flex-1 outline-none text-sm"
                        readOnly
                      />
                      <ChevronDown className="w-4 h-4 text-white flex-shrink-0" />
                    </div>
                  </div>

                  {/* Check Availability Button */}
                  <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors mb-3 flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Check availability
                  </button>

                  {/* Send Inquiry Button */}
                  <button className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 mb-3">
                    <MessageCircle className="w-4 h-4" />
                    Send Inquiry
                  </button>

                  <div className="text-center text-xs text-white/80">
                    O Instant booking confirmation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}