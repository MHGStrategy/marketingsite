'use client';

import CTAButton from '@/components/CTAButton';
import FpaEmbedViewer from '@/components/portfolio/FpaEmbedViewer';
import Section from '@/components/Section';
import { fpaDownloadsEnabled, type FpaIndustry } from '@/lib/portfolio/multiEntityFpaContent';

const EMBED_ENV_HINTS: Record<FpaIndustry['id'], string> = {
  logistics: 'NEXT_PUBLIC_FPNA_EMBED_LOGISTICS_GL',
  insurance: 'NEXT_PUBLIC_FPNA_EMBED_INSURANCE_GL',
  manufacturing: 'NEXT_PUBLIC_FPNA_EMBED_MANUFACTURING_GL',
};

type FpaIndustryPanelProps = {
  industry: FpaIndustry;
};

export default function FpaIndustryPanel({ industry }: FpaIndustryPanelProps) {
  return (
    <div className="space-y-0">
      <Section bgColor="black" className="pt-0">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="rounded-2xl border border-primary-blue/30 bg-white px-6 py-5 md:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue mb-2">
              {industry.industryTag}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">{industry.subtitle}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
                Interactive preview
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                GL and Reporting Workbook (Excel Online)
              </h2>
              <p className="text-gray-300">
                Historical actuals, executive rollups, and lender views in the GL reporting workbook.
              </p>
            </div>
            <FpaEmbedViewer
              embedUrl={industry.glEmbedUrl}
              title={`${industry.label} GL and reporting workbook preview`}
              envVarHint={EMBED_ENV_HINTS[industry.id]}
              downloadsEnabled={fpaDownloadsEnabled}
            />
          </div>
        </div>
      </Section>

      {fpaDownloadsEnabled && (
        <Section bgColor="blue">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Download {industry.label} Workbook
            </h2>
            <p className="text-lg text-white/90">
              Open the full GL and Reporting workbook in desktop Excel for every tab, formula, and
              filter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <CTAButton href={industry.glDownloadHref} variant="primary">
                Download GL Workbook
              </CTAButton>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
