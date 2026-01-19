export interface Photo {
  id: string;
  url: string;
  title?: string;
  category?: string;
  width?: number; // for masonry layout calculations if needed
  height?: number;
}

export interface PortfolioCategory {
  id: string;
  titleKey: string;
  descriptionKey: string;
  coverImage: string;
}

export enum PageRoute {
  HOME = '/',
  PHOTOGRAPHY = '/fotografia',
  SHOP = '/tienda',
  ABOUT = '/sobre-mi',
  CONTACT = '/contacto',
  TIPS = '/apoyo'
}

export interface NavItem {
  label: string;
  path: string;
  isDropdown?: boolean;
  children?: NavItem[];
}