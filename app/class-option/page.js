"use client";
import ClassCard from "../components/ClassCard";
import { useRouter } from "next/navigation";
import { classes } from "../lib/classes";
import { useUser } from "../_contexts/UserContext";
import { setCookie } from "cookies-next";

export default function ClassSelection() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handlePickClass = async (characterClass) => {
    try {
      const response = await fetch("/api/update-class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, userClass: characterClass }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setCookie("user", JSON.stringify(updatedUser));
        router.push(`/character-option?class=${characterClass}`);
      } else {
        console.error("Failed to update user class");
      }
    } catch (error) {
      console.error("Error updating user class:", error);
    }
  };

  return (
    <main>
      <section className="text-center">
        <h1 className="text-2xl">Choose your class</h1>
      </section>
      <section className="flex flex-wrap sm:space-x-4 justify-center items-center">
        {classes.map((characterClass, index) => (
          <ClassCard
            key={index}
            title={characterClass.title}
            imageUrl={characterClass.src}
            description={characterClass.description}
            pickLabel={`Pick ${characterClass.title}`}
            learnMoreLabel="Learn More"
            learnMoreInfo={characterClass.learnMoreInfo}
            onPick={() => handlePickClass(characterClass.title)}
          />
        ))}
      </section>
    </main>
  );
}
