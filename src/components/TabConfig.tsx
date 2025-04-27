import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from './Button';
import { validateConfig } from '../utils/validate';

type Props = {
  value: string;
  onChange: (val: string) => void;
  onApply: (jsonConfig: string) => void;
};

export const ConfigTab = ({ value, onChange, onApply }: Props) => {
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    const errorMessage = validateConfig(value);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError(null);
    onApply(value);
  };

  return (
    <div className="space-y-4">
      <label htmlFor="json-config" className="sr-only">
        JSON Configuration
      </label>
      <textarea
        id="json-config"
        aria-label="JSON Configuration"
        aria-invalid={!!error}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter JSON config here..."
        className={twMerge(
          'w-full h-64 p-2 border rounded font-mono text-sm',
          error ? 'border-red-500' : 'border-gray-300',
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end">
        <Button onClick={handleApply}>Apply</Button>
      </div>
    </div>
  );
};
