import { Filter } from '@freedom/react-components';

import { brazilianUFs, customerTypes } from './CustomersFilter.constants';

export type CustomerFilterPayload = {
  name: string;
  UFs: {
    label: string;
    value: string;
  }[];
  customerType: {
    label: string;
    value: string;
  };
  createdAt: Date | null;
};

export type CustomerFilterParams = {
  name: string;
  UFs: string[];
  customerType: string;
  createdAt: Date | null;
};

type CustomersFilterProps = {
  onSubmit?: (formData: CustomerFilterPayload) => void;
  onClear?: () => void;
  filterParams: CustomerFilterParams;
};

export function CustomersFilter({
  filterParams,
  onSubmit,
  onClear,
}: CustomersFilterProps) {
  return (
    <Filter
      onSubmit={onSubmit}
      activeFilters={[
        {
          label: 'Nome',
          value: filterParams.name,
        },
        {
          label: 'UFs',
          value: brazilianUFs
            .filter(UF => filterParams.UFs.includes(UF.value))
            .map(UF => UF.label)
            .join(', '),
        },
        {
          label: 'Tipo de cliente',
          value: customerTypes.find(
            customerType =>
              customerType.value === Number(filterParams.customerType)
          )?.label,
        },

        {
          label: 'Data de cadastro',
          value: filterParams.createdAt
            ? Intl.DateTimeFormat('pt-BR').format(
                new Date(filterParams.createdAt)
              )
            : '',
        },
      ]}
      onClear={onClear}
    >
      <Filter.TextInput
        id="name"
        name="name"
        label="Nome"
        defaultValue={filterParams.name}
      />

      <Filter.Select
        multi
        name="UFs"
        label="UFs"
        options={brazilianUFs}
        defaultValue={brazilianUFs.filter(UF =>
          filterParams.UFs.includes(UF.value)
        )}
      />

      <Filter.Select
        name="customerType"
        label="Tipo de cliente"
        options={customerTypes}
        defaultValue={customerTypes.find(
          customerType =>
            customerType.value === Number(filterParams.customerType)
        )}
      />

      <Filter.DatePicker
        name="createdAt"
        label="Data de cadastro"
        defaultSelected={
          filterParams?.createdAt ? new Date(filterParams.createdAt) : null
        }
      />
    </Filter>
  );
}
