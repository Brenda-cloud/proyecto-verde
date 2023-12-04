import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import Compostera from 'src/pages/compostera';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/composteras'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------
export default function Router() {
  const data = localStorage.getItem('user');
  const isAuthenticated = data !== null;
  console.log(isAuthenticated);

  const routes = useRoutes([
    {
      element: isAuthenticated ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" />
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'composteras', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'compostera', element: <Compostera /> },
        { path: '/compostera/:id', element: <Compostera /> },
      ],
    },
    {
      path: 'login',
      element: isAuthenticated ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
  ]);

  return routes;
}

// ----------------------------------------------------------------------

// export default function Router() {
//   const data = localStorage.getItem('user');
//   console.log(data);


//   const routes = useRoutes([
//     {
//       element: (
//         <DashboardLayout>
//           <Suspense>
//             <Outlet />
//           </Suspense>
//         </DashboardLayout>
//       ),
//       children: [
//         { element: <IndexPage />, index: true },
//         { path: 'user', element: <UserPage /> },
//         { path: 'composteras', element: <ProductsPage /> },
//         { path: 'blog', element: <BlogPage /> },
//         { path: 'compostera', element: <Compostera /> },
//         { path: '/compostera/:id', element: <Compostera /> },
//       ],
//     },
//     {
//       path: 'login',
//       element: <LoginPage />,
//     },
//     {
//       path: '404',
//       element: <Page404 />,
//     },
//     {
//       path: '*',
//       element: <Navigate to="/404" replace />,
//     },
//   ]);

//   return routes;
// }
