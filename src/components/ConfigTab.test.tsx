import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { ConfigTab } from './ConfigTab';

describe('ConfigTab Component', () => {
  const mockOnChange = vi.fn();
  const mockOnApply = vi.fn();

  const mockConfig = `{
    "title": "Sample Form",
    "fields": [{ "type": "string", "label": "Name" }],
    "buttons": [{ "text": "Apply", "type": "submit" }]
  }`;

  it('should render the textarea and Apply button', () => {
    render(<ConfigTab value={mockConfig} onChange={mockOnChange} onApply={mockOnApply} />);

    expect(screen.getByLabelText('JSON Configuration')).toBeInTheDocument();
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });

  it('should show an error message when the JSON is invalid', async () => {
    const invalidConfig = `{
      "title": "Invalid Form",
      "fields": [{ "type": "string", "label": "Name" }
    }`;

    render(<ConfigTab value={invalidConfig} onChange={mockOnChange} onApply={mockOnApply} />);

    fireEvent.click(screen.getByText('Apply'));

    await waitFor(() => {
      expect(screen.getByText('Invalid JSON syntax')).toBeInTheDocument();
    });
  });

  it('should call onApply with the correct JSON when the JSON is valid', () => {
    render(<ConfigTab value={mockConfig} onChange={mockOnChange} onApply={mockOnApply} />);

    fireEvent.click(screen.getByText('Apply'));

    expect(mockOnApply).toHaveBeenCalledWith(mockConfig);
  });

  it('should apply the error style when there is an error', async () => {
    const invalidConfig = `{
      "title": "Invalid Form",
      "fields": [{ "type": "string", "label": "Name" }
    }`;

    render(<ConfigTab value={invalidConfig} onChange={mockOnChange} onApply={mockOnApply} />);

    fireEvent.click(screen.getByText('Apply'));

    const textarea = screen.getByLabelText('JSON Configuration');
    expect(textarea).toHaveClass('border-red-500');
  });
});
