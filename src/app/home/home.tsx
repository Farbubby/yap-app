interface HomeProps {
  userId: string;
  userAlias: string;
  userName: string;
}

export default function Home({ userId, userAlias, userName }: HomeProps) {
  return (
    <>
      <div>
        You logged in {userId} {userAlias} {userName} yay!!!
      </div>
    </>
  );
}
