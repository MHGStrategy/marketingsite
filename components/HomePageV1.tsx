'use client';

import Section from '@/components/Section';
import CTAButton from '@/components/CTAButton';
import SolutionsEngagementModels from '@/components/solutions/SolutionsEngagementModels';
import { mediaAssets } from '@/lib/media/assets';

export default function HomePageV1() {
  return (
    <>
      <Section
        fullWidth
        className="relative !pt-0 !pb-0 w-screen max-w-none min-h-[70vh] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('${mediaAssets.hero}')` }}
      >
        <div className="relative z-10 flex h-[70vh] items-end justify-center px-4 sm:px-6 md:px-8 lg:px-12 pb-10 md:pb-12 lg:pb-14">
          <div className="w-full max-w-5xl text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-blue drop-shadow">
              Digital Transformation & Automation
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow">
              Establish a <span className="text-primary-blue">Governed Financial Infrastructure</span> Built for Enterprise Scale
            </h1>
            <p className="text-lg md:text-xl text-gray-100 md:text-gray-200 leading-relaxed max-w-4xl mx-auto drop-shadow">
              From digital transformation and agentic AI to managed finance operations — we architect, deploy, and run the operational systems that let your business execute at scale without manual overhead.
            </p>
          </div>
        </div>
      </Section>

      <Section id="transform-strategy" className="bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 px-8 py-10 md:px-12 md:py-12 space-y-8 md:space-y-10">
            <div className="text-center space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">Execution system</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-black">
                Transform Strategy into a Scalable Operating System
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Move beyond isolated initiatives. Our team architects and embeds finance operations, advanced analytics, and intelligent automation directly into your existing systems—delivering compounding operational returns across every reporting cycle.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="text-center space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-blue">How we deliver</p>
                <h3 className="text-2xl md:text-3xl font-bold text-primary-black">Our Process</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-gray-200/60">
                  <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center mb-6 shadow-md shadow-primary-blue/30">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h4 className="text-2xl font-bold text-primary-black mb-3">Discover</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Conduct a structured assessment of data governance, reporting integrity, process gaps, and automation maturity to establish a reliable operational baseline.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-gray-200/60">
                  <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center mb-6 shadow-md shadow-primary-blue/30">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h4 className="text-2xl font-bold text-primary-black mb-3">Design</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Develop a unified operating architecture that maps process lifecycle stages, system interdependencies, performance metrics, and automation priorities to your strategic objectives.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-gray-200/60">
                  <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center mb-6 shadow-md shadow-primary-blue/30">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h4 className="text-2xl font-bold text-primary-black mb-3">Deploy</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Implement governed KPI frameworks, automated workflows, and standardized operating cadences—continuously refined through structured performance reviews as organizational needs evolve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section bgColor="gray" id="solutions">
        <SolutionsEngagementModels showFeaturedCard={false} showV1Bridge />
      </Section>

      <Section bgColor="blue" id="alignment-call" className="bg-gradient-to-b from-primary-blue to-primary-blue/90">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[22px] p-[1.5px] bg-gradient-to-br from-gray-200 via-gray-50 to-gray-400 shadow-xl shadow-blue-900/25">
            <div className="bg-white rounded-[20px] border border-blue-100 px-6 py-8 md:px-10 md:py-12 text-center space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">Next step</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-black">
                Project Intake & Alignment
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Share a brief overview of your finance operations challenges, goals, and current systems. We&apos;ll review your submission, assess fit and urgency, and follow up with the most appropriate next step—whether that&apos;s an exploratory call, a scoped recommendation, or a referral.
              </p>
              <div className="pt-2">
                <CTAButton href="/contact" variant="primary">
                  Start the Conversation
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="features">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <div className="text-center space-y-4 bg-white rounded-2xl shadow-lg shadow-gray-200/60 p-8 md:p-10 border border-gray-100">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-black">
                Visualize What Matters. Optimize What Grows.
              </h3>
              <div className="flex justify-center">
                <img
                  src={mediaAssets.visualizeWhatMatters}
                  alt="Visualize what matters illustration"
                  className="max-w-md w-full rounded-xl shadow-lg shadow-gray-300/60 border border-gray-100 object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Deliver board-ready financial intelligence without the overhead of complex BI infrastructure—underpinned by governed metrics, validated data, and a reporting layer designed for executive decision-making.
              </p>
            </div>

            <div className="text-center space-y-4 bg-white rounded-2xl shadow-lg shadow-gray-200/60 p-8 md:p-10 border border-gray-100">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-black">
                Win More Clients. Keep Them Growing.
              </h3>
              <div className="flex justify-center">
                <img
                  src={mediaAssets.winMoreClients}
                  alt="Win more clients illustration"
                  className="max-w-md w-full rounded-xl shadow-lg shadow-gray-300/60 border border-gray-100 object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Blend automation with finance operations intelligence to cut manual work, de-risk delivery, and accelerate planning, reporting, and close cycles.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section bgColor="black" id="final-cta">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Is Your Business Built to Operate Without You in Every Process?
          </h2>
          <div className="flex justify-center py-4">
            <div className="overflow-hidden w-80 h-80 max-w-md">
              <img
                src={mediaAssets.revenueRing}
                alt="Finance operating model illustration"
                className="w-full h-full shadow-2xl shadow-black/50 object-contain animate-rotate-6rpm border-0"
                style={{ border: 'none', outline: 'none' }}
                loading="lazy"
              />
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Whether your priority is transforming business operations with AI, establishing governed finance infrastructure, or transferring full operational ownership to a managed partner — we architect, deploy, and run the systems. With autonomous AI agents at the core, your business doesn&apos;t just scale. It operates.
          </p>
          <div className="pt-6">
            <CTAButton href="/contact" variant="primary">
              Request an Engagement Assessment
            </CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
