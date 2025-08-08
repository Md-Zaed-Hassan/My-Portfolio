import Image from "next/image";
// The GitHubProjectsSection import has been removed from this file.

export default function Home() {
  // The myGithubUsername variable is no longer needed in this file.

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <div className="bg-black/70 rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-xl w-full border border-gray-700">
        <Image
          src="/profile.jpg"
          alt="Md. Zaed Hassan"
          width={140}
          height={140}
          className="rounded-full border-4 border-blue-500 shadow-lg mb-6"
          priority
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 drop-shadow-lg">
          Md. Zaed Hassan
        </h1>
        <h2 className="text-lg sm:text-2xl text-gray-300 mb-2 font-medium tracking-wide text-center">
          Software Engineer, Freelance Video Editor & Graphics Designer
        </h2>
        <p className="text-gray-400 text-center max-w-lg mb-8">
          I solve complex problems with a unique blend of technical engineering and creative communication.
          I don&apos;t just build the application, I design the experience and craft the message. My portfolio showcases my journey through software development, video editing and graphic design.
        </p>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/md-zaed-hassan/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 hover:from-blue-500 hover:to-blue-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Md-Zaed-Hassan"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 bg-gradient-to-r from-gray-700 to-gray-500 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 hover:from-gray-600 hover:to-gray-400"
          >
            GitHub
          </a>
          <a
            href="https://www.hackerrank.com/profile/md_zaed_hassan"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 bg-gradient-to-r from-green-600 to-green-400 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 hover:from-green-500 hover:to-green-300"
          >
            HackerRank
          </a>
        </div>
      </div>
    </main>
  );
}
