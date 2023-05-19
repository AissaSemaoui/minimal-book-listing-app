import { ActionIcon, Checkbox, Table } from "@mantine/core";
import { useTableDataContext } from "../context/TableDataContext";
import { Delete } from "../assets/svg/delete";
import { DeleteBookRow } from "../App";

export interface Rows {
  title: string;
  author: string;
  format: string;
  SKU?: string;
  price?: number;
  freeShipping?: boolean;
  shippingCost?: number;
  condition?: string;
  conditionNotes?: string;
  ISBN: string;
}

const TableHead = () => {
  const { tableData, setTableData } = useTableDataContext();

  const toggleSelectAllRows = () => {
    setTableData((prev) => ({
      ...prev,
      allRowsSelected: !prev.allRowsSelected,
      selectedRows: !prev.allRowsSelected
        ? [...prev.rows.map((row) => row.ISBN)]
        : [prev.rows[0]?.ISBN] || [],
    }));
  };

  return (
    <thead>
      <tr>
        <th>
          <Checkbox
            checked={tableData.allRowsSelected}
            onChange={toggleSelectAllRows}
          />
        </th>
        <th>Title</th>
        <th>Author</th>
        <th>Format</th>
        <th>SKU</th>
        <th>Price</th>
        <th>Free shipping</th>
        <th>Shipping cost</th>
        <th>Condition</th>
        <th>Condition Notes</th>
        <th>ISBN</th>
        <th></th>
      </tr>
    </thead>
  );
};

const TableBody = ({ deleteBookRow }: { deleteBookRow: DeleteBookRow }) => {
  const { tableData, setTableData } = useTableDataContext();

  const { selectedRows } = tableData;

  const toggleRowSelection = (currentISBN: string, isSelected: boolean) => {
    const newSelectedIndexes = isSelected
      ? selectedRows.filter(
          (selectedIndex: string) => selectedIndex !== currentISBN
        )
      : [...selectedRows, currentISBN];

    setTableData((prev) => ({
      ...prev,
      selectedRows: newSelectedIndexes,
    }));
  };

  const handleDelete = (ISBN: string) => deleteBookRow(ISBN);

  return (
    <tbody>
      {tableData.rows.map((row) => {
        const isSelected = !!selectedRows.find(
          (selectedISBN) => selectedISBN === row.ISBN
        );

        return (
          <tr key={row.ISBN}>
            <td>
              <Checkbox
                checked={isSelected}
                onChange={() => toggleRowSelection(row.ISBN, isSelected)}
              />
            </td>
            <td>{row?.title}</td>
            <td>{row?.author}</td>
            <td>{row?.format}</td>
            <td>{String(row?.SKU)}</td>
            <td>{row?.price}</td>
            <td>{row?.freeShipping ? "True" : "False"}</td>
            <td>{row?.shippingCost}</td>
            <td>{row?.condition}</td>
            <td>{row?.conditionNotes}</td>
            <td>{row?.ISBN}</td>
            <td>
              <ActionIcon onClick={() => handleDelete(row?.ISBN)}>
                <Delete />
              </ActionIcon>
            </td>
          </tr>
        );
      })}
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
