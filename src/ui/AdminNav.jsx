// components/AdminNav.jsx
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineHome,
  HiOutlineExclamationTriangle,
  HiOutlineRss,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background: var(--color-admin-gradient);
  height: 100vh;

  border-radius: var(--border-radius-sm);
  padding-top: 3rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-300);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 160ms ease-in;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    margin: 1rem;
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function AdminNav() {
  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <HiOutlineHome /> },
    {
      to: "/admin/complaints",
      label: "Complaints",
      icon: <HiOutlineExclamationTriangle />,
    },
    // { to: "/admin/feedback", label: "Feedback", icon: <HiOutlineRss /> },
    {
      to: "/admin/faq",
      label: "FAQ / Help",
      icon: <HiOutlineQuestionMarkCircle />,
    },
    { to: "/admin/settings", label: "Settings", icon: <HiOutlineCog6Tooth /> },
  ];

  return (
    <nav>
      <NavList>
        {links.map((link) => (
          <li key={link.to}>
            <StyledNavLink to={link.to}>
              {link.icon}
              <span>{link.label}</span>
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
}

export default AdminNav;
