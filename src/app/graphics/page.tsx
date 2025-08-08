// FILE: src/app/graphics/page.tsx

import DesignGallery from '../../components/DesignGallery';

export default function GraphicsPage() {
  return (
    <main className="flex flex-col items-center p-8 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 drop-shadow-lg text-center transition-all duration-300 transform hover:scale-105">
        Graphics Designer Portfolio
      </h1>
      <p className="mt-4 text-xl sm:text-2xl text-gray-400 text-center">
        A gallery of my creative work.
      </p>

      {/* Render the DesignGallery component */}
      <DesignGallery />
    </main>
  );
}
