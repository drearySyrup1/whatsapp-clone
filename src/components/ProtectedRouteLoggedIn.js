import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedRouteLoggedIn = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    // Check if the user state is populated
    if (user !== "loading") {
      setLoading(false); // Set loading to false when user state is available
    }
  }, [user]);

  if (loading) {
    return (
      <div className="grid w-screen h-screen place-items-center">
        <ImSpinner2 className="w-20 h-20 animate-spin" />
      </div>
    );
  }

  // Redirect to login page if user is null
  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRouteLoggedIn;
