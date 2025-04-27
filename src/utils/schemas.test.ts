import { describe, it, expect } from 'vitest';

import { fieldSchema, formSchema } from './schemas';

describe('fieldSchema Validation', () => {
  it('should pass validation for valid field', () => {
    const validField = {
      type: 'string',
      label: 'Name',
      isRequired: true,
    };

    const result = fieldSchema.safeParse(validField);
    expect(result.success).toBe(true);
  });

  it('should fail validation for field with missing label', () => {
    const invalidField = {
      type: 'string',
    };

    const result = fieldSchema.safeParse(invalidField);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe('Required');
  });

  it('should fail validation for enum type without options', () => {
    const invalidEnumField = {
      type: 'enum',
      label: 'Category',
    };

    const result = fieldSchema.safeParse(invalidEnumField);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe('Options are required for enum type');
  });

  it('should pass validation for enum type with options', () => {
    const validEnumField = {
      type: 'enum',
      label: 'Category',
      options: ['Option 1', 'Option 2'],
    };

    const result = fieldSchema.safeParse(validEnumField);
    expect(result.success).toBe(true);
  });
});

describe('formSchema Validation', () => {
  it('should pass validation for a valid form config', () => {
    const validConfig = {
      title: 'Sample Form',
      fields: [{ type: 'string', label: 'Name', isRequired: true }],
      buttons: [{ text: 'Submit', type: 'submit' }],
    };

    const result = formSchema.safeParse(validConfig);
    expect(result.success).toBe(true);
  });

  it('should fail validation for form with missing required field', () => {
    const invalidConfig = {
      title: 'Sample Form',
      fields: [{ type: 'string', label: 'Name', isRequired: true }],
    };

    const result = formSchema.safeParse(invalidConfig);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe('Required');
  });

  it('should fail validation for form with invalid button type', () => {
    const invalidConfig = {
      title: 'Sample Form',
      fields: [{ type: 'string', label: 'Name' }],
      buttons: [{ text: 'Submit', type: 'invalidType' }],
    };

    const result = formSchema.safeParse(invalidConfig);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe(
      "Invalid enum value. Expected 'submit' | 'button' | 'reset', received 'invalidType'",
    );
  });
});
