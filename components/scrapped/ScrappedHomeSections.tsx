'use client';

import Section from '@/components/Section';
import { scrappedPageContent as content } from '@/lib/content/scrappedPageContent';
import { mediaAssets } from '@/lib/media/assets';

export default function ScrappedHomeSections() {
  return (
    <>
      <Section bgColor="gray" id="modern-customers">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 px-8 py-10 md:px-12 md:py-12 text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
              {content.modernCustomers.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-black">
              {content.modernCustomers.headline}
            </h2>
            <div className="flex justify-center">
              <img
                src={mediaAssets.expectMore}
                alt="Speed, accuracy, and frictionless enterprise operations illustration"
                className="max-w-3xl w-full rounded-xl shadow-lg shadow-gray-300/60 border border-gray-100 object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">{content.modernCustomers.body}</p>
          </div>
        </div>
      </Section>

      <Section id="features">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <div className="text-center space-y-4 bg-white rounded-2xl shadow-lg shadow-gray-200/60 p-8 md:p-10 border border-gray-100">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-black">{content.features[0].title}</h3>
              <div className="flex justify-center">
                <img
                  src={mediaAssets.visualizeWhatMatters}
                  alt={content.features[0].imageAlt}
                  className="max-w-md w-full rounded-xl shadow-lg shadow-gray-300/60 border border-gray-100 object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">{content.features[0].body}</p>
            </div>
            <div className="text-center space-y-4 bg-white rounded-2xl shadow-lg shadow-gray-200/60 p-8 md:p-10 border border-gray-100">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-black">{content.features[1].title}</h3>
              <div className="flex justify-center">
                <img
                  src={mediaAssets.winMoreClients}
                  alt={content.features[1].imageAlt}
                  className="max-w-md w-full rounded-xl shadow-lg shadow-gray-300/60 border border-gray-100 object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">{content.features[1].body}</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
