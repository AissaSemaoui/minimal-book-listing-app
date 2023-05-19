import { useState } from "react";
import { SetError } from "../App";

interface Book {
  title: string;
  author?: string;
  format?: string;
}

const useFetchBooks = () => {
  const [Book, setBook] = useState<Book>({
    title: "",
  });

  const fetchByISBN = async (ISBN: string, setError?: SetError) => {
    try {
      const response = await fetch(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${ISBN}&jscmd=details&format=json`
      );

      if (!response.ok)
        throw new Error(
          `Http request failed, response code : ${response.status}`
        );

      const data = await response.json();

      const bookProperty = `ISBN:${ISBN}`;
      const bookDetails = data[bookProperty]?.details;

      const extracetdData = {
        title: bookDetails?.full_title || bookDetails?.title,
        format: bookDetails?.physical_format,
        author: bookDetails?.authors
          .map((author: { name: string }) => author?.name)
          .join(", "),
        ISBN,
      };

      if (!extracetdData.title) throw new Error("This book missed a title");

      setBook(extracetdData);
      return extracetdData;
    } catch (err) {
      setError && setError("Book not found");
      console.error(err);
      throw new Error("An error occured");
    }
  };

  return {
    fetchByISBN,
    Book,
  };
};

export default useFetchBooks;
