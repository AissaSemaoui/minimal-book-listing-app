import "./App.css";
import { Flex, Stack } from "@mantine/core";
import Actions from "./components/Actions";
import ISBNSearchBox from "./components/ISBNSearchBox";
import ContentTable from "./components/ContentTable";
import { TableData, useTableDataContext } from "./context/TableDataContext";
import { useEffect, useState } from "react";
import { setTableDataToStorage } from "./helpers/localstorage";
import Header from "./components/Header";

export type ErrorT = string;
export type SetError = React.Dispatch<React.SetStateAction<ErrorT>>;

type NewBookInfo = {
  title: string;
  author: string;
  format?: string;
  ISBN: string;
};

export type DeleteBookRow = (ISBN: string) => void;

export type InputsFlowRef = { current: React.RefObject<HTMLInputElement[]> };

function App() {
  const { tableData, setTableData } = useTableDataContext();
  const [error, setError] = useState<ErrorT>("");

  const createNewRow = (newBookInfo: NewBookInfo) => {
    let { rows } = tableData;

    const isISBNexist = rows.find((row) => row.ISBN === newBookInfo.ISBN);
    if (isISBNexist) return setError("This ISBN already exists");

    if (newBookInfo.title)
      rows.unshift({
        title: newBookInfo.title,
        author: newBookInfo.author || "",
        ISBN: newBookInfo.ISBN,
      });

    const newTableData: TableData = {
      ...tableData,
      rows: [...rows],
    };

    setTableData(newTableData);

    setTableDataToStorage(newTableData);
  };

  const deleteBookRow = (ISBN: string): void => {
    const newTableData = {
      ...tableData,
      rows: tableData.rows.filter((row) => row.ISBN !== ISBN),
    };

    setTableData(newTableData);

    setTableDataToStorage(newTableData);
  };

  useEffect(() => {
    setError("");
  }, [tableData]);

  return (
    <>
      <header className="controls">
        <Flex
          justify="space-around"
          wrap="wrap-reverse"
          py="md"
          gap={{
            lg: "lg",
            base: "34px",
          }}
        >
          <Stack justify="space-evenly" miw="max-content" w="350px">
            <Header className="head-lg" />
            <ISBNSearchBox
              error={error}
              setError={setError}
              createNewRow={createNewRow}
            />
            <Actions />
          </Stack>
        </Flex>
      </header>
      <ContentTable deleteBookRow={deleteBookRow} />
    </>
  );
}

export default App;
