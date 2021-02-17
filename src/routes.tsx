import BusinessIcon from '@material-ui/icons/Business';
import ClassRoundedIcon from '@material-ui/icons/ClassRounded';
import GradeIcon from '@material-ui/icons/Grade';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import React from 'react';
import BusinessCardPage from './features/BusinessCard/BusinessCardPage';
import GraduatesPage from './features/Graduates/GraduatesPage';
import CategoriesPage from './features/Categories/CategoriesPage';
import PartnersPage from './features/Partners/PartnersPage';
import TalentsPage from './features/Talents/TalentsPage';

interface AppRoute {
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
