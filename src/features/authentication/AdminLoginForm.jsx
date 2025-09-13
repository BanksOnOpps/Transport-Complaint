import { useState } from "react";

import Form from "../../ui/Form";

import styled from "styled-components";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

const FormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.6rem;
`;
const Label = styled.span`
  font-size: 1.5rem;
`;

const Button = styled.button`
  background: var(--color-admin-gradient);
  color: var(--color-grey-0);
  padding: 1rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  transition: all 160ms ease-in;
  cursor: pointer;
  &:hover {
    background-color: var(--color-brand-1000);
  }
`;

const Input = styled.input`
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-tiny);
  padding: 0.5rem 1rem;
  width: 100%;
  margin-bottom: 0.5rem;
  outline: none;
  transition: all 160ms ease-in;
  &:focus {
    border-color: var(--color-brand-200);
    box-shadow: 0 0 0 1px var(--color-brand-200);
  }
`;

function AdminLoginForm() {
  const [email, setEmail] = useState("admin@transport.com");
  const [password, setPassword] = useState("test123456");

  const { login, isLoading } = useLogin("admin");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },

      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical>
        <Label htmlFor="email">Admin email</Label>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default AdminLoginForm;
