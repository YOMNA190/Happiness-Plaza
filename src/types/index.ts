// Zone/Area types for the 3D model
export interface Zone {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  position: [number, number, number];
  color: string;
  type: 'retail' | 'food' | 'hotel' | 'medical' | 'entertainment' | 'office';
  availableUnits: number;
  totalUnits: number;
  services: string[];
  icon: string;
}

// Commercial Unit types
export interface CommercialUnit {
  id: string;
  name: string;
  type: 'retail' | 'office' | 'hotel';
  size: number;
  price: number;
  floor: number;
  features: string[];
  status: 'available' | 'reserved' | 'sold';
  image?: string;
  description: string;
}

// Inquiry form data
export interface InquiryForm {
  name: string;
  phone: string;
  email: string;
  unitType: 'retail' | 'office' | 'hotel' | 'any';
  message: string;
}

// Statistics data
export interface ProjectStats {
  totalArea: number;
  constructionProgress: number;
  openingDate: string;
  retailUnits: number;
  officeUnits: number;
  hotelRooms: number;
  parkingSpaces: number;
}

// Company/Partner info
export interface Partner {
  name: string;
  nameAr: string;
  logo?: string;
  description: string;
  services: string[];
  website?: string;
}

// Navigation item
export interface NavItem {
  label: string;
  href: string;
}

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}
