/**
 * Solana Actions Example
 */

import {
  DEFAULT_SOL_ADDRESS,
  DEFAULT_SOL_AMOUNT,
  NETWORK
} from '@/lib/constant';
import { db } from '@/lib/firebase/firebase-admin';
import { sendEmail } from '@/lib/mailer';
import { Property } from '@/types';
import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders
} from '@solana/actions';
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction
} from '@solana/web3.js';

// create the standard headers for this route (including CORS)
const headers = createActionHeaders({
  chainId: NETWORK, // or chainId: "devnet"
  actionVersion: '2.2.1' // the desired spec version
});

export const GET = async (
  req: Request,
  { params }: { params: { listingId: string } }
) => {
  const id = params.listingId;

  try {
    const requestUrl = new URL(req.url);
    const { toPubkey } = validatedQueryParams(requestUrl);
    const doc = await db.collection('listings').doc(id).get();

    if (!doc.exists) {
      return Response.json({ message: 'Listing not found' }, { status: 404 });
    }
    const property = { id: doc.id, ...doc.data() } as Property;

    const baseHref = new URL(
      `/api/action/${property.id}?to=${toPubkey.toBase58()}`,
      requestUrl.origin
    ).toString();

    const payload: ActionGetResponse = {
      type: 'action',
      title: `${property.title}`,
      icon: `${property && property.imageUrls[0]}`,
      description: `${property.description}`,
      label: 'Request inspection', // this value will be ignored since `links.actions` exists
      links: {
        actions: [
          {
            label: 'Request Inspection', // button text
            href: `${baseHref}&amount=${property.price}&name={name}&email={email}&date={date}&propertyId=${property.id}`,
            parameters: [
              {
                name: 'name',
                type: 'text',
                label: 'Your name here',
                required: true
              },
              {
                name: 'email',
                type: 'email',
                label: 'Your email address',
                required: true
              },
              {
                name: 'date',
                type: 'datetime-local',
                label: 'When will you be free?',
                required: true
              }
            ]
          }
        ]
      }
    };

    return Response.json(payload, {
      headers
    });
  } catch (err) {
    console.log(err);
    let message = 'An unknown error occurred';
    if (typeof err == 'string') message = err;
    return new Response(message, {
      status: 400,
      headers
    });
  }
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = async (req: Request) => {
  return new Response(null, { headers });
};

export const POST = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { amount, toPubkey, email, name, propertyId, date } =
      validatedQueryParams(requestUrl);

    const body: ActionPostRequest = await req.json();

    // validate the client provided input
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      return new Response('Invalid "account" provided', {
        status: 400,
        headers
      });
    }

    const propertyDoc = await db
      .collection('listings')
      .doc(propertyId as string)
      .get();

    if (!propertyDoc.exists) {
      return Response.json({ message: 'property not found' }, { status: 404 });
    }

    const property = propertyDoc.data() as Property;

    const connection = new Connection(
      process.env.SOLANA_RPC! || clusterApiUrl(NETWORK)
    );

    // ensure the receiving account will be rent exempt
    const minimumBalance = await connection.getMinimumBalanceForRentExemption(
      0 // note: simple accounts that just store native SOL have `0` bytes of data
    );
    if (amount * LAMPORTS_PER_SOL < minimumBalance) {
      throw `account may not be rent exempt: ${toPubkey.toBase58()}`;
    }

    // create an instruction to transfer native SOL from one wallet to another
    const transferSolInstruction = SystemProgram.transfer({
      fromPubkey: account,
      toPubkey: toPubkey,
      lamports: amount * LAMPORTS_PER_SOL
    });

    // get the latest blockhash amd block height
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    // create a legacy transaction
    const transaction = new Transaction({
      feePayer: account,
      blockhash,
      lastValidBlockHeight
    }).add(transferSolInstruction);

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Send ${amount} SOL to ${toPubkey.toBase58()}`
      }
      // note: no additional signers are needed
      // signers: [],
    });

    await sendEmail(
      `${email}`,
      property.title,
      name as string,
      date as string,
      'https://meet.google.com/meeting'
    );
    // Create the post in Firestore with an array of image URLs

    await db.collection('blink_inspections').add({
      email,
      name,
      propertyId,
      inspectionDate: date,
      createdAt: new Date().toISOString()
    });

    return Response.json(payload, {
      headers
    });
  } catch (err) {
    console.log(err);
    let message = 'An unknown error occurred';
    if (typeof err == 'string') message = err;
    return new Response(message, {
      status: 400,
      headers
    });
  }
};

function validatedQueryParams(requestUrl: URL) {
  let toPubkey: PublicKey = DEFAULT_SOL_ADDRESS;
  let amount: number = DEFAULT_SOL_AMOUNT;
  let name, propertyId, email, date;

  try {
    if (requestUrl.searchParams.get('to')) {
      toPubkey = new PublicKey(requestUrl.searchParams.get('to')!);
    }
  } catch (err) {
    throw 'Invalid input query parameter: to';
  }

  try {
    if (requestUrl.searchParams.get('name')) {
      name = requestUrl.searchParams.get('name');
    }
  } catch (err) {
    throw 'Invalid input query parameter: name';
  }
  try {
    if (requestUrl.searchParams.get('propertyId')) {
      propertyId = requestUrl.searchParams.get('propertyId');
    }
  } catch (err) {
    throw 'Invalid input query parameter: propertyId';
  }
  try {
    if (requestUrl.searchParams.get('email')) {
      email = requestUrl.searchParams.get('email');
    }
  } catch (err) {
    throw 'Invalid input query parameter: email';
  }
  try {
    if (requestUrl.searchParams.get('date')) {
      date = requestUrl.searchParams.get('date');
    }
  } catch (err) {
    throw 'Invalid input query parameter: date';
  }

  try {
    if (requestUrl.searchParams.get('amount')) {
      amount = parseFloat(requestUrl.searchParams.get('amount')!);
    }

    if (amount <= 0) throw 'amount is too small';
  } catch (err) {
    throw 'Invalid input query parameter: amount';
  }

  return {
    amount,
    toPubkey,
    name,
    propertyId,
    email,
    date
  };
}
