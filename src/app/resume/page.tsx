// FILE: src/app/resume/page.tsx
"use client";

export default function ResumePage() {
  const resumeUrl = "/resume/Md_Zaed_Hassan_Resume.pdf"; // Correct path to your resume PDF
  const resumePreviewUrl = "/resume/Md_Zaed_Hassan_Resume_Preview.jpg"; // Path to a preview image of your resume

  return (
    <main className="flex flex-col items-center p-8 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-5xl font-bold text-blue-700 dark:text-blue-300">
        My Resume
      </h1>
      <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
        Here's a preview of my resume.
      </p>

      {/* Container for the static image preview */}
      <div className="mt-8 w-full max-w-4xl rounded-lg shadow-xl overflow-hidden">
        <img
          src={resumePreviewUrl}
          alt="Resume Preview"
          className="w-full h-auto object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/800x1000/171717/ededed?text=Preview+Not+Available';
          }}
        />
      </div>

      {/* Download button */}
      <div className="mt-8">
        <a href={resumeUrl} download>
          <button 
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Download Resume
          </button>
        </a>
      </div>
    </main>
  );
}
