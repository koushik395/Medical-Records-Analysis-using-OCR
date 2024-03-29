import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;
`;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid black;
  background-color: var(--color-indigo-700);
  color: var(--color-grey-0);
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
`;

function StatsTable({ stats }) {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Date</TableHeader>
          <TableHeader>Suggestion</TableHeader>
        </tr>
      </thead>
      <tbody>
        {stats.map((report, i) => (
          <TableRow key={i}>
            <TableCell>{`${report.date.toString().padStart(2, "0")}/${report.month.toString().padStart(2, "0")}/${report.year}`}</TableCell>
            <TableCell>{report.suggestion}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

export default StatsTable;
