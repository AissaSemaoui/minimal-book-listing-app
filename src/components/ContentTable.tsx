import { ActionIcon, Table } from "@mantine/core";
import { useTableDataContext } from "../context/TableDataContext";
import { Delete } from "../assets/svg/delete";
import { DeleteBookRow } from "../App";

export interface Rows {
  title: string;
  author: string;
  ISBN: string;
}

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>ISBN</th>
        <th></th>
      </tr>
    </thead>
  );
};

const TableBody = ({ deleteBookRow }: { deleteBookRow: DeleteBookRow }) => {
  const { tableData } = useTableDataContext();

  const handleDelete = (ISBN: string) => deleteBookRow(ISBN);

  return (
    <tbody>
      {tableData.rows.map((row) => (
        <tr key={row.ISBN}>
          <td>{row?.title}</td>
          <td>{row?.author}</td>
          <td>{row?.ISBN}</td>
          <td>
            <ActionIcon onClick={() => handleDelete(row?.ISBN)}>
              <Delete />
            </ActionIcon>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const ContentTable = ({ deleteBookRow }: { deleteBookRow: DeleteBookRow }) => {
  return (
    <div className="table-wrapper">
      <Table withBorder mx="auto" mt="xl" verticalSpacing="lg" fontSize="md">
        <TableHead />
        <TableBody deleteBookRow={deleteBookRow} />
      </Table>
    </div>
  );
};

export default ContentTable;
