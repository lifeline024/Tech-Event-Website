import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("authtoken");
  if (!isLoggedIn) {
    // User logged out hai, redirect to login ya home page
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectedRoute;