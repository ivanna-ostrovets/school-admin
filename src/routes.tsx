import BusinessIcon from '@mui/icons-material/Business';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import GradeIcon from '@mui/icons-material/Grade';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import React from 'react';
import BusinessCardPage from './features/BusinessCard/BusinessCardPage';
import CategoriesPage from './features/Categories/CategoriesPage';
import GraduatesPage from './features/Graduates/GraduatesPage';
import PartnersPage from './features/Partners/PartnersPage';
import TalentsPage from './features/Talents/TalentsPage';

export interface AppRoute {
  icon: any;
  path: string;
  title: string;
  component: JSX.Element;
}

export const ROUTES: {
  menuItems: AppRoute;
  partners: AppRoute;
  businessCard: AppRoute;
  talents: AppRoute;
  graduates: AppRoute;
} = {
  menuItems: {
    path: '/menu-items',
    title: 'Пункти меню',
    icon: ClassRoundedIcon,
    component: <CategoriesPage />,
  },
  partners: {
    path: '/partners',
    title: 'Друзі та партнери',
    icon: WorkIcon,
    component: <PartnersPage />,
  },
  businessCard: {
    path: '/businessCard',
    title: 'Візитка',
    icon: BusinessIcon,
    component: <BusinessCardPage />,
  },
  talents: {
    path: '/talents',
    title: 'Вернісаж талантів',
    icon: GradeIcon,
    component: <TalentsPage />,
  },
  graduates: {
    path: '/graduates',
    title: 'Наші випускники',
    icon: SchoolIcon,
    component: <GraduatesPage />,
  },
};
