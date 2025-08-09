// FILE: src/app/software/page.tsx

import GitHubProjectsSection from '../../components/GitHubProjectsSection';
import GradientTitle from '../../components/GradientTitle';

export default function SoftwarePage() {
  const myGithubUsername = 'Md-Zaed-Hassan';

  return (
    <main className="flex flex-col items-center p-8 min-h-screen text-gray-900 dark:text-gray-100">
      <GradientTitle>
        Software Engineer Portfolio
      </GradientTitle>
      <p className="mt-4 text-xl sm:text-2xl text-gray-400 text-center">
        Here are my Projects...
      </p>

      {/* Render the GitHub Projects Section component, passing your username */}
      <GitHubProjectsSection githubUsername={myGithubUsername} />
    </main>
  );
}
