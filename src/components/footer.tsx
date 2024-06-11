interface FooterProps {
  toggle: (val: boolean) => void;
}

export default function Footer({ toggle }: FooterProps) {
  return (
    <>
      <div className="flex flex-row py-8 px-10 fixed w-fit right-0 bottom-0">
        <button onClick={() => toggle(true)}>
          <svg
            className="fill-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-5 17l1.006-4.036 3.106 3.105-4.112.931zm5.16-1.879l-3.202-3.202 5.841-5.919 3.201 3.2-5.84 5.921z" />
          </svg>
        </button>
      </div>
    </>
  );
}
