import { Navigate, Outlet } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";
function ProtectedRoute({
  isAllowed,
  redirectPath="/",
  children
}) {
  const { notify } = useNotifications();
  if (!isAllowed) {
    notify({
      type: "error",
      message: "You must be logged in to view that page"
    })
    return <Navigate to={redirectPath} replace />
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
