import { useAuth } from "../features/authentication/AuthContext";
import AdminNav from "./AdminNav";
import StudentNav from "./StudentNav";

function MainNav() {
  const { role, loading } = useAuth();

  if (loading) return null;

  return role === "admin" ? <AdminNav /> : <StudentNav />;
}

export default MainNav;
