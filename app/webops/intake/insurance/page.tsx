import IntakeForm from '@/components/intake/IntakeForm';
import { INSURANCE_SECTIONS } from '@/lib/intake/insuranceFormConfig';

export default function InsuranceIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="insurance"
        brandTitle="Insurance — Digital Discovery"
        sections={INSURANCE_SECTIONS}
      />
    </div>
  );
}
