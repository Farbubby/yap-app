interface UserFormProps {
  action: (e: any) => void;
  children: React.ReactNode;
  value: string;
}

export default function Form({ action, children, value }: UserFormProps) {
  return (
    <form onSubmit={(e) => action(e)} className="flex flex-col gap-3">
      {children}
      <input
        type="submit"
        value={value}
        className="rounded-lg bg-gray-900 text-white py-1 hover:bg-gray-800 cursor-pointer"></input>
    </form>
  );
}
