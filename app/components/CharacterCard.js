"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function CharacterCard() {
  const searchParams = useSearchParams();
  const selectedClass = searchParams.get("class");

  const characters = {
    Mage: [
      {
        name: "Mage 1",
        src: "/character-imgs/mage1.png",
      },
      {
        name: "Mage 2",
        src: "/character-imgs/mage2.png",
      },
      {
        name: "Mage 3",
        src: "/character-imgs/mage3.png",
      },
    ],
    Warrior: [
      {
        name: "Warrior 1",
        src: "/character-imgs/warrior1.png",
      },
      {
        name: "Warrior 2",
        src: "/character-imgs/warrior2.png",
      },
      {
        name: "Warrior 3",
        src: "/character-imgs/warrior3.png",
      },
    ],
    Rogue: [
      {
        name: "Rogue 1",
        src: "/character-imgs/rogue1.png",
      },
      {
        name: "Rogue 2",
        src: "/character-imgs/rogue2.png",
      },
      {
        name: "Rogue 3",
        src: "/character-imgs/rogue3.png",
      },
    ],
  };

  if (!selectedClass || !characters[selectedClass]) {
    return <p>Loading...</p>;
  }

  return (
    <>
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
              />
              <p className="text-center text-sm mt-2">
                {character.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
