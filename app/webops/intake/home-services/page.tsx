import IntakeForm from '@/components/intake/IntakeForm';
import { HOME_SERVICES_SECTIONS } from '@/lib/intake/homeServicesFormConfig';

export default function HomeServicesIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="home-services"
        brandTitle="Home Services — Digital Discovery"
        sections={HOME_SERVICES_SECTIONS}
      />
    </div>
  );
}
