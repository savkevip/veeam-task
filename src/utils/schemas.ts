import { z } from 'zod';

export type FormConfig = z.infer<typeof formSchema>;

export const fieldSchema = z
  .object({
    type: z.enum(['string', 'number', 'multi-line', 'boolean', 'date', 'enum']),
    label: z.string(),
    options: z.array(z.string()).optional(),
    isRequired: z.boolean().optional(),
  })
  .refine((data) => data.type !== 'enum' || (data.options && data.options.length > 0), {
    message: 'Options are required for enum type',
    path: ['options'],
  })
  .refine((data) => !data.isRequired || data.label, {
    message: 'Field is required',
    path: ['label'],
  });

export const formSchema = z
  .object({
    title: z.string(),
    fields: z.array(fieldSchema),
    buttons: z.array(
      z.object({
        text: z.string(),
        type: z.enum(['submit', 'button', 'reset']).optional(),
        onClick: z.function().args().returns(z.void()).optional(),
      }),
    ),
  })
  .strict();
