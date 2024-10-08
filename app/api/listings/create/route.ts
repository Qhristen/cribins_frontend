import { db } from '@/lib/firebase/firebase-admin';
import { Property } from '@/types';

export async function POST(req: Request) {
  let body: Property;

  try {
    body = await req.json();
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Invalid JSON' }), {
      status: 400
    });
  }

  const {
    title,
    description,
    imageUrls,
    address,
    location,
    price,
    propertyStatus,
    propertyType
  } = body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !price ||
    !propertyStatus ||
    !propertyType ||
    !address ||
    !location ||
    !Array.isArray(imageUrls)
  ) {
    return new Response(
      JSON.stringify({
        message: 'Title, content, and image URLs are required'
      }),
      { status: 400 }
    );
  }

  try {
    // Create the post in Firestore with an array of image URLs
    const docRef = await db.collection('listings').add({
      title,
      address,
      location,
      price,
      propertyStatus,
      description,
      propertyType,
      imageUrls, // Save array of image URLs
      createdAt: new Date().toISOString()
    });

    return new Response(
      JSON.stringify({ id: docRef.id, message: 'Successfully created' }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error listing property', error }),
      { status: 500 }
    );
  }
}
