/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useGetBooksQuery } from "./booksSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const GetBooks = ({ setSelectedBookId }) => {
  const { data: books } = useGetBooksQuery();
  const navigate = useNavigate(); // Use the navigate function

  return (
    <article>
      {books?.books?.map((val) => (
        <div key={val.id}>
          <button
            onClick={() => {
              setSelectedBookId(val.id);
              navigate(`/books/${val.id}`); // Navigate to the book's detail page
            }}
          >
            {val.title} by {val.author}{" "}
          </button>
        </div>
      ))}
    </article>
  );
};

export default GetBooks;

// books, singlebooks, account need reducers. use redux when you can
