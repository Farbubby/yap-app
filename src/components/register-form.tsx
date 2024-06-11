"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  // Form states
  const [alias, setAlias] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const register = async function (e: any) {
    e.preventDefault();

    if (!alias || !username || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ alias, username, password }),
    });

    if (response.ok) {
      const { user, message } = await response.json();
      console.log(user, message);
      setError("");
      router.push("/login");
    } else if (response.status === 409) {
      console.error("Username is taken");
      setError("Username is taken");
    } else {
      console.error("Failed to register user");
    }
  };

  return (
    <>
      <div className="border border-gray-700 p-6 rounded-lg flex flex-col gap-8 xl:w-2/5 lg:w-1/2 md:w-2/3 sm:w-3/4 w-4/5">
        <div className="sm:text-sm text-xs text-center">
          Register an account to start yapping
        </div>
        <form onSubmit={(e) => register(e)} className="flex flex-col gap-3">
          {/* Error message */}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {/* Alias */}
          <label className="text-xs">Alias</label>
          <input
            type="text"
            className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
            placeholder="Alias"
            onChange={(e) => setAlias(e.target.value)}
          />
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
          Already have an account? <Link href="/login">Login</Link>
        </div>
      </div>
    </>
  );
}
