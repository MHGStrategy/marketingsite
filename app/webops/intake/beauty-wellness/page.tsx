import IntakeForm from '@/components/intake/IntakeForm';
import { BEAUTY_WELLNESS_SECTIONS } from '@/lib/intake/beautyWellnessFormConfig';

export default function BeautyWellnessIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="beauty-wellness"
        brandTitle="Beauty & Wellness — Digital Discovery"
        sections={BEAUTY_WELLNESS_SECTIONS}
      />
    </div>
  );
}
