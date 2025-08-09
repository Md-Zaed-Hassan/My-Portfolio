// src/components/DesignGallery.jsx
"use client";

import React, { useState, useEffect } from 'react';

// A component to display a modal with the full-size image.
const Modal = ({ imageUrl, onClose, altText }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
      <div className="relative max-w-[90vw] max-h-[90vh] transform transition-transform duration-300 scale-95 animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold bg-white bg-opacity-10 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 hover:bg-opacity-20 hover:scale-110"
        >
          <img src="/x-button.png" alt="Close button" className="w-6 h-6" />
        </button>
        <img
          src={imageUrl}
          alt={altText}
          className="rounded-lg shadow-2xl max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

// The main DesignGallery component.
const DesignGallery = () => {
  const [designs, setDesigns] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch('/api/designs');
        if (!response.ok) {
          throw new Error('Failed to fetch designs.');
        }
        const data = await response.json();
        setDesigns(data);
      } catch (error) {
        console.error("Error fetching designs:", error);
      }
    };
    fetchDesigns();
  }, []);

  return (
    <section className="container mx-auto p-8">
      {/* The grid changes its number of columns based on screen size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in-up">
        {designs.map((design) => (
          <div
            key={design.id}
            onClick={() => setSelectedImage({ src: design.src, alt: design.alt })}
            className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={design.src}
              alt={design.alt}
              className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-80 bg-gray-900"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/500x500/171717/ededed?text=Image+Not+Found';
              }}
            />
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-center text-lg font-semibold">{design.alt}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <Modal imageUrl={selectedImage.src} altText={selectedImage.alt} onClose={() => setSelectedImage(null)} />
      )}
    </section>
  );
};

export default DesignGallery;
