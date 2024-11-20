interface CardProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export const Card = ({ children, className = '' }: CardProps) => {
    return (
      <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
        {children}
      </div>
    );
  };