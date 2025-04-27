import { useState } from 'react';

import { TabSwitcher, Tab } from './components/TabSwitcher';
import { ConfigTab } from './components/TabConfig';

export const Home = () => {
  const [activeTab, setActiveTab] = useState<Tab>('config');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Veeam Form Generator</h1>
      <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
      <div>
        {activeTab === 'config' ? (
          <ConfigTab onApply={(jsonConfig: string) => console.log('json', jsonConfig)} />
        ) : (
          <div className="p-4 bg-gray-100 rounded">Result Tab</div>
        )}
      </div>
    </div>
  );
};
