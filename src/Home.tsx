import { useState } from 'react';

import { TabSwitcher, Tab } from './components/TabSwitcher';
import { ConfigTab } from './components/ConfigTab';
import { ResultTab } from './components/ResultTab';

export const Home = () => {
  const [jsonConfig, setJsonConfig] = useState<string>(`{
    "title": "Sample Form",
    "fields": [
      { "type": "string", "label": "Name" }
    ],
    "buttons": [
      { "text": "Submit", "type": "submit" },
      { "text": "Cancel" }
    ]
  }`);
  const [activeTab, setActiveTab] = useState<Tab>('config');

  const handleApply = (config: string) => {
    setJsonConfig(config);
    setActiveTab('result');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Veeam Form Generator</h1>
      <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
      <div>
        {activeTab === 'config' ? (
          <ConfigTab value={jsonConfig} onChange={setJsonConfig} onApply={handleApply} />
        ) : jsonConfig ? (
          <ResultTab config={JSON.parse(jsonConfig)} />
        ) : (
          <p className="text-gray-500">No config loaded yet.</p>
        )}
      </div>
    </div>
  );
};
