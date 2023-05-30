import { Flex, Stack, Text, TextInput } from "@mantine/core";
import { useRef, useState } from "react";
import useFetchBooks from "../hooks/useFetchBooks";
import { ErrorT, SetError } from "../App";

interface ISBNSearchBoxProps {
  setError: SetError;
  error: ErrorT;
  createNewRow: Function;
}

const ISBNSearchBox = ({
  createNewRow,
  error,
  setError,
}: ISBNSearchBoxProps) => {
  const { fetchByISBN } = useFetchBooks();
  const [searchValue, setSearchValue] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (!searchValue) {
      setError("Please write book ISBN");
      return;
    }

    const bookData = await fetchByISBN(searchValue, setError);

    if (!bookData) return;
    setSearchValue("");

    return createNewRow(bookData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.replace(" ", ""));
  };

  const handlePress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") handleSearch();
  };

  return (
    <Stack my="xl">
      <Flex align="center" gap="xs">
        <TextInput
          ref={searchInputRef}
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handlePress}
          size="lg"
          classNames={{
            label: "isbn-search-label",
          }}
          label="ISBN"
        />
        {/* <Button onClick={handleSearch} size="lg">
          handleSearch
        </Button> */}
      </Flex>
      <Text color="red">{error}</Text>
    </Stack>
  );
};

export default ISBNSearchBox;
