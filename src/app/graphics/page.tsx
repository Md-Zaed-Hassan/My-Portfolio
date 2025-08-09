// FILE: src/app/graphics/page.tsx

import DesignGallery from '../../components/DesignGallery';
import GradientTitle from '../../components/GradientTitle';

export default function GraphicsPage() {
  return (
    <main className="flex flex-col items-center p-8 min-h-screen text-gray-900 dark:text-gray-100">
      <GradientTitle>
        Graphics Designer Portfolio
      </GradientTitle>
      <p className="mt-4 text-xl sm:text-2xl text-gray-400 text-center">
        A gallery of my creative work.
      </p>

      {/* Render the DesignGallery component */}
      <DesignGallery />
    </main>
  );
}