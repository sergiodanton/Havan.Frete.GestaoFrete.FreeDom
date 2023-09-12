import { Link as ReactRouterDomLink } from 'react-router-dom';
import { Link, LinkProps } from '@freedom/react-components';

export function ClientSideLink({ href, children, ...rest }: LinkProps) {
  return (
    <Link
      href={href}
      renderComponent={() => (
        <ReactRouterDomLink to={href}>{children}</ReactRouterDomLink>
      )}
      // Desabilitado pois queremos que ele herde todas as props
      // de um componente Link
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
}

export { Link };
