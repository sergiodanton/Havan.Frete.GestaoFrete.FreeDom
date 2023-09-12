import { Spinner } from '@freedom/react-components';

export function LoadingValidation() {
  return (
    <div className="w-full flex flex-1 items-center justify-center">
      <Spinner
        description="Validando acesso"
        delayMessage="Parece que isso está demorando mais que o normal"
      />
    </div>
  );
}
