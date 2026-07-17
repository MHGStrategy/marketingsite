import { aiReadyDataContent } from '@/lib/insights/content/aiReadyData';
import { defineTheWorkloadContent } from '@/lib/insights/content/defineTheWorkload';
import { excelToSaasContent } from '@/lib/insights/content/excelToSaas';
import { fractionalRevenueOperationsContent } from '@/lib/insights/content/fractionalRevenueOperations';
import { whyYourSalesPipelineLeaksContent } from '@/lib/insights/content/whyYourSalesPipelineLeaks';
import type { InsightArticleContent } from '@/lib/insights/types';

export const prosePosts: Record<string, InsightArticleContent> = {
  'why-your-sales-pipeline-leaks': whyYourSalesPipelineLeaksContent,
  'fractional-revenue-operations': fractionalRevenueOperationsContent,
  'define-the-workload': defineTheWorkloadContent,
  'ai-ready-data': aiReadyDataContent,
  'excel-to-saas': excelToSaasContent,
};

export function getProsePostContent(slug: string): InsightArticleContent | undefined {
  return prosePosts[slug];
}
