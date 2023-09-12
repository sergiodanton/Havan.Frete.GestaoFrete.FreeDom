import { Skeleton } from '@freedom/react-components';

export function HeaderLoading() {
  return (
    <div className="py-4 px-9 w-full flex sticky top-0">
      <div className="w-1/6">
        <Skeleton height={24} width="25%" className="mb-1" />
        <Skeleton height={32} width="50%" />
      </div>

      <div className="flex w-1/3 gap-8 ml-auto justify-end">
        <div className="w-1/4">
          <Skeleton height={24} width="100%" className="mb-1" />
          <Skeleton height={40} width="100%" />
        </div>

        <div>
          <Skeleton width={40} height={40} borderRadius="50%" />
        </div>
      </div>
    </div>
  );
}
