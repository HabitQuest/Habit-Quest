"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "../_contexts/UserContext";
import Image from "next/image";
import { characters } from "../lib/characters";
import { setCookie } from "../utils/cookies";

export default function CharacterCard() {
  const searchParams = useSearchParams();
  const selectedClass = searchParams.get("class");
  const { user, setUser } = useUser();
  const router = useRouter();

  const handlePickCharacter = async (characterSrc) => {
    try {
      const response = await fetch("/api/update-character", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, userCharacter: characterSrc }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setCookie("user", JSON.stringify(updatedUser), 3);
        router.push("/dashboard");
      } else {
        console.error("Failed to update user character");
      }
    } catch (error) {
      console.error("Error updating user character:", error);
    }
  };

  if (!selectedClass || !characters[selectedClass]) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex flex-wrap justify-center sm:space-x-8 mt-4">
        {characters[selectedClass].map((character, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gold p-4 h-[26rem] rounded shadow-lg mb-4"
          >
            <button
              className="bg-green text-xl px-16 rounded-full mb-2"
              onClick={() => handlePickCharacter(character.src)}
            >
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
