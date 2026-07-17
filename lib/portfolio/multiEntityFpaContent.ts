export type HtmlTab = {
  id: string;
  label: string;
  htmlPath: string;
};

export type SheetMapEntry = {
  name: string;
  description: string;
};

export type FpaIndustryId = 'logistics' | 'insurance' | 'manufacturing';

export type FpaIndustry = {
  id: FpaIndustryId;
  label: string;
  industryTag: string;
  subtitle: string;
  planningEmbedUrl: string;
  glEmbedUrl: string;
  planningDownloadHref: string;
  glDownloadHref: string;
  planningHtmlTabs: HtmlTab[];
  glHtmlTabs: HtmlTab[];
  planningSheetMap: SheetMapEntry[];
  glSheetMap: SheetMapEntry[];
  technicalNotes: string[];
};

const PLANNING_TAB_DEFS = [
  { id: 'specs', label: 'Specs', file: 'specs.html' },
  { id: 'drivers', label: 'Drivers', file: 'drivers.html' },
  { id: 'headcount-plan', label: 'Headcount Plan', file: 'headcount-plan.html' },
  { id: 'assumptions', label: 'Assumptions', file: 'assumptions.html' },
  { id: 'covenants', label: 'Covenants', file: 'covenants.html' },
  { id: 'exec-summary', label: 'Exec Summary', file: 'exec-summary.html' },
  { id: 'bva', label: 'BvA', file: 'bva.html' },
  { id: 'forecast-pnl', label: 'Forecast P&L', file: 'forecast-pnl.html' },
] as const;

const GL_TAB_DEFS = [
  { id: 'exec-rollup', label: 'Exec Rollup', file: 'exec-rollup.html' },
  { id: 'banking-view', label: 'Banking View', file: 'banking-view.html' },
  {
    id: 'mgmt-income-stmt-monthly',
    label: 'Mgmt Income Stmt Monthly',
    file: 'mgmt-income-stmt-monthly.html',
  },
] as const;

function buildHtmlTabs(
  industryId: FpaIndustryId,
  workbook: 'planning' | 'gl',
  defs: readonly { id: string; label: string; file: string }[]
): HtmlTab[] {
  return defs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    htmlPath: `/portfolio/multi-entity-fpa/${industryId}/${workbook}/${tab.file}`,
  }));
}

function getEmbedUrl(industryId: FpaIndustryId, workbook: 'planning' | 'gl'): string {
  const keys: Record<FpaIndustryId, { planning: string; gl: string }> = {
    logistics: {
      planning: process.env.NEXT_PUBLIC_FPNA_EMBED_LOGISTICS_PLANNING ?? '',
      gl: process.env.NEXT_PUBLIC_FPNA_EMBED_LOGISTICS_GL ?? '',
    },
    insurance: {
      planning: process.env.NEXT_PUBLIC_FPNA_EMBED_INSURANCE_PLANNING ?? '',
      gl: process.env.NEXT_PUBLIC_FPNA_EMBED_INSURANCE_GL ?? '',
    },
    manufacturing: {
      planning: process.env.NEXT_PUBLIC_FPNA_EMBED_MANUFACTURING_PLANNING ?? '',
      gl: process.env.NEXT_PUBLIC_FPNA_EMBED_MANUFACTURING_GL ?? '',
    },
  };
  return configureEmbedUrl(keys[industryId][workbook]);
}

const sharedPlanningSheetMap: SheetMapEntry[] = [
  { name: 'README', description: 'Model version header, color legend, recommended review order' },
  {
    name: 'Specs',
    description: 'Entity, location, period, and forecast year filters that drive all actuals and summary tabs',
  },
  {
    name: 'Assumptions',
    description: 'Scenario toggle, probability weights, growth rates, OpEx drivers, seasonality, cash params',
  },
  { name: 'Drivers', description: 'Industry ops drivers for forward revenue and cost modeling' },
  {
    name: 'Headcount_Plan',
    description: 'FTE by department x fully loaded cost; feeds Forecast_PnL payroll',
  },
  {
    name: 'Actuals_Monthly',
    description: 'Monthly P&L via SUMPRODUCT/SUMIFS to embedded GL_Data',
  },
  {
    name: 'Actuals_OpEx_Detail',
    description: 'Monthly OpEx by segment; SUMPRODUCT to embedded GL_Data',
  },
  { name: 'Forecast_PnL', description: 'Driver-based forward P&L (24 months)' },
  { name: 'Annual_Budget', description: 'Annual budget with monthly phasing' },
  { name: 'BvA', description: 'Budget vs Actual at executive and line level' },
  { name: 'BvA_Detail', description: 'Budget vs Actual for top GL accounts by spend' },
  {
    name: 'Rolling_Forecast',
    description: 'Rolling view: prior-year actuals plus forward forecast rows',
  },
  {
    name: 'Sensitivity',
    description: 'One-variable sensitivity tables for revenue growth, GM%, and OpEx growth vs EBITDA',
  },
  {
    name: 'Cash_Summary',
    description: 'Indirect cash flow: EBITDA, working capital, capex, runway',
  },
  {
    name: 'Capex_Schedule',
    description: 'Asset-class capex, depreciation, ending NBV; feeds Balance_Sheet and Covenants',
  },
  {
    name: 'Debt_Schedule',
    description: 'Term loan balance, interest, principal; feeds Balance_Sheet, Covenants, Forecast_PnL',
  },
  {
    name: 'Balance_Sheet',
    description: 'Linked 3-statement proxy: PP&E from Capex_Schedule, LTD from Debt_Schedule',
  },
  {
    name: 'Covenants',
    description: 'Leverage, fixed charge coverage, liquidity, capex limits with headroom indicators',
  },
  {
    name: 'Exec_Summary',
    description: 'Leadership dashboard: actuals KPIs, BvA snapshot, forecast vs budget, scenarios, valuation',
  },
  {
    name: 'Benchmarks',
    description: 'Sector peer benchmarks vs model actuals',
  },
  {
    name: 'Valuation',
    description: 'DCF model, EV/EBITDA comparable analysis, NPV/IRR capital budgeting tool',
  },
  {
    name: 'Volume_Price_Mix',
    description: 'YoY revenue bridge: volume, rate, and mix effects',
  },
  {
    name: 'Forecast_Accuracy',
    description: 'Prior forecast vs actual error and bias',
  },
  {
    name: 'GL_Itemization_Map',
    description: 'Reference chart of accounts with section, segment, and line mapping',
  },
  { name: 'Changelog', description: 'Version history with date, description, and sheets affected' },
];

const sharedGlSheetMap: SheetMapEntry[] = [
  { name: 'Specs', description: 'Reporting filters for entity, location, and period' },
  { name: 'Exec_Rollup', description: 'Executive P&L rollup with reconciliation checks' },
  { name: 'Mgmt_Income_Stmt', description: 'Management income statement by line or segment' },
  {
    name: 'Mgmt_Income_Stmt_Monthly',
    description: 'Monthly management income statement with period controls',
  },
  { name: 'YoY_Variance', description: 'Year-over-year variance analysis' },
  { name: 'Mgmt_by_Locations', description: 'Management view by operating location' },
  { name: 'Geography_Matrix', description: 'Geographic revenue and margin matrix' },
  { name: 'Banking_View', description: 'Lender-oriented reporting view' },
  { name: 'GL_Data', description: 'Embedded GL detail (29K-33K rows) for self-contained reporting' },
  { name: 'GL_Mapping', description: 'Chart of accounts mapping and classification' },
];

export const fpaPageContent = {
  slug: 'multi-entity-fpa-model',
  title: 'Multi-industry GL and reporting models',
  subtitle:
    'Cross-industry FP&A reporting stacks for logistics, insurance, and semiconductor manufacturing. Each industry shows historical GL actuals, executive rollups, banking views, and management P&L.',
  tags: ['FP&A', 'Excel', 'Multi-industry', 'GL Reporting'],
  disclaimer:
    'Sample fictitious data for portfolio demonstration. Company names are design-lab workbooks built to show repeatable reporting architecture across industries.',
} as const;

export const fpaIndustryIds: FpaIndustryId[] = ['logistics', 'insurance', 'manufacturing'];

/** Shown in the portfolio industry switcher (omit ids here to hide temporarily). */
export const fpaVisibleIndustryIds: FpaIndustryId[] = ['logistics', 'insurance', 'manufacturing'];

/** When false, portfolio hides workbook download buttons and related copy. */
export const fpaDownloadsEnabled = false;

function configureEmbedUrl(url: string): string {
  if (!url) return url;

  try {
    const parsed = new URL(url);
    parsed.searchParams.set('wdDownloadButton', fpaDownloadsEnabled ? 'True' : 'False');
    return parsed.toString();
  } catch {
    return url.replace(
      /wdDownloadButton=(True|False)/i,
      `wdDownloadButton=${fpaDownloadsEnabled ? 'True' : 'False'}`
    );
  }
}

export const fpaIndustries: FpaIndustry[] = [
  {
    id: 'logistics',
    label: 'Logistics',
    industryTag: '3PL / Logistics',
    subtitle:
      'Multi-entity logistics FP&A with volume x rate ops drivers, service-line revenue, embedded GL actuals, and lender covenant monitoring.',
    planningEmbedUrl: getEmbedUrl('logistics', 'planning'),
    glEmbedUrl: getEmbedUrl('logistics', 'gl'),
    planningDownloadHref: '/downloads/multi-entity-fpa-logistics-planning-sample.xlsx',
    glDownloadHref: '/downloads/multi-entity-fpa-logistics-gl-reporting-sample.xlsx',
    planningHtmlTabs: buildHtmlTabs('logistics', 'planning', PLANNING_TAB_DEFS),
    glHtmlTabs: buildHtmlTabs('logistics', 'gl', GL_TAB_DEFS),
    planningSheetMap: sharedPlanningSheetMap.map((entry) =>
      entry.name === 'Drivers'
        ? {
            ...entry,
            description:
              'Volume x rate by service line for FY2026-2027 (24 months); ties to truckload, airfreight, and warehouse lines',
          }
        : entry.name === 'Benchmarks'
          ? {
              ...entry,
              description:
                '3PL sector peer benchmarks (Cowen/CSCMP) vs model actuals: GP%, Op Margin, DSO, Revenue/FTE',
            }
          : entry
    ),
    glSheetMap: sharedGlSheetMap,
    technicalNotes: [
      'Volume x rate ops drivers feed revenue and ops-linked headcount across service lines.',
      'Embedded GL_Data (32K+ rows) keeps the planning workbook self-contained with no external links.',
      'Linked Capex, Debt, Balance Sheet, and Covenants tabs form a 3-statement chain.',
      'Probability-weighted scenarios on Assumptions roll through Exec_Summary and covenant headroom.',
      'Generated and validated via publish_summit.py with audit and beta test gates.',
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    industryTag: 'P&C + Life + Group Carrier',
    subtitle:
      'Regional carrier FP&A with premium and policy drivers, loss-ratio modeling, embedded GL actuals, and probability-weighted scenarios.',
    planningEmbedUrl: getEmbedUrl('insurance', 'planning'),
    glEmbedUrl: getEmbedUrl('insurance', 'gl'),
    planningDownloadHref: '/downloads/multi-entity-fpa-insurance-planning-sample.xlsx',
    glDownloadHref: '/downloads/multi-entity-fpa-insurance-gl-reporting-sample.xlsx',
    planningHtmlTabs: buildHtmlTabs('insurance', 'planning', PLANNING_TAB_DEFS),
    glHtmlTabs: buildHtmlTabs('insurance', 'gl', GL_TAB_DEFS),
    planningSheetMap: sharedPlanningSheetMap.map((entry) =>
      entry.name === 'Drivers'
        ? {
            ...entry,
            description:
              'Premium, policy count, and loss-ratio drivers by line (P&C, Life, Group) for forward revenue and claims modeling',
          }
        : entry.name === 'Benchmarks'
          ? {
              ...entry,
              description:
                'Insurance sector benchmarks vs model actuals: combined ratio, loss ratio, expense ratio, ROE',
            }
          : entry
    ),
    glSheetMap: sharedGlSheetMap,
    technicalNotes: [
      'Premium and policy drivers feed revenue, claims, and commission modeling by product line.',
      'Embedded GL_Data supports multi-entity carrier reporting without external workbook links.',
      'Scenario weights on Assumptions drive prob-weighted forecasts and covenant headroom.',
      'GL reporting workbook provides executive rollups, banking views, and monthly management P&L.',
      'Built with the same 25-tab planning + GL reporting architecture used across industries.',
    ],
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    industryTag: 'Fabless Semiconductor',
    subtitle:
      'Fabless semiconductor FP&A with unit and ASP drivers, fab-lite cost structure, embedded GL actuals, and capex/debt linkage.',
    planningEmbedUrl: getEmbedUrl('manufacturing', 'planning'),
    glEmbedUrl: getEmbedUrl('manufacturing', 'gl'),
    planningDownloadHref: '/downloads/multi-entity-fpa-manufacturing-planning-sample.xlsx',
    glDownloadHref: '/downloads/multi-entity-fpa-manufacturing-gl-reporting-sample.xlsx',
    planningHtmlTabs: buildHtmlTabs('manufacturing', 'planning', PLANNING_TAB_DEFS),
    glHtmlTabs: buildHtmlTabs('manufacturing', 'gl', GL_TAB_DEFS),
    planningSheetMap: sharedPlanningSheetMap.map((entry) =>
      entry.name === 'Drivers'
        ? {
            ...entry,
            description:
              'Unit volume x ASP drivers by product family (dev kits, production silicon, eval units) for forward revenue',
          }
        : entry.name === 'Benchmarks'
          ? {
              ...entry,
              description:
                'Semiconductor sector benchmarks vs model actuals: GM%, R&D intensity, inventory turns, revenue/FTE',
            }
          : entry
    ),
    glSheetMap: [
      { name: 'Specs', description: 'Reporting filters for entity, location, and period' },
      {
        name: 'Assumptions',
        description: 'GL-side assumption documentation and reporting parameters',
      },
      ...sharedGlSheetMap.slice(1),
    ],
    technicalNotes: [
      'Unit volume and ASP drivers feed revenue across dev kits, production silicon, and eval units.',
      'Embedded GL_Data supports fabless manufacturing reporting without external workbook links.',
      'Capex and debt schedules link through Balance Sheet and covenant monitoring tabs.',
      'GL workbook includes Assumptions documentation alongside executive and banking views.',
      'Same planning architecture as logistics and insurance, adapted for semiconductor cost structure.',
    ],
  },
];

export const fpaVisibleIndustries: FpaIndustry[] = fpaIndustries.filter((industry) =>
  fpaVisibleIndustryIds.includes(industry.id)
);

export function getFpaIndustry(id: FpaIndustryId): FpaIndustry | undefined {
  return fpaIndustries.find((industry) => industry.id === id);
}

export function isFpaIndustryId(value: string | null | undefined): value is FpaIndustryId {
  return value === 'logistics' || value === 'insurance' || value === 'manufacturing';
}

/** @deprecated Use fpaPageContent and fpaIndustries instead */
export const multiEntityFpaContent = fpaPageContent;
