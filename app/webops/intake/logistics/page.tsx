import IntakeForm from '@/components/intake/IntakeForm';
import { LOGISTICS_SECTIONS } from '@/lib/intake/logisticsFormConfig';

export default function LogisticsIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="logistics"
        brandTitle="Logistics — Digital Discovery"
        sections={LOGISTICS_SECTIONS}
      />
    </div>
  );
}
