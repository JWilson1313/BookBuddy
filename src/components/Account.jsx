/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect, useState } from "react";
import { useGetUserQuery } from "./userSlice.js";

const Account = ({ token }) => {
  const {
    data: user,
    error,
    isLoading,
  } = useGetUserQuery({ token }, { skip: !token });
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Account</h2>
        <p>Please log in to view your account details.</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>Error: {error.message || "Unable to fetch account details."}</div>
    );
  }

  return (
    <div className="account-container">
      <h2>Account Information</h2>
      <p>
        <strong>Name:</strong> <div>{user.firstname} {user.lastname}</div>
      </p>
      <p>
        <strong>Email:</strong> <div>{user.email}</div>
      </p>
      <h3>Books Checked Out:</h3>
      {user.books && user.books.length > 0 ? (
        <ul>
          {user.books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <p>No books checked out.</p>
      )}
    </div>
  );
};

export default Account;