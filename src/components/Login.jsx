/* TODO - add your code to create a functional React component that renders a login form */
import { useState } from "react";
import { useUserLoginMutation } from "./userSlice"; // Import the API slice

const LoginForm = ({ onAuthToken }) => {
  // Accept onAuthToken as a prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [triggerLogin, { data, error, isLoading }] = useUserLoginMutation({
    skip: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = await triggerLogin({ email, password }).unwrap();

      // If login is successful, pass the token to parent via onAuthToken
      if (credentials.token) {
        onAuthToken(credentials.token); // Pass token up to parent
      }
    } catch (err) {
      console.error("handleSubmit Error: ", err);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </section>
        <section>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </section>
        <button type="submit">Login</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && (
        <p style={{ color: "red" }}>
          Error: {error.message || "Invalid login credentials"}
        </p>
      )}
      {data && (
        <div>
          <p>Welcome back!</p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;