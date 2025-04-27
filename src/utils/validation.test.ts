import { describe, it, expect } from 'vitest';

import { FormConfig } from './schemas';
import { validateConfig, getInitialValues, validateRequiredFields } from './validation';

describe('validateConfig', () => {
  it('should return null for valid JSON config', () => {
    const validConfig = JSON.stringify({
      title: 'Sample Form',
      fields: [{ type: 'string', label: 'Name' }],
      buttons: [{ text: 'Submit' }],
    });

    const result = validateConfig(validConfig);
    expect(result).toBeNull();
  });

  it('should return an error message for invalid JSON syntax', () => {
    const invalidConfig = "{ title: 'Sample Form' ";

    const result = validateConfig(invalidConfig);
    expect(result).toBe('Invalid JSON syntax');
  });

  it('should return validation errors for invalid structure', () => {
    const invalidConfig = JSON.stringify({
      title: 'Sample Form',
      fields: [],
    });

    const result = validateConfig(invalidConfig);
    expect(result).toContain('BUTTONS - Required');
  });
});

describe('getInitialValues', () => {
  it('should generate initial values based on fields', () => {
    const fields = [
      { type: 'string', label: 'Name' },
      { type: 'number', label: 'Age' },
    ] as FormConfig['fields'];

    const result = getInitialValues(fields);
    expect(result).toEqual({
      'string-Name': '',
      'number-Age': '',
    });
  });

  it('should generate initial values with empty strings for all fields', () => {
    const fields = [
      { type: 'string', label: 'Name' },
      { type: 'boolean', label: 'Is Active' },
    ] as FormConfig['fields'];

    const result = getInitialValues(fields);
    expect(result['string-Name']).toBe('');
    expect(result['boolean-Is Active']).toBe('');
  });
});

describe('validateRequiredFields', () => {
  it('should return an empty object if all required fields are filled', () => {
    const fields = [{ type: 'string', label: 'Name', isRequired: true }] as FormConfig['fields'];

    const values = {
      'string-Name': 'John Doe',
    };

    const result = validateRequiredFields(fields, values);
    expect(result).toEqual({});
  });

  it('should return an error for missing required field', () => {
    const fields = [{ type: 'string', label: 'Name', isRequired: true }] as FormConfig['fields'];

    const values = {};

    const result = validateRequiredFields(fields, values);
    expect(result).toEqual({
      'string-Name': 'Name is required',
    });
  });

  it('should return no errors for non-required fields', () => {
    const fields = [{ type: 'string', label: 'Name', isRequired: false }] as FormConfig['fields'];

    const values = {};

    const result = validateRequiredFields(fields, values);
    expect(result).toEqual({});
  });
});
