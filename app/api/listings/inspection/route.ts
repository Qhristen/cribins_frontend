import { DEFAULT_SOL_ADDRESS, NETWORK } from '@/lib/constant';
import { db, auth } from '@/lib/firebase/firebase-admin';
import { createEventWithMeet } from '@/lib/googleapis';
import { sendEmail } from '@/lib/mailer';
import { Property, User } from '@/types';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { encodeURL, findReference, validateTransfer } from '@solana/pay';
import BigNumber from 'bignumber.js';

interface RequestInspection {
  propertyId: string;
  inspectionDate: string;
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
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();

    if (!propertyDoc.exists) {
      return Response.json({ message: 'user not found' }, { status: 404 });
    }
    const user = { id: userDoc.id, ...userDoc.data() } as User;

    const property = { id: propertyDoc.id, ...propertyDoc.data() } as Property;

    await db.collection('inspections').add({
      user,
      property,
      status: 'scheduled',
      inspectionDate: body.inspectionDate,
      createdAt: new Date().toISOString()
    });

    return new Response(JSON.stringify({ message: 'Success' }), {
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
