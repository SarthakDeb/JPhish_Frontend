import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  token: null,
  adminName: '',
  setAuthInfo: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfoState] = useState({
    token: localStorage.getItem('Token') || null,
    adminName: '',
  });

  const setAuthInfo = (token, adminName) => {
    localStorage.setItem('Token', token);
    setAuthInfoState({ token, adminName });
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('Token');
    setAuthInfoState({ token: null, adminName: '' });
  };

  useEffect(() => {
    // Optionally, fetch adminName or other info using the token
    if (authInfo.token) {
      // Example: Fetch admin details
      // fetchAdminDetails(authInfo.token).then(data => setAuthInfoState({...authInfo, adminName: data.name}));
    }
  }, [authInfo.token]);

  return (
    <AuthContext.Provider
      value={{
        token: authInfo.token,
        adminName: authInfo.adminName,
        setAuthInfo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};