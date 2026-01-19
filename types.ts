export interface Photo {
  id: string;
  url: string;
  title?: string;
  category?: string;
  width?: number; // for masonry layout calculations if needed
  height?: number;
}

export enum PageRoute {
  HOME = '/',
  PHOTOGRAPHY = '/photography',
  COMMERCIAL = '/commercial',
  SHOP = '/shop',
  ABOUT = '/about',
  CONTACT = '/contact',
  TIPS = '/tips'
}

export interface NavItem {
  label: string;
  path: string;
  isDropdown?: boolean;
  children?: NavItem[];
}