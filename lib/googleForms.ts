/**
 * Google Forms submission helper
 * Submits form data directly to Google Forms using their public formResponse endpoint
 */

export type GoogleFormsFieldMapping = {
  companyName: string;
  primaryContactName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  message: string;
};

export type ContactFormData = {
  companyName: string;
  primaryContactName: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  message: string;
};

/**
 * Submit form data to Google Forms
 * @param formData - The form data to submit
 * @param formResponseUrl - The Google Forms formResponse URL
 * @param fieldMapping - Mapping of form fields to Google Forms entry IDs
 * @returns Promise that resolves if submission succeeds, rejects on error
 */
export async function submitToGoogleForms(
  formData: ContactFormData,
  formResponseUrl: string,
  fieldMapping: GoogleFormsFieldMapping
): Promise<void> {
  // Build URL-encoded form data
  const formBody = new URLSearchParams();
  
  // Map each field to its Google Forms entry ID
  if (formData.companyName) {
    formBody.append(fieldMapping.companyName, formData.companyName);
  }
  if (formData.primaryContactName) {
    formBody.append(fieldMapping.primaryContactName, formData.primaryContactName);
  }
  if (formData.email) {
    formBody.append(fieldMapping.email, formData.email);
  }
  if (formData.phone) {
    formBody.append(fieldMapping.phone, formData.phone);
  }
  if (formData.website) {
    formBody.append(fieldMapping.website, formData.website);
  }
  if (formData.industry) {
    formBody.append(fieldMapping.industry, formData.industry);
  }
  if (formData.message) {
    formBody.append(fieldMapping.message, formData.message);
  }

  // Submit to Google Forms
  // Note: Google Forms returns a 302 redirect on success, so we use no-cors mode
  // This prevents reading the response, but allows the submission to succeed
  await fetch(formResponseUrl, {
    method: 'POST',
    mode: 'no-cors', // Required for cross-origin submission to Google Forms
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody.toString(),
  });

  // With no-cors mode, we can't read the response, but if there's no error, assume success
  // The form will redirect to Google's confirmation page, but we handle success client-side
}
