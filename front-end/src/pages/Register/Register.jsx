import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);

      alert("Registered Successfully!");
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Email already exists"
      ) {
        alert("Email already exists! Please login.");
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="reg-cont">
        <h1>Register</h1>

        <input
          type="email"
          placeholder="Enter Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Enter Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="password"
          placeholder="Enter Your Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="button" onClick={submit}>
          Submit
        </button>

        <h6>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </h6>
      </div>
    </div>
  );
}
