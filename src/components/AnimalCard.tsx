import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function AnimalCard({
  name,
  image,
  id,
}: {
  id: number;
  image: string;
  name: string;
}) {
  return (
    <Link
      href={`/animals/${id}`}
      className="bg-slate-200 hover:bg-slate-300 transition-all rounded-lg overflow-hidden shadow-md hover:shadow-lg"
    >
      <img className="w-40 h-36 md:w-48 object-cover" src={image} alt="" />
      <div className="p-4 w-40 truncate">{name}</div>
    </Link>
  );
}
