import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoutes = ({ allowedRoles }) => {
  const { user } = useAuth();

  // Redirect if not logged in
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect if role not allowed
    return <Navigate to="/unauthorize" replace />;
  }
  return <Outlet />; // Render Child routes
};

export default ProtectedRoutes;
