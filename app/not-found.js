import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-between">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
        <button className="bg-dark-green text-white p-2 rounded-lg m-2">
          Return Home
        </button>
      </Link>
    </main>
  );
}
