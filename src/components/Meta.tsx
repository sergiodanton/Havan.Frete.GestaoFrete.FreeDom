import { Helmet } from 'react-helmet';

import { APP_NAME } from '@/constants';

type MetaProps = {
  title?: string;
};

export function Meta({ title }: MetaProps) {
  const extendedTitle = title ? `${APP_NAME} | ${title}` : APP_NAME;

  return <Helmet title={extendedTitle} />;
}
