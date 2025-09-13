import styled from "styled-components";

const StyledLogo = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--color-grey-100);
  border: 2px solid var(--color-grey-300);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  align-self: center;
`;

const StyledLogoSection = styled.div`
  background: var(--color-admin-gradient);
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 2rem;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function AdminLogo() {
  return (
    <>
      <StyledLogoSection>
        <StyledLogo>
          <img src="/img/admin-img.jpg" alt="Admin Profile" />
        </StyledLogo>
      </StyledLogoSection>
    </>
  );
}

export default AdminLogo;
