import styled from "styled-components";
import { useAuth } from "../../context/auth";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { auth } = useAuth();
  const img = auth?.user?.photo;
  const role = auth?.user?.role;

  const imgSrc =
    img !== "default-user.jpg" ? `/img/${role}/${img}` : "default-user.jpg";

  return (
    <StyledUserAvatar>
      <Avatar src={imgSrc} alt={`Avatar of ${auth.user.name}`} />
      <span>{auth.user.name}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
