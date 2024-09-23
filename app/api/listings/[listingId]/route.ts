import { db } from '@/lib/firebase/firebase-admin';

// Main handler for all methods (GET, PATCH, DELETE)
export async function GET(
  request: Request,
  { params }: { params: { listingId: string } }
) {
  const id = params.listingId;

  try {
    const doc = await db.collection('listings').doc(id).get();

    if (!doc.exists) {
      return Response.json({ message: 'Listing not found' }, { status: 404 });
    }

    return Response.json(doc.data(), { status: 200 });
  } catch (error) {
    return Response.json(
      { message: 'Error fetching data', error },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { listingId: string } }
) {
  const id = params.listingId;

  try {
    const body = await request.json();
    const { title, content, imageUrls } = body;

    if (!title && !content && !Array.isArray(imageUrls)) {
      return Response.json(
        { message: 'At least one field must be provided for update' },
        { status: 400 }
      );
    }

    const postRef = db.collection('listings').doc(id);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      return Response.json({ message: 'Listing not found' }, { status: 404 });
    }

    const updatedData: Partial<{
      title: string;
      content: string;
      imageUrls: string[];
    }> = {};
    if (title) updatedData.title = title;
    if (content) updatedData.content = content;
    if (Array.isArray(imageUrls)) updatedData.imageUrls = imageUrls;

    await postRef.update(updatedData);

    return Response.json(
      { message: 'Listing updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: 'Error updating data', error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { listingId: string } }
) {
  const id = params.listingId;

  try {
    const postRef = db.collection('listings').doc(id);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      return Response.json({ message: 'Listing not found' }, { status: 404 });
    }

    await postRef.delete();

    return Response.json(
      { message: 'Listing deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: 'Error deleting data', error },
      { status: 500 }
    );
  }
}
