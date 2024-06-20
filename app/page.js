import { balthazar } from "./lib/fonts";
import BeginQuestSection from "./components/BeginQuest";
import StarsHeading from "./components/StarsHeading";

export default function Home() {
  return (
    <main className="flex flex-col space-y-8 justify-center items-center">
      <header>
        <StarsHeading />
        <div>
          <h2 className="text-white text-center mt-4 sm:text-2xl text-xl">
            Ready to embark on your next quest?
          </h2>
        </div>
      </header>
      <article>
        <BeginQuestSection />
      </article>
      <article className="w-full sm:max-w-4xl max-w-xl">
        <div className={`${balthazar.className} mx-auto`}>
          <p className="text-center text-base sm:text-lg leading-relaxed">
            Habit Quest is a revolutionary productivity app that transforms the
            way you build and maintain habits. By gamifying your daily routines,
            Habit Quest makes achieving your goals an exciting and engaging
            adventure. Choose your character – be it a powerful Warrior, a
            cunning Rogue, or a wise Mage – and embark on quests designed to
            help you conquer your personal challenges and unlock your full
            potential.
          </p>
        </div>
      </article>
    </main>
  );
}
