import { Typography } from '@freedom/react-components';

import notAuthorized from '@/assets/icons/not-authorized.svg';
import { ClientSideLink } from '@/components/Link';

export function Forbidden() {
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="flex">
        <img src={notAuthorized} alt="" width={100} className="mr-7" />

        <div className="max-w-md space-y-2">
          <h1 className="text-xxxl font-medium text-neutral-strong-200">
            Não autorizado
          </h1>

          <Typography as="body" className="text-neutral-strong-100">
            A página que você está tentando acessar não permitiu o seu acesso,
            para acessar fale com a pessoa responsável.
          </Typography>

          <div>
            <ClientSideLink href="/">Voltar para página inicial</ClientSideLink>
          </div>
        </div>
      </div>
    </div>
  );
}
