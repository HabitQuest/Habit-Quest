import { Suspense } from "react";
import CharacterCard from "../components/CharacterCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CharacterSelection() {
  return (
    <main>
      <section className="text-center">
        <h1 className="text-2xl">Choose Character</h1>
      </section>
      <Suspense fallback={<LoadingSpinner />}>
        <CharacterCard />
      </Suspense>
    </main>
  );
}
