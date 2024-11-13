import React, { useEffect, useState, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '~/lib/firebase';
import { checkIfAdmin, signInWithGoogle } from '~/lib/auth';

const AdminAuth = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const signInTriggered = useRef(false); // Track if sign-in has been triggered

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const handleAuthStateChange = async () => {
        setLoading(true);
  
        if (user) {
          const isAdmin = await checkIfAdmin(user.email ?? '');
          if (isAdmin) {
            setIsAdmin(true);
          } else {
            navigate('/');
          }
        } else if (!signInTriggered.current) {
          signInTriggered.current = true;
          try {
            const result = await signInWithGoogle();
            if (result && result.user) {
              const email = result.user.email ?? '';
              const isAdmin = await checkIfAdmin(email);
              if (isAdmin) {
                setIsAdmin(true);
              } else {
                navigate('/');
              }
            } else {
              navigate('/');
            }
          } catch (error) {
            console.error("Error during Google sign-in:", error);
            navigate('/');
          }
        }
  
        setLoading(false);
      };
  
      // Call the asynchronous function
      handleAuthStateChange(); // eslint-disable-line @typescript-eslint/no-floating-promises
    });
  
    return () => unsubscribe();
  }, [navigate]);
  

  if (loading) return <div>Loading...</div>;

  return isAdmin ? <>{children}</> : null;
};

export default AdminAuth;
