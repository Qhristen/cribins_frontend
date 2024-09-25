import { db, auth } from '@/lib/firebase/firebase-admin';
import { createEventWithMeet } from '@/lib/googleapis';
import { Property, User } from '@/types';

interface RequestInspection {
  propertyId: string;
}

export async function POST(req: Request) {
  let body: RequestInspection;

  try {
    body = await req.json();
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Invalid JSON' }), {
      status: 400
    });
  }

  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return Response.json(
        { message: 'Authorization token is missing' },
        { status: 401 }
      );
    }

    const decodedToken = await auth.verifyIdToken(token); // Verify Firebase token
    const propertyDoc = await db
      .collection('listings')
      .doc(body.propertyId)
      .get();

    if (!propertyDoc.exists) {
      return Response.json({ message: 'property not found' }, { status: 404 });
    }

    const property = propertyDoc.data() as Property;

    await createEventWithMeet({
      summary: `${property.title} inspection`,
      description: 'Discuss project updates and next steps.',
      startDateTime: '2024-09-30T09:00:00-07:00',
      endDateTime: '2024-09-30T10:00:00-07:00',
      timeZone: 'America/Los_Angeles',
      attendees: [`${decodedToken.email}`, ``],
      requestId: `${property.id}-${decodedToken.uid}`,
      sendUpdates: 'all'
    });

    // Create the post in Firestore with an array of image URLs
    const docRef = await db.collection('inspections').add({
      user: {
        email: decodedToken?.email,
        id: decodedToken?.uid
      },
      property,
      createdAt: new Date().toISOString()
    });

    return new Response(JSON.stringify({ id: docRef.id, message: 'Success' }), {
      status: 200
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Error requesting property inspection',
        error
      }),
      { status: 500 }
    );
  }
}
