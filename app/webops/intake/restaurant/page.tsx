import IntakeForm from '@/components/intake/IntakeForm';
import { RESTAURANT_SECTIONS } from '@/lib/intake/restaurantFormConfig';

export default function RestaurantIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="restaurant"
        brandTitle="Restaurant — Digital Discovery"
        sections={RESTAURANT_SECTIONS}
      />
    </div>
  );
}
