import Business from '@material-ui/icons/Business';
import ClassRoundedIcon from '@material-ui/icons/ClassRounded';
import Grade from '@material-ui/icons/Grade';
import Work from '@material-ui/icons/Work';
import React from 'react';
import BusinessCard from './features/BusinessCard/BusinessCard';
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
    icon: Work,
    component: <Partners />,
  },
  businessCard: {
    path: '/businessCard',
    title: 'Візитка',
    icon: Business,
    component: <BusinessCard />,
  },
  talents: {
    path: '/talents',
    title: 'Вернісаж талантів',
    icon: Grade,
    component: <Talents />,
  },
};
