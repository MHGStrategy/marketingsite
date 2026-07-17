export type FieldFlag = 'pain' | 'upsell' | 'primary';

export type ShowWhen = {
  fieldId: string;
  value: string;
};

export type IntakeField =
  | {
      id: string;
      label: string;
      type: 'text' | 'textarea' | 'email';
      placeholder?: string;
      sub?: string;
      flag?: FieldFlag;
      required?: boolean;
      showWhen?: ShowWhen;
    }
  | {
      id: string;
      label: string;
      type: 'select';
      sub?: string;
      flag?: FieldFlag;
      required?: boolean;
      showWhen?: ShowWhen;
      placeholder?: string;
      options: { value: string; label: string }[];
    }
  | {
      id: string;
      label: string;
      type: 'checkbox' | 'tags';
      sub?: string;
      flag?: FieldFlag;
      required?: boolean;
      showWhen?: ShowWhen;
      options: { value: string; label: string; sub?: string }[];
    }
  | {
      id: string;
      label: string;
      type: 'radio';
      sub?: string;
      flag?: FieldFlag;
      required?: boolean;
      showWhen?: ShowWhen;
      options: { value: string; label: string; sub?: string }[];
    };

export interface IntakeSection {
  id: string;
  title: string;
  description: string;
  fields: IntakeField[];
}
