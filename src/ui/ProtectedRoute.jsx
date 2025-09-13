import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children, expectedRole }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, profile } = useUser();

  useEffect(() => {
    const redirectTo = expectedRole === "admin" ? "/admin/login" : "/login";

    if (!isLoading && !isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }

    // Check if the role is not authorized
    if (
      !isLoading &&
      isAuthenticated &&
      expectedRole &&
      profile?.role !== expectedRole
    ) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, profile, expectedRole]);

  if (isLoading || !profile)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (!isAuthenticated || (expectedRole && profile?.role !== expectedRole)) {
    return null;
  }
  return children;

  // if (isAuthenticated) return children;

  // return null;
}

export default ProtectedRoute;
