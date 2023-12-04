import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Panel',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Composteras',
    path: '/composteras',
    icon: icon('ic_cart'),
  },
  // {
  //   title: 'Composteras',
  //   path: '/user',
  //   icon: icon('ic_user'),
  // },

  // {
  //   title: 'mas...',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
