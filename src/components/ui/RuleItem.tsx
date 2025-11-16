import { LucideIcon } from 'lucide-react';

interface RuleItemProps {
  icon: LucideIcon;
  text: string;
}

export default function RuleItem({ icon: Icon, text }: RuleItemProps) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg p-4">
      <Icon className="w-5 h-5 text-gray-600" />
      <span className="text-sm text-gray-700">{text}</span>
    </div>
  );
}

