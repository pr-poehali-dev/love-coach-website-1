// Valid Lucide icon names used in tariffs
export type TariffIconName = 
  | 'User'
  | 'Users'
  | 'MessageCircle'
  | 'MessageSquare'
  | 'Settings';

export interface Tariff {
  id: 'individual' | 'couple' | 'support' | 'custom';
  title: string;
  price: string;
  duration: string;
  description: string;
  icon: TariffIconName;
  popular: boolean;
}

export interface TariffDetails {
  title: string;
  price: string;
  duration: string;
  description: string;
  benefits: string[];
  process: string;
  icon: TariffIconName;
}