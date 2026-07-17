var NOTIFICATION_EMAIL = 'hello@mhgstrategy.com';
var SITE_BASE_URL = 'https://www.mhgstrategy.com';
var LEADS_ENDPOINT_VERSION = 'leads-endpoint-2026-07-16-webops-1s-gmail-v1';

// Cal.com booking links — keep in sync with NEXT_PUBLIC_CAL_* in .env.local
var CAL_WEBOPS_BOOKING_URL = 'https://cal.com/mhgstrategy/webops-discovery';
var CAL_REVOPS_BOOKING_URL = 'https://cal.com/mhgstrategy/revops-review';
var CAL_MANAGED_OPS_BOOKING_URL = 'https://cal.com/mhgstrategy/scrum-call';

var SIGNATURE_PHONE_DISPLAY = '925.290.8604';
var SIGNATURE_PHONE_TEL = '9252908604';

function doGet(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  if (p.testGmail === '1') {
    var testResult = sendEmailSafely_(
      NOTIFICATION_EMAIL,
      'MHG Strategy — Gmail send test',
      'If you received this, Gmail is authorized for the leads endpoint.',
      {}
    );
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: testResult.ok,
        version: LEADS_ENDPOINT_VERSION,
        emailTest: testResult,
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  if (p.formSource || p.sheetName) {
    return doPost({ parameter: p });
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      ok: true,
      version: LEADS_ENDPOINT_VERSION,
      now: new Date().toISOString(),
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var p = parseRequestPayload_(e);

    if ((p.sheet || '').toString() === '1s CTA') {
      return handleWebOps1sCta_(p);
    }

    var submittedAt = p.submittedAt ? new Date(p.submittedAt) : new Date();
    var formSource = (p.formSource || 'unknown').toString();
    var sheetName = (p.sheetName || '').toString();
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (sheetName === 'Contact' || formSource === 'engagement-assessment') {
      var contactSheet = ensureSheetWithHeaders_(ss, 'Contact', getEngagementContactHeaders_());
      var contactRow = [
        submittedAt,
        (p.companyName || '').toString(),
        (p.primaryContactName || '').toString(),
        (p.email || '').toString(),
        (p.phone || '').toString(),
        (p.website || '').toString(),
        (p.industry || '').toString(),
        (p.financeSystems || '').toString(),
        (p.primaryChallenge || '').toString(),
        (p.organizationSize || '').toString(),
        (p.urgency || '').toString(),
        (p.message || '').toString(),
      ];
      contactSheet.appendRow(contactRow);
      sendEngagementNotification_(p, submittedAt);
    } else if (isWebOpsSheet_(sheetName, formSource)) {
      var webOpsSheet = ensureSheetWithHeaders_(ss, 'webops', getWebOpsLeadsHeaders_());
      var webOpsRow = [
        (p.timestamp || submittedAt.toISOString()).toString(),
        formSource,
        (p.fullName || p.primaryContactName || '').toString(),
        (p.email || '').toString(),
        ((p.websiteUrl || p.website) || '').toString(),
        (p.phone || '').toString(),
        (p.message || '').toString(),
        (p.industry || '').toString(),
      ];
      webOpsSheet.appendRow(webOpsRow);
      sendWebOpsNotification_(p, formSource, submittedAt);
      sendWebOpsLeadConfirmation_(p);
    } else if (isRevOpsSheet_(sheetName, formSource)) {
      appendVerticalLeadRow_(ss, 'revops', formSource, p, submittedAt);
      sendVerticalLeadNotification_(p, formSource, submittedAt);
      sendVerticalLeadConfirmation_(p, formSource);
    } else if (sheetName === 'webops_intake' || formSource === 'webops-intake') {
      appendIntakeLeadRow_(ss, 'webops_intake', formSource, p, submittedAt);
      sendWebOpsIntakeNotification_(p, formSource, submittedAt);
      // sendWebOpsIntakeConfirmation_(p); // disabled: MHGSYNC sends the client dashboard email
    } else if (sheetName === 'revops_intake' || formSource === 'revops-intake') {
      appendIntakeLeadRow_(ss, 'revops_intake', formSource, p, submittedAt);
      sendRevOpsIntakeNotification_(p, formSource, submittedAt);
      // sendRevOpsIntakeConfirmation_(p); // disabled: MHGSYNC sends the client dashboard email
    } else {
      var leadsSheet = ensureSheetWithHeaders_(ss, 'MHG_New_Leads', getContactHeaders_());
      var leadRow = [
        submittedAt.toISOString(),
        formSource,
        (p.companyName || '').toString(),
        (p.primaryContactName || '').toString(),
        (p.email || '').toString(),
        (p.phone || '').toString(),
        (p.website || '').toString(),
        (p.industry || '').toString(),
        (p.message || '').toString(),
      ];
      leadsSheet.appendRow(leadRow);
      sendLeadNotification_(p, formSource, submittedAt);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function parseRequestPayload_(e) {
  var p = (e && e.parameter) ? e.parameter : {};

  if (e && e.postData && e.postData.contents) {
    try {
      var json = JSON.parse(e.postData.contents);
      for (var key in json) {
        if (Object.prototype.hasOwnProperty.call(json, key)) {
          p[key] = json[key];
        }
      }
    } catch (err) {
      Logger.log('parseRequestPayload_ JSON parse failed: ' + String(err));
    }
  }

  return p;
}

function handleWebOps1sCta_(payload) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ensureSheetWithHeaders_(ss, '1s CTA', getWebOps1sCtaHeaders_());
    sheet.appendRow([
      (payload.timestamp || new Date().toISOString()).toString(),
      (payload.name || '').toString(),
      (payload.email || '').toString(),
      (payload.phone || '').toString(),
      (payload.location || '').toString(),
      (payload.presence || '').toString(),
      (payload.pain || '').toString(),
      (payload.source || '').toString(),
    ]);

    var name = (payload.name || '').toString();
    var email = (payload.email || '').toString();
    var phone = (payload.phone || '').toString();
    var location = (payload.location || '').toString();
    var presence = (payload.presence || '').toString();
    var pain = (payload.pain || '').toString();
    var timestamp = (payload.timestamp || new Date().toISOString()).toString();
    var calBase =
      'https://cal.com/mhgstrategy/webops-discovery?overlayCalendar=true' +
      '&name=' + encodeURIComponent(name) +
      '&email=' + encodeURIComponent(email);

    var internalSubject = 'New WebOps Lead — ' + name + ' · ' + location;
    var internalBody =
      'New diagnostic submitted on /webops/1s.\n\n' +
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Phone: ' + phone + '\n' +
      'Location: ' + location + '\n\n' +
      'Digital presence: ' + presence + '\n' +
      'Biggest pain: ' + pain + '\n\n' +
      'Submitted: ' + timestamp + '\n\n' +
      'Call routing:\n' +
      '- Not generating leads → Maps rank + AI visibility\n' +
      '- Losing leads → Mystery-shop opener\n' +
      '- Looks outdated → Portfolio pitch\n' +
      '- No visibility → Monthly report pitch\n' +
      '- Not sure → Full Discoverability Audit\n\n' +
      'Pre-filled booking link:\n' +
      calBase;

    // GmailApp (via sendEmailSafely_) — MailApp is blocked on headless Web App runs.
    // Primary to hello@ (same as all other site forms); CC shaun@ for direct visibility.
    var internalResult = sendEmailSafely_(NOTIFICATION_EMAIL, internalSubject, internalBody, {
      cc: 'shaun@mhgstrategy.com',
    });
    if (!internalResult.ok) {
      Logger.log('handleWebOps1sCta_ internal email failed: ' + internalResult.error);
    }

    if (email) {
      var submitterBody =
        name + ' —\n\n' +
        'Thanks for taking a few minutes to share where things ' +
        'stand with your digital presence. I\'ve reviewed your ' +
        'answers and I\'ll come prepared.\n\n' +
        'Here are two ways to move forward:\n\n' +
        '1. Schedule your 30-minute discovery call:\n' +
        'https://cal.com/mhgstrategy/webops-discovery?overlayCalendar=true\n\n' +
        '2. Complete the intake form in advance:\n' +
        'https://mhgstrategy.com/webops/intake/home-services/\n\n' +
        'Either way works. Reply here or call 925.290.8604 with ' +
        'any questions.\n\n' +
        '— Shaun Daniels\n' +
        'MHG Strategy\n' +
        'mhgstrategy.com';

      var submitterResult = sendEmailSafely_(email, 'Here\'s your next step — MHG Strategy', submitterBody, {
        replyTo: 'shaun@mhgstrategy.com',
        name: 'Shaun Daniels, MHG Strategy',
      });
      if (!submitterResult.ok) {
        Logger.log('handleWebOps1sCta_ submitter email failed: ' + submitterResult.error);
      }
    }
  } catch (err) {
    Logger.log('handleWebOps1sCta_ failed: ' + String(err));
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getWebOps1sCtaHeaders_() {
  return [
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'Location',
    'Digital Presence',
    'Biggest Pain',
    'Source',
  ];
}

function sendEngagementNotification_(p, submittedAt) {
  var subject = 'New engagement assessment — ' + (p.companyName || 'unknown company');
  var textBody = [
    'A new engagement assessment was submitted.',
    '',
    'Submitted At: ' + submittedAt.toISOString(),
    'Company Name: ' + (p.companyName || '').toString(),
    'Name: ' + (p.primaryContactName || '').toString(),
    'Email: ' + (p.email || '').toString(),
    'Phone: ' + (p.phone || '').toString(),
    'Website: ' + (p.website || '').toString(),
    'Industry: ' + (p.industry || '').toString(),
    'Finance Systems: ' + (p.financeSystems || '').toString(),
    'Primary Challenge: ' + (p.primaryChallenge || '').toString(),
    'Organization Size: ' + (p.organizationSize || '').toString(),
    'Urgency: ' + (p.urgency || '').toString(),
    'Message: ' + (p.message || '').toString(),
  ].join('\n');

  try {
    GmailApp.sendEmail(NOTIFICATION_EMAIL, subject, textBody);
  } catch (err) {
  }
}

function appendIntakeLeadRow_(ss, sheetName, formSource, p, submittedAt) {
  var sheet = ensureSheetWithHeaders_(ss, sheetName, getIntakeLeadsHeaders_());
  var row = [
    (p.timestamp || submittedAt.toISOString()).toString(),
    formSource,
    (p.formType || '').toString(),
    (p.clientName || '').toString(),
    (p.clientEmail || '').toString(),
    (p.dashboardId || '').toString(),
    (p.dashboardUrl || '').toString(),
    (p.pagePath || '').toString(),
    (p.responsesRecorded || '').toString(),
    (p.upsellSignals || '').toString(),
  ];
  sheet.appendRow(row);
}

function sendWebOpsIntakeNotification_(p, formSource, submittedAt) {
  var clientName = (p.clientName || '').toString() || 'unknown';
  var formType = (p.formType || '').toString();
  var subject = 'New WebOps intake — ' + clientName + (formType ? ' (' + formType + ')' : '');
  var textBody = [
    'A new WebOps discovery intake was completed.',
    '',
    'Submitted At: ' + (p.timestamp || submittedAt.toISOString()).toString(),
    'Form Source: ' + formSource,
    'Form Type: ' + formType,
    'Client Name: ' + clientName,
    'Client Email: ' + (p.clientEmail || '').toString(),
    'Dashboard ID: ' + (p.dashboardId || '').toString(),
    'Dashboard URL: ' + (p.dashboardUrl || '').toString(),
    'Page Path: ' + (p.pagePath || '').toString(),
    'Responses Recorded: ' + (p.responsesRecorded || '').toString(),
    'Upsell Signals: ' + (p.upsellSignals || '').toString(),
  ].join('\n');

  sendEmailSafely_(NOTIFICATION_EMAIL, subject, textBody, {});
}

function sendRevOpsIntakeNotification_(p, formSource, submittedAt) {
  var clientName = (p.clientName || '').toString() || 'unknown';
  var subject = 'New RevOps intake — ' + clientName;
  var textBody = [
    'A new RevOps discovery intake was completed.',
    '',
    'Submitted At: ' + (p.timestamp || submittedAt.toISOString()).toString(),
    'Form Source: ' + formSource,
    'Form Type: ' + (p.formType || '').toString(),
    'Client Name: ' + clientName,
    'Client Email: ' + (p.clientEmail || '').toString(),
    'Dashboard ID: ' + (p.dashboardId || '').toString(),
    'Dashboard URL: ' + (p.dashboardUrl || '').toString(),
    'Page Path: ' + (p.pagePath || '').toString(),
    'Responses Recorded: ' + (p.responsesRecorded || '').toString(),
    'Upsell Signals: ' + (p.upsellSignals || '').toString(),
  ].join('\n');

  sendEmailSafely_(NOTIFICATION_EMAIL, subject, textBody, {});
}

function sendWebOpsIntakeConfirmation_(p) {
  var email = (p.clientEmail || '').toString().trim();
  if (!email) return { ok: false, error: 'missing email' };

  var firstName = getFirstName_(p.clientName);
  var calUrl = resolveCalBookUrl_(p.calBookUrl, 'webops', '');
  var subject = 'Thank you — your WebOps discovery intake is complete';
  var htmlBody = [
    '<p>Hi ' + firstName + ',</p>',
    '<p>Thank you for completing your WebOps discovery intake. We\'ve received your responses and will review them ahead of our conversation.</p>',
    '<p>If you haven\'t scheduled your discovery call yet, you can book a time here: <a href="' + calUrl + '">' + calUrl + '</a></p>',
    '<p>We look forward to working with you.</p>',
    buildClientNextStepsClosingHtml_(),
  ].join('\n');
  var textBody = [
    'Hi ' + firstName + ',',
    '',
    'Thank you for completing your WebOps discovery intake. We\'ve received your responses and will review them ahead of our conversation.',
    '',
    'If you haven\'t scheduled your discovery call yet, you can book a time here: ' + calUrl,
    '',
    'We look forward to working with you.',
    '',
    buildClientNextStepsClosingText_(),
  ].join('\n');

  return sendEmailSafely_(email, subject, textBody, {
    htmlBody: htmlBody,
    replyTo: NOTIFICATION_EMAIL,
    name: 'Shaun Daniels',
  });
}

function sendRevOpsIntakeConfirmation_(p) {
  var email = (p.clientEmail || '').toString().trim();
  if (!email) return { ok: false, error: 'missing email' };

  var firstName = getFirstName_(p.clientName);
  var calUrl = resolveCalBookUrl_(p.calBookUrl, 'vertical', 'revops-review');
  var subject = 'Thank you — your RevOps discovery intake is complete';
  var htmlBody = [
    '<p>Hi ' + firstName + ',</p>',
    '<p>Thank you for completing your RevOps discovery intake. We\'ve received your responses and will review them ahead of our conversation.</p>',
    '<p>If you haven\'t scheduled your review call yet, you can book a time here: <a href="' + calUrl + '">' + calUrl + '</a></p>',
    '<p>We look forward to working with you.</p>',
    buildClientNextStepsClosingHtml_(),
  ].join('\n');
  var textBody = [
    'Hi ' + firstName + ',',
    '',
    'Thank you for completing your RevOps discovery intake. We\'ve received your responses and will review them ahead of our conversation.',
    '',
    'If you haven\'t scheduled your review call yet, you can book a time here: ' + calUrl,
    '',
    'We look forward to working with you.',
    '',
    buildClientNextStepsClosingText_(),
  ].join('\n');

  return sendEmailSafely_(email, subject, textBody, {
    htmlBody: htmlBody,
    replyTo: NOTIFICATION_EMAIL,
    name: 'Shaun Daniels',
  });
}

function sendWebOpsNotification_(p, formSource, submittedAt) {
  var subject = 'New WebOps assessment — ' + ((p.fullName || '').toString() || 'unknown');
  var textBody = [
    'A new WebOps assessment was submitted.',
    '',
    'Submitted At: ' + submittedAt.toISOString(),
    'Form Source: ' + formSource,
    'Name: ' + (p.fullName || '').toString(),
    'Email: ' + (p.email || '').toString(),
    'Phone: ' + (p.phone || '').toString(),
    'Website: ' + (p.websiteUrl || '').toString(),
    'Industry: ' + (p.industry || '').toString(),
    'Message: ' + (p.message || '').toString(),
  ].join('\n');

  sendEmailSafely_(NOTIFICATION_EMAIL, subject, textBody, {});
}

function sendWebOpsLeadConfirmation_(p) {
  var email = (p.email || '').toString().trim();
  if (!email) return { ok: false, error: 'missing email' };

  var firstName = getFirstName_(p.fullName);
  var intakeUrl = (p.intakeUrl || '').toString().trim() || SITE_BASE_URL + '/webops/intake/';
  var calUrl = resolveCalBookUrl_(p.calBookUrl, 'webops', '');
  var subject = 'Your WebOps assessment — next steps';
  var htmlBody = [
    '<p>Hi ' + firstName + ',</p>',
    '<p>Thanks for requesting your WebOps assessment. It\'s in, and you\'re all set to get started.</p>',
    '<p>Two quick steps before we talk:</p>',
    '<ol>',
    '  <li><strong>Complete your intake</strong> (about 15 minutes): <a href="' + intakeUrl + '">' + intakeUrl + '</a></li>',
    '  <li><strong>Book your discovery call</strong>: <a href="' + calUrl + '">' + calUrl + '</a></li>',
    '</ol>',
    '<p>Doing the intake first means we walk into the call already knowing your goals and where things stand, so we can spend the time on what matters instead of getting up to speed. We\'ll review your answers ahead of time and come prepared with initial recommendations rather than starting from a blank page.</p>',
    '<p>Looking forward to it.</p>',
    buildClientNextStepsClosingHtml_(),
  ].join('\n');
  var textBody = [
    'Hi ' + firstName + ',',
    '',
    'Thanks for requesting your WebOps assessment. It\'s in, and you\'re all set to get started.',
    '',
    'Two quick steps before we talk:',
    '',
    '1. Complete your intake (about 15 minutes): ' + intakeUrl,
    '2. Book your discovery call: ' + calUrl,
    '',
    'Doing the intake first means we walk into the call already knowing your goals and where things stand, so we can spend the time on what matters instead of getting up to speed. We\'ll review your answers ahead of time and come prepared with initial recommendations rather than starting from a blank page.',
    '',
    'Looking forward to it.',
    '',
    buildClientNextStepsClosingText_(),
  ].join('\n');

  return sendEmailSafely_(email, subject, textBody, {
    htmlBody: htmlBody,
    replyTo: NOTIFICATION_EMAIL,
    name: 'Shaun Daniels',
  });
}

function appendVerticalLeadRow_(ss, sheetName, formSource, p, submittedAt) {
  var sheet = ensureSheetWithHeaders_(ss, sheetName, getVerticalLeadsHeaders_());
  var row = [
    (p.timestamp || submittedAt.toISOString()).toString(),
    formSource,
    (p.fullName || '').toString(),
    ((p.workEmail || p.email) || '').toString(),
    (p.companyName || '').toString(),
    (p.role || '').toString(),
    (p.revenueChallenge || '').toString(),
    (p.phone || '').toString(),
  ];
  sheet.appendRow(row);
}

function sendVerticalLeadNotification_(p, formSource, submittedAt) {
  var label = formSource === 'managed-ops-review' ? 'Managed Ops' : 'RevOps';
  var subject = 'New ' + label + ' review — ' + ((p.fullName || '').toString() || 'unknown');
  var textBody = [
    'A new ' + label + ' review was submitted.',
    '',
    'Submitted At: ' + submittedAt.toISOString(),
    'Form Source: ' + formSource,
    'Name: ' + (p.fullName || '').toString(),
    'Work Email: ' + ((p.workEmail || p.email) || '').toString(),
    'Phone: ' + (p.phone || '').toString(),
    'Company Name: ' + (p.companyName || '').toString(),
    'Role: ' + (p.role || '').toString(),
    'Biggest Revenue Challenge: ' + (p.revenueChallenge || '').toString(),
  ].join('\n');

  sendEmailSafely_(NOTIFICATION_EMAIL, subject, textBody, {});
}

function sendVerticalLeadConfirmation_(p, formSource) {
  var email = ((p.workEmail || p.email) || '').toString().trim();
  if (!email) return { ok: false, error: 'missing email' };

  var isManaged = formSource === 'managed-ops-review';
  var reviewLabel = isManaged ? 'Managed Ops review' : 'RevOps review';
  var firstName = getFirstName_(p.fullName);
  var intakeUrl = (p.intakeUrl || '').toString().trim() || SITE_BASE_URL + '/intake/';
  var calUrl = resolveCalBookUrl_(p.calBookUrl, 'vertical', formSource);
  var subject = 'Your ' + reviewLabel + ' — next steps';
  var valueParagraph = isManaged
    ? 'Doing the intake first means we skip the basics on the call and go straight to where we can strengthen your operations end to end. Once it\'s in, we\'ll review ahead of time and come prepared with initial recommendations rather than starting from a blank page.'
    : 'Doing the intake first means we skip the basics on the call and go straight to where AI can actually move the needle in your operations. Once it\'s in, we\'ll review ahead of time and come prepared with initial recommendations rather than starting from a blank page.';
  var htmlBody = [
    '<p>Hi ' + firstName + ',</p>',
    '<p>Thanks for requesting your ' + reviewLabel + '. It\'s in, and you\'re all set to get started.</p>',
    '<p>Two quick steps before we talk:</p>',
    '<ol>',
    '  <li><strong>Complete your intake</strong> (about 15 minutes): <a href="' + intakeUrl + '">' + intakeUrl + '</a></li>',
    '  <li><strong>Book your discovery call</strong>: <a href="' + calUrl + '">' + calUrl + '</a></li>',
    '</ol>',
    '<p>' + valueParagraph + '</p>',
    '<p>Looking forward to it.</p>',
    buildClientNextStepsClosingHtml_(),
  ].join('\n');
  var textBody = [
    'Hi ' + firstName + ',',
    '',
    'Thanks for requesting your ' + reviewLabel + '. It\'s in, and you\'re all set to get started.',
    '',
    'Two quick steps before we talk:',
    '',
    '1. Complete your intake (about 15 minutes): ' + intakeUrl,
    '2. Book your discovery call: ' + calUrl,
    '',
    valueParagraph,
    '',
    'Looking forward to it.',
    '',
    buildClientNextStepsClosingText_(),
  ].join('\n');

  return sendEmailSafely_(email, subject, textBody, {
    htmlBody: htmlBody,
    replyTo: NOTIFICATION_EMAIL,
    name: 'Shaun Daniels',
  });
}

function sendEmailSafely_(to, subject, body, options) {
  try {
    var emailOptions = options || {};
    var preferredFrom = getPreferredFromEmail_();
    if (preferredFrom && !emailOptions.from) {
      emailOptions.from = preferredFrom;
    }
    GmailApp.sendEmail(to, subject, body, emailOptions);
    return { ok: true };
  } catch (err) {
    var errorMessage = String(err);
    Logger.log('sendEmail failed to ' + to + ': ' + errorMessage);
    logEmailError_(to, subject, errorMessage);
    return { ok: false, error: errorMessage };
  }
}

function logEmailError_(to, subject, errorMessage) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Email_Errors');
    if (!sheet) {
      sheet = ss.insertSheet('Email_Errors');
      sheet.appendRow(['Timestamp', 'To', 'Subject', 'Error']);
    }
    sheet.appendRow([new Date().toISOString(), to, subject, errorMessage]);
  } catch (err) {
    Logger.log('logEmailError_ failed: ' + String(err));
  }
}

function sendLeadNotification_(p, formSource, submittedAt) {
  if (formSource === 'webops-assessment') {
    sendWebOpsNotification_(p, formSource, submittedAt);
    return;
  }
  if (formSource === 'revops-review' || formSource === 'managed-ops-review') {
    sendVerticalLeadNotification_(p, formSource, submittedAt);
    return;
  }

  var contactName = ((p.primaryContactName || p.fullName) || '').toString();
  var website = ((p.website || p.websiteUrl) || '').toString();
  var subject = 'New lead — ' + formSource;
  var textBody = [
    'A new lead was submitted.',
    '',
    'Submitted At: ' + submittedAt.toISOString(),
    'Form Source: ' + formSource,
    'Company Name: ' + (p.companyName || '').toString(),
    'Name: ' + contactName,
    'Email: ' + ((p.email || p.workEmail) || '').toString(),
    'Phone: ' + (p.phone || '').toString(),
    'Website: ' + website,
    'Industry: ' + (p.industry || '').toString(),
    'Message: ' + (p.message || '').toString(),
  ].join('\n');

  try {
    GmailApp.sendEmail(NOTIFICATION_EMAIL, subject, textBody);
  } catch (err) {
  }
}

function getPreferredFromEmail_() {
  // GmailApp can only send "from" addresses that are configured as aliases
  // under Gmail settings → Accounts → "Send mail as".
  var preferred = 'hello@mhgstrategy.com';
  try {
    var aliases = GmailApp.getAliases();
    if (aliases && aliases.indexOf(preferred) !== -1) return preferred;
  } catch (err) {
    // If aliases can't be fetched, fall back to default sender.
  }
  return '';
}

function getFirstName_(fullName) {
  var trimmed = (fullName || '').toString().trim();
  if (!trimmed) return 'there';
  return trimmed.split(/\s+/)[0];
}

function buildClientNextStepsClosingHtml_() {
  return [
    '<p>Best,</p>',
    buildEmailSignatureHtml_(),
  ].join('\n');
}

function buildClientNextStepsClosingText_() {
  return ['Best,', '', buildEmailSignatureText_()].join('\n');
}

function buildEmailSignatureHtml_() {
  return [
    '<div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.5;color:#111;">',
    '  <div>Shaun Daniels</div>',
    '  <div>President, MHG Strategy</div>',
    '  <div><a href="mailto:hello@mhgstrategy.com" style="color:#1155cc;text-decoration:underline;">hello@mhgstrategy.com</a></div>',
    '  <div><a href="tel:' + SIGNATURE_PHONE_TEL + '" style="color:#1155cc;text-decoration:underline;">' + SIGNATURE_PHONE_DISPLAY + '</a></div>',
    '</div>',
  ].join('\n');
}

function buildEmailSignatureText_() {
  return [
    'Shaun Daniels',
    'President, MHG Strategy',
    'hello@mhgstrategy.com',
    SIGNATURE_PHONE_DISPLAY,
  ].join('\n');
}

function resolveCalBookUrl_(calBookUrlParam, bookingKind, formSource) {
  var fromClient = (calBookUrlParam || '').toString().trim();
  if (fromClient && isCalComBookingUrl_(fromClient)) {
    return fromClient;
  }
  if (fromClient && !isLegacySiteBookingFallback_(fromClient)) {
    return fromClient;
  }
  if (bookingKind === 'webops') {
    return CAL_WEBOPS_BOOKING_URL;
  }
  if (formSource === 'managed-ops-review') {
    return CAL_MANAGED_OPS_BOOKING_URL;
  }
  return CAL_REVOPS_BOOKING_URL;
}

function isCalComBookingUrl_(url) {
  return /^https?:\/\/([a-z0-9-]+\.)*cal\.com\//i.test(url);
}

function isLegacySiteBookingFallback_(url) {
  if (!url) return false;
  return (
    url.indexOf('/webops/#contact') !== -1 ||
    url.indexOf('/revops/#lead-form') !== -1 ||
    url.indexOf('/managed-ops/#lead-form') !== -1 ||
    url.indexOf('/book/webops/') !== -1 ||
    url.indexOf('/book/revops/') !== -1
  );
}

function getContactHeaders_() {
  return [
    'Submitted At',
    'Form Source',
    'Company Name',
    'Name',
    'Email',
    'Phone',
    'Website',
    'Industry',
    'Message',
  ];
}

function getEngagementContactHeaders_() {
  return [
    'Timestamp',
    'Company Name',
    'Your Name',
    'Email',
    'Phone',
    'Website',
    'Industry',
    'Current Finance Systems',
    'Primary Challenge',
    'Organization Size',
    'When are you looking to begin?',
    'How can we help?',
  ];
}

function getWebOpsLeadsHeaders_() {
  return [
    'Timestamp',
    'Form Source',
    'Full Name',
    'Email',
    'Website URL',
    'Phone',
    'Message',
    'Industry',
  ];
}

function getVerticalLeadsHeaders_() {
  return [
    'Timestamp',
    'Form Source',
    'Full Name',
    'Work Email',
    'Company Name',
    'Role',
    'Biggest Revenue Challenge',
    'Phone',
  ];
}

function getRevOpsLeadsHeaders_() {
  return getVerticalLeadsHeaders_();
}

function getIntakeLeadsHeaders_() {
  return [
    'Timestamp',
    'Form Source',
    'Form Type',
    'Client Name',
    'Client Email',
    'Dashboard ID',
    'Dashboard URL',
    'Page Path',
    'Responses Recorded',
    'Upsell Signals',
  ];
}

function getWebOpsIntakeHeaders_() {
  return getIntakeLeadsHeaders_();
}

function getRevOpsIntakeHeaders_() {
  return getIntakeLeadsHeaders_();
}

function isWebOpsSheet_(sheetName, formSource) {
  return sheetName === 'webops' || sheetName === 'WebOps Leads' || formSource === 'webops-assessment';
}

function isRevOpsSheet_(sheetName, formSource) {
  return (
    sheetName === 'revops' ||
    sheetName === 'RevOps Leads' ||
    sheetName === 'Managed Ops Leads' ||
    formSource === 'revops-review' ||
    formSource === 'managed-ops-review'
  );
}

function ensureSheetWithHeaders_(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else {
    // Ensure we at least have all expected columns (do not rename existing headers).
    var currentLastCol = Math.max(sheet.getLastColumn(), 1);
    var headerRange = sheet.getRange(1, 1, 1, currentLastCol);
    var existingHeaders = headerRange.getValues()[0] || [];

    if (currentLastCol < headers.length) {
      sheet
        .getRange(1, currentLastCol + 1, 1, headers.length - currentLastCol)
        .setValues([headers.slice(currentLastCol)]);
      currentLastCol = headers.length;
    }
  }

  return sheet;
}

// Authorization helper that requests the *gmail.send* scope.
// Run this once from the Apps Script editor to approve send permissions.
function authorizeGmailSend() {
  var activeUser = '';
  try {
    activeUser = Session.getActiveUser().getEmail();
  } catch (err) {
    activeUser = '(could not read active user — ' + String(err) + ')';
  }
  Logger.log('authorizeGmailSend: active user = ' + activeUser);

  // Trigger gmail.send scope without sending (lighter than sendEmail).
  var aliases = GmailApp.getAliases();
  Logger.log('authorizeGmailSend: aliases = ' + JSON.stringify(aliases || []));

  // Send to the account running the script (most reliable for first auth).
  var recipient = Session.getActiveUser().getEmail();
  if (!recipient) {
    recipient = NOTIFICATION_EMAIL;
  }
  GmailApp.sendEmail(
    recipient,
    'MHG Strategy — Gmail authorization test',
    'This is a one-time authorization test email.\n\nIf you received this, Gmail send is authorized for the Web_Leads script.'
  );
  Logger.log('authorizeGmailSend: test email sent to ' + recipient);
  return { ok: true, sentTo: recipient };
}

// Lighter auth check — run this first if authorizeGmailSend fails.
function authorizeGmailScopeOnly() {
  var aliases = GmailApp.getAliases();
  Logger.log('Gmail scope OK. Aliases: ' + JSON.stringify(aliases || []));
  return { ok: true, aliases: aliases || [] };
}
