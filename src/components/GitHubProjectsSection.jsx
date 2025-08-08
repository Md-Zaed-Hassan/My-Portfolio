// src/components/GitHubProjectsSection.jsx
// This component fetches and displays public repositories for a given GitHub username.

"use client"; // This must be the very first line of the file, with no extra characters.

import React, { useState, useEffect } from 'react';

// Define the component to accept githubUsername as a prop
const GitHubProjectsSection = ({ githubUsername }) => {
  // State to store the fetched projects. Initialized as an empty array.
  const [projects, setProjects] = useState([]);
  // State to manage the loading status during API calls.
  const [isLoading, setIsLoading] = useState(true); // Start as true to load on mount
  // State to store any error messages that occur during API calls.
  const [error, setError] = useState(null);

  // useEffect hook to fetch projects when the component mounts or username changes.
  useEffect(() => {
    const fetchGithubProjects = async () => {
      setError(null);
      setIsLoading(true);

      if (!githubUsername) {
        setError('GitHub username not provided.');
        setIsLoading(false);
        setProjects([]); // Clear projects if username is missing
        return;
      }

      try {
        // Construct the GitHub API URL for user repositories.
        // We're fetching up to 9 most recently updated public repos.
        const apiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=9`;

        // Make the API call using fetch.
        const response = await fetch(apiUrl);

        // Check if the response was successful (status code 2xx).
        if (!response.ok) {
          // If not successful, throw an error with the status text.
          throw new Error(`GitHub API Error: ${response.statusText} (Status: ${response.status})`);
        }

        // Parse the JSON response.
        const data = await response.json();

        // Map the raw GitHub data to our desired project structure.
        // Filter out forks if you only want original projects.
        const formattedProjects = data
          .filter(repo => !repo.fork) // Exclude forked repositories
          .map(repo => ({
            id: repo.id,
            title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Format name (e.g., "my-repo" -> "My Repo")
            description: repo.description || 'No description provided.',
            technologies: repo.language ? [repo.language] : [], // Use primary language as a technology
            githubLink: repo.html_url,
            liveLink: repo.homepage || null, // Use homepage if available for live demo
            // Generate a random placeholder image based on repo name for variety
            imageUrl: `https://placehold.co/600x400/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${repo.name.substring(0, 15)}`
          }));

        // Update the projects state with the fetched and formatted data.
        setProjects(formattedProjects);
      } catch (err) {
        // Catch any errors during the fetch process and update the error state.
        console.error('Failed to fetch GitHub projects:', err);
        setError(`Failed to load projects: ${err.message}. Please ensure the GitHub username is correct and you have an internet connection.`);
      } finally {
        // Always set loading state to false after the API call completes.
        setIsLoading(false);
      }
    };

    fetchGithubProjects(); // Call the fetch function when component mounts or username changes
  }, [githubUsername]); // Dependency array: re-run effect if githubUsername changes

  return (
    // Main container for the Projects section.
    // Uses a full-width container with responsive padding and background color.
    <section id="projects" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-600 dark:text-blue-400">
          My GitHub Projects
        </h2>

        {/* Loading, Error, and No Projects Messages */}
        {isLoading && (
          <p className="text-center text-blue-500 dark:text-blue-300 text-lg mb-8">Loading projects from GitHub...</p>
        )}
        {error && (
          <p className="text-center text-red-600 dark:text-red-400 text-lg mb-8">{error}</p>
        )}
        {!isLoading && !error && projects.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
            No public repositories found for this GitHub username, or they are all forks.
          </p>
        )}

        {/* Grid for project cards.
            Uses Tailwind's grid system for responsive layout:
            - 1 column on small screens (default)
            - 2 columns on medium screens (md:grid-cols-2)
            - 3 columns on large screens (lg:grid-cols-3)
            Adds a gap between grid items.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            // Individual project card.
            // Uses a rounded-lg white background with shadow for a clean look.
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Project image */}
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover object-center rounded-t-xl"
                // Fallback for image loading errors
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = 'https://placehold.co/600x400/cccccc/333333?text=Image+Not+Found';
                }}
              />
              <div className="p-6">
                {/* Project title */}
                <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  {project.title}
                </h3>
                {/* Project description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                {/* Technologies used */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {/* Action buttons (GitHub and Live Demo) */}
                <div className="flex justify-start space-x-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    {/* GitHub icon (using a simple SVG for demonstration) */}
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.499.09.679-.217.679-.481 0-.237-.008-.865-.013-1.702-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.618.069-.606.069-.606 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.089 2.91.835.09-.647.35-1.089.636-1.338-2.22-.253-4.555-1.113-4.555-4.953 0-1.096.392-1.988 1.03-2.69-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.025 2.747-1.025.546 1.379.202 2.398.099 2.65.648.702 1.029 1.593 1.029 2.69 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C21.137 20.198 24 16.442 24 12.017 24 6.484 19.523 2 14 2h-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    GitHub
                  </a>
                  {project.liveLink && ( // Only show live demo button if a link exists
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                      {/* External link icon (using a simple SVG for demonstration) */}
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubProjectsSection;
