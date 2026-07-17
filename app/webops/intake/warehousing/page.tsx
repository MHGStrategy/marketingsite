import IntakeForm from '@/components/intake/IntakeForm';
import { WAREHOUSING_SECTIONS } from '@/lib/intake/warehousingFormConfig';

export default function WarehousingIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="warehousing"
        brandTitle="Warehousing — Digital Discovery"
        sections={WAREHOUSING_SECTIONS}
      />
    </div>
  );
}
