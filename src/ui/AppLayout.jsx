import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { useAuth } from "../features/authentication/AuthContext";

export const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;
export const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;
function AppLayout() {
  const { role, loading } = useAuth();

  if (loading) return <p>Loading layout...</p>;
  return (
    <StyledAppLayout>
      <Header role={role} />
      <Sidebar role={role} />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
