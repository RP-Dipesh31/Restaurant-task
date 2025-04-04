// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import axios from "axios";

// interface LoginProps {
//   onClose: () => void;
//   toggleAuth: () => void; // Toggle to switch between Login & Signup
// }

// const Login: React.FC<LoginProps> = ({ onClose, toggleAuth }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate(); // Initialize navigate function

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     if (!email || !password) {
//       setError("Both fields are required");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:7000/login", { email, password });

//       if (response.status === 200) {
//        setSuccess("Login Successful!");
//         setTimeout(() => {
//           setSuccess("");
//           onClose(); // Close modal after successful login
//           navigate("/mobile-nav-links");
//         }, 1500);
//       } else {
//         setError(response.data.message || "Invalid credentials");
//       }
//     } catch (err: any) {
//       console.error("Login error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Something went wrong, please try again.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h2>
//       {error && <p className="text-red-500 text-center mb-2">{error}</p>}
//       {success && <p className="text-green-500 text-center mb-2">{success}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//         />
//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//         />
//         <button
//           type="submit"
//           className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
//         >
//           Login
//         </button>
//       </form>
//       <p className="text-sm text-center mt-4">
//         Don't have an account?{" "}
//         <span className="text-orange-500 cursor-pointer" onClick={toggleAuth}>
//           Sign Up
//         </span>
//       </p>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginProps {
  onClose: () => void;
  toggleAuth: () => void;
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, toggleAuth, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    try {
      const response = await axios.post<{ message?: string }>("http://localhost:7000/login", { email, password });

      if (response.status === 200) {
        setSuccess("Login Successful!");
        localStorage.setItem("isLoggedIn", "true");
        setTimeout(() => {
          setSuccess("");
          onClose();
          onLoginSuccess();
          navigate("/mobile-nav-links");
        }, 1500);
      } else {
        setError(response.data?.message || "Invalid credentials");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong, please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h2>
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      {success && <p className="text-green-500 text-center mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Don't have an account?{" "}
        <span className="text-orange-500 cursor-pointer" onClick={toggleAuth}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;




