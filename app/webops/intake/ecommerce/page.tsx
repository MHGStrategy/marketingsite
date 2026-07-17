import IntakeForm from '@/components/intake/IntakeForm';
import { ECOMMERCE_SECTIONS } from '@/lib/intake/ecommerceFormConfig';

export default function EcommerceIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="ecommerce"
        brandTitle="Ecommerce — Digital Discovery"
        sections={ECOMMERCE_SECTIONS}
      />
    </div>
  );
}
