"use client";

interface ProfileProps {
  alias: string;
  username: string;
}

export default function Profile({ alias, username }: ProfileProps) {
  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <div className="text-gray-400">Yap away!</div>
        <div className="flex flex-col border-x px-4 rounded-lg">
          <div>{alias}</div>
          <div>{username}</div>
        </div>
      </div>
    </>
  );
}
