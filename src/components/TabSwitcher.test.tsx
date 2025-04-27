import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TabSwitcher } from './TabSwitcher';

describe('TabSwitcher Component', () => {
  const mockOnTabChange = vi.fn();

  it('should render both tabs and set the correct aria-selected for the active tab', () => {
    render(<TabSwitcher activeTab="config" onTabChange={mockOnTabChange} />);

    expect(screen.getByText('Config')).toBeInTheDocument();
    expect(screen.getByText('Result')).toBeInTheDocument();

    expect(screen.getByText('Config')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Result')).toHaveAttribute('aria-selected', 'false');
  });

  it('should call onTabChange with the correct tab when clicked', () => {
    render(<TabSwitcher activeTab="config" onTabChange={mockOnTabChange} />);

    fireEvent.click(screen.getByText('Result'));

    expect(mockOnTabChange).toHaveBeenCalledWith('result');
  });

  it('should apply the correct styles to the active tab', () => {
    render(<TabSwitcher activeTab="config" onTabChange={mockOnTabChange} />);

    expect(screen.getByText('Config')).toHaveClass(
      'border-b-2 border-blue-500 font-semibold text-blue-500',
    );
    expect(screen.getByText('Result')).not.toHaveClass(
      'border-b-2 border-blue-500 font-semibold text-blue-500',
    );
  });
});
