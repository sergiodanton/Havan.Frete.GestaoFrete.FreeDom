import { Sorting } from '@freedom/react-components';

import { useSearchParamsState } from './useSearchParamsState';

type GridParams = {
  pageSize: number | undefined;
  page: number | undefined;
  sortOrder: 'asc' | 'desc' | undefined;
  sortedBy: string | undefined;
};

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 5;

export function useGridParams() {
  const [gridParams, setGridParams] = useSearchParamsState<GridParams>();

  function handleCurrentPageChange(page: number) {
    setGridParams({
      ...gridParams,
      page,
    });
  }

  function handlePageSizeChange(pageSize: number) {
    setGridParams({
      ...gridParams,
      pageSize,
    });
  }

  function handleSortingChange(sorting: Sorting[]) {
    const { columnName, direction } = sorting[0];

    setGridParams({
      ...gridParams,
      sortedBy: columnName,
      sortOrder: direction,
    });
  }

  return {
    page: Number(gridParams.page) || DEFAULT_PAGE,
    handleCurrentPageChange,
    pageSize: Number(gridParams.pageSize) || DEFAULT_PAGE_SIZE,
    handlePageSizeChange,
    sorting:
      gridParams.sortedBy && gridParams.sortOrder
        ? [
            {
              columnName: gridParams.sortedBy,
              direction: gridParams.sortOrder,
            },
          ]
        : [],
    handleSortingChange,
  };
}
