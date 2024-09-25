import { db } from '@/lib/firebase/firebase-admin';
import { Property } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url); // Extract the search parameters
  const query = searchParams.get('q'); // Example of getting a 'query' parameter

  try {
    const snapshot = await db.collection('listings').get();

    const data = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data()
        }) as Property
    );

    if (query) {
      data.filter((property) => {
        const filterdData = property.title
          .toLowerCase()
          .includes(query.toLowerCase());

        return new Response(JSON.stringify(filterdData), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      });
    }

    return new Response(JSON.stringify(data), {
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
