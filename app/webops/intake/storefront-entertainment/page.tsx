import IntakeForm from '@/components/intake/IntakeForm';
import { STOREFRONT_ENTERTAINMENT_SECTIONS } from '@/lib/intake/storefrontEntertainmentFormConfig';

export default function StorefrontEntertainmentIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="storefront-entertainment"
        brandTitle="Storefront Entertainment — Digital Discovery"
        sections={STOREFRONT_ENTERTAINMENT_SECTIONS}
      />
    </div>
  );
}
