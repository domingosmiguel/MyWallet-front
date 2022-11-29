import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export default function MainLink({ children, to, disabled }) {
  return (
    <StyledLink to={to} disabled={disabled}>
      {children}
    </StyledLink>
  );
}
const DisabledLink = css`
  pointer-events: none;
  opacity: 0.8;
`;
const StyledLink = styled(Link)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 700;
  ${({ disabled }) => disabled && DisabledLink};
  :hover {
    text-decoration: underline;
    transform: scale(1.02);
  }
`;
