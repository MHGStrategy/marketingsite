/**
 * Optional Leads endpoint submission (Google Apps Script Web App).
 *
 * Used for production static export where /api/forms/submit/ is unavailable.
 * Submits via GET to avoid popup/iframe issues with Apps Script redirects.
 */

import { FormConfig, FormValues } from './types';

export function getLeadsEndpointUrl(): string {
  return process.env.NEXT_PUBLIC_LEADS_WEBAPP_URL || '';
}

export async function submitToLeadsEndpoint(values: FormValues, config: FormConfig): Promise<void> {
  const endpointUrl = getLeadsEndpointUrl();
  if (!endpointUrl) return;

  const body = new URLSearchParams();
  body.append('submittedAt', new Date().toISOString());
  body.append('formSource', config.id);
  if (config.leadsSheetName) body.append('sheetName', config.leadsSheetName);

  for (const [k, v] of Object.entries(values)) {
    if (typeof v === 'string') body.append(k, v.trim());
  }

  const url = `${endpointUrl}?${body.toString()}`;
  await fetch(url, { method: 'GET', mode: 'no-cors' });
}
