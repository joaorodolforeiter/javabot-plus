"use client";
import { useSession, signIn, signOut } from "next-auth/react";

import { List, PawPrint } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const session = useSession();

  return (
    <nav className="top-0 fixed w-screen bg-slate-100 shadow-sm">
      <div className="h-16 flex justify-between items-center px-8">
        <div className="font-bold text-xl flex gap-3 items-center">
          <PawPrint size={32} weight="fill" /> Javabot Plus
        </div>

        <div className="flex justify-center items-center gap-6">
          <div className="gap-3 sm:flex hidden">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Image
                    className="w-10 rounded-full bg-white"
                    width={128}
                    height={128}
                    src={session.data?.user?.image || ""}
                    alt="Account Photo"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/animals/meus">Meus Animais</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/cart">Carrinho</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      className="bg-red-400 w-full text-white flex justify-center items-center shadow-md p-2 rounded-md"
                      onClick={() => signOut()}
                    >
                      Sair
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
      <div className="max-lg:hidden flex gap-6 p-3 bg-slate-200 px-8 shadow-sm">
        <div>Barata</div>
        <div>Gato</div>
        <div>Aves</div>
        <div>Cachorro</div>
        <div>Barata</div>
        <div>Besouro</div>
        <div>Brinquedos</div>
        <div>Higiene</div>
        <div>Acessórios</div>
        <div>Calopsita</div>
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
