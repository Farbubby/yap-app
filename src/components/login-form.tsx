"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  // Form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const login = async function (e: any) {
    e.preventDefault();
    router.refresh();

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { user, session, message } = await response.json();
      console.log(user, session, message);
      setError("");
      router.push("/home");
    } else {
      console.error("Failed to authenticate user");
      setError("Username or password is incorrect");
    }
  };
  return (
    <>
      <div className="border border-gray-700 p-6 rounded-lg flex flex-col gap-8 xl:w-2/5 lg:w-1/2 md:w-2/3 sm:w-3/4 w-4/5">
        <div className="sm:text-sm text-xs text-center">
          Login to your account
        </div>
        <form onSubmit={(e) => login(e)} className="flex flex-col gap-3">
          {/* Error message */}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {/* Username */}
          <label className="text-xs">Username</label>
          <input
            type="text"
            className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* Password */}
          <label className="text-xs">Password</label>
          <input
            type="password"
            className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            value="Register"
            className="rounded-lg bg-gray-900 text-white py-1 hover:bg-gray-800 cursor-pointer"
          />
        </form>
        <div className="sm:text-sm text-xs text-center">
          Do not have an account? <Link href="/register">Register</Link>
        </div>
      </div>
    </>
  );
}
