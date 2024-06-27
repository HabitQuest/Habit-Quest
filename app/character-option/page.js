import { Suspense } from "react";
import CharacterCard from "../components/CharacterCard";

export default function CharacterSelection() {
  return (
    <main>
      <section className="text-center">
        <h1 className="text-2xl">Choose Character</h1>
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <CharacterCard />
      </Suspense>
    </main>
  );
}
