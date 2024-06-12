import { balthazar } from "./lib/fonts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-dark-green text-white p-8">
      <article className="bg-green p-8">
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
        <div className="my-4">
          <span className="bg-yellow-gradient p-2 rounded-l-lg font-black">
            Complete 3 Habits
          </span>
          <span className="bg-gradient-to-b from-bright-blue to-dark-blue p-2 rounded-r-lg font-black">
            30XP
          </span>
        </div>
      </article>
    </main>
  );
}
