import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../lib/firebase/firebase';

// Define the User type
export type User = {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  createdAt: Date;
};

// Define the shape of the context value
interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<User | null>;
  signInWithGoogle: () => Promise<User | null>;
  logIn: (email: string, password: string) => Promise<User | null>;
  logOut: () => Promise<void>;
  loading: boolean;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Make auth context available across the app by exporting it
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

// Create the auth context provider
export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  // Define the constants for the user and loading state
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Update the state depending on auth
  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(database, 'users', firebaseUser.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUser({
              id: userDoc.id,
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
              createdAt: data.createdAt.toDate() || new Date() // Ensure it's a Date object
            } as User);
          } else {
            console.log('User data not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Signup the user
  const signUp = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    setLoading(true);
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser: User = {
      id: credentials.user.uid,
      name: credentials.user.displayName || '',
      email: credentials.user.email || '',
      photoURL: credentials.user.photoURL || '',
      createdAt: new Date()
    };
    await setDoc(doc(database, 'users', credentials.user.uid), {
      ...newUser,
      createdAt: serverTimestamp()
    });
    setUser(newUser);
    return newUser;
  };

  // Signup the user with Google
  const signInWithGoogle = async (): Promise<User | null> => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const userCredential: UserCredential = await signInWithPopup(
      auth,
      provider
    );
    const firebaseUser = userCredential.user;
    const newUser: User = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || '',
      email: firebaseUser.email || '',
      photoURL: firebaseUser.photoURL || '',
      createdAt: new Date()
    };

    await setDoc(doc(database, 'users', firebaseUser.uid), {
      ...newUser,
      createdAt: serverTimestamp()
    });
    setUser(newUser);
    return newUser;
  };

  // Login the user
  const logIn = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(database, 'users', credentials.user.uid));
    const data = userDoc.data();
    const loggedInUser: User = {
      id: credentials.user.uid,
      name: data?.name || '',
      email: data?.email || '',
      photoURL: data?.photoURL || '',
      createdAt: data?.createdAt?.toDate() || new Date()
    };
    setUser(loggedInUser);
    return loggedInUser;
  };

  // Logout the user
  const logOut = async (): Promise<void> => {
    setUser(null);
    return await signOut(auth);
  };

  // Wrap the children with the context provider
  return (
    <AuthContext.Provider
      value={{ user, signUp, signInWithGoogle, logIn, logOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
