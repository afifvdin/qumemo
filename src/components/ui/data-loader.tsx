"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function DataLoader() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center font-sans">
      <DotLottieReact
        src="/loading.lottie"
        loop
        autoplay
        className="w-full sm:h-64 sm:w-auto"
      />
      <p className="text-2xl font-black sm:text-3xl">Just a seconds...</p>
    </div>
  );
}
