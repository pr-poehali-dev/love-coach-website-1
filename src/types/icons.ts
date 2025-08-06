// Valid Lucide React icon names used across the application
export type IconName = 
  | 'Heart'
  | 'Menu'
  | 'CreditCard' 
  | 'Calendar'
  | 'User'
  | 'Users'
  | 'MessageSquare'
  | 'MessageCircle'
  | 'Settings'
  | 'Play'
  | 'Info'
  | 'CheckCircle'
  | 'Clock'
  | 'Shield'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Plus'
  | 'Check'
  | 'Target'
  | 'Brain'
  | 'Home'
  | 'BookOpen'
  | 'Send'
  | 'Loader2';

// Navigation item type
export interface NavItem {
  href: string;
  label: string;
  isExternal?: boolean;
  section?: string;
}

// Feature item type (used in AboutSection, ServicesSection, etc.)
export interface FeatureItem {
  icon: IconName;
  iconColor: string;
  bgColor: string;
  title: string;
  description: string;
}