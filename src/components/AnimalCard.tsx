import { Animal } from "@prisma/client";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <Link
      href={`/animals/${animal.id}`}
      className="bg-slate-200 hover:bg-slate-300 transition-all rounded-lg overflow-hidden shadow-md hover:shadow-lg"
    >
      <img
        className="w-40 h-36 md:w-48 object-cover"
        src={animal.imagemURL}
        alt=""
      />
      <div className="p-4 w-40 truncate">{animal.nome}</div>
    </Link>
  );
}
