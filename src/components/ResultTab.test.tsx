import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { ResultTab } from './ResultTab';
import { FormConfig } from '../utils/schemas';

describe('ResultTab Component', () => {
  const mockConfig: FormConfig = {
    title: 'Sample Form',
    fields: [
      { type: 'string', label: 'Name', isRequired: true },
      { type: 'number', label: 'Age' },
      { type: 'boolean', label: 'Agree to Terms', isRequired: true },
    ],
    buttons: [
      { text: 'Submit', type: 'submit' },
      { text: 'Cancel', type: 'button' },
    ],
  };

  it('should render the form fields based on config', () => {
    render(<ResultTab config={mockConfig} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Agree to Terms')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should show error messages for required fields when not filled', async () => {
    render(<ResultTab config={mockConfig} />);

    fireEvent.submit(screen.getByTestId('form'));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Agree to Terms is required')).toBeInTheDocument();
  });

  it('should apply primary variant class to submit button', () => {
    render(<ResultTab config={mockConfig} />);

    const submitButton = screen.getByText('Submit');
    expect(submitButton).toHaveClass('bg-blue-500');
  });

  it('should apply secondary variant class to Cancel button', () => {
    render(<ResultTab config={mockConfig} />);

    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toHaveClass('bg-gray-200');
  });
});
