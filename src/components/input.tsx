interface InputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  setValue: (e: any) => void;
}

export default function Input({
  id,
  label,
  type,
  placeholder,
  setValue,
}: InputProps) {
  return (
    <>
      <label className="text-xs">{label}</label>
      <input
        id={id}
        type={type}
        className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}></input>
    </>
  );
}
