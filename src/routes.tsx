import BusinessIcon from '@material-ui/icons/Business';
import ClassRoundedIcon from '@material-ui/icons/ClassRounded';
import GradeIcon from '@material-ui/icons/Grade';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import React from 'react';
import BusinessCard from './features/BusinessCard/BusinessCard';
import Graduates from './features/Graduates/Graduates';
import MenuItems from './features/MenuItems/MenuItems';
import Partners from './features/Partners/Partners';
import Talents from './features/Talents/Talents';

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
    component: <MenuItems />,
  },
  partners: {
    path: '/partners',
    title: 'Друзі та партнери',
    icon: WorkIcon,
    component: <Partners />,
  },
  businessCard: {
    path: '/businessCard',
    title: 'Візитка',
    icon: BusinessIcon,
    component: <BusinessCard />,
  },
  talents: {
    path: '/talents',
    title: 'Вернісаж талантів',
    icon: GradeIcon,
    component: <Talents />,
  },
  graduates: {
    path: '/graduates',
    title: 'Наші випускники',
    icon: SchoolIcon,
    component: <Graduates />,
  },
};
