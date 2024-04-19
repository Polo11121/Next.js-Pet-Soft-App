import { ContentBlock } from "@/components/ContentBlock";
import { Heading } from "@/components/Heading";

const AccountPage = () => (
  <main>
    <Heading className="my-8 text-white">Your Account</Heading>
    <ContentBlock className="h-[500px] flex justify-center items-center">
      <p>Login in as ...</p>
    </ContentBlock>
  </main>
);

export default AccountPage;
