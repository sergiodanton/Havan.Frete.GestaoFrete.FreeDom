import { Skeleton } from '@freedom/react-components';

export function SidebarLoading() {
  return (
    <div className="fixed left-0">
      <ul>
        <li className="w-12 h-12">
          <Skeleton width={40} height={40} borderRadius="100%" />
        </li>
      </ul>
      <ul>
        <li className="w-12 h-12">
          <Skeleton width={40} height={40} borderRadius="100%" />
        </li>
      </ul>
      <ul>
        <li className="w-12 h-12">
          <Skeleton width={40} height={40} borderRadius="100%" />
        </li>
      </ul>
      <ul>
        <li className="w-12 h-12">
          <Skeleton width={40} height={40} borderRadius="100%" />
        </li>
      </ul>
    </div>
  );
}
