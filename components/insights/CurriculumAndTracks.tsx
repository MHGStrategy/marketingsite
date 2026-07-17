'use client';

import { useState } from 'react';
import {
  curriculumPhases,
  trackOptions,
  type CurriculumPhase,
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

function PhasePanel({
  phase,
  isActive,
  isOpen,
  onToggle,
}: {
  phase: CurriculumPhase;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `phase-panel-${phase.id}`;
  const headerId = `phase-header-${phase.id}`;

  return (
    <div
      className={`border border-gray-800 rounded-2xl overflow-hidden transition-opacity ${
        isActive ? 'opacity-100' : 'opacity-50'
      }`}
    >
      <button
        type="button"
        id={headerId}
        className="w-full flex items-start justify-between gap-4 p-6 md:p-8 text-left bg-gray-900 hover:bg-gray-800/80 transition-colors"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-blue">
            Phase {phase.number} — {phase.timeline}
            {!isActive && (
              <span className="ml-2 normal-case tracking-normal text-gray-500 font-medium">
                (Optional / Full Track)
              </span>
            )}
          </p>
          <h3 className="text-lg md:text-xl font-bold text-white">{phase.title}</h3>
          <p className="text-gray-400 text-sm md:text-base">{phase.tagline}</p>
        </div>
        <span className="text-primary-blue text-xl shrink-0 mt-1" aria-hidden>
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          className="px-6 md:px-8 pb-6 md:pb-8 bg-gray-900 border-t border-gray-800 space-y-6"
        >
          {phase.note && (
            <p className="text-sm text-gray-300 bg-gray-800/60 border border-gray-700 rounded-xl p-4 leading-relaxed">
              <span className="font-semibold text-white">Note: </span>
              {phase.note}
            </p>
          )}

          <div>
            <h4 className="font-bold text-white mb-3">What you&apos;ll learn</h4>
            <ul className="space-y-2">
              {phase.learnItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-primary-blue mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Courses to take (all free)</h4>
            <ul className="space-y-2">
              {phase.courses.map((course) => (
                <li key={course.href + course.label}>
                  <ExternalLink href={course.href}>{course.label} ↗</ExternalLink>
                </li>
              ))}
            </ul>
          </div>

          {phase.certificates.length > 0 && (
            <div>
              <h4 className="font-bold text-white mb-3">Certificates you can earn</h4>
              <div className="flex flex-wrap gap-2">
                {phase.certificates.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-blue/20 text-primary-blue"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-bold text-white mb-2">Capstone project</h4>
            <p className="text-gray-300 leading-relaxed">{phase.capstone}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CurriculumAndTracks() {
  const [track, setTrack] = useState<'fast' | 'full'>('fast');
  const [openPhaseId, setOpenPhaseId] = useState<string>(curriculumPhases[0].id);

  const activePhases =
    track === 'fast' ? trackOptions.fast.activePhases : trackOptions.full.activePhases;

  return (
    <>
      <section id="curriculum" className="scroll-mt-36">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              The 5-Phase Curriculum
            </h2>
            <p className="text-gray-300">
              Expand each phase to see what you&apos;ll learn, which courses to take, and your
              capstone project.
            </p>
          </div>

          <div id="tracks" className="scroll-mt-36 space-y-6">
            <div className="text-center space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Pick Your Track</h3>
              <p className="text-gray-300">
                Choose the path that fits your goals — highlighted phases below match your selection.
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              role="group"
              aria-label="Learning track selection"
            >
              {(['fast', 'full'] as const).map((key) => {
                const option = trackOptions[key];
                const selected = track === key;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setTrack(key)}
                    className={`text-left p-6 md:p-8 rounded-2xl border-2 transition-all ${
                      selected
                        ? 'border-primary-blue bg-primary-blue/10 shadow-lg shadow-primary-blue/20'
                        : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                    }`}
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-blue mb-2">
                      Track {key === 'fast' ? 'A' : 'B'} — {option.subtitle}
                    </p>
                    <h4 className="text-lg font-bold text-white mb-2">{option.label}</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      <span className="font-semibold text-white">Best for: </span>
                      {option.bestFor}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold text-white">Outcome: </span>
                      {option.outcome}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {curriculumPhases.map((phase) => (
              <PhasePanel
                key={phase.id}
                phase={phase}
                isActive={activePhases.includes(phase.number)}
                isOpen={openPhaseId === phase.id}
                onToggle={() => setOpenPhaseId(openPhaseId === phase.id ? '' : phase.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
