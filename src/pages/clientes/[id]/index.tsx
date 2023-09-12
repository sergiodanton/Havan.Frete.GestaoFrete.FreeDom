import { Typography } from '@freedom/react-components';
import { useParams } from 'react-router-dom';

export function CustomerPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <Typography as="heading">Detalhes do cliente {id}</Typography>
    </div>
  );
}
