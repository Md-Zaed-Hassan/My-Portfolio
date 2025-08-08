// FILE: src/components/navbar.tsx

import Link from 'next/link'; // Import the Link component for fast navigation

const Navbar = () => {
  return (
    <nav className="w-full p-6 bg-background flex justify-between items-center">
      {/* Logo / Your Name */}
      <Link href="/">
        <span className="text-2xl font-bold text-text-heading hover:text-accent transition-colors">
          Shams&apos;s Portfolio
        </span>
      </Link>

      {/* Navigation Links */}
      <ul className="flex gap-6 md:gap-8">
        <li>
          <Link href="/software">
            <span className="text-lg text-text-primary hover:text-accent transition-colors">
              Software Engineer
            </span>
          </Link>
        </li>
        <li>
          <Link href="/video">
            <span className="text-lg text-text-primary hover:text-accent transition-colors">
              Video Editor
            </span>
          </Link>
        </li>
        <li>
          <Link href="/graphics">
            <span className="text-lg text-text-primary hover:text-accent transition-colors">
              Graphics Designer
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
