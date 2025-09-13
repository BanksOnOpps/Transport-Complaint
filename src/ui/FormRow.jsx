import styled from "styled-components";

const StyledFormRow = styled.div`
  min-height: 100vh;
  background-color: #e6f4f1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 50rem;
  width: 100%;
  padding: 2.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.25rem;
`;

const SmallText = styled.p`
  font-size: 0.75rem;
  color: #a0aec0;
  margin-top: 0.25rem;
`;

const Input = styled.input`
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  width: 100%;
  outline: none;
  &:focus {
    border-color: #0f766e;
    box-shadow: 0 0 0 1px #0f766e;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: ${(props) => props.columns || "1fr"};
  margin-bottom: 1.5rem;
`;

const PhoneWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CountryCode = styled.span`
  background-color: #edf2f7;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
`;

const Button = styled.button`
  background-color: #0f766e;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  float: right;
  cursor: pointer;
  &:hover {
    background-color: #115e59;
  }
`;
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
