import Business from '@material-ui/icons/Business';
import ClassRoundedIcon from '@material-ui/icons/ClassRounded';
import Work from '@material-ui/icons/Work';

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
  partners: {
    path: '/partners',
    title: 'Друзі та партнери',
    showInDrawer: true,
    icon: Work,
  },
  businessCard: {
    path: '/businessCard',
    title: 'Візитка',
    showInDrawer: true,
    icon: Business,
  },
};
