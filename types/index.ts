import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  createdAt: Date;
};

export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  price: number;
  propertyType: string;
  propertyStatus: string;
  imageUrls: string[];
  location: string;
  owner: User;
  createdAt: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
