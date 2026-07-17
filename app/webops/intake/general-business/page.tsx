import IntakeForm from '@/components/intake/IntakeForm';
import { GENERAL_BUSINESS_SECTIONS } from '@/lib/intake/generalBusinessFormConfig';

export default function GeneralBusinessIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="general-business"
        brandTitle="General Business — Digital Discovery"
        sections={GENERAL_BUSINESS_SECTIONS}
      />
    </div>
  );
}
