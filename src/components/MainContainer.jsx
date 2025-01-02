import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import GetBooks from "./Books";
import SingleBook from "./SingleBook";
import Navigations from "./Navigations";
import Register from "./Register";
import LoginForm from "./Login";
import Account from "./Account";

const MainContainer = () => {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const handleAuthToken = (token) => {
    setAuthToken(token);
  };

  return (
    <div>
      <Navigations />
      <Routes>
        <Route path="/" element={<div>Welcome to the Library</div>} />
        <Route
          path="/books"
          element={<GetBooks setSelectedBookId={setSelectedBookId} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<LoginForm onAuthToken={handleAuthToken} />}
        />
        {/* Route for Single Book, using selectedBookId from the state */}
        <Route
          path="/books/:id"
          element={
            <SingleBook selectedBookId={selectedBookId} authToken={authToken} />
          }
        />

        <Route path="/account" element={<Account token={authToken} />} />
      </Routes>
    </div>
  );
};

export default MainContainer;
