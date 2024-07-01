interface InputProps {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  error: string;
}

export default function Input({
  id,
  label,
  name,
  type,
  placeholder,
  error,
}: InputProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-xs">
          {label}
        </label>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </>
  );
}
