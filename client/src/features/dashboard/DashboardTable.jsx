import styled from "styled-components";
import Table from "../../ui/Table";

const Data = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const StyledHeader = styled.div`
  color: var(--color-grey-0);
`;

function DashboardTable({ user }) {
  const { name, age, doctorId, gender, contactNumber, city, country } = user;
  const role = user.role;
  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr">
      <Table.Header>
        <StyledHeader>Name</StyledHeader>
        {role === "doctor" && <StyledHeader>Doctor ID</StyledHeader>}
        <StyledHeader>Age</StyledHeader>
        <StyledHeader>Gender</StyledHeader>
        <StyledHeader>Contact</StyledHeader>
        {role === "patient" && <StyledHeader>City</StyledHeader>}
        <StyledHeader>Country</StyledHeader>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Data>{name}</Data>
          {role === "doctor" && <Data>{doctorId}</Data>}
          <Data>{age}</Data>
          <Data>{gender}</Data>
          <Data>{contactNumber}</Data>
          {role === "patient" && <Data>{city}</Data>}
          <Data>{country}</Data>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default DashboardTable;
