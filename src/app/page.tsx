"use client";

import { useState } from "react";

export default function Home() {
  const [alias, setAlias] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-14 bg-gray-950">
        <div className="lg:text-4xl md:text-3xl sm:text-2xl text-xl">
          Welcome to the yap app!
        </div>
        <div className="border border-gray-700 p-6 rounded-lg flex flex-col gap-8 lg:w-1/3 sm:w-1/2 w-3/4">
          <div className="sm:text-sm text-xs text-center">
            Register an account to start yapping
          </div>
          <form className="flex flex-col gap-3">
            <label className="text-xs">Alias</label>
            <input
              id="alias"
              type="text"
              className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
              onChange={(e) => setAlias(e.target.value)}></input>
            <label className="text-xs">Username</label>
            <input
              id="username"
              type="text"
              className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
              onChange={(e) => setUsername(e.target.value)}></input>
            <label className="text-xs">Password</label>
            <input
              id="password"
              type="password"
              className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
              onChange={(e) => setPassword(e.target.value)}></input>
            <input
              type="submit"
              value="Register"
              className="rounded-lg bg-gray-900 text-white py-1 hover:bg-gray-800 cursor-pointer"></input>
          </form>
          <div className="sm:text-sm text-xs text-center">
            Already have an account? Sign in
          </div>
        </div>
      </div>
    </>
  );
}
