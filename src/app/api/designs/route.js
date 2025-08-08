// FILE: src/app/api/designs/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const publicDir = path.join(process.cwd(), 'public');
  const designsDir = path.join(publicDir, 'designs');

  // Add a check to ensure the directory exists before trying to read it.
  if (!fs.existsSync(designsDir)) {
    console.warn('Designs directory not found at:', designsDir);
    return NextResponse.json([]); // Return an empty array to prevent client error
  }

  try {
    const filenames = fs.readdirSync(designsDir);

    // Create a list of design objects with relative paths for the client
    const designs = filenames.map((filename, index) => ({
      id: index + 1,
      src: `/designs/${filename}`,
      alt: `Design ${index + 1}` // Placeholder alt text
    }));

    return NextResponse.json(designs);
  } catch (error) {
    console.error('Error reading designs folder:', error);
    return NextResponse.json({ error: 'Failed to read designs folder.' }, { status: 500 });
  }
}
