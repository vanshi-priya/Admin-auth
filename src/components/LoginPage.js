import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import photo from "../assets/1photo.jpg";
import photo1 from "../assets/image.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://thingproxy.freeboard.io/fetch/https://api.voiptella.com/authentication",
        {
          email: email,
          password: password,
          device: "desktop_app",
        }
      );
      console.log(response.data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("first_name", response.data.data.first_name);

        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#36517C]">
      <img
        className="absolute top-4 left-4 w-36 lg:w-44 h-20"
        src={photo1}
        alt=""
      />

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl p-4">
        <div className="w-1/2 hidden md:block  animate-floating">
          <img
            src={photo}
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 lg:p-12 pl-10  pt-2 border border-gray-200 rounded-lg  shadow-lg">
          <h2 className="text-3xl font-bold pr-10  text-center text-white mb-6">
            Login
          </h2>

          <form
            onSubmit={handleLogin}
            className="space-y-6  h-80 w-full  max-w-md"
          >
            <div>
              <label className="block text-white text-lg font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="lg:w-96 w-72 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-white text-lg font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="lg:w-96 w-72 px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
            {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`lg:w-96 w-72 py-3 px-4 rounded-lg text-white font-medium
                ${loading ? "bg-blue-400" : "bg-[#5391fd] hover:bg-[#3a82fd]"}
                focus:outline-none focus:ring focus:ring-blue-300`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
