import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <rect width="24" height="24" rx="4" fill="currentColor"/>
        <rect x="6" y="6" width="4" height="12" fill="white"/>
        <rect x="12" y="6" width="6" height="4" fill="white"/>
      </svg>
      <span className="text-xl font-headline font-bold">PromptHub</span>
    </div>
  );
}
