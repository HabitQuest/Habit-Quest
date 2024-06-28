"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { characters } from "../lib/characters";

export default function CharacterCard() {
  const searchParams = useSearchParams();
  const selectedClass = searchParams.get("class");

  if (!selectedClass || !characters[selectedClass]) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex flex-wrap justify-center sm:space-x-8 mt-4">
        {characters[selectedClass].map((character, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gold p-4 rounded shadow-lg mb-4"
          >
            <button className="bg-green text-xl px-16 rounded-full mb-2">
              Pick
            </button>
            <Image
              src={character.src}
              width={200}
              height={100}
              alt={character.name}
              priority
            />
            <p className="text-center text-sm mt-2">{character.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
