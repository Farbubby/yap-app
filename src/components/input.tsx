interface UserInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  setValue: (e: any) => void;
  error: boolean;
  errorMessage: string;
}

export default function Input({
  id,
  label,
  type,
  placeholder,
  value,
  setValue,
  error,
  errorMessage,
}: UserInputProps) {
  return (
    <>
      <label className="text-xs">{label}</label>
      <input
        id={id}
        type={type}
        className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}></input>
      {error && <div className="text-red-500 text-xs">{errorMessage}</div>}
    </>
  );
}
