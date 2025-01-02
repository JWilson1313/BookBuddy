/* TODO - add your code to create a functional React component that renders a registration form */
import { useRegisterUserMutation } from "./userSlice";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [registerUser, { isLoading, isSuccess, error }] =
    useRegisterUserMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await registerUser(formData).unwrap();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <section>
        <p>First name-</p>
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstname}
          onChange={(e) =>
            setFormData({ ...formData, firstname: e.target.value })
          }
          required
        />
      </section>
      <section>
        <p>Last name-</p>
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={(e) =>
            setFormData({ ...formData, lastname: e.target.value })
          }
          required
        />
      </section>
      <section>
        <p>Email-</p>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </section>
      <section>
        <p>Password-</p>
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </section>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      {isSuccess && <p>Registration successful!</p>}
      {error && <p>Error: {error.data?.message || "Something went wrong"}</p>}
    </form>
  );
};

export default Register;