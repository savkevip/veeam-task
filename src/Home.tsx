import { useState } from 'react';

import { TabSwitcher, Tab } from './components/TabSwitcher';
import { ConfigTab } from './components/TabConfig';
import { ResultTab } from './components/ResultTab';

export const Home = () => {
  const [input, setInput] = useState<string>(`{
    "title": "Sample Form",
    "fields": [
      { "type": "string", "label": "Name" }
    ],
    "buttons": [
      { "text": "Submit" }
    ]
  }`);
  const [activeTab, setActiveTab] = useState<Tab>('config');
  const [jsonConfig, setJsonConfig] = useState<string>('');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Veeam Form Generator</h1>
      <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
      <div>
        {activeTab === 'config' ? (
          <ConfigTab value={input} onChange={setInput} onApply={setJsonConfig} />
        ) : jsonConfig ? (
          <ResultTab config={JSON.parse(jsonConfig)} />
        ) : (
          <p className="text-gray-500">No config loaded yet.</p>
        )}
      </div>
    </div>
  );
};
