import { Skeleton } from '@freedom/react-components';

export function FooterLoading() {
  return (
    <div className="p-6 w-full flex justify-between items-center border-t-sm border-neutral-weak-200">
      <Skeleton width={70} as="caption" className="mr-auto" />
      <Skeleton width={120} as="caption" className="ml-auto" />
    </div>
  );
}
