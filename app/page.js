import { balthazar } from "./lib/fonts";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <article className="bg-dark-green rounded-lg p-8">
        <h1>Hello World</h1>
        <p className={`${balthazar.className}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="py-8 font-black">
          <span className="rounded-l-lg p-2 bg-yellow-gradient">
            Complete 3 Habits
          </span>
          <span className="rounded-r-lg p-2 bg-blue-gradient">30XP</span>
        </div>
        <span className="bg-neon-red rounded-full p-2">Physical</span>
        <span className="bg-neon-blue rounded-full p-2">Mental</span>
        <span className="bg-neon-green rounded-full p-2">Swift</span>
      </article>
      <article className="bg-blue p-8 rounded-lg">
        <p className={`${balthazar.className}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </article>
      <article className="bg-yellow p-8 rounded-lg">
        <p className={`${balthazar.className}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </article>
    </main>
  );
}
