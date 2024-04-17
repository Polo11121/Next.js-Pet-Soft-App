import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";

export const Logo = () => (
  <Link href="/">
    <Image src={logo} alt="PetSoft logo" />
  </Link>
);
