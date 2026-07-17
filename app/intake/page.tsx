import IntakeForm from '@/components/intake/IntakeForm';
import { DISCOVERY_SECTIONS } from '@/lib/intake/discoveryFormConfig';

export default function DiscoveryIntakePage() {
  return (
    <div className="py-8 md:py-12">
      <IntakeForm
        formType="discovery"
        brandTitle="MHG Strategy — Digital Discovery"
        sections={DISCOVERY_SECTIONS}
        nameFieldId="name"
        emailFieldId="email"
      />
    </div>
  );
}
