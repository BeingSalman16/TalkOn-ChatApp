import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useUserStore from './store/useUserStore';
import { checkUserAuth } from './services/auth.service';
import Loader from './utils/Loader';

export const ProtectedRoute = () => {
  const location = useLocation(); 
  const [isChecking, setIsChecking] = useState(true); 
  
  const { isAuthenticated, setUser, clearUser } = useUserStore(); 

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        
        const result = await checkUserAuth();
        
        if (result?.isAuthenticated) {
          setUser(result?.user); 
        } else {
          clearUser();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        clearUser(); 
      } finally {
        setIsChecking(false); 
      }
    };

    verifyAuth();
  }, [setUser, clearUser]);

  if (isChecking) {
    return <Loader/>; 
  }

  if (!isAuthenticated) {
    
    return <Navigate to="/user-login" state={{ from: location }} replace />;
  }

  
  return <Outlet />;
};


export const PublicRoute = () => {
  const isAuthenticated = useUserStore(state => state.isAuthenticated); 

  if (isAuthenticated) {
   
    return <Navigate to="/" replace />;
  }


  return <Outlet />;
};
