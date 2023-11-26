"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <nav
        className={`fixed top-0 w-full flex justify-center shadow ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="mathworkit logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p className="text-blue-500">mathworkit</p>
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-blue-500 bg-blue-500 p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-blue-500"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
