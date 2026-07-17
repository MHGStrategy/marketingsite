import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import Section from '@/components/Section';
import CurriculumAndTracks from '@/components/insights/CurriculumAndTracks';
import InsightInPageNav from '@/components/insights/InsightInPageNav';
import {
  certificateItems,
  certificateUses,
  claudeHighSchoolHero,
  educatorsContent,
  ongoingHabits,
  resourceHubLinks,
  whatIsClaude,
  whyCareItems,
} from '@/lib/insights/content/claudeHighSchoolCurriculum';

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-blue font-semibold hover:underline"
    >
      {children}
    </a>
  );
}

export default function ClaudeHighSchoolPost() {
  return (
    <article className="bg-primary-black">
      {/* Hero */}
      <Section id="hero" bgColor="black" className="scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
            {claudeHighSchoolHero.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {claudeHighSchoolHero.headline}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {claudeHighSchoolHero.subheadline}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <CTAButton href="#curriculum" variant="primary">
              {claudeHighSchoolHero.ctaCurriculum}
            </CTAButton>
            <CTAButton href="#educators" variant="outline" className="!text-white !border-white hover:!bg-white hover:!text-primary-black">
              {claudeHighSchoolHero.ctaEducators}
            </CTAButton>
          </div>
        </div>
      </Section>

      <InsightInPageNav />

      {/* Why care */}
      <Section id="why-care" bgColor="black" className="scroll-mt-36">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Why High Schoolers Should Care
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {whyCareItems.map((item, index) => (
              <div
                key={item.title}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-lg shadow-black/40 space-y-4"
              >
                <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center shadow-md shadow-primary-blue/30">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What is Claude */}
      <Section id="what-is-claude" bgColor="black" className="scroll-mt-36">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-10 shadow-lg shadow-black/40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">What is Claude?</h2>
            {whatIsClaude.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-gray-300 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
            <p>
              <ExternalLink href={whatIsClaude.link.href}>{whatIsClaude.link.label}</ExternalLink>
            </p>
          </div>
        </div>
      </Section>

      {/* Tracks + Curriculum (interactive) */}
      <Section bgColor="black" className="scroll-mt-36">
        <CurriculumAndTracks />
      </Section>

      {/* Ongoing habits */}
      <Section id="habits" bgColor="black" className="scroll-mt-36">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ongoing Habits</h2>
            <p className="text-gray-300">
              Do these every month, no matter what phase you&apos;re in:
            </p>
          </div>
          <ul className="space-y-4">
            {ongoingHabits.map((habit) => (
              <li key={habit} className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-primary-blue flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </span>
                <span className="text-gray-300 leading-relaxed">{habit}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Certificates */}
      <Section id="certificates" bgColor="black" className="scroll-mt-36">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Certificates &amp; What to Do With Them
            </h2>
            <p className="text-gray-300">
              All courses are at{' '}
              <ExternalLink href="https://anthropic.skilljar.com">anthropic.skilljar.com ↗</ExternalLink>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificateItems.map((cert) => (
              <div
                key={cert.name}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg shadow-black/40"
              >
                <h3 className="font-bold text-white mb-1">{cert.name}</h3>
                <p className="text-gray-400 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 space-y-4">
            <h3 className="text-xl font-bold text-white">What to do with them</h3>
            <ul className="space-y-3">
              {certificateUses.map((use) => (
                <li key={use} className="flex items-start gap-3 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-primary-blue mt-2 shrink-0" />
                  {use}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Educators */}
      <Section id="educators" bgColor="black" className="scroll-mt-36">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">For Teachers</h2>
            <p className="text-lg text-gray-300 leading-relaxed">{educatorsContent.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-3">
              <h3 className="text-lg font-bold text-primary-blue">Semester Plan</h3>
              <p className="text-gray-300 leading-relaxed">{educatorsContent.semesterPlan}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-3">
              <h3 className="text-lg font-bold text-primary-blue">Full-Year Plan</h3>
              <p className="text-gray-300 leading-relaxed">{educatorsContent.fullYearPlan}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Classroom Ideas</h3>
            <ul className="space-y-3">
              {educatorsContent.classroomIdeas.map((idea) => (
                <li key={idea} className="flex items-start gap-3 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-primary-blue mt-2 shrink-0" />
                  {idea}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Useful Teacher Resources</h3>
            <ul className="space-y-3">
              {educatorsContent.resources.map((resource) => (
                <li key={resource.href}>
                  <ExternalLink href={resource.href}>{resource.label} ↗</ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Resource hub */}
      <Section id="resources" bgColor="black" className="scroll-mt-36">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Resource Hub</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceHubLinks.map((resource) => (
              <a
                key={resource.href + resource.title}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg shadow-black/40 hover:border-primary-blue/40 transition-colors group"
              >
                <h3 className="font-bold text-white group-hover:text-primary-blue transition-colors mb-2">
                  {resource.title} ↗
                </h3>
                <p className="text-sm text-gray-400">{resource.description}</p>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* Back to insights */}
      <Section bgColor="black">
        <div className="text-center">
          <Link
            href="/insights"
            className="text-primary-blue font-semibold hover:underline"
          >
            ← Back to all Insights
          </Link>
        </div>
      </Section>
    </article>
  );
}
