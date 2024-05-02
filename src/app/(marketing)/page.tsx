import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => (
  <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
    <Image
      alt="Preview of PetSoft"
      src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
      width={519}
      height={472}
    />
    <div>
      <Logo />
      <h1 className="text-3xl font-semibold my-6 max-w-[500px]">
        Manage your <span className="font-extrabold">pet daycare</span> with
        ease
      </h1>
      <p className="text-2xl font-medium max-w-[600px]">
        User PetSoft to easily keep track of pets under your care. Get lifetime
        access form $299
      </p>
      <div className="mt-10 space-x-3">
        <Button asChild>
          <Link href="/sign-up">Get started </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    </div>
  </main>
);

export default HomePage;
