"use client";
import { useSession, signIn, signOut } from "next-auth/react";

import { List, PawPrint } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const session = useSession();

  return (
    <nav className="top-0 fixed w-screen bg-slate-200 shadow-md">
      <div className="h-16 flex justify-between items-center px-8">
        <div className="font-bold text-xl flex gap-3 items-center">
          <PawPrint size={32} weight="fill" /> Javabot Plus
        </div>

        <div className="flex justify-center items-center gap-6">
          <div className="gap-3 sm:flex divide-x-2 hidden">
            <Link
              className="rounded-lg hover:bg-slate-300 p-2 transition-all"
              href="/"
            >
              Home
            </Link>
            <Link
              className="rounded-lg hover:bg-slate-300 p-2 transition-all"
              href="/loja"
            >
              Loja
            </Link>
            <Link
              className="rounded-lg hover:bg-slate-300 p-2 transition-all"
              href="/animals"
            >
              Animais
            </Link>
          </div>
          <div className="flex justify-center items-center gap-3">
            {session.data?.user ? (
              <Link href="/animals/meus">
                <div>{session.data?.user?.name}</div>
                <Image
                  className="w-10 rounded-full"
                  width={128}
                  height={128}
                  src={session.data?.user?.image || ""}
                  alt="Account Photo"
                />
              </Link>
            ) : (
              <button
                className="bg-slate-300 flex justify-center items-center shadow-md p-2 rounded-md"
                onClick={() => signIn()}
              >
                Login
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className="bg-slate-300 flex sm:hidden justify-center items-center shadow-md w-10 h-10 rounded-md"
            >
              <List size={28} />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } flex-col gap-3 p-3 items-center text-lg sm:hidden`}
      >
        <Link
          className="rounded-lg hover:bg-slate-300 p-2 transition-all"
          href="/"
        >
          Home
        </Link>
        <Link
          className="rounded-lg hover:bg-slate-300 p-2 transition-all"
          href="/loja"
        >
          Loja
        </Link>
        <Link
          className="rounded-lg hover:bg-slate-300 p-2 transition-all"
          href="/animals"
        >
          Animais
        </Link>
      </div>
    </nav>
  );
}
