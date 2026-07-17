import Link from 'next/link';
import Section from '@/components/Section';
import { INTAKE_FORMS } from '@/lib/intake/intakeForms';

export default function IntakeHubPage() {
  return (
    <>
      <Section bgColor="black" className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-block px-4 py-2 rounded-full bg-primary-blue/20 border border-primary-blue/30">
            <span className="text-sm font-bold uppercase tracking-wider text-primary-blue">
              Client Discovery
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Industry <span className="text-primary-blue">Intake</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Select your industry to start a tailored discovery questionnaire. Your responses
            generate a personalized dashboard we use to prepare recommendations and next steps.
          </p>
        </div>
      </Section>

      <Section bgColor="white" className="py-12 md:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INTAKE_FORMS.map((form) => {
            const isLive = form.status === 'live' && form.href;

            const cardContent = (
              <>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="text-lg font-semibold text-primary-black">{form.title}</h2>
                  <span
                    className={`shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full ${
                      isLive
                        ? 'bg-primary-blue/10 text-primary-blue border border-primary-blue/30'
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}
                  >
                    {isLive ? 'Available' : 'Coming Soon'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{form.description}</p>
                {isLive ? (
                  <p className="mt-4 text-sm font-medium text-primary-blue">Start questionnaire →</p>
                ) : null}
              </>
            );

            if (isLive) {
              return (
                <Link
                  key={form.id}
                  href={form.href!}
                  className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-primary-blue/50 hover:shadow-md"
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div
                key={form.id}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5 opacity-80"
                aria-disabled="true"
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
