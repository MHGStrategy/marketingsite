import IntakeForm from '@/components/intake/IntakeForm';
import { REAL_ESTATE_SECTIONS } from '@/lib/intake/realEstateFormConfig';

export default function RealEstateIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="real-estate"
        brandTitle="Real Estate — Digital Discovery"
        sections={REAL_ESTATE_SECTIONS}
      />
    </div>
  );
}
