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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const checkAdminStatus = async () => {
        if (user) {
          const isAdmin = await checkIfAdmin(user.email ?? '') as boolean; // Ensure type of checkIfAdmin return value
          if (isAdmin) {
            setIsAdmin(true);
          } else {
            navigate('/');
          }
        } else {
          navigate('/');
        }
        setLoading(false);
      };
      
      // Call the async function
      checkAdminStatus().catch(error => {
        console.error("Error checking admin status:", error);
        setLoading(false);
      });
    });
    
    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return isAdmin ? <>{children}</> : null;
};

export default AdminAuth;
