interface TextAreaProps {
  id: string;
  label: string;
  name: string;
  rows: number;
  cols: number;
  placeholder: string;
  error: string;
}

export default function TextArea({
  id,
  label,
  name,
  rows,
  cols,
  placeholder,
  error,
}: TextAreaProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-xs">
          {label}
        </label>
        <textarea
          id={id}
          name={name}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900 resize-none"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </>
  );
}
