/**
 * Form system types and configuration
 */

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'multiselect';
  required?: boolean;
  placeholder?: string;
  gridCols?: 1 | 2; // For responsive grid layout
  options?: FormFieldOption[];
}

export interface FormConfig {
  id: string; // Unique form identifier (e.g., 'contact', 'mhgmedia')
  googleFormUrl: string;
  /** Required for newer Google Forms to accept field values (not just timestamp) */
  googleFormFbzx?: string;
  /**
   * Optional: explicit Google Sheet tab name for the Leads endpoint.
   * If set, the Apps Script should write to this tab.
   */
  leadsSheetName?: string;
  fieldMapping: Record<string, string>; // Maps form field names to Google Forms entry IDs
  fields: FormFieldConfig[];
}

export interface FormValues {
  [key: string]: string;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface FormState {
  values: FormValues;
  status: FormStatus;
  errorMessage: string;
}
