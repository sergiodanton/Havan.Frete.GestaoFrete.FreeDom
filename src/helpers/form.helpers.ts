import React from 'react';

export function getFormData(event: React.FormEvent) {
  const formElement = event.currentTarget as HTMLFormElement;

  const formData = {} as Record<string, any>;

  const data = new FormData(formElement);

  for (const key of data.keys()) {
    formData[key] = data.get(key);
  }

  return formData;
}
