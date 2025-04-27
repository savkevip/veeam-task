import { useState } from 'react';

import { Button } from './Button';
import { formSchema } from '../utils/schemas';

type Props = {
  onApply: (jsonConfig: string) => void;
};

export const ConfigTab = ({ onApply }: Props) => {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(input);
      formSchema.parse(parsed);

      setError(null);
      onApply(input);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON syntax');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    }
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
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter JSON config here..."
        className="w-full h-64 p-2 border rounded font-mono text-sm"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end">
        <Button onClick={handleApply}>Apply</Button>
      </div>
    </div>
  );
};
