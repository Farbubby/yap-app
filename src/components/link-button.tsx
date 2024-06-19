import Link from "next/link";

interface LinkButtonProps {
  label: string;
  href: string;
}

export default function LinkButton({ label, href }: LinkButtonProps) {
  return (
    <>
      <Link href={href}>
        <div className="bg-gray-900 px-4 py-2 rounded-lg border">{label}</div>
      </Link>
    </>
  );
}
