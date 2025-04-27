// src/components/ConfigTab.tsx

import { useState } from 'react';

import { Button } from './Button';

type Props = {
  onApply: (jsonConfig: string) => void;
};

export const ConfigTab = ({ onApply }: Props) => {
  const [input, setInput] = useState<string>('');

  const handleApply = () => {
    onApply(input);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter JSON config here..."
        className="w-full h-64 p-2 border rounded font-mono text-sm"
      />
      <div className="flex justify-end">
        <Button onClick={handleApply} aria-label="Apply">
          Apply
        </Button>
      </div>
    </div>
  );
};
