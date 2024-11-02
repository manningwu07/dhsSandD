import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '~/lib/firebase';
import { checkIfAdmin } from '~/lib/auth';

const AdminAuth = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Monitor authentication state and check admin status
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isAdmin = await checkIfAdmin(user.email || ''); // Pass user.email
        console.log("isAdmin:", isAdmin);
        if (isAdmin) {
          setIsAdmin(true);
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return isAdmin ? <>{children}</> : null;  
};

export default AdminAuth;
