import Options from "./options";

export default function Navbar() {
  return (
    <>
      <div className="flex flex-row-reverse border-b border-gray-700 py-4 px-10 items-center">
        <Options />
      </div>
    </>
  );
}
