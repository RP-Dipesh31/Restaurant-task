import React, { useState } from "react";
import axios from "axios";

interface SignupProps {
  onClose: () => void;
  toggleAuth: () => void;
  onSignupSuccess?: () => void;
}

const Signup: React.FC<SignupProps> = ({ onClose, toggleAuth, onSignupSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:7000/register", { name, email, password , role});
      setSuccess("Signup Successful!");
      setTimeout(() => {
        onSignupSuccess?.();
        onClose();
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Sign Up</h2>
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      {success && <p className="text-green-500 text-center mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
        >
          Sign Up
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <span className="text-orange-500 cursor-pointer" onClick={toggleAuth}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
