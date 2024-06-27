"use client";
import ClassCard from "../components/ClassCard";
import { useRouter } from "next/navigation";
import { classes } from "../lib/classes";

export default function ClassSelection() {
  const router = useRouter();

  const handlePickClass = (characterClass) => {
    router.push(`/character-option?class=${characterClass}`);
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
