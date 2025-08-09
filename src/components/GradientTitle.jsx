// src/components/GradientTitle.jsx
"use client";

import React from 'react';

const GradientTitle = ({ children }) => {
  return (
    <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 drop-shadow-lg text-center transition-all duration-300 transform hover:scale-105">
      {children}
    </h1>
  );
};

export default GradientTitle;
