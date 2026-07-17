/**
 * Google Forms submission utility
 * Handles form data submission to Google Forms with proper error handling
 *
 * NOTE: Do not call submitToGoogleForms from the browser — stale fbzx tokens
 * cause timestamp-only rows. Use /api/forms/submit/ (dev) or the Leads endpoint (prod).
 */

import { FormConfig, FormValues } from './types';
import { EMAIL_REGEX } from './config';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate form values against form configuration
 */
export function validateForm(values: FormValues, config: FormConfig): ValidationResult {
  // Check required fields
  const requiredFields = config.fields.filter((field) => field.required);
  const missingFields = requiredFields.filter((field) => !values[field.name]?.trim());

  if (missingFields.length > 0) {
    const fieldLabels = missingFields.map((f) => f.label).join(', ');
    return {
      isValid: false,
      error: `Please fill in all required fields: ${fieldLabels}`,
    };
  }

  // Validate email format
  const emailField = config.fields.find((f) => f.type === 'email' && f.required);
  if (emailField && values[emailField.name]) {
    if (!EMAIL_REGEX.test(values[emailField.name])) {
      return {
        isValid: false,
        error: 'Please enter a valid email address.',
      };
    }
  }

  return { isValid: true };
}

/**
 * Submit form data to Google Forms (server-side only — via serverGoogleFormSubmit.ts).
 * Kept for reference; browser callers must not use this function.
 */
export async function submitToGoogleForms(values: FormValues, config: FormConfig): Promise<void> {
  if (!config.googleFormUrl) {
    throw new Error('Form submission is not configured. Please contact the site administrator.');
  }

  const formBody = new URLSearchParams();

  const fbzx = config.googleFormFbzx?.trim();
  if (fbzx) {
    formBody.append('fvv', '1');
    formBody.append('draftResponse', `[null,null,"${fbzx}"]`);
    formBody.append('pageHistory', '0');
    formBody.append('fbzx', fbzx);
  }

  for (const [fieldName, value] of Object.entries(values)) {
    if (value && value.trim()) {
      const entryId = config.fieldMapping[fieldName];
      if (entryId) {
        formBody.append(entryId, value.trim());
      }
    }
  }

  await fetch(config.googleFormUrl, {
    method: 'POST',
    mode: 'no-cors',
    body: formBody,
  });
}
