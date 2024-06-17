import { balthazar } from "./lib/fonts";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <article className="bg-dark-green rounded-lg sm:p-8 p-4">
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
        <div className="py-8 font-bold text-black">
          <span className="rounded-l-xl p-2 px-8 bg-yellow-gradient">
            Complete 3 Habits
          </span>
          <span className="rounded-r-xl p-2 text-gold bg-blue-gradient">
            30XP
          </span>
        </div>
        <div className="flex space-x-2">
          <span className="flex-1 font-bold bg-neon-red rounded-full p-2 text-center min-w-0 max-w-xs">
            Physical
          </span>
          <span className="flex-1 font-bold bg-neon-blue rounded-full p-2 text-center min-w-0 max-w-xs">
            Mental
          </span>
          <span className="flex-1 font-bold bg-neon-green rounded-full p-2 text-center min-w-0 max-w-xs">
            Swift
          </span>
        </div>
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
