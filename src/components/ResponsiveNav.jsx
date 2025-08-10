// src/components/ResponsiveNav.jsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ResponsiveNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const linkClass = (path) => `
    text-white transition-all duration-300 hover:text-purple-400 hover:scale-110
    ${pathname === path ? 'text-purple-400 scale-110' : ''}
  `;

  return (
    <>
      {/* Mobile-only hamburger menu button and logo header */}
      {isMobile && (
        <header className="fixed top-0 left-0 w-full p-6 z-[60] md:hidden flex justify-between items-center bg-white/5 backdrop-blur-md">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-3 rounded-full bg-white/5 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 transform hover:scale-110"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <Link href="/">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg transition-colors hover:scale-105">
              Shams&apos;s Portfolio
            </span>
          </Link>
        </header>
      )}

      {/* Desktop Navigation (disappears on hover) */}
      {!isMobile && (
        <nav
          className={`fixed top-0 left-0 w-full p-6 z-50 transition-all duration-300 ${isHovered ? 'bg-white/5 backdrop-blur-md opacity-100' : 'bg-transparent opacity-5 hover:opacity-100'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex justify-between items-center">
            {/* Logo / Your Name */}
            <Link href="/">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg transition-colors hover:scale-105">
                Shams&apos;s Portfolio
              </span>
            </Link>
            {/* Navigation Links */}
            <ul className="flex gap-6 md:gap-8 text-lg font-medium">
              <li><Link href="/software"><span onClick={handleLinkClick} className={linkClass('/software')}>Software Engineer</span></Link></li>
              <li><Link href="/video"><span onClick={handleLinkClick} className={linkClass('/video')}>Video Editor</span></Link></li>
              <li><Link href="/graphics"><span onClick={handleLinkClick} className={linkClass('/graphics')}>Graphics Designer</span></Link></li>
              <li><Link href="/resume"><span onClick={handleLinkClick} className={linkClass('/resume')}>Resume</span></Link></li>
            </ul>
          </div>
        </nav>
      )}

      {/* Mobile Sidebar Menu (fixed on screen, visible on button click) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 p-6 z-[50] bg-white/5 backdrop-blur-md transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg mb-8 pt-20">
          Shams&apos;s Portfolio
        </h1>
        <ul className="flex flex-col gap-4 text-lg font-medium">
          <li><Link href="/software"><span onClick={handleLinkClick} className={linkClass('/software')}>Software Engineer</span></Link></li>
          <li><Link href="/video"><span onClick={handleLinkClick} className={linkClass('/video')}>Video Editor</span></Link></li>
          <li><Link href="/graphics"><span onClick={handleLinkClick} className={linkClass('/graphics')}>Graphics Designer</span></Link></li>
          <li><Link href="/resume"><span onClick={handleLinkClick} className={linkClass('/resume')}>Resume</span></Link></li>
        </ul>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-white text-4xl focus:outline-none transition-all duration-300 transform hover:rotate-90"
        >
          &times;
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-[49] bg-black bg-opacity-50 transition-opacity duration-300"
        />
      )}
    </>
  );
};

export default ResponsiveNav;
