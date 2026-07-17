'use client';

import { useCallback, useEffect, useState } from 'react';
import type { HtmlTab } from '@/lib/portfolio/multiEntityFpaContent';

type FpaHtmlTabViewerProps = {
  tabs: HtmlTab[];
  ariaLabel: string;
};

export default function FpaHtmlTabViewer({ tabs, ariaLabel }: FpaHtmlTabViewerProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? '');
  const [htmlByTab, setHtmlByTab] = useState<Record<string, string>>({});
  const [loadingTabId, setLoadingTabId] = useState<string | null>(null);
  const [errorByTab, setErrorByTab] = useState<Record<string, string>>({});

  const loadTab = useCallback(
    async (tab: HtmlTab) => {
      if (htmlByTab[tab.id] || loadingTabId === tab.id) {
        return;
      }

      setLoadingTabId(tab.id);
      try {
        const response = await fetch(tab.htmlPath);
        if (!response.ok) {
          throw new Error(`Failed to load ${tab.label}`);
        }
        const html = await response.text();
        setHtmlByTab((current) => ({ ...current, [tab.id]: html }));
        setErrorByTab((current) => {
          const next = { ...current };
          delete next[tab.id];
          return next;
        });
      } catch (error) {
        setErrorByTab((current) => ({
          ...current,
          [tab.id]: error instanceof Error ? error.message : 'Unable to load tab content.',
        }));
      } finally {
        setLoadingTabId(null);
      }
    },
    [htmlByTab, loadingTabId]
  );

  const handleSelectTab = async (tab: HtmlTab) => {
    setActiveTabId(tab.id);
    await loadTab(tab);
  };

  useEffect(() => {
    if (tabs[0]) {
      void handleSelectTab(tabs[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const activeHtml = activeTab ? htmlByTab[activeTab.id] : '';
  const activeError = activeTab ? errorByTab[activeTab.id] : undefined;
  const isLoading = activeTab ? loadingTabId === activeTab.id : false;

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                void handleSelectTab(tab);
              }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-primary-blue text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-blue/40'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 overflow-x-auto min-h-[320px]"
      >
        {!activeTab && <p className="text-gray-600">No tabs configured.</p>}
        {activeTab && !activeHtml && !isLoading && !activeError && (
          <p className="text-gray-600">Select a tab to load the static sheet preview.</p>
        )}
        {isLoading && <p className="text-gray-600">Loading {activeTab?.label}...</p>}
        {activeError && <p className="text-red-600">{activeError}</p>}
        {activeHtml && (
          <div
            className="fpa-html-viewer"
            dangerouslySetInnerHTML={{ __html: activeHtml }}
          />
        )}
      </div>
    </div>
  );
}
