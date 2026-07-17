import IntakeForm from '@/components/intake/IntakeForm';
import { CONSULTING_SECTIONS } from '@/lib/intake/consultingFormConfig';

export default function ConsultingIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="consulting"
        brandTitle="Consulting & Coaching — Digital Discovery"
        sections={CONSULTING_SECTIONS}
      />
    </div>
  );
}
