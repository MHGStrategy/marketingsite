'use client';

import IntakeForm from './IntakeForm';
import { MINISTRY_SECTIONS } from '@/lib/intake/ministryFormConfig';

export default function MinistryForm() {
  return (
    <IntakeForm
      formType="ministry"
      brandTitle="Ministry — Digital Discovery"
      sections={MINISTRY_SECTIONS}
    />
  );
}
