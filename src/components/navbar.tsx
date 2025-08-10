// FILE: src/components/navbar.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const linkClass = (path: string) => `
    text-white transition-all duration-300 hover:text-purple-400 hover:scale-110
    ${pathname === path ? 'text-purple-400 scale-110' : ''}
  `;

  return (
    <>
      {/* Hamburger Menu - Mobile only */}
      <div className="fixed top-6 left-6 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-md p-2 transition-all duration-300 transform hover:scale-110"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Full Navbar - Desktop only */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 bg-white/5 backdrop-blur-md hidden md:flex justify-between items-center transition-all duration-300">
        {/* Logo / Your Name */}
        <Link href="/">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg transition-colors hover:scale-105">
            Shams&apos;s Portfolio
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-6 md:gap-8 text-lg font-medium">
          <li>
            <Link href="/software">
              <span onClick={handleLinkClick} className={linkClass('/software')}>
                Software Engineer
              </span>
            </Link>
          </li>
          <li>
            <Link href="/video">
              <span onClick={handleLinkClick} className={linkClass('/video')}>
                Video Editor
              </span>
            </Link>
          </li>
          <li>
            <Link href="/graphics">
              <span onClick={handleLinkClick} className={linkClass('/graphics')}>
                Graphics Designer
              </span>
            </Link>
          </li>
          <li>
            <Link href="/resume">
              <span onClick={handleLinkClick} className={linkClass('/resume')}>
                Resume
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Full-screen Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white/5 backdrop-blur-md z-40 md:hidden flex flex-col items-center justify-center space-y-8 animate-fade-in pt-20">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white text-4xl focus:outline-none transition-all duration-300 transform hover:rotate-90"
          >
            &times;
          </button>
          <ul className="flex flex-col items-center space-y-6 text-2xl font-bold">
            <li>
              <Link href="/">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg transition-colors hover:scale-105">
                  Shams&apos;s Portfolio
                </span>
              </Link>
            </li>
            <li>
              <Link href="/software">
                <span onClick={handleLinkClick} className={`text-white transition-all duration-300 hover:text-purple-400 ${pathname === '/software' ? 'text-purple-400' : ''}`}>
                  Software Engineer
                </span>
              </Link>
            </li>
            <li>
              <Link href="/video">
                <span onClick={handleLinkClick} className={`text-white transition-all duration-300 hover:text-purple-400 ${pathname === '/video' ? 'text-purple-400' : ''}`}>
                  Video Editor
                </span>
              </Link>
            </li>
            <li>
              <Link href="/graphics">
                <span onClick={handleLinkClick} className={`text-white transition-all duration-300 hover:text-purple-400 ${pathname === '/graphics' ? 'text-purple-400' : ''}`}>
                  Graphics Designer
                </span>
              </Link>
            </li>
            <li>
              <Link href="/resume">
                <span onClick={handleLinkClick} className={`text-white transition-all duration-300 hover:text-purple-400 ${pathname === '/resume' ? 'text-purple-400' : ''}`}>
                  Resume
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
