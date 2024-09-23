import { db } from '@/lib/firebase/firebase-admin';

export async function GET(request: Request) {
  try {
    const snapshot = await db.collection('listings').get();

    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error fetching posts', error }),
      {
        status: 500
      }
    );
  }
}
