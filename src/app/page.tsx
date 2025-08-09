import Image from "next/image";
import GradientTitle from '@/components/GradientTitle';
import Link from 'next/link';

export default function Home() {
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
        <GradientTitle>
          Md. Zaed Hassan
        </GradientTitle>
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
            className="p-3 transition-transform duration-200 hover:scale-110"
          >
            <img src="/logo/LinkedIn.png" alt="LinkedIn Logo" className="h-20 w-20" />
          </a>
          <a
            href="https://github.com/Md-Zaed-Hassan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 transition-transform duration-200 hover:scale-110"
          >
            <img src="/logo/Github.png" alt="GitHub Logo" className="h-20 w-20" />
          </a>
          <a
            href="https://www.hackerrank.com/profile/md_zaed_hassan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 transition-transform duration-200 hover:scale-110"
          >
            <img src="/logo/Hackerrank.png" alt="HackerRank Logo" className="h-20 w-20" />
          </a>
        </div>
      </div>
    </main>
  );
}
