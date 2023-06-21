import React, { useEffect, useState } from "react";
import { ImSpinner10, ImSpinner2, ImSpinner9 } from "react-icons/im";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (user !== "loading") {
      setLoading(false);
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
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
