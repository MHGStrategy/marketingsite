import Link from 'next/link';
import {
  phaseASteps,
  phaseBSteps,
  phaseCStep,
  type ProcessStep,
  webServicesLifecycleContent as content,
} from '@/lib/content/webServicesLifecycleContent';

function StepBadge({ highlight }: { highlight?: ProcessStep['highlight'] }) {
  if (!highlight) return null;
  const labels = {
    new: 'New in v2',
    optimized: 'Optimized',
    priority: 'Priority gap',
    gate: 'Hard gate',
  };
  const colors = {
    new: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    optimized: 'bg-primary-blue/10 text-primary-blue border-primary-blue/30',
    priority: 'bg-amber-100 text-amber-900 border-amber-200',
    gate: 'bg-red-100 text-red-800 border-red-200',
  };
  return (
    <span
      className={`inline-block text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${colors[highlight]}`}
    >
      {labels[highlight]}
    </span>
  );
}

function ProcessStepCard({ step }: { step: ProcessStep }) {
  return (
    <article
      id={step.id}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm scroll-mt-24"
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-primary-blue">{step.id}</span>
        {step.optional ? (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Optional</span>
        ) : null}
        <StepBadge highlight={step.highlight} />
      </div>
      <h3 className="text-xl font-semibold text-primary-black mb-4">{step.title}</h3>
      <dl className="grid gap-3 text-sm mb-4">
        <div>
          <dt className="font-semibold text-gray-900">Purpose</dt>
          <dd className="text-gray-600 mt-0.5">{step.meta.purpose}</dd>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <dt className="font-semibold text-gray-900">Owner</dt>
            <dd className="text-gray-600 mt-0.5">{step.meta.owner}</dd>
          </div>
          {step.meta.duration ? (
            <div>
              <dt className="font-semibold text-gray-900">Duration</dt>
              <dd className="text-gray-600 mt-0.5">{step.meta.duration}</dd>
            </div>
          ) : null}
        </div>
        <div>
          <dt className="font-semibold text-gray-900">Exit criteria</dt>
          <dd className="text-gray-600 mt-0.5">{step.meta.exitCriteria}</dd>
        </div>
      </dl>
      {step.bullets?.length ? (
        <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600 mb-4">
          {step.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {step.note ? (
        <p className="text-sm text-gray-500 border-l-2 border-gray-200 pl-3 italic">{step.note}</p>
      ) : null}
    </article>
  );
}

export default function WebServicesLifecycleDoc() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-blue">{content.hero.eyebrow}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-primary-black">{content.hero.headline}</h1>
        <p className="text-gray-600">{content.hero.subheadline}</p>
        <p className="text-xs text-gray-500">
          {content.entity} · {content.updated} · {content.version}
        </p>
      </div>

      <section aria-labelledby="v2-changes">
        <h2 id="v2-changes" className="text-2xl font-bold text-primary-black mb-4">
          What changed in v2
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-900">Change</th>
                <th className="px-4 py-3 font-semibold text-gray-900">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {content.v2Changes.map((row) => (
                <tr key={row.label}>
                  <td className="px-4 py-3 font-medium text-gray-900 align-top w-1/3">{row.label}</td>
                  <td className="px-4 py-3 text-gray-600">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="phase-a-sequence">
        <h2 id="phase-a-sequence" className="text-2xl font-bold text-primary-black mb-4">
          Phase A sequence
        </h2>
        <ol className="space-y-2">
          {content.phaseASequence.map((item, index) => (
            <li key={item} className="flex gap-3 text-sm text-gray-700">
              <span className="font-bold text-primary-blue shrink-0">{index + 1}.</span>
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="phase-a">
        <h2 id="phase-a" className="text-2xl font-bold text-primary-black mb-2">
          Phase A — Sales
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          All steps before build work. Do not begin Phase B until payment is confirmed.
        </p>
        <div className="space-y-5">
          {phaseASteps.map((step) => (
            <ProcessStepCard key={step.id} step={step} />
          ))}
        </div>
      </section>

      <section aria-labelledby="intake-verticals">
        <h2 id="intake-verticals" className="text-2xl font-bold text-primary-black mb-4">
          Intake verticals
        </h2>
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          {content.intakeVerticals.map((v) => (
            <Link
              key={v.path}
              href={v.path}
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700 hover:border-primary-blue/50 hover:text-primary-blue transition-colors"
            >
              {v.label}
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="agreement-structure">
        <h2 id="agreement-structure" className="text-2xl font-bold text-primary-black mb-4">
          Agreement structure (A3)
        </h2>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
          {content.agreementSections.map((section) => (
            <li key={section}>{section}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="phase-b">
        <h2 id="phase-b" className="text-2xl font-bold text-primary-black mb-6">
          Phase B — Delivery
        </h2>
        <div className="space-y-5">
          {phaseBSteps.map((step) => (
            <ProcessStepCard key={step.id} step={step} />
          ))}
        </div>
      </section>

      <section aria-labelledby="phase-c">
        <h2 id="phase-c" className="text-2xl font-bold text-primary-black mb-6">
          Phase C — Maintenance
        </h2>
        <ProcessStepCard step={phaseCStep} />
      </section>

      <section aria-labelledby="agreement-refs">
        <h2 id="agreement-refs" className="text-2xl font-bold text-primary-black mb-4">
          Agreement references on file
        </h2>
        <div className="space-y-3">
          {content.agreementReferences.map((ref) => (
            <div key={ref.name} className="rounded-lg border border-gray-200 p-4 text-sm">
              <p className="font-semibold text-gray-900">{ref.name}</p>
              <p className="text-gray-600 mt-1">{ref.use}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="open-items">
        <h2 id="open-items" className="text-2xl font-bold text-primary-black mb-4">
          Open items
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
          {content.openItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="related-links" className="border-t border-gray-200 pt-8">
        <h2 id="related-links" className="text-lg font-semibold text-primary-black mb-3">
          Related tools
        </h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li>
            <a href={content.links.intake} className="text-primary-blue hover:underline">
              Intake hub
            </a>
          </li>
          <li>
            <a href={content.links.bluehost} className="text-primary-blue hover:underline">
              Bluehost guide
            </a>
          </li>
          <li>
            <a href={content.links.mhgsync} className="text-primary-blue hover:underline">
              MHGSYNC
            </a>
          </li>
          <li>
            <a href={content.links.teamLifecycle} className="text-primary-blue hover:underline">
              Team view (mhgsync.com)
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
