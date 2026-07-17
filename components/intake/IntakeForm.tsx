'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { IntakeField, IntakeSection } from '@/lib/intake/types';
import { submitIntakeToLeadsSheet } from '@/lib/forms/intakeLeadsSheet';
import './intake-form.css';

export type IntakeFormProps = {
  formType: string;
  brandTitle: string;
  sections: IntakeSection[];
  nameFieldId?: string;
  emailFieldId?: string;
};

type FormValues = Record<string, string | string[]>;

const INTAKE_URL =
  process.env.NEXT_PUBLIC_MHGSYNC_INTAKE_URL || 'http://localhost:8000/api/intake';

function isFieldVisible(field: IntakeField, values: FormValues): boolean {
  if (!field.showWhen) return true;
  return values[field.showWhen.fieldId] === field.showWhen.value;
}

function isUpsellSignal(field: IntakeField, value: string | string[] | undefined): boolean {
  if (field.flag !== 'upsell') return false;
  if (!value) return false;
  if (Array.isArray(value))
    return value.length > 0 && !value.includes('none') && !value.includes('donations-only');
  const positive = ['yes', 'yes-integrated', 'want', 'refresh', 'need-help', 'maybe', 'future', 'nice'];
  return positive.some((token) => value.includes(token));
}

function formatFieldValue(field: IntakeField, value: string | string[] | undefined): string {
  if (!value || (Array.isArray(value) && value.length === 0)) return '—';
  if ((field.type === 'checkbox' || field.type === 'tags') && Array.isArray(value)) {
    return value.map((v) => field.options.find((opt) => opt.value === v)?.label || v).join(', ');
  }
  if ((field.type === 'radio' || field.type === 'select') && typeof value === 'string') {
    return field.options.find((opt) => opt.value === value)?.label || value;
  }
  return Array.isArray(value) ? value.join(', ') : value;
}

function buildStructuredFormData(sections: IntakeSection[], values: FormValues) {
  return {
    sections: sections.map((section) => ({
      id: section.id,
      title: section.title,
      fields: section.fields
        .filter((field) => isFieldVisible(field, values))
        .map((field) => {
          const value = values[field.id];
          return {
            id: field.id,
            label: field.label,
            value: formatFieldValue(field, value),
            rawValue: value ?? null,
            flag: field.flag ?? null,
            isUpsellSignal: isUpsellSignal(field, value),
          };
        }),
    })),
  };
}

function countResponses(values: FormValues): number {
  return Object.values(values).filter((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return typeof value === 'string' && value.trim().length > 0;
  }).length;
}

function countUpsellSignals(sections: IntakeSection[], values: FormValues): number {
  return sections
    .flatMap((s) => s.fields)
    .filter((field) => isFieldVisible(field, values) && isUpsellSignal(field, values[field.id]))
    .length;
}

function FieldBlock({
  field,
  values,
  errors,
  onTextChange,
  onCheckboxToggle,
  onRadioSelect,
  onSelectChange,
}: {
  field: IntakeField;
  values: FormValues;
  errors: Record<string, string>;
  onTextChange: (id: string, value: string) => void;
  onCheckboxToggle: (id: string, optionValue: string) => void;
  onRadioSelect: (id: string, optionValue: string) => void;
  onSelectChange: (id: string, value: string) => void;
}) {
  if (!isFieldVisible(field, values)) return null;

  return (
    <div className="intake-q-block">
      <label
        className="intake-q-label"
        htmlFor={
          field.type !== 'checkbox' && field.type !== 'radio' && field.type !== 'tags'
            ? field.id
            : undefined
        }
      >
        {field.label}
      </label>
      {field.sub ? <span className="intake-q-sub">{field.sub}</span> : null}

      {(field.type === 'text' || field.type === 'email' || field.type === 'textarea') && (
        <>
          {field.type === 'textarea' ? (
            <textarea
              id={field.id}
              className={`intake-textarea ${errors[field.id] ? 'intake-field-error' : ''}`}
              placeholder={field.placeholder}
              value={(values[field.id] as string) || ''}
              onChange={(e) => onTextChange(field.id, e.target.value)}
            />
          ) : (
            <input
              id={field.id}
              type={field.type}
              className={`intake-input ${errors[field.id] ? 'intake-field-error' : ''}`}
              placeholder={field.placeholder}
              value={(values[field.id] as string) || ''}
              onChange={(e) => onTextChange(field.id, e.target.value)}
            />
          )}
          {errors[field.id] ? <p className="intake-error">{errors[field.id]}</p> : null}
        </>
      )}

      {field.type === 'select' && (
        <>
          <select
            id={field.id}
            className={`intake-select ${errors[field.id] ? 'intake-field-error' : ''}`}
            value={(values[field.id] as string) || ''}
            onChange={(e) => onSelectChange(field.id, e.target.value)}
          >
            {field.placeholder ? (
              <option value="">{field.placeholder}</option>
            ) : null}
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors[field.id] ? <p className="intake-error">{errors[field.id]}</p> : null}
        </>
      )}

      {field.type === 'checkbox' && (
        <>
          <div className="intake-check-grid">
            {field.options.map((option) => {
              const selected = ((values[field.id] as string[]) || []).includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`intake-check-item ${selected ? 'selected' : ''}`}
                  onClick={() => onCheckboxToggle(field.id, option.value)}
                >
                  <div className="intake-check-box">{selected ? '✓' : ''}</div>
                  <div>
                    <div className="intake-check-text">{option.label}</div>
                    {option.sub ? <div className="intake-check-sub">{option.sub}</div> : null}
                  </div>
                </button>
              );
            })}
          </div>
          {errors[field.id] ? <p className="intake-error">{errors[field.id]}</p> : null}
        </>
      )}

      {field.type === 'tags' && (
        <>
          <div className="intake-tag-row">
            {field.options.map((option) => {
              const selected = ((values[field.id] as string[]) || []).includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`intake-tag ${selected ? 'selected' : ''}`}
                  onClick={() => onCheckboxToggle(field.id, option.value)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          {errors[field.id] ? <p className="intake-error">{errors[field.id]}</p> : null}
        </>
      )}

      {field.type === 'radio' && (
        <>
          <div className="intake-radio-group">
            {field.options.map((option) => {
              const selected = values[field.id] === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`intake-radio-item ${selected ? 'selected' : ''}`}
                  onClick={() => onRadioSelect(field.id, option.value)}
                >
                  <div className="intake-radio-dot">
                    <div className="intake-radio-inner" />
                  </div>
                  <span className="intake-check-text">{option.label}</span>
                </button>
              );
            })}
          </div>
          {errors[field.id] ? <p className="intake-error">{errors[field.id]}</p> : null}
        </>
      )}
    </div>
  );
}

function SectionPanel({
  section,
  index,
  total,
}: {
  section: IntakeSection;
  index: number;
  total: number;
}) {
  return (
    <div className="mb-6">
      <div className="intake-section-label">
        Section {index + 1} of {total}
      </div>
      <div className="intake-section-title">{section.title}</div>
      <div className="intake-section-desc">{section.description}</div>
    </div>
  );
}

export default function IntakeForm({
  formType,
  brandTitle,
  sections,
  nameFieldId = 'nameAndRole',
  emailFieldId = 'email',
}: IntakeFormProps) {
  const pathname = usePathname();
  const totalSections = sections.length;

  const [currentSection, setCurrentSection] = useState(0);
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const progress = completed
    ? 100
    : ((currentSection + 1) / (totalSections + 1)) * 100;

  const responseCount = useMemo(() => countResponses(values), [values, completed]);
  const upsellCount = useMemo(
    () => countUpsellSignals(sections, values),
    [values, completed, sections],
  );

  const activeSection = sections[currentSection];

  const onTextChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const onCheckboxToggle = (id: string, optionValue: string) => {
    setValues((prev) => {
      const current = (prev[id] as string[]) || [];
      const next = current.includes(optionValue)
        ? current.filter((entry) => entry !== optionValue)
        : [...current, optionValue];
      return { ...prev, [id]: next };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const onRadioSelect = (id: string, optionValue: string) => {
    setValues((prev) => {
      const next = { ...prev, [id]: optionValue };
      if (id === 'heard' && optionValue !== 'referral') {
        delete next.referral_name;
      }
      return next;
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      if (id === 'heard' && optionValue !== 'referral') {
        delete next.referral_name;
      }
      return next;
    });
  };

  const onSelectChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const validateSection = (section: IntakeSection) => {
    const nextErrors: Record<string, string> = {};

    section.fields.forEach((field) => {
      if (!isFieldVisible(field, values)) return;
      if (!field.required) return;

      const value = values[field.id];

      if (field.type === 'checkbox' || field.type === 'tags') {
        if (!Array.isArray(value) || value.length === 0) {
          nextErrors[field.id] = 'Please select at least one option.';
        }
        return;
      }

      if (field.type === 'radio' || field.type === 'select') {
        if (typeof value !== 'string' || !value.trim()) {
          nextErrors[field.id] = 'Please select an option.';
        }
        return;
      }

      if (typeof value !== 'string' || !value.trim()) {
        nextErrors[field.id] = 'This field is required.';
      } else if (
        field.type === 'email' &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ) {
        nextErrors[field.id] = 'Enter a valid email address.';
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitForm = async () => {
    setSubmitting(true);
    setSubmitError(null);

    const clientName = (values[nameFieldId] as string)?.trim() || '';
    const clientEmail = (values[emailFieldId] as string)?.trim() || '';
    const formData = buildStructuredFormData(sections, values);
    const leadsPayload = {
      formType,
      clientName,
      clientEmail,
      responsesRecorded: countResponses(values),
      upsellSignals: countUpsellSignals(sections, values),
    };

    type MhgsyncResult = {
      url?: string;
      emailSent?: boolean;
      dashboard_id?: string;
    };

    let mhgsyncResult: MhgsyncResult | null = null;

    try {
      const response = await fetch(INTAKE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType, clientName, clientEmail, formData }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(
          payload?.detail ||
            payload?.error ||
            'Unable to submit your discovery form. Please try again.',
        );
      }

      mhgsyncResult = (await response.json()) as MhgsyncResult;
      setDashboardUrl(mhgsyncResult.url ?? null);
      setEmailSent(mhgsyncResult.emailSent === true);
      setCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Submission failed.');
    } finally {
      // SDR ops sheet is independent of MHGSYNC — always capture the lead row.
      void submitIntakeToLeadsSheet(
        {
          ...leadsPayload,
          dashboardId: mhgsyncResult?.dashboard_id,
          dashboardUrl: mhgsyncResult?.url,
        },
        pathname ?? '',
      );
      setSubmitting(false);
    }
  };

  const goNext = async () => {
    if (!validateSection(activeSection)) return;
    if (currentSection === totalSections - 1) {
      await submitForm();
      return;
    }
    setCurrentSection((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="intake-form">
      <div className="intake-brand-bar">
        <div className="intake-brand-dot" />
        <span className="intake-brand-title">{brandTitle}</span>
      </div>

      <div className="intake-progress-bar">
        <div className="intake-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {completed ? (
        <div className="intake-section">
          <div className="intake-complete-box">
            <div className="intake-complete-icon">✦</div>
            <div className="intake-complete-title">Thank you — discovery complete.</div>
            <div className="intake-complete-sub">
              {emailSent ? (
                <>
                  Your personalized dashboard is ready. You&apos;ll receive an email shortly with
                  the link to review your responses and next-step recommendations.
                </>
              ) : (
                <>
                  Your personalized dashboard is ready. We couldn&apos;t send the email
                  automatically — use the link below to access it now. If you expected an email,
                  check your spam folder or contact us at hello@mhgstrategy.com.
                </>
              )}
            </div>
            {!emailSent && dashboardUrl ? (
              <p className="intake-dashboard-link-wrap">
                <a
                  href={dashboardUrl}
                  className="intake-dashboard-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dashboardUrl}
                </a>
              </p>
            ) : null}
            <div className="intake-summary-grid">
              <div className="intake-summary-card">
                <div className="intake-summary-num">{totalSections}</div>
                <div className="intake-summary-lbl">Sections completed</div>
              </div>
              <div className="intake-summary-card">
                <div className="intake-summary-num">{responseCount}</div>
                <div className="intake-summary-lbl">Responses recorded</div>
              </div>
              <div className="intake-summary-card">
                <div className="intake-summary-num">{upsellCount}</div>
                <div className="intake-summary-lbl">Improvement areas identified</div>
              </div>
              <div className="intake-summary-card">
                <div className="intake-summary-num">Ready</div>
                <div className="intake-summary-lbl">For your dashboard</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="intake-section">
            <SectionPanel section={activeSection} index={currentSection} total={totalSections} />
            {activeSection.fields.map((field) => (
              <FieldBlock
                key={field.id}
                field={field}
                values={values}
                errors={errors}
                onTextChange={onTextChange}
                onCheckboxToggle={onCheckboxToggle}
                onRadioSelect={onRadioSelect}
                onSelectChange={onSelectChange}
              />
            ))}
          </div>

          {submitError ? <p className="intake-error">{submitError}</p> : null}

          <div className="intake-nav-row">
            <span className="intake-nav-info">
              Section {currentSection + 1} of {totalSections}
            </span>
            <div className="intake-btn-row">
              {currentSection > 0 ? (
                <button
                  type="button"
                  className="intake-btn"
                  onClick={goBack}
                  disabled={submitting}
                >
                  ← Back
                </button>
              ) : null}
              <button
                type="button"
                className="intake-btn intake-btn-primary"
                onClick={goNext}
                disabled={submitting}
              >
                {submitting
                  ? 'Submitting…'
                  : currentSection === totalSections - 1
                    ? 'Submit ✓'
                    : 'Continue →'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
