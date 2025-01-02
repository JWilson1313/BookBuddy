/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import React from "react";
import {
  useGetBookByIdQuery,
  usePatchAvailabilityByIdMutation,
} from "./booksSlice"; // Import necessary hooks
import { useSelector } from "react-redux"; // Optional: for additional state

const SingleBook = ({ selectedBookId, authToken }) => {
  const {
    data: book,
    isLoading,
    isError,
    refetch,
  } = useGetBookByIdQuery(selectedBookId); // Fetch book details
  const [patchAvailability, { isLoading: isMutating }] =
    usePatchAvailabilityByIdMutation(); // Mutation for checking out/returning a book

  if (isLoading) return <p>Loading book details...</p>;
  if (isError) return <p>Error fetching book details.</p>;

  const handleCheckoutReturn = async () => {
    if (!authToken) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      await patchAvailability({
        id: book.book.id,
        available: !book.book.available, // Toggle availability
        token: authToken, // Pass auth token for authenticated API call
      }).unwrap();

      alert(
        `Book successfully ${book.book.available ? "checked out" : "returned"}!`
      );
      refetch(); // Refetch book details to update UI
    } catch (error) {
      console.error("Error updating book availability:", error);
      alert("Failed to update book availability. Please try again.");
    }
  };

  return (
    <div className="singlebook">
      <h1>{book.book.title}</h1>
      <p>
        <strong>Author:</strong> {book.book.author}
      </p>
      <p>{book.book.description}</p>
      <img src={book.book.coverimage} alt={`${book.book.title} cover`} />
      <p>
        <strong>Available:</strong> {book.book.available ? "Yes" : "No"}
      </p>

      {authToken && (
        <button
          onClick={handleCheckoutReturn}
          disabled={isMutating}
          style={{
            backgroundColor: book.book.available ? "green" : "red",
            color: "white",
            cursor: "pointer",
            padding: "10px",
          }}
        >
          {isMutating
            ? "Processing..."
            : book.book.available
            ? "Check Out"
            : "Return Book"}
        </button>
      )}
      {!authToken && <p>Please log in to check out or return this book.</p>}
    </div>
  );
};

export default SingleBook;