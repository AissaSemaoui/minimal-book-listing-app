import { DEFAULT_TABLE_DATA, TableData } from "../context/TableDataContext";

const TABLE_DATA_KEY = "table-data";

const setTableDataToStorage = (tableData: TableData) => {
  const tableDataAsString = JSON.stringify(tableData);

  return window.localStorage.setItem(TABLE_DATA_KEY, tableDataAsString);
};

const getTableDataFromStorage = (): TableData => {
  const tableDataAsString = window.localStorage.getItem(TABLE_DATA_KEY);

  if (tableDataAsString) {
    const tableData = JSON.parse(tableDataAsString);
    return tableData;
  }

  return DEFAULT_TABLE_DATA;
};

export { getTableDataFromStorage, setTableDataToStorage };
