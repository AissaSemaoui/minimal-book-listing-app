import "./App.css";
import { Flex, Stack } from "@mantine/core";
import Actions from "./components/Actions";
import BookInfoForm from "./components/BookInfoForm";
import ISBNSearchBox from "./components/ISBNSearchBox";
import ContentTable from "./components/ContentTable";
import { useTableDataContext } from "./context/TableDataContext";
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

type NewFormInfo = {
  SKU: { SKU_1?: string; SKU_2?: string; SKU_3?: number };
  price: number;
  freeShipping: boolean;
  shippingCost: number;
  condition: string;
  conditionNotes: string;
};

export type DeleteBookRow = (ISBN: string) => void;

export type InputsFlowRef = { current: React.RefObject<HTMLInputElement[]> };

function App() {
  const { tableData, setTableData } = useTableDataContext();
  const [error, setError] = useState<ErrorT>("");
  const [submit, setSubmit] = useState<boolean>(false);

  const createNewRow = (newBookInfo: NewBookInfo) => {
    let { rows } = tableData;

    const isISBNexist = rows.find((row) => row.ISBN === newBookInfo.ISBN);
    if (isISBNexist) return setError("This ISBN already exists");

    if (newBookInfo.title)
      rows.unshift({
        title: newBookInfo.title,
        author: newBookInfo.author || "",
        format: newBookInfo.format || "",
        ISBN: newBookInfo.ISBN,
      });

    setTableData((prev) => ({
      ...prev,
      selectedRows: [rows[0].ISBN],
      rows: [...rows],
    }));

    setSubmit(true);
  };

  const updateTableFormData = (
    newFormInfo: NewFormInfo,
    isAssignButton: boolean
  ) => {
    let { selectedRows, lastSKU3, rows } = tableData;

    selectedRows.reverse().forEach((selectedISBN) => {
      const currentRow =
        rows.find((row) => row.ISBN === selectedISBN) || rows[0];
      if (!isAssignButton || (isAssignButton && !!newFormInfo.SKU.SKU_3)) {
        lastSKU3++;
        newFormInfo.SKU.SKU_3 = lastSKU3;
        currentRow.SKU = [
          newFormInfo.SKU.SKU_1,
          newFormInfo.SKU.SKU_2,
          newFormInfo.SKU.SKU_3,
        ]
          .filter(Boolean)
          .join("-");
      }

      Object.keys(newFormInfo).forEach((property) => {
        switch (property) {
          case "price":
            currentRow[property] = newFormInfo[property];
            break;
          case "condition":
            currentRow[property] = newFormInfo[property];
            break;
          case "conditionNotes":
            currentRow[property] = newFormInfo[property];
            break;
          case "shippingCost":
            if (!newFormInfo.freeShipping)
              currentRow[property] = newFormInfo[property];
            else currentRow[property] = 0;
            break;
          case "freeShipping":
            currentRow[property] = newFormInfo[property];
            break;
        }
      });
    });

    setTableData((prev) => ({
      ...prev,
      lastSKU3,
      rows: [...rows],
    }));

    setTableDataToStorage(tableData);

    return tableData;
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
          <Stack>
            <Header className="head-sm" />
            <BookInfoForm
              submit={submit}
              setSubmit={setSubmit}
              updateTableFormData={updateTableFormData}
            />
          </Stack>
        </Flex>
      </header>
      <ContentTable deleteBookRow={deleteBookRow} />
    </>
  );
}

export default App;
