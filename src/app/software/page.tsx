// FILE: src/app/software/page.tsx

import GitHubProjectsSection from '../../components/GitHubProjectsSection';

export default function SoftwarePage() {
  // Replace 'Md-Zaed-Hassan' with your actual GitHub username.
  const myGithubUsername = 'Md-Zaed-Hassan';

  return (
    <main className="flex flex-col items-center p-8 min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <h1 className="text-5xl font-bold text-blue-700 dark:text-blue-300">
        Software Engineer Portfolio
      </h1>
      <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
        Here are my Projects...
      </p>

      {/* Render the GitHub Projects Section component, passing your username */}
      <GitHubProjectsSection githubUsername={myGithubUsername} />
    </main>
  );
}
