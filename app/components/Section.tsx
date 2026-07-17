import React, { forwardRef } from 'react';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  bgColor?: 'white' | 'gray' | 'black' | 'blue';
  id?: string;
  fullWidth?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const Section = forwardRef<HTMLElement, SectionProps>(function Section({ 
  children, 
  className = '', 
  bgColor = 'white',
  id,
  fullWidth = false,
  ...rest
}, ref) {
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-100',
    black: 'bg-primary-black text-white',
    blue: 'bg-primary-blue text-white',
  };

  return (
    <section 
      ref={ref}
      id={id}
      className={`w-full py-12 md:py-16 lg:py-24 ${bgColors[bgColor]} ${className}`}
      {...rest}
    >
      {fullWidth ? (
        children
      ) : (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          {children}
        </div>
      )}
    </section>
  );
});

export default Section;
