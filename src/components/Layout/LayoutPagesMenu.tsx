import { Link, useMatch } from 'react-router-dom';
import { NavigationMenu } from '@freedom/react-components';

import { Page } from '@/models/page';

type NavigationMenuProps = {
  pages?: Page[];
};

export function LayoutPagesMenu({ pages }: NavigationMenuProps) {
  return (
    <div className="px-7">
      <NavigationMenu>
        {pages?.map(page =>
          page.isTabGroup ? (
            <NavigationMenu.Item key={page.path}>
              <NavigationMenu.Group label={page.title}>
                {(page.children || []).map(child => (
                  <NavigationMenu.Link
                    key={child.index ? page.path : `${page.path}/${child.path}`}
                    active={
                      // Desabilitado pois precisamos checar se a rota está ativa
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      useMatch(
                        child.index ? page.path : `${page.path}/${child.path}`
                      ) !== null
                    }
                    href={
                      child.index ? page.path : `${page.path}/${child.path}`
                    }
                    renderComponent={({ href, children }) => (
                      <Link to={href}>{children}</Link>
                    )}
                  >
                    {child.title}
                  </NavigationMenu.Link>
                ))}
              </NavigationMenu.Group>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item key={page.path}>
              <NavigationMenu.Link
                active={
                  // Desabilitado pois precisamos checar se a rota está ativa
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  useMatch({
                    path: page.path,
                    end: false,
                  }) !== null
                }
                href={page.path}
                renderComponent={({ href, children }) => (
                  <Link to={href}>{children}</Link>
                )}
              >
                {page.title}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          )
        )}
      </NavigationMenu>
    </div>
  );
}
