// src/components/PdfViewer.jsx
"use client";

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Fix the path to the PDF worker file
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf/pdf.worker.min.js`;

const PdfViewer = ({ resumeUrl }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="mt-8 w-full max-w-4xl rounded-lg shadow-xl overflow-hidden bg-gray-900">
      <Document
        file={resumeUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="w-full flex justify-center"
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div key={`page_${index + 1}`} className="my-4">
            <Page 
              pageNumber={index + 1} 
              renderTextLayer={false} 
              renderAnnotationLayer={false} 
            />
          </div>
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
