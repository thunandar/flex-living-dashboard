import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface PolicyBoxProps {
  icon?: LucideIcon;
  title?: string;
  children: ReactNode;
}

export default function PolicyBox({ icon: Icon, title, children }: PolicyBoxProps) {
  return (
    <div className="bg-policy rounded-xl p-6">
      {(title || Icon) && (
        <div className="flex items-center gap-2 mb-4">
          {Icon && <Icon className="w-5 h-5 text-gray-600" />}
          {title && <h3 className="font-semibold text-gray-900">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  );
}

