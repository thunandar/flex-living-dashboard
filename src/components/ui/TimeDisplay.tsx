interface TimeDisplayProps {
  label: string;
  time: string;
}

export default function TimeDisplay({ label, time }: TimeDisplayProps) {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="text-base text-gray-600 mb-1">{label}</div>
      <div className="text-xl font-bold text-gray-700">{time}</div>
    </div>
  );
}

