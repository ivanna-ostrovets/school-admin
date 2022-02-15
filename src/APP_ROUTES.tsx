import BusinessIcon from '@mui/icons-material/Business';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import GradeIcon from '@mui/icons-material/Grade';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import BusinessCardPage from './features/BusinessCard/BusinessCardPage';
import CategoriesPage from './features/Categories/CategoriesPage';
import CreateGraduates from './features/Graduates/CreateGraduates';
import EditGraduates from './features/Graduates/EditGraduates';
import GraduatesPage from './features/Graduates/GraduatesPage';
import GraduatesView from './features/Graduates/GraduatesView';
import PartnersPage from './features/Partners/PartnersPage';
import CreateSchedule from './features/Schedule/CreateSchedule';
import EditSchedule from './features/Schedule/EditSchedule';
import SchedulePage from './features/Schedule/SchedulePage';
import ScheduleView from './features/Schedule/ScheduleView';
import SiteInfoPage from './features/SiteInfo/SiteInfoPage';
import CreateTalent from './features/Talents/CreateTalent';
import EditTalent from './features/Talents/EditTalent';
import TalentsPage from './features/Talents/TalentsPage';
import TalentView from './features/Talents/TalentView';

export interface AppRoute {
  icon?: any;
  getLink?: (value: string) => string;
  path: string;
  title: string;
  component: React.ReactNode;
  isPrivate: boolean;
  showInNavigation: boolean;
}

export const APP_ROUTES = {
  siteInfo: {
    path: '/site-info',
    title: 'Загальна інформація',
    icon: InfoIcon,
    component: <SiteInfoPage />,
    isPrivate: true,
    showInNavigation: true,
  },
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
  newTalent: {
    path: '/talents/new',
    title: 'Вернісаж талантів | Додати секцію',
    component: <CreateTalent />,
    isPrivate: true,
    showInNavigation: false,
  },
  talentView: {
    path: '/talents/:id',
    getLink: (id: string) => `/talents/${id}`,
    title: 'Вернісаж талантів | Перегляд',
    component: <TalentView />,
    isPrivate: true,
    showInNavigation: false,
  },
  editTalent: {
    path: '/talents/:id/edit',
    getLink: (id: string) => `/talents/${id}/edit`,
    title: 'Вернісаж талантів | Редагувати',
    component: <EditTalent />,
    isPrivate: true,
    showInNavigation: false,
  },
  graduates: {
    path: '/graduates',
    title: 'Наші випускники',
    icon: SchoolIcon,
    component: <GraduatesPage />,
    isPrivate: true,
    showInNavigation: true,
  },
  newGraduates: {
    path: '/graduates/new',
    title: 'Наші випускники | Додати секцію',
    component: <CreateGraduates />,
    isPrivate: true,
    showInNavigation: false,
  },
  graduatesView: {
    path: '/graduates/:id',
    getLink: (id: string) => `/graduates/${id}`,
    title: 'Наші випускники | Перегляд',
    component: <GraduatesView />,
    isPrivate: true,
    showInNavigation: false,
  },
  editGraduates: {
    path: '/graduates/:id/edit',
    getLink: (id: string) => `/graduates/${id}/edit`,
    title: 'Наші випускники | Редагувати',
    component: <EditGraduates />,
    isPrivate: true,
    showInNavigation: false,
  },
  schedule: {
    path: '/schedule',
    title: 'Розклад',
    icon: CalendarViewMonthIcon,
    component: <SchedulePage />,
    isPrivate: true,
    showInNavigation: true,
  },
  newSchedule: {
    path: '/schedule/new',
    title: 'Розклад | Додати секцію',
    component: <CreateSchedule />,
    isPrivate: true,
    showInNavigation: false,
  },
  scheduleView: {
    path: '/schedule/:id',
    getLink: (id: string) => `/schedule/${id}`,
    title: 'Розклад | Перегляд',
    component: <ScheduleView />,
    isPrivate: true,
    showInNavigation: false,
  },
  editSchedule: {
    path: '/schedule/:id/edit',
    getLink: (id: string) => `/schedule/${id}/edit`,
    title: 'Розклад | Редагувати',
    component: <EditSchedule />,
    isPrivate: true,
    showInNavigation: false,
  },
};

export const ROUTER_ROUTES: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to={APP_ROUTES.siteInfo.path} />,
  },
  ...Object.values(APP_ROUTES).map(({ path, component, isPrivate }) => ({
    path,
    element: isPrivate ? <PrivateRoute>{component}</PrivateRoute> : component,
  })),
];
