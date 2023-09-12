import { Typography } from '@freedom/react-components';

import notFound from '@/assets/icons/not-found.svg';

import { ClientSideLink } from '../components/Link';

export function NotFoundPage() {
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="flex">
        <img src={notFound} alt="" width={100} className="mr-7" />

        <div className="max-w-md space-y-2">
          <div>
            <h1 className="text-extra-xl leading-xxl font-medium text-neutral-strong-200 pb-2">
              404
            </h1>

            <Typography as="heading" className="text-neutral-strong-200">
              Página não encontrada
            </Typography>
          </div>

          <Typography as="body" className="text-neutral-strong-100">
            A URL que você está tentando acessar não possui página.
          </Typography>

          <div>
            <ClientSideLink href="/">Voltar para página inicial</ClientSideLink>
          </div>
        </div>
      </div>
    </div>
  );
}
