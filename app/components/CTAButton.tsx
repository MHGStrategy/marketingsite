import Link from 'next/link';

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function CTAButton({ 
  href, 
  onClick, 
  children, 
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}: CTAButtonProps) {
  const baseStyles = 'inline-block px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-accent-yellowgold text-primary-black hover:bg-yellow-400',
    secondary: 'bg-primary-blue text-white hover:bg-blue-600',
    outline: 'border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName} disabled={disabled}>
      {children}
    </button>
  );
}
