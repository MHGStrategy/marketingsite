## Google Apps Script Leads Endpoint (writes to Google Sheets + sends emails)

This creates a simple HTTPS endpoint that your site POSTs to. It appends a row to the correct tab, sends internal notifications to **hello@mhgstrategy.com**, and sends offer-code emails to applicants.

Recommended: the client sends `sheetName` for forms that must go to a specific tab (e.g. Offers / Claimed). The script below will use `sheetName` first, then fall back to `formSource`.

- **Contact** — Engagement assessment form (`/contact/`) — production static export path
- **MHG_New_Leads** — Legacy contact and MHG Media forms
- **webops** — WebOps assessment form (`/webops/`)
- **revops** — RevOps and Managed Ops review forms (`/revops/`, `/managed-ops/`)
- **webops_intake** — Completed WebOps discovery intake (`/webops/intake/*`, `/webservices/intake/*`)
- **revops_intake** — Completed RevOps discovery intake (`/intake/`)
- **Offers** — Eligibility form (`/webops/offers`)
- **Claimed** — Claim offer form (`/webops/claimoffer`)

Use one spreadsheet that has all tabs. Production leads spreadsheet:

https://docs.google.com/spreadsheets/d/1PCzwNCJfhiI--EO4XrD5IigWo6JQg1Eqk3eBl9jQwEk/edit

The Apps Script project must be bound to **this** spreadsheet (Extensions → Apps Script from that file).

### Internal notifications

All staff-facing emails go to `hello@mhgstrategy.com` via the `NOTIFICATION_EMAIL` constant in [`apps-script/LeadsEndpoint/Code.gs`](apps-script/LeadsEndpoint/Code.gs).

| Form | Sheet tab | Internal email to Shaun | Other email |
|------|-----------|-------------------------|-------------|
| Engagement assessment (`/contact/`) | `Contact` | `New engagement assessment — …` | — |
| WebOps assessment (`/webops/`) | `webops` | `New WebOps assessment — …` | — |
| Contact (legacy) | `MHG_New_Leads` | `New lead — contact` | — |
| MHG Media | `MHG_New_Leads` | `New lead — mhgmedia` | — |
| RevOps review (`/revops/`) | `revops` | `New RevOps review — …` | — |
| Managed Ops review (`/managed-ops/`) | `revops` | `New Managed Ops review — …` | — |
| WebOps intake (`/webops/intake/*`, `/webservices/intake/*`) | `webops_intake` | `New WebOps intake — …` | Thank-you + booking link (`replyTo`: hello@mhgstrategy.com) |
| RevOps intake (`/intake/`) | `revops_intake` | `New RevOps intake — …` | Thank-you + booking link (`replyTo`: hello@mhgstrategy.com) |
| Offers eligibility | `Offers` | `New offers eligibility — qualified/not qualified` | Applicant receives offer code (`replyTo`: hello@mhgstrategy.com) |
| Claim offer | `Claimed` | `New Offer Claim Request` | — |

Engagement assessment uses the Apps Script path in **both local dev and production**. Local dev routes through `POST /api/forms/submit/` (server-side Apps Script GET); production static export uses a direct browser GET. See [`lib/forms/TROUBLESHOOTING.md`](lib/forms/TROUBLESHOOTING.md).

### 1) Create the Apps Script project

- Open the [production leads spreadsheet](https://docs.google.com/spreadsheets/d/1PCzwNCJfhiI--EO4XrD5IigWo6JQg1Eqk3eBl9jQwEk/edit) (must have `webops` and `revops` tabs).
- Go to **Extensions → Apps Script**
- Create a new file `Code.gs` and paste the code below.

### 2) Code (`Code.gs`)

Copy the full script from [`apps-script/LeadsEndpoint/Code.gs`](apps-script/LeadsEndpoint/Code.gs) into your Apps Script project. That file is the canonical source and includes:

- `NOTIFICATION_EMAIL = 'hello@mhgstrategy.com'`
- `sendLeadNotification_()` — contact and MHG Media submissions
- `sendWebOpsNotification_()` — WebOps assessment submissions
- `sendWebOpsIntakeNotification_()` / `sendRevOpsIntakeNotification_()` — completed discovery intake submissions
- `sendWebOpsIntakeConfirmation_()` / `sendRevOpsIntakeConfirmation_()` — client thank-you + booking link after intake
- `sendOffersInternalNotification_()` — offers eligibility summaries
- `sendClaimNotification_()` — claim submissions
- Offer-code emails to applicants with `replyTo: hello@mhgstrategy.com`

Do not paste an older inline snippet from this doc; use the repo file so notifications and sheet columns stay in sync.

**Offers tab header row** (Eligibility submissions, labels-only):  
`Submitted At` | `Page/Tab` | `Email` | `Project Description` | `Primary Goal` | `Time Frame` | `Qualified` | `Offer Code` | `Offer Type` | `Offer Expires At` | `Email Sent At` | `Email Status` | `Email Error` | `Email Template Version`

**Claimed tab header row** (Claim submissions):  
`Submitted At` | `Form Source` | `Offer Code` | `Name` | `Phone` | `Best time to call` | `Business details` | `Offer Type`

**Contact tab header row** (Engagement assessment — `/contact/`):  
`Timestamp` | `Company Name` | `Your Name` | `Email` | `Phone` | `Website` | `Industry` | `Current Finance Systems` | `Primary Challenge` | `Organization Size` | `When are you looking to begin?` | `How can we help?`

**MHG_New_Leads header row** (Legacy contact + MHG Media):  
`Submitted At` | `Form Source` | `Company Name` | `Name` | `Email` | `Phone` | `Website` | `Industry` | `Message`

**webops tab header row** (`/webops/` assessment):  
`Timestamp` | `Form Source` | `Full Name` | `Email` | `Website URL` | `Phone` | `Message` | `Industry`

**revops tab header row** (`/revops/` and `/managed-ops/` — both write here; `Form Source` distinguishes them):  
`Timestamp` | `Form Source` | `Full Name` | `Work Email` | `Company Name` | `Role` | `Biggest Revenue Challenge` | `Phone`

**webops_intake tab header row** (Completed WebOps discovery intake — `/webops/intake/*`, `/webservices/intake/*`):  
`Timestamp` | `Form Source` | `Form Type` | `Client Name` | `Client Email` | `Dashboard ID` | `Dashboard URL` | `Page Path` | `Responses Recorded` | `Upsell Signals`

**revops_intake tab header row** (Completed RevOps discovery intake — `/intake/`):  
`Timestamp` | `Form Source` | `Form Type` | `Client Name` | `Client Email` | `Dashboard ID` | `Dashboard URL` | `Page Path` | `Responses Recorded` | `Upsell Signals`

Tabs are auto-created on first submission via `ensureSheetWithHeaders_()`.

### 3) Deploy as a Web App

- Click **Deploy → New deployment**
- Select **Web app**
- **Execute as**: Me
- **Who has access**: Anyone
- Deploy, then copy the **Web app URL**

### 3b) Authorize Gmail (required — one-time per Apps Script project)

**If rows appear in the spreadsheet but no emails are sent**, Gmail is almost certainly not authorized on this Apps Script project. Sheet writes do not need Gmail; emails do.

Because the Web App runs headlessly, Gmail permissions must be granted from the Apps Script editor once:

1. In Apps Script, enable the manifest if needed: **Project Settings** (gear) → check **Show "appsscript.json" manifest file in editor"** → open `appsscript.json` and ensure `gmail.send` is in `oauthScopes` (see `apps-script/LeadsEndpoint/appsscript.json` in the repo).
2. Select **`authorizeGmailScopeOnly`** from the function dropdown → **Run** → approve permissions when prompted.
3. If that succeeds, select **`authorizeGmailSend`** → **Run** → approve if prompted again.
4. Check your inbox (the Google account running the script) for the test email.

**If Run shows "An unknown error has occurred":**

- Open **Executions** (clock icon, left sidebar) → click the failed run → read the full error (the execution log bar often hides it).
- Use **Chrome** with pop-ups allowed for `script.google.com`.
- Sign out of extra Google accounts or use an incognito window with only the spreadsheet owner account.
- **Project Settings** → **Google Cloud Platform (GCP) Project** → if misconfigured, choose **Change project** → **Default**.
- Wait 2–3 minutes and try again (Google transient errors are common).

**Verify from Terminal** (after redeploying with the latest `Code.gs`):

**Verify from Terminal** (after redeploying with the latest `Code.gs`):

```bash
curl -sL "YOUR_WEB_APP_URL?testGmail=1"
```

Expected response when Gmail works:

```json
{"ok":true,"version":"leads-endpoint-2026-06-24-intake-client-email-v1","emailTest":{"ok":true}}
```

If `emailTest.ok` is `false`, check the **`Email_Errors`** tab in your spreadsheet for the error message.

### 3c) Client confirmation emails

After Gmail is authorized, the script sends:

| Form | Internal email (to hello@mhgstrategy.com) | Client email (to submitter) |
|------|-------------------------------------------|-----------------------------|
| WebOps | `New WebOps assessment — …` | Next steps with intake + booking links |
| RevOps / Managed Ops | `New RevOps review — …` / `New Managed Ops review — …` | Next steps with booking + intake links |
| WebOps intake (completed) | — | Thank-you + discovery call booking link |
| RevOps intake (completed) | — | Thank-you + review call booking link |

MHGSYNC continues to send the personalized dashboard email separately; the intake confirmation above focuses on thanking the client and nudging them to book if they have not already.

### 4) Redeploy after code changes

When you update `Code.gs` in the repo:

1. Paste the updated script into the Apps Script editor (or sync your project)
2. **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**
3. Keep the same Web App URL — no `.env.local` change needed
4. Run **`authorizeGmailSend`** again if Gmail scopes changed

### 5) End-to-end test checklist

After redeploying, submit a test on each form and confirm Shaun receives the internal email plus the sheet row updates:

| Route | Expected internal email subject | Expected sheet tab |
|-------|--------------------------------|--------------------|
| `/contact/` (engagement) | `New engagement assessment — …` | `Contact` |
| `/webops/` | `New WebOps assessment — …` | `webops` |
| `/revops/` | `New RevOps review — …` | `revops` |
| `/managed-ops/` | `New Managed Ops review — …` | `revops` |
| `/mhgmedia/` | `New lead — mhgmedia` | `MHG_New_Leads` |
| `/webops/offers/` | `New offers eligibility — …` | `Offers` (+ applicant offer email) |
| `/webops/claimoffer/` | `New Offer Claim Request` | `Claimed` |
| `/webops/intake/<vertical>/` | `New WebOps intake — …` | `webops_intake` |
| `/intake/` | `New RevOps intake — …` | `revops_intake` |

**Intake leads smoke test** (after redeploy; replace `YOUR_WEB_APP_URL`):

```bash
node scripts/betatest-intake-leads.mjs
```

Or curl one tab:

```bash
curl -sL "YOUR_WEB_APP_URL?sheetName=webops_intake&formSource=webops-intake&formType=general-business&clientName=BETATEST-curl&clientEmail=shaun@mhgstrategy.com&dashboardId=12345&dashboardUrl=https://sync.mhgstrategy.com/dashboard/general-business/12345&pagePath=/webops/intake/general-business/&responsesRecorded=12&upsellSignals=3&timestamp=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
```

### 6) Add env vars to your Next export build

**Local dev** (uses server proxy with live Google Forms fbzx):

```bash
NEXT_PUBLIC_GOOGLE_FORM_ENGAGEMENT_URL="https://docs.google.com/forms/d/e/…/formResponse"
NEXT_PUBLIC_LEADS_WEBAPP_URL="https://script.google.com/macros/s/…/exec"
# entry IDs in .env.local — fbzx env var is NOT used by the proxy path
```

**Production static export** (uses Apps Script Leads endpoint only):

```bash
NEXT_PUBLIC_ENGAGEMENT_SUBMIT_VIA_LEADS_ONLY=true
NEXT_PUBLIC_LEADS_WEBAPP_URL="https://script.google.com/macros/s/…/exec"
```

Redeploy [`apps-script/LeadsEndpoint/Code.gs`](apps-script/LeadsEndpoint/Code.gs) before going live. See [`lib/forms/TROUBLESHOOTING.md`](lib/forms/TROUBLESHOOTING.md) if rows show timestamp-only.

### Notes

- Your static site will POST with `no-cors`, so we can’t read the response — but the sheet will update if the endpoint is correct.
- This avoids any Next.js API route and avoids exposing Google service account keys in the browser.

