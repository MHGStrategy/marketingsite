# Form System Documentation

This is a centralized, reusable form system for Google Forms integration.

> **Troubleshooting:** If submissions fail silently, show timestamp-only rows, or curl works but the local site does not, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).

## Architecture

- **`types.ts`**: TypeScript types for form configuration
- **`config.ts`**: Centralized form configurations
- **`googleForm.ts`**: Validation utilities (browser direct POST is disabled — see TROUBLESHOOTING.md)
- **`serverGoogleFormSubmit.ts`**: Server-side Google Forms POST with live fbzx (dev API route)
- **`serverLeadsSubmit.ts`**: Server-side Apps Script GET submission (dev API route, leads-only forms)
- **`formSubmitProxy.ts`**: Client wrapper for `/api/forms/submit/`
- **`leadsEndpoint.ts`**: Production Apps Script submission (static export)
- **`../hooks/useGoogleForm.ts`**: React hook for form state management
- **`../components/forms/ContactForm.tsx`**: Reusable form component
- **`../components/forms/FormField.tsx`**: Reusable field component

## How to Add a New Form

### Step 1: Create Form Configuration

Add a new configuration in `lib/forms/config.ts`:

```typescript
export const myNewFormConfig: FormConfig = {
  id: 'mynewform', // Unique identifier
  googleFormUrl: process.env.NEXT_PUBLIC_GOOGLE_FORM_MYNEWFORM_URL || '',
  fieldMapping: {
    // Map form field names to Google Forms entry IDs
    companyName: process.env.NEXT_PUBLIC_GOOGLE_FORM_MYNEWFORM_ENTRY_COMPANY_NAME || 'entry.0',
    email: process.env.NEXT_PUBLIC_GOOGLE_FORM_MYNEWFORM_ENTRY_EMAIL || 'entry.1',
    // ... more fields
  },
  fields: [
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      required: true,
      placeholder: 'Your company',
      gridCols: 2, // 1 or 2 columns on desktop
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'your.email@example.com',
      gridCols: 2,
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
      placeholder: 'Your message...',
      gridCols: 1, // Full width
    },
  ],
};
```

### Step 2: Use in Your Page

Import and use the `ContactForm` component:

```tsx
'use client';

import ContactForm from '@/components/forms/ContactForm';
import { myNewFormConfig } from '@/lib/forms/config';

export default function MyPage() {
  return (
    <div>
      <ContactForm 
        config={myNewFormConfig} 
        variant="light" // or "dark"
      />
    </div>
  );
}
```

### Step 3: Set Environment Variables

Add to your `.env.local` (or hosting environment):

```bash
NEXT_PUBLIC_GOOGLE_FORM_MYNEWFORM_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
NEXT_PUBLIC_GOOGLE_FORM_MYNEWFORM_ENTRY_COMPANY_NAME=entry.855603966
NEXT_PUBLIC_GOOGLE_FORM_MYNEWFORM_ENTRY_EMAIL=entry.246791862
# ... more entry IDs
```

### Engagement assessment form (`/contact/`)

This form uses the **Apps Script Leads endpoint** (not Google Forms). Required env vars:

```bash
NEXT_PUBLIC_LEADS_WEBAPP_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
NEXT_PUBLIC_ENGAGEMENT_SUBMIT_VIA_LEADS_ONLY=true
```

- **Local dev:** submissions go through `POST /api/forms/submit/` → server-side Apps Script GET
- **Production (static export):** browser GET directly to Apps Script
- **Apps Script:** redeploy [`apps-script/LeadsEndpoint/Code.gs`](../../apps-script/LeadsEndpoint/Code.gs) after changes

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for the full debug runbook.

### Offers Form (February campaign callback)

The Offers form posts to your **existing Leads system** (Apps Script Web App). It uses `NEXT_PUBLIC_LEADS_WEBAPP_URL` and does **not** require a Google Form. The Apps Script writes to the **Offers** tab of your spreadsheet — see [APPS_SCRIPT_LEADS_ENDPOINT.md](../../APPS_SCRIPT_LEADS_ENDPOINT.md).

Optional: if you also want submissions in Google Forms, create a form and set:

```bash
NEXT_PUBLIC_GOOGLE_FORM_OFFERS_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
NEXT_PUBLIC_GOOGLE_FORM_OFFERS_ENTRY_NAME=entry.XXXXX
NEXT_PUBLIC_GOOGLE_FORM_OFFERS_ENTRY_EMAIL=entry.XXXXX
NEXT_PUBLIC_GOOGLE_FORM_OFFERS_ENTRY_PHONE=entry.XXXXX
NEXT_PUBLIC_GOOGLE_FORM_OFFERS_ENTRY_BEST_TIME=entry.XXXXX
NEXT_PUBLIC_GOOGLE_FORM_OFFERS_ENTRY_SITE_TYPE=entry.XXXXX
NEXT_PUBLIC_GOOGLE_FORM_OFFERS_ENTRY_COMPANY=entry.XXXXX
NEXT_PUBLIC_GOOGLE_FORM_OFFERS_ENTRY_MESSAGE=entry.XXXXX
```

## Field Types

- `text`: Standard text input (use instead of `url` to avoid browser validation issues)
- `email`: Email input with validation
- `tel`: Phone number input
- `textarea`: Multi-line text input

## Validation

- Required fields are automatically validated
- Email format is validated if the email field is required
- Validation errors are displayed to users

## Styling

The `ContactForm` component supports two variants:
- `variant="light"`: White background, dark text
- `variant="dark"`: Dark background, light text

## Benefits

✅ **No Code Duplication**: All forms share the same logic
✅ **Type Safety**: Full TypeScript support
✅ **Easy to Maintain**: Change validation or submission in one place
✅ **Consistent UX**: All forms behave the same way
✅ **No Debug Code**: Production-ready, clean code
