import {
  Select,
  TextInput,
  SelectOption,
  AddAndEditModalProps,
} from '@freedom/react-components';

import { Customer, CustomerType } from '@/models/customer';

export function CustomerAddAndEditModal({
  row: customer,
  onChange,
}: AddAndEditModalProps<Customer>) {
  const customerTypeOptions: SelectOption[] = [
    { value: CustomerType.PESSOA_FISICA, label: 'Pessoa Física' },
    { value: CustomerType.PESSOA_JURIDICA, label: 'Pessoa Jurídica' },
  ];

  return (
    <div>
      <TextInput
        label="Nome"
        name="name"
        className="w-full"
        defaultValue={customer.name}
        onChange={({ target: { value } }) => onChange('name', value)}
      />

      <TextInput
        label="UF"
        name="UF"
        className="w-full"
        defaultValue={customer.UF}
        onChange={({ target: { value } }) => onChange('UF', value)}
      />

      <Select
        label="Tipo de cliente"
        name="customerType"
        className="w-full"
        options={customerTypeOptions}
        onChange={(option: SelectOption | null) => {
          onChange('customerType', option?.value);
        }}
        defaultValue={
          {
            label: customerTypeOptions.find(
              option => option.value === customer.customerType
            )?.label,
            value: customer.customerType,
          } as SelectOption
        }
      />
    </div>
  );
}
