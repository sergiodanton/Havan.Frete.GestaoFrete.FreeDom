import { useSearchParams } from 'react-router-dom';
import qs from 'qs';

export function useSearchParamsState<T extends Record<string, any>>(
  defaultParams?: T
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const values = {
    ...defaultParams,
    ...(qs.parse(searchParams.toString()) as T),
  };
  function setValues(newValues: T | null) {
    if (!newValues) {
      setSearchParams();
      return;
    }

    const currentParams = qs.parse(searchParams.toString()) as T;

    setSearchParams(
      qs.stringify(
        { ...currentParams, ...newValues },
        {
          filter: (_, value) => {
            if (value instanceof Date) {
              return value.toISOString();
            }

            return value || undefined;
          },
        }
      )
    );
  }

  return [values, setValues] as const;
}
