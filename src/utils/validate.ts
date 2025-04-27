import { ZodError } from 'zod';

import { formSchema } from './schemas';

export const validateConfig = (input: string): string | null => {
  try {
    const parsed = JSON.parse(input);
    formSchema.parse(parsed);
    return null; // sve ok
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
