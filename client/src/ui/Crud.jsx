import styled from "styled-components";

const Warning = styled.div`
  background-color: var(--color-indigo-700);
  color: var(--color-grey-100);
  padding: 1.2rem 2.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

function Crud() {
  return (
    <Warning>
      CRUD OPERATIONS ARE DISABLED FOR SECURITY.
      <a
        href="https://www.linkedin.com/in/koushik-boddapalli-16b7b5209/"
        target="_blank"
        rel="noreferrer"
      >
        <Info>
          <span>&rarr;</span>
          <span>Koushik Boddapalli</span>
        </Info>
      </a>
    </Warning>
  );
}

export default Crud;
