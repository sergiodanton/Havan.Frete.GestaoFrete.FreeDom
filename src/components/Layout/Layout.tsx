import { Outlet, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Sidebar } from '@/components/Sidebar';
import { Meta } from '@/components/Meta';

import { LayoutPagesMenu } from './LayoutPagesMenu';

type LayoutProps = {
  pages: any[];
};

export function Layout({ pages }: LayoutProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.delete('code');
    searchParams.delete('RedirectUrl');
    searchParams.delete('state');
    setSearchParams(searchParams);
    // Desabilitado pois isso só precisa rodar uma vez quando monta
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Meta />
      <div>
        <div className="z-2">
          <Sidebar />
        </div>

        <div className="flex-grow min-h-screen flex flex-col ml-6">
          <div className=" bg-neutral-weak-100 sticky top-0 z-2">
            <Header />
            <LayoutPagesMenu pages={pages} />
          </div>

          <main className="flex-grow mx-2 my-3 flex flex-col z-1">
            <Outlet />
          </main>

          <div className="z-0">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
