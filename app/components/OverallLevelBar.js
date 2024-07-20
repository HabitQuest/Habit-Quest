import ProgressBar from "./ProgressBar";

export default function OverallLevelBar({ xp, level }) {
  const overallLevelColor = "linear-gradient(180deg, #24AA49 0%, #0E441D 100%)";
  const progress = xp % 100;
  return (
    <div className="flex space-x-2 sm:w-2/3 lg:w-3/5 w-full p-4">
      <p className="text-lg mt-[-0.3rem]">XP</p>
      <ProgressBar progress={progress} colorType={overallLevelColor} />
      <p className="sm:text-lg md:text-md text-sm font-bold sm:mt-[-0.3rem] sm:w-[3rem] w-[2.8rem]">
        LV {level + 1}
      </p>
    </div>
  );
}
