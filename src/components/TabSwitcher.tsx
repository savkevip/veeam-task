import { twMerge } from 'tailwind-merge';

export type Tab = 'config' | 'result';

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const TabSwitcher = ({ activeTab, onTabChange }: Props) => {
  const tabs: Tab[] = ['config', 'result'];

  return (
    <div className="flex border-b mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={twMerge(
            'px-4 py-2 text-gray-500 cursor-pointer',
            activeTab === tab && 'border-b-2 border-blue-500 font-semibold text-blue-500'
          )}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};
