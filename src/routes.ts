import ClassRoundedIcon from '@material-ui/icons/ClassRounded';

export interface AppRoute {
  icon: any;
  path: string;
  title: string;
  showInDrawer: boolean;
}

export const ROUTES: { [key: string]: AppRoute } = {
  default: {
    path: '/',
    title: '',
    showInDrawer: false,
    icon: '',
  },
  menuItems: {
    path: '/menu-items',
    title: 'Пункти меню',
    showInDrawer: true,
    icon: ClassRoundedIcon,
  },
};
