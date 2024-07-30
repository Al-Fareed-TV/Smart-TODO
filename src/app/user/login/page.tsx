// pages/login.js
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Login - Smart Todo";
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://smart-todo-be.onrender.com/user/login",
        {
          email,
          password,
        }
      );

      const { access_token: token } = response.data.data.session;
      const { id: user_id } = response.data.data.user;
      console.log("user Id:", user_id);
      console.log("Response token:", token);

      // Store token in cookies
      Cookies.set("token", token, { expires: 1 }); // Expires in 1 day
      Cookies.set("user_id", user_id, { expires: 1 });

      console.log("Response from backend:", response);
      setMessage("Login successful!");
      router.push("/");
    } catch (error) {
      console.log(`Login failed. Please try again. ${error}`);
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Head>
        <title>Login</title>
      </Head>
      <div className="bg-white p-8 text-black rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-black text-center">
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block text-black w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-indigo-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Login
          </button>
          <div className="mt-2">
            Don't have an account?{" "}
            <Link className="text-blue-600" href="/user/signup">
              Create
            </Link>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}
