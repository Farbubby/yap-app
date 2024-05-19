"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const validate = async function () {
      const response = await fetch("/api/validate");

      if (response.ok) {
        const { user, session, message } = await response.json();
        setName(user.alias);
      } else {
        console.error("Failed to validate session");
        router.push("/login");
      }
    };
    validate();
  }, [router]);

  if (name) {
    return (
      <>
        <div>{`You are logged in ${name} yay!`}</div>
      </>
    );
  } else {
    return <></>;
  }
}
