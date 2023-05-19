import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Rows } from "../components/ContentTable";
import { getTableDataFromStorage } from "../helpers/localstorage";

//? Types
export interface TableData {
  allRowsSelected: boolean;
  selectedRows: string[];
  lastSKU3: number;
  rows: Rows[];
}
export type SetTableData = React.Dispatch<React.SetStateAction<TableData>>;

//? Table data context
const TableDataContext = createContext({});

export const DEFAULT_TABLE_DATA: TableData = {
  allRowsSelected: false,
  selectedRows: [],
  lastSKU3: 0,
  rows: [],
};

const TableDataProvider = ({ children }: { children: ReactNode }) => {
  const [tableData, setTableData] = useState<TableData>(DEFAULT_TABLE_DATA);

  useEffect(() => {
    setTableData(getTableDataFromStorage());
  }, []);

  return (
    <TableDataContext.Provider value={{ tableData, setTableData }}>
      {children}
    </TableDataContext.Provider>
  );
};

export const useTableDataContext = () => {
  const context = useContext(TableDataContext) as {
    tableData: TableData;
    setTableData: SetTableData;
  };

  if (!context)
    throw new Error(
      "Table data context can\t be used outside TableDataContextProvider"
    );

  return context;
};

export default TableDataProvider;
