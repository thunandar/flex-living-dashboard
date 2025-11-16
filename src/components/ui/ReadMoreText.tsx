import { useState } from 'react';

interface ReadMoreTextProps {
  text: string;
  maxLength?: number;
}

export default function ReadMoreText({ text, maxLength = 150 }: ReadMoreTextProps) {
  const [showFull, setShowFull] = useState(false);

  const displayText = showFull ? text : `${text.substring(0, maxLength)}...`;

  return (
    <div className="text-[#5C5C5A] whitespace-pre-line leading-relaxed">
      <p className="text-lg">{displayText}</p>
      <button 
        onClick={() => setShowFull(!showFull)}
        className="text-base mt-2 hover:text-gray-900"
      >
        {showFull ? 'Read less' : 'Read more'}
      </button>
    </div>
  );
}