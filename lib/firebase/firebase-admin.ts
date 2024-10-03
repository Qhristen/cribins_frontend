import admin from 'firebase-admin';

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, '\n');
}

const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY as string);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: privateKey
    }),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  });
}

const db = admin.firestore();
const auth = admin.auth();

async function verifyToken(request: Request) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    throw new Error('Authorization token is missing');
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export { db, auth, verifyToken };
