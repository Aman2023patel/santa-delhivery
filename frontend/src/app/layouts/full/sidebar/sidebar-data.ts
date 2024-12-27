import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    navCap: 'Features',
  },
  {
    displayName: 'Gift',
    iconName: 'layout-navbar-expand',
    bgcolor: 'accent',
    route: 'extra/fortune-wheel',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Google map',
    iconName: 'mood-smile',
    bgcolor: 'success',
    route: '/extra/icons',
  },
  {
    displayName: 'Fortune wheel',
    iconName: 'aperture',
    bgcolor: 'error',
    // route: '/extra/fortune-wheel',
  },
];
