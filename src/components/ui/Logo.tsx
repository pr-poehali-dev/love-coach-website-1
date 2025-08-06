import React from 'react';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  textColor?: string;
  iconColor?: string;
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md',
  textColor = 'text-gray-900',
  iconColor = 'text-primary',
  className,
  onClick
}) => {
  const sizeClasses = {
    sm: {
      icon: 'h-5 w-5',
      text: 'text-lg',
      domain: 'text-sm'
    },
    md: {
      icon: 'h-7 w-7',
      text: 'text-2xl',
      domain: 'text-base'
    },
    lg: {
      icon: 'h-9 w-9',
      text: 'text-3xl',
      domain: 'text-lg'
    }
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component 
      onClick={onClick}
      className={cn(
        "flex items-center space-x-2",
        onClick && "hover:opacity-80 transition-opacity cursor-pointer",
        className
      )}
    >
      <Icon 
        name="Heart" 
        className={cn(sizeClasses[size].icon, iconColor)} 
        style={{ strokeWidth: 2.7 }} 
      />
      <div className="relative">
        <span className={cn(sizeClasses[size].text, "font-bold", textColor)}>
          workstab
        </span>
        <span className={cn(
          sizeClasses[size].domain,
          "absolute -bottom-3 -right-2 font-bold text-primary"
        )}>
          .com
        </span>
      </div>
    </Component>
  );
};

export default Logo;