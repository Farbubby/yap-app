interface HomeProps {
  userAlias: string;
  userName: string;
}

export default function Home({ userAlias, userName }: HomeProps) {
  return (
    <>
      <div>
        You logged in {userAlias} {userName} yay!!!
      </div>
    </>
  );
}
