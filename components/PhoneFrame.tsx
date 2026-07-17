'use client';

import Image from 'next/image';
import { useState } from 'react';

type PhoneFrameProps = {
  src: string;
  alt: string;
  fallbackLabel?: string;
};

export function PhoneFrame({ src, alt, fallbackLabel }: PhoneFrameProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[260px] rounded-[2rem] border-[6px] border-neutral-800 bg-black shadow-2xl shadow-black/50 overflow-hidden">
      <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-neutral-800" />
      {imageFailed ? (
        <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-neutral-800 to-neutral-900 p-6 pt-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
            {fallbackLabel ?? alt}
          </span>
          <span className="mt-2 text-[10px] text-white/50">Run npm run shots</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="260px"
          className="pointer-events-none object-cover object-top"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}
