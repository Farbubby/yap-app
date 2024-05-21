interface FormProps {
  submit: (e: any) => void;
  children: React.ReactNode;
  value: string;
  errorMessage: string;
}

export default function Form({
  submit,
  children,
  value,
  errorMessage,
}: FormProps) {
  return (
    <form onSubmit={(e) => submit(e)} className="flex flex-col gap-3">
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
      {children}
      <input
        type="submit"
        value={value}
        className="rounded-lg bg-gray-900 text-white py-1 hover:bg-gray-800 cursor-pointer"></input>
    </form>
  );
}
