import IntakeForm from '@/components/intake/IntakeForm';
import { CATERING_SECTIONS } from '@/lib/intake/cateringFormConfig';

export default function CateringIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="catering"
        brandTitle="Catering — Digital Discovery"
        sections={CATERING_SECTIONS}
      />
    </div>
  );
}
