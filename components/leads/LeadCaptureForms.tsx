'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import CTAButton from '@/components/CTAButton';
import { getCalBookUrlForLead, getCalCtaHref } from '@/lib/cal';
import { INTAKE_FORMS } from '@/lib/intake/intakeForms';

const industryOptions = [
  { value: 'home-services', label: 'Home Services' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'ministry', label: 'Nonprofit / Church' },
  { value: 'consulting', label: 'Professional Services' },
  { value: 'other', label: 'Other' },
];

const REVENUE_CHALLENGE_OPTIONS = [
  'Pipeline visibility and forecasting',
  'Lead-to-close handoffs are messy',
  "Reporting takes too long or isn't trusted",
  "Systems don't talk to each other",
  "We've outgrown our current setup",
  "Not sure — I just know it's not working",
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getIntakeHref(industryId: string): string {
  if (industryId === 'other') return '/webops/intake/';
  const match = INTAKE_FORMS.find((f) => f.id === industryId && f.href);
  return match?.href ?? '/webops/intake/';
}

type WebOpsAssessmentFormProps = {
  variant?: 'dark' | 'light';
};

export function WebOpsAssessmentForm({ variant = 'dark' }: WebOpsAssessmentFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [industry, setIndustry] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [submittedIndustry, setSubmittedIndustry] = useState('');

  const calHref = getCalCtaHref('webops');
  const isDark = variant === 'dark';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (
      !fullName.trim() ||
      !email.trim() ||
      !websiteUrl.trim() ||
      !phone.trim() ||
      !message.trim() ||
      !industry
    ) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const leadsUrl = process.env.NEXT_PUBLIC_LEADS_WEBAPP_URL;
    if (!leadsUrl) {
      setStatus('error');
      setErrorMessage('Form submission is not configured. Please contact hello@mhgstrategy.com.');
      return;
    }

    setStatus('loading');

    try {
      // TODO:TWENTYCRM — Replace Google Sheets lead write with TwentyCRM API call
      const trimmedName = fullName.trim();
      const trimmedWebsite = websiteUrl.trim();
      const intakePath = getIntakeHref(industry);
      const intakeUrl = `https://www.mhgstrategy.com${intakePath.startsWith('/') ? intakePath : `/${intakePath}`}`;
      const calBookUrl = getCalBookUrlForLead('webops');
      const params = new URLSearchParams({
        formSource: 'webops-assessment',
        sheetName: 'webops',
        fullName: trimmedName,
        // Legacy Apps Script (pre-2026-06-22) routes webops to sendLeadNotification_ which reads these keys:
        primaryContactName: trimmedName,
        email: email.trim(),
        websiteUrl: trimmedWebsite,
        website: trimmedWebsite,
        phone: phone.trim(),
        message: message.trim(),
        industry,
        intakeUrl,
        calBookUrl,
        timestamp: new Date().toISOString(),
      });

      await fetch(`${leadsUrl}?${params.toString()}`, { method: 'GET', mode: 'no-cors' });

      // TODO:MHGSYNC — Wire automated email: send industry-specific intake link after WebOps lead capture
      setSubmittedName(fullName.trim());
      setSubmittedIndustry(industry);
      setStatus('success');
      setFullName('');
      setEmail('');
      setWebsiteUrl('');
      setPhone('');
      setMessage('');
      setIndustry('');
    } catch {
      setStatus('error');
      setErrorMessage('Submission failed. Please try again or email hello@mhgstrategy.com.');
    }
  };

  const inputClass = isDark
    ? 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white text-gray-900'
    : 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white text-gray-900';
  const labelClass = isDark ? 'block text-sm font-medium mb-2 text-white' : 'block text-sm font-medium mb-2 text-gray-700';

  if (status === 'success') {
    const intakeHref = getIntakeHref(submittedIndustry);
    return (
      <div className={`space-y-6 text-left ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
        <p className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-primary-black'}`}>
          Thank you, {submittedName}!
        </p>
        <p className="leading-relaxed">
          Check your email for the next step — a short intake questionnaire tailored to your industry.
          Completing it before our first call means we can jump straight into strategy.
        </p>
        <p className="text-sm leading-relaxed">
          If you don&apos;t see it within a few minutes, check your spam folder or start your intake now:
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href={calHref}
            className="font-semibold text-primary-blue hover:text-primary-blue/80 transition-colors"
          >
            Book your call now →
          </Link>
          <Link
            href={intakeHref}
            className="font-semibold text-primary-blue hover:text-primary-blue/80 transition-colors"
          >
            Start your intake →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-5 text-left" onSubmit={handleSubmit} noValidate>
      {status === 'error' && errorMessage ? (
        <div
          className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-red-400 text-sm"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : null}

      <div>
        <label htmlFor="webops-fullName" className={labelClass}>
          Your name<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          id="webops-fullName"
          name="fullName"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="webops-email" className={labelClass}>
          Work email<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="email"
          id="webops-email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="Work email"
        />
      </div>

      <div>
        <label htmlFor="webops-websiteUrl" className={labelClass}>
          Your website URL<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="url"
          id="webops-websiteUrl"
          name="websiteUrl"
          required
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          className={inputClass}
          placeholder="Your website URL"
        />
      </div>

      <div>
        <label htmlFor="webops-phone" className={labelClass}>
          Phone<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="tel"
          id="webops-phone"
          name="phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          placeholder="Phone"
        />
      </div>

      <div>
        <label htmlFor="webops-message" className={labelClass}>
          How can we help?<span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          id="webops-message"
          name="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
          placeholder="How can we help?"
        />
      </div>

      <div>
        <label htmlFor="webops-industry" className={labelClass}>
          Industry<span className="text-red-500 ml-1">*</span>
        </label>
        <select
          id="webops-industry"
          name="industry"
          required
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className={inputClass}
        >
          <option value="">Select your industry</option>
          {industryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-2 text-center">
        <CTAButton type="submit" variant="primary" className="w-full md:w-auto" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : 'Get My Free Assessment'}
        </CTAButton>
      </div>

      <p className={`text-sm mt-6 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Already know what you need?{' '}
        <Link href={calHref} className="text-primary-blue underline hover:text-primary-blue/80 transition-colors">
          Book a call directly →
        </Link>
      </p>
    </form>
  );
}

export type VerticalLeadFormConfig = {
  formSource: string;
  sheetName: string;
  submitLabel: string;
  fieldIdPrefix: string;
  reviewLabel: string;
};

type VerticalLeadFormProps = {
  config: VerticalLeadFormConfig;
};

export function VerticalLeadForm({ config }: VerticalLeadFormProps) {
  const { formSource, sheetName, submitLabel, fieldIdPrefix, reviewLabel } = config;
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [revenueChallenge, setRevenueChallenge] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const bookingType = formSource === 'managed-ops-review' ? 'managed-ops' : 'revops';
  const calHref = getCalCtaHref(bookingType);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (
      !fullName.trim() ||
      !workEmail.trim() ||
      !phone.trim() ||
      !companyName.trim() ||
      !role.trim() ||
      !revenueChallenge
    ) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!EMAIL_REGEX.test(workEmail.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const leadsUrl = process.env.NEXT_PUBLIC_LEADS_WEBAPP_URL;
    if (!leadsUrl) {
      setStatus('error');
      setErrorMessage('Form submission is not configured. Please contact hello@mhgstrategy.com.');
      return;
    }

    setStatus('loading');

    try {
      // TODO:TWENTYCRM — Replace Google Sheets lead write with TwentyCRM API call
      const trimmedName = fullName.trim();
      const trimmedEmail = workEmail.trim();
      const trimmedPhone = phone.trim();
      const trimmedCompany = companyName.trim();
      const trimmedRole = role.trim();
      const legacyMessage = `Role: ${trimmedRole}. Biggest revenue challenge: ${revenueChallenge}`;
      const intakeUrl = 'https://www.mhgstrategy.com/intake/';
      const calBookUrl = getCalBookUrlForLead(bookingType);
      const params = new URLSearchParams({
        formSource,
        sheetName,
        fullName: trimmedName,
        // Legacy Apps Script (pre-2026-06-22) routes vertical leads to sendLeadNotification_:
        primaryContactName: trimmedName,
        workEmail: trimmedEmail,
        email: trimmedEmail,
        phone: trimmedPhone,
        companyName: trimmedCompany,
        role: trimmedRole,
        revenueChallenge,
        message: legacyMessage,
        intakeUrl,
        calBookUrl,
        timestamp: new Date().toISOString(),
      });

      await fetch(`${leadsUrl}?${params.toString()}`, { method: 'GET', mode: 'no-cors' });

      // TODO:MHGSYNC — Wire automated email: send Cal.com link + intake link after lead capture
      setSubmittedName(fullName.trim());
      setStatus('success');
      setFullName('');
      setWorkEmail('');
      setPhone('');
      setCompanyName('');
      setRole('');
      setRevenueChallenge('');
    } catch {
      setStatus('error');
      setErrorMessage('Submission failed. Please try again or email hello@mhgstrategy.com.');
    }
  };

  if (status === 'success') {
    return (
      <div className="space-y-6 text-left text-gray-200 max-w-xl mx-auto">
        <p className="text-xl font-semibold text-white">Thank you, {submittedName}!</p>
        <p className="leading-relaxed">
          You&apos;ll receive an email with a link to book your {reviewLabel} call and a short intake
          questionnaire.
        </p>
        <p className="text-sm font-medium text-white">In the meantime, you can:</p>
        <div className="flex flex-col gap-3">
          <Link href={calHref} className="font-semibold text-primary-blue hover:text-primary-blue/80 transition-colors">
            Book your call now →
          </Link>
          <Link href="/intake/" className="font-semibold text-primary-blue hover:text-primary-blue/80 transition-colors">
            Start your intake →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-5 text-left max-w-xl mx-auto" onSubmit={handleSubmit} noValidate>
      {status === 'error' && errorMessage ? (
        <div
          className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-red-400 text-sm"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : null}

      <div>
        <label htmlFor={`${fieldIdPrefix}-fullName`} className="block text-sm font-medium mb-2 text-white">
          Your name<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          id={`${fieldIdPrefix}-fullName`}
          name="fullName"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white text-gray-900"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor={`${fieldIdPrefix}-workEmail`} className="block text-sm font-medium mb-2 text-white">
          Work email<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="email"
          id={`${fieldIdPrefix}-workEmail`}
          name="workEmail"
          required
          value={workEmail}
          onChange={(e) => setWorkEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white text-gray-900"
          placeholder="Work email"
        />
      </div>

      <div>
        <label htmlFor={`${fieldIdPrefix}-phone`} className="block text-sm font-medium mb-2 text-white">
          Phone<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="tel"
          id={`${fieldIdPrefix}-phone`}
          name="phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white text-gray-900"
          placeholder="Phone"
        />
      </div>

      <div>
        <label htmlFor={`${fieldIdPrefix}-companyName`} className="block text-sm font-medium mb-2 text-white">
          Company name<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          id={`${fieldIdPrefix}-companyName`}
          name="companyName"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white text-gray-900"
          placeholder="Company name"
        />
      </div>

      <div>
        <label htmlFor={`${fieldIdPrefix}-role`} className="block text-sm font-medium mb-2 text-white">
          Your role<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          id={`${fieldIdPrefix}-role`}
          name="role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white text-gray-900"
          placeholder="Your role (e.g. VP Sales, CRO)"
        />
      </div>

      <div>
        <label htmlFor={`${fieldIdPrefix}-revenueChallenge`} className="block text-sm font-medium mb-2 text-white">
          What&apos;s your biggest revenue challenge?<span className="text-red-500 ml-1">*</span>
        </label>
        <select
          id={`${fieldIdPrefix}-revenueChallenge`}
          name="revenueChallenge"
          required
          value={revenueChallenge}
          onChange={(e) => setRevenueChallenge(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-white text-gray-900"
        >
          <option value="">Select your biggest challenge</option>
          {REVENUE_CHALLENGE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-2 text-center">
        <CTAButton type="submit" variant="primary" className="w-full md:w-auto" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : submitLabel}
        </CTAButton>
      </div>

      <p className="text-sm text-gray-400 mt-6 text-center">
        {fieldIdPrefix === 'revops' ? (
          <>
            <span className="md:hidden">
              Already know what you need?
              <br />
              <Link href={calHref} className="text-primary-blue underline hover:text-primary-blue/80 transition-colors">
                Book a call directly →
              </Link>
            </span>
            <span className="hidden md:inline">
              Already know what you need?{' '}
              <Link href={calHref} className="text-primary-blue underline hover:text-primary-blue/80 transition-colors">
                Book a call directly →
              </Link>
            </span>
          </>
        ) : (
          <>
            Already know what you need?{' '}
            <Link href={calHref} className="text-primary-blue underline hover:text-primary-blue/80 transition-colors">
              Book a call directly →
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

/** @deprecated Use VerticalLeadForm with config from vertical content */
export function RevOpsLeadForm() {
  return (
    <VerticalLeadForm
      config={{
        formSource: 'revops-review',
        sheetName: 'revops',
        submitLabel: 'Book My RevOps Review',
        fieldIdPrefix: 'revops',
        reviewLabel: 'RevOps Review',
      }}
    />
  );
}
