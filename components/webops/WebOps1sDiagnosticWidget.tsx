'use client';

import { FormEvent, useState } from 'react';
import { submitWebOps1sDiagnostic } from '@/lib/forms/webops1sDiagnostic';

const PRESENCE_OPTIONS = [
  'We have a website but it needs work',
  'We have a website but I\'m not sure it\'s working',
  'We don\'t have a website',
  'We have a website — but we\'re missing leads somewhere',
] as const;

const PAIN_OPTIONS = [
  'Not generating enough leads',
  'I\'m losing leads I should be closing',
  'It looks outdated and doesn\'t represent us well',
  'I have no visibility into what\'s working',
  'I\'m not sure — I just know something\'s off',
] as const;

type FieldKey = 'presence' | 'pain' | 'location' | 'name' | 'email' | 'phone';

const FIELD_ERROR = 'Please complete this field to continue.';

function PillGroupField({
  id,
  label,
  value,
  onChange,
  options,
  error,
}: {
  id: FieldKey;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  error?: string;
}) {
  return (
    <div className="page-1s-widget__field">
      <p id={`${id}-label`} className="page-1s-widget__label">
        {label}
      </p>
      <div role="group" aria-labelledby={`${id}-label`} className="pill-group">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            onClick={() => onChange(option)}
            className={value === option ? 'pill-selected' : 'pill'}
          >
            {option}
          </button>
        ))}
      </div>
      {error && <p className="page-1s-widget__error">{error}</p>}
    </div>
  );
}

function TextField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}: {
  id: FieldKey;
  label: string;
  type: 'text' | 'email' | 'tel';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div className="page-1s-widget__field">
      <label htmlFor={id} className="page-1s-widget__label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="page-1s-widget__input"
      />
      {error && <p className="page-1s-widget__error">{error}</p>}
    </div>
  );
}

export default function WebOps1sDiagnosticWidget() {
  const [presence, setPresence] = useState('');
  const [pain, setPain] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: Partial<Record<FieldKey, string>> = {};
    const fields: { key: FieldKey; value: string }[] = [
      { key: 'presence', value: presence },
      { key: 'pain', value: pain },
      { key: 'location', value: location },
      { key: 'name', value: name },
      { key: 'email', value: email },
      { key: 'phone', value: phone },
    ];

    fields.forEach(({ key, value }) => {
      if (!value.trim()) {
        nextErrors[key] = FIELD_ERROR;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await submitWebOps1sDiagnostic({ presence, pain, location, name, email, phone });
    } catch (err) {
      console.error('Diagnostic submission failed:', err);
      setSubmitting(false);
    }
  };

  const clearError = (key: FieldKey) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  return (
    <div className="page-1s-widget">
      <div className="page-1s-widget__intro">
        <h3 className="page-1s__h3">
          Answer 3 questions about your digital presence.
        </h3>
        <p className="page-1s-widget__subhead">
          We&apos;ll tell you what&apos;s costing you business.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="page-1s-widget__form">
        <PillGroupField
          id="presence"
          label="How would you describe your current online presence?"
          value={presence}
          onChange={(value) => {
            setPresence(value);
            clearError('presence');
          }}
          options={PRESENCE_OPTIONS}
          error={errors.presence}
        />

        <PillGroupField
          id="pain"
          label="What's the biggest thing your digital presence isn't doing for you right now?"
          value={pain}
          onChange={(value) => {
            setPain(value);
            clearError('pain');
          }}
          options={PAIN_OPTIONS}
          error={errors.pain}
        />

        <TextField
          id="location"
          label="Where is your business located?"
          type="text"
          placeholder="City, State — e.g. Modesto, CA"
          value={location}
          onChange={(value) => {
            setLocation(value);
            clearError('location');
          }}
          error={errors.location}
        />

        <TextField
          id="name"
          label="Your name"
          type="text"
          placeholder="First and last name"
          value={name}
          onChange={(value) => {
            setName(value);
            clearError('name');
          }}
          error={errors.name}
        />

        <TextField
          id="email"
          label="Email address"
          type="email"
          placeholder="you@yourbusiness.com"
          value={email}
          onChange={(value) => {
            setEmail(value);
            clearError('email');
          }}
          error={errors.email}
        />

        <TextField
          id="phone"
          label="Phone number"
          type="tel"
          placeholder="e.g. 209-555-0100"
          value={phone}
          onChange={(value) => {
            setPhone(value);
            clearError('phone');
          }}
          error={errors.phone}
        />

        <button type="submit" disabled={submitting} className="page-1s-widget__submit">
          Show me what&apos;s broken →
        </button>
      </form>
    </div>
  );
}
