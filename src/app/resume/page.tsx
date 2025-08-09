// FILE: src/app/resume/page.tsx
"use client";

import Link from 'next/link';
import GradientTitle from '../../components/GradientTitle';

export default function ResumePage() {
  const resumeUrl = "/resume/Md_Zaed_Hassan_resume.pdf"; // Correct path to your resume PDF
  const resumePreviewUrl = "/resume/Md_Zaed_Hassan_Resume_Preview.jpg"; // Correct filename casing

  return (
    <main className="flex flex-col items-center p-8 min-h-screen text-gray-900 dark:text-gray-100">
      <GradientTitle>
        My Resume
      </GradientTitle>
      <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
        Here&apos;s a preview of my resume.
      </p>

      {/* Container for the static image preview */}
      <div className="mt-8 w-full max-w-4xl rounded-lg shadow-xl overflow-hidden">
        <img
          src={resumePreviewUrl}
          alt="Resume Preview"
          className="w-full h-auto object-contain"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = 'https://placehold.co/800x1000/171717/ededed?text=Preview+Not+Available';
          }}
        />
      </div>

      {/* Download button */}
      <div className="mt-8">
        <Link href={resumeUrl} passHref download>
          <button 
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Download Resume
          </button>
        </Link>
      </div>
    </main>
  );
}
