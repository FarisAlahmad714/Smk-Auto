interface SpinnerProps {
    className?: string;
  }
  
  export const Spinner = ({ className = '' }: SpinnerProps) => {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    );
  };