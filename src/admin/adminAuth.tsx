import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, UserCredential } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '~/lib/firebase';
import { checkIfAdmin, signInWithGoogle } from '~/lib/auth';

const AdminAuth = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = async () => {
      setLoading(true);

      // Monitor authentication state
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          // If user is not signed in, prompt sign-in with Google
          const result = await signInWithGoogle();
          if (result) {
            user = result.user; // Set the authenticated user
          } else {
            setLoading(false);
            return; // Exit if sign-in failed
          }
        }

        if (user) {
          // Check if the user is an admin
          const isAdmin = await checkIfAdmin(user.email || '');
          if (isAdmin) {
            setIsAdmin(true);
          } else {
            navigate('/'); // Redirect if not admin
          }
        } else {
          navigate('/'); // Redirect if no user after attempted sign-in
        }

        setLoading(false);
      });

      return () => unsubscribe();
    };

    handleAuthChange();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return isAdmin ? <>{children}</> : null;
};

export default AdminAuth;
