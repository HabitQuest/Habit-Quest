import Objective from "./Objective";

export default function Quests() {
  return (
    <div className="bg-dark-green w-full lg:w-[32rem] flex flex-col justify-center items-center p-4 rounded-3xl">
      <h1 className="text-2xl font-bold">Quests</h1>
      <Objective />
      <Objective />
      <Objective />
    </div>
  );
}
