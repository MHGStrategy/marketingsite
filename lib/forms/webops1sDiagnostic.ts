export const CAL_LINK = 'https://cal.com/mhgstrategy/webops-discovery?overlayCalendar=true';

export type WebOps1sDiagnosticValues = {
  presence: string;
  pain: string;
  location: string;
  name: string;
  email: string;
  phone: string;
};

export async function submitWebOps1sDiagnostic(values: WebOps1sDiagnosticValues): Promise<void> {
  const endpointUrl = process.env.NEXT_PUBLIC_LEADS_WEBAPP_URL || '';
  const intakeUrl = process.env.NEXT_PUBLIC_MHGSYNC_INTAKE_URL || 'https://mhgsync.com/api/intake';

  const trimmed = {
    presence: values.presence.trim(),
    pain: values.pain.trim(),
    location: values.location.trim(),
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
  };

  const payload = {
    sheet: '1s CTA',
    timestamp: new Date().toISOString(),
    name: trimmed.name,
    email: trimmed.email,
    phone: trimmed.phone,
    location: trimmed.location,
    presence: trimmed.presence,
    pain: trimmed.pain,
    source: 'webops-1s',
  };

  try {
    if (endpointUrl) {
      await fetch(endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      });
    }
  } catch (err) {
    console.error('Apps Script submission failed:', err);
  }

  fetch(intakeUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formType: 'webops-1s-diagnostic',
      clientName: trimmed.name,
      clientEmail: trimmed.email,
      clientPhone: trimmed.phone,
      formData: {
        presence: trimmed.presence,
        pain: trimmed.pain,
        location: trimmed.location,
        source: '/webops/1s',
      },
    }),
  }).catch((err) => console.error('MHGSYNC intake submission failed:', err));

  const params = new URLSearchParams({
    name: trimmed.name,
    email: trimmed.email,
    notes: `Presence: ${trimmed.presence} | Pain: ${trimmed.pain} | Location: ${trimmed.location} | Phone: ${trimmed.phone}`,
  });

  window.location.href = `${CAL_LINK}?${params.toString()}`;
}
