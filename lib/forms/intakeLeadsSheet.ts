/**
 * Best-effort intake tracking row to the Google Apps Script Leads endpoint.
 * Fires on every intake submit (success or MHGSYNC failure); must not block the form UI.
 */

import { getLeadsEndpointUrl } from './leadsEndpoint';
import { getCalBookUrlForLead } from '@/lib/cal';

export type IntakeLeadsRouting = {
  sheetName: 'webops_intake' | 'revops_intake';
  formSource: 'webops-intake' | 'revops-intake';
};

export type IntakeLeadsPayload = {
  formType: string;
  clientName: string;
  clientEmail: string;
  dashboardId?: string;
  dashboardUrl?: string;
  responsesRecorded: number;
  upsellSignals: number;
};

export function resolveIntakeLeadsRouting(pathname: string): IntakeLeadsRouting | null {
  const path = pathname || '';

  if (path.startsWith('/webops/intake') || path.startsWith('/webservices/intake')) {
    return { sheetName: 'webops_intake', formSource: 'webops-intake' };
  }

  if (path === '/intake' || path.startsWith('/intake/')) {
    return { sheetName: 'revops_intake', formSource: 'revops-intake' };
  }

  return null;
}

export async function submitIntakeToLeadsSheet(
  payload: IntakeLeadsPayload,
  pathname: string,
): Promise<void> {
  const endpointUrl = getLeadsEndpointUrl();
  if (!endpointUrl) return;

  const routing = resolveIntakeLeadsRouting(pathname);
  if (!routing) return;

  try {
    const params = new URLSearchParams({
      sheetName: routing.sheetName,
      formSource: routing.formSource,
      formType: payload.formType,
      clientName: payload.clientName,
      clientEmail: payload.clientEmail,
      pagePath: pathname,
      responsesRecorded: String(payload.responsesRecorded),
      upsellSignals: String(payload.upsellSignals),
      timestamp: new Date().toISOString(),
    });

    if (payload.dashboardId) params.append('dashboardId', payload.dashboardId);
    if (payload.dashboardUrl) params.append('dashboardUrl', payload.dashboardUrl);

    const calType = routing.formSource === 'webops-intake' ? 'webops' : 'revops';
    params.append('calBookUrl', getCalBookUrlForLead(calType));

    const url = `${endpointUrl}?${params.toString()}`;
    await fetch(url, { method: 'GET', mode: 'no-cors' });
  } catch (err) {
    console.warn('Intake leads sheet write failed:', err);
  }
}
