import { Button, Flex } from "@mantine/core";
import Papa from "papaparse";
import { useRef } from "react";
import { TableData, useTableDataContext } from "../context/TableDataContext";
import { setTableDataToStorage } from "../helpers/localstorage";

const Actions = () => {
  const { tableData, setTableData } = useTableDataContext();

  const anchorRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    if (tableData.rows.length < 1) return;

    const headers = {
      title: "Title",
      author: "Author",
      format: "Format",
      SKU: "SKU",
      price: "Price",
      freeShipping: "Free Shipping",
      shippingCost: "Shipping Cost",
      condition: "Condition",
      conditionNotes: "Condition Notes",
      ISBN: "ISBN",
    };

    const dataToParse = {
      fields: [
        "title",
        "author",
        "format",
        "SKU",
        "price",
        "freeShipping",
        "shippingCost",
        "condition",
        "conditionNotes",
        "ISBN",
      ],
      data: [headers, ...tableData.rows],
    };

    const csvData = Papa.unparse(dataToParse, { header: false });
    const blob = new Blob([csvData], { type: "text/csv" });
    const csvUrl = window.URL.createObjectURL(blob);

    anchorRef.current && (anchorRef.current.href = csvUrl);
    anchorRef.current && (anchorRef.current.download = "first file.csv");
    anchorRef.current && anchorRef.current.click();
  };

  const handleReset = () => {
    const resetObject: TableData = {
      lastSKU3: tableData.lastSKU3,
      rows: [],
      selectedRows: [],
      allRowsSelected: false,
    };

    setTableData(resetObject);

    setTableDataToStorage(resetObject);
  };

  return (
    <Flex gap={8}>
      <Button onClick={handleReset} size="md" color="red" c="white">
        Clear List
      </Button>
      <Button
        onClick={handleDownload}
        size="md"
        color="blue"
        c="white"
        fullWidth
      >
        Download CSV
      </Button>
      <a ref={anchorRef} style={{ display: "none" }}></a>
    </Flex>
  );
};

export default Actions;
