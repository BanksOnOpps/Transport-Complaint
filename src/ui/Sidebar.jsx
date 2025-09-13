import styled from "styled-components";
import MainNav from "./MainNav";
import AdminLogo from "./AdminLogo";
import StudentLogo from "./StudentLogo";
import { useAuth } from "../features/authentication/AuthContext";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 1rem 1rem;
  border-right: 1px solid var(--color-grey-100);
  height: 100%;
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  position: sticky;
  gap: 3.2rem;
`;

function Sidebar() {
  const { role, loading } = useAuth();

  if (loading) return null;
  return (
    <StyledSidebar>
      {role === "admin" ? <AdminLogo /> : <StudentLogo />}
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
