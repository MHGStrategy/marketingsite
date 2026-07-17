import IntakeForm from '@/components/intake/IntakeForm';
import { ACCOUNTING_SECTIONS } from '@/lib/intake/accountingFormConfig';

export default function AccountingIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="accounting"
        brandTitle="Accounting & Bookkeeping — Digital Discovery"
        sections={ACCOUNTING_SECTIONS}
      />
    </div>
  );
}
