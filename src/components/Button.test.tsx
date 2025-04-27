import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Button } from './Button';

describe('Button Component', () => {
  it('should render the button with the correct text', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('should trigger onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    const buttonElement = screen.getByText('Click me');
    fireEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should apply the correct button type', () => {
    render(<Button type="submit">Submit</Button>);

    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  it('should apply primary variant classes by default', () => {
    render(<Button>Click me</Button>);

    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toHaveClass('bg-blue-500');
    expect(buttonElement).toHaveClass('text-white');
  });

  it('should apply secondary variant classes when variant is secondary', () => {
    render(<Button variant="secondary">Click me</Button>);

    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toHaveClass('bg-gray-200');
    expect(buttonElement).toHaveClass('text-gray-700');
  });
});
