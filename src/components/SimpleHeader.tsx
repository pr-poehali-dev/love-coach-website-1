import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const SimpleHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Главная" },
    { href: "/blog", label: "Блог" },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Icon name="Heart" className="h-7 w-7 text-primary" style={{ strokeWidth: 2.7 }} />
            <div className="relative">
              <span className="text-2xl font-bold text-gray-900">workstab</span>
              <span className="absolute -bottom-3 -right-2 text-base font-bold text-primary">.com</span>
            </div>
          </button>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const isHome = location.pathname === '/';
                navigate(isHome ? '/blog' : '/');
              }}
            >
              <Icon name={location.pathname === '/blog' ? 'Home' : 'BookOpen'} className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;