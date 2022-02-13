import BusinessIcon from '@mui/icons-material/Business';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import GradeIcon from '@mui/icons-material/Grade';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import BusinessCardPage from './features/BusinessCard/BusinessCardPage';
import CategoriesPage from './features/Categories/CategoriesPage';
import GraduatesPage from './features/Graduates/GraduatesPage';
import PartnersPage from './features/Partners/PartnersPage';
import TalentsPage from './features/Talents/TalentsPage';

export interface AppRoute {
  icon: any;
  path: string;
  title: string;
  component: React.ReactNode;
  isPrivate: boolean;
  showInNavigation: boolean;
}

export const APP_ROUTES = {
  menuItems: {
    path: '/menu-items',
    title: 'Пункти меню',
    icon: ClassRoundedIcon,
    component: <CategoriesPage />,
    isPrivate: true,
    showInNavigation: true,
  },
  partners: {
    path: '/partners',
    title: 'Друзі та партнери',
    icon: WorkIcon,
    component: <PartnersPage />,
    isPrivate: true,
    showInNavigation: true,
  },
  businessCard: {
    path: '/businessCard',
    title: 'Візитка',
    icon: BusinessIcon,
    component: <BusinessCardPage />,
    isPrivate: true,
    showInNavigation: true,
  },
  talents: {
    path: '/talents',
    title: 'Вернісаж талантів',
    icon: GradeIcon,
    component: <TalentsPage />,
    isPrivate: true,
    showInNavigation: true,
  },
  graduates: {
    path: '/graduates',
    title: 'Наші випускники',
    icon: SchoolIcon,
    component: <GraduatesPage />,
    isPrivate: true,
    showInNavigation: true,
  },
};

export const ROUTER_ROUTES: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to={APP_ROUTES.menuItems.path} />,
  },
  ...Object.values(APP_ROUTES).map(({ path, component, isPrivate }) => ({
    path,
    element: isPrivate ? <PrivateRoute>{component}</PrivateRoute> : component,
  })),
];
