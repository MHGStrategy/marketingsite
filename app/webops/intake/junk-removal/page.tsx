import IntakeForm from '@/components/intake/IntakeForm';
import { JUNK_REMOVAL_SECTIONS } from '@/lib/intake/junkRemovalFormConfig';

export default function JunkRemovalIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="junk-removal"
        brandTitle="Junk Removal — Digital Discovery"
        sections={JUNK_REMOVAL_SECTIONS}
      />
    </div>
  );
}
