interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  actionText?: string;
  onActionClick?: () => void;
}

export default function InfoSection({ 
  title, 
  children, 
  actionText, 
  onActionClick 
}: InfoSectionProps) {
  return (
    <section className="mb-6 lg:mb-8">
      <div className="rounded-lg text-card-foreground p-4 lg:p-6 bg-white border-0 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-[#333333]">{title}</h2>
          {actionText && (
            <button 
              onClick={onActionClick}
              className="text-sm text-gray-600 font-medium hover:text-gray-900"
            >
              {actionText}
            </button>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}