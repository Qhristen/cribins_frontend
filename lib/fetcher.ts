import { auth } from './firebase/firebase';

const fetcher = async (url: string) => {
  const user = auth.currentUser;
  const token = await user?.getIdToken(); // Get the Firebase token

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    credentials: 'same-origin'
  });

  return res.json();
};

export default fetcher;
