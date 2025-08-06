import { useNavigate } from 'react-router-dom';

interface LogoProps {
  className?: string;
  onClick?: () => void;
  showText?: boolean;
}

const Logo = ({ className = "", onClick, showText = true }: LogoProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/');
    }
  };

  return (
    <div 
      className={`flex items-center cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center mr-3">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-white"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      {showText && (
        <div className="relative">
          <span className="text-2xl font-bold text-gray-900">workstab</span>
          <span className="absolute -bottom-3 -right-2 text-base font-bold text-primary">.com</span>
        </div>
      )}
    </div>
  );
};

export default Logo;