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
}

const paymentRequests = new Map<
  string,
  { recipient: PublicKey; amount: BigNumber; memo: string }
>();

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

    const amount = new BigNumber(property.price); // I0.0001 SOL
    const label = 'QuickNode Guide Store';
    const memo = 'Solana Pay Memo';

    const reference = new Keypair().publicKey;
    const message = `${property.title} Inspection - ${property.id}`;
    const urlData = await generateUrl(
      DEFAULT_SOL_ADDRESS,
      amount,
      reference,
      label,
      message,
      memo
    );
    const ref = reference.toBase58();
    paymentRequests.set(ref, { recipient: DEFAULT_SOL_ADDRESS, amount, memo });
    const { url } = urlData;

    return new Response(JSON.stringify({ url, ref, message: 'Success' }), {
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

export async function GET(
  req: Request,
  { query }: { query: { reference: string; propertyId: string } }
) {
  const reference = query.reference;
  const propertyId = query.propertyId;
  if (!reference) {
    return Response.json(
      { message: 'Missing reference query parameter' },
      { status: 400 }
    );
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
    const propertyDoc = await db.collection('listings').doc(propertyId).get();

    if (!propertyDoc.exists) {
      return Response.json({ message: 'property not found' }, { status: 404 });
    }
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();

    if (!propertyDoc.exists) {
      return Response.json({ message: 'user not found' }, { status: 404 });
    }

    const user = { id: userDoc.id, ...userDoc.data() } as User;

    const property = { id: propertyDoc.id, ...propertyDoc.data() } as Property;

    const referencePublicKey = new PublicKey(reference as string);
    const response = await verifyTransaction(referencePublicKey);
    if (!response) {
      return Response.json({ message: 'not found' }, { status: 404 });
    }

    await sendEmail(
      `${user?.email}`,
      property.title,
      user.name,
      'today',
      'https://meet.google.com/meeting'
    );
    // Create the post in Firestore with an array of image URLs
    const docRef = await db.collection('inspections').add({
      user: {
        email: user.email,
        id: user.id
      },
      property,
      createdAt: new Date().toISOString()
    });

    return Response.json({ message: 'verified' }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: 'Error fetching data', error },
      { status: 500 }
    );
  }
}

async function generateUrl(
  recipient: PublicKey,
  amount: BigNumber,
  reference: PublicKey,
  label: string,
  message: string,
  memo: string
) {
  const url: URL = encodeURL({
    recipient,
    amount,
    reference,
    label,
    message,
    memo
  });
  return { url };
}

async function verifyTransaction(reference: PublicKey) {
  // 1 - Check that the payment request exists
  const paymentData = paymentRequests.get(reference.toBase58());
  if (!paymentData) {
    throw new Error('Payment request not found');
  }
  const { recipient, amount, memo } = paymentData;
  // 2 - Establish a Connection to the Solana Cluster
  const connection = new Connection(NETWORK, 'confirmed');
  console.log('recipient', recipient.toBase58());
  console.log('amount', amount);
  console.log('reference', reference.toBase58());
  console.log('memo', memo);

  // 3 - Find the transaction reference
  const found = await findReference(connection, reference);
  console.log(found.signature);

  // 4 - Validate the transaction
  const response = await validateTransfer(
    connection,
    found.signature,
    {
      recipient,
      amount,
      splToken: undefined,
      reference
      //memo
    },
    { commitment: 'confirmed' }
  );
  // 5 - Delete the payment request from local storage and return the response
  if (response) {
    paymentRequests.delete(reference.toBase58());
  }
  return response;
}
