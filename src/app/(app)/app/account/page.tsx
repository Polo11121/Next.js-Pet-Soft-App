import { ContentBlock } from "@/components/ContentBlock";
import { SignOutButton } from "@/components/SignOutButton";
import { Heading } from "@/components/Heading";
import { checkAuth } from "@/lib/serverUtils";

const AccountPage = async () => {
  const session = await checkAuth();

  return (
    <main>
      <Heading className="my-8 text-white">Your Account</Heading>
      <ContentBlock className="h-[500px] flex flex-col gap-3 justify-center items-center">
        <p>Login in as {session?.user?.email} </p>
        <SignOutButton />
      </ContentBlock>
    </main>
  );
};

export default AccountPage;
