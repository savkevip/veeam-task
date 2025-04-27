import { ZodError } from 'zod';

import { FormConfig, formSchema } from './schemas';

export const validateConfig = (input: string): string | null => {
  try {
    const parsed = JSON.parse(input);
    formSchema.parse(parsed);
    return null;
  } catch (err) {
    if (err instanceof SyntaxError) {
      return 'Invalid JSON syntax';
    } else if (err instanceof ZodError) {
      return err.errors.map((e) => `${e.path.join('.').toUpperCase()} - ${e.message}`).join(', ');
    } else {
      return 'Unknown error';
    }
  }
};

export const getInitialValues = (fields: FormConfig['fields']) => {
  return fields.reduce(
    (acc, field) => {
      const fieldKey = `${field.type}-${field.label}`;
      acc[fieldKey] = '';
      return acc;
    },
    {} as Record<string, any>,
  );
};

export const validateRequiredFields = (
  fields: FormConfig['fields'],
  values: Record<string, any>,
) => {
  const errors: Record<string, string> = {};
  fields.forEach((field) => {
    const fieldKey = `${field.type}-${field.label}`;
    if (field.isRequired && !values[fieldKey]) {
      errors[fieldKey] = `${field.label} is required`;
    }
  });
  return errors;
};
