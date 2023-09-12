import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

import { Meta } from '@/components/Meta';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages';
import { NotFoundPage } from '@/pages/404';
import { SignInPage } from '@/pages/entrar';
import { APP_NAME } from '@/constants';
import { register } from '@/stores/user/user.slice';
import { CustomersPage } from '@/pages/clientes';
import { CustomerPurchaseHistoryPage } from '@/pages/clientes/[id]/historico-de-compras';
import { SuppliersPage } from '@/pages/fornecedores';
import { ContactSupplierPage } from '@/pages/fornecedores/entrar-em-contato';
import { RestrictedPage } from '@/components/RestrictedPage';

export const pages = [
  {
    title: 'Clientes',
    path: 'clientes',
    element: (
      <>
        <Meta title="Clientes" />
        <CustomersPage />
      </>
    ),
    handle: {
      crumb: () => <Link to="/clientes">Clientes</Link>,
    },
    children: [
      {
        title: 'Histórico de compras',
        path: ':id/historico-de-compras',
        element: (
          <>
            <Meta title="Histórico de compras" />
            <CustomerPurchaseHistoryPage />
          </>
        ),
        handle: {
          crumb: (params: { id: string }) => (
            <Link to={`/clientes/${params.id}/historico-de-compras`}>
              Histórico de compras
            </Link>
          ),
        },
      },
    ],
  },
  {
    title: 'Fornecedores',
    path: 'fornecedores',
    isTabGroup: true,
    children: [
      {
        index: true,
        title: 'Lista de fornecedores',
        element: (
          <>
            <Meta title="Lista de fornecedores'" />
            <SuppliersPage />
          </>
        ),
        handle: {
          crumb: () => <Link to="/fornecedores">Lista de fornecedores</Link>,
        },
      },
      {
        title: 'Entrar em contato com fornecedor',
        path: 'entrar-em-contato',
        element: (
          <>
            <Meta title="Entrar em contato com fornecedor" />
            <RestrictedPage permission="ID_CONTATOFORNECEDOR">
              <ContactSupplierPage />
            </RestrictedPage>
          </>
        ),
        handle: {
          crumb: () => (
            <Link to="/fornecedores/entrar-em-contato">
              Entrar em contato com fornecedor
            </Link>
          ),
        },
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout pages={pages} />,
    handle: {
      crumb: () => <Link to="/">{APP_NAME}</Link>,
    },
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/entrar',
        element: <SignInPage />,
      },
      ...pages,
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function AppRoutes() {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      dispatch(register(auth.user.access_token));
    }
  }, [auth.user, dispatch]);

  return <RouterProvider router={router} />;
}
