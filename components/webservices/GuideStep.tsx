'use client';

import { resolveImageSrc } from '@/lib/webservices/bluehostGuideContent';

type GuideStepProps = {
  stepNumber: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  tips?: string[];
  link?: { href: string; label: string };
};

export default function GuideStep({
  stepNumber,
  title,
  description,
  imageSrc,
  imageAlt,
  tips,
  link,
}: GuideStepProps) {
  const resolvedSrc = resolveImageSrc(imageSrc);

  return (
    <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-blue/20 flex items-center justify-center text-primary-blue font-bold text-lg">
          {stepNumber}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{description}</p>
          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-primary-blue hover:text-primary-blue/80 text-sm font-semibold uppercase tracking-wide underline underline-offset-2"
            >
              {link.label}
            </a>
          )}
          {tips && tips.length > 0 && (
            <ul className="mt-3 space-y-1">
              {tips.map((tip) => (
                <li key={tip} className="text-gray-400 text-sm flex items-start gap-2">
                  <span className="text-primary-blue mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {resolvedSrc && (
        <div className="mt-5 rounded-xl overflow-hidden border border-gray-700/50 bg-gray-950/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolvedSrc}
            alt={imageAlt ?? title}
            className="w-full h-auto max-h-[480px] object-contain object-top"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
