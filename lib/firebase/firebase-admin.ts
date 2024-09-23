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
    databaseURL: 'https://cribins-658e1-default-rtdb.firebaseio.com'
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
