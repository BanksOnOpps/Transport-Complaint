import styled from "styled-components";
import AdminLoginForm from "../features/authentication/AdminLoginForm";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function AdminLogin() {
  return (
    <LoginLayout>
      <Heading as="h4">Log in to your Admin account</Heading>
      <AdminLoginForm />
    </LoginLayout>
  );
}

export default AdminLogin;
