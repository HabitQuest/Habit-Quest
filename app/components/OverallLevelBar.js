import ProgressBar from "./ProgressBar";

export default function OverallLevelBar({ xp, level }) {
  const overallLevelColor = "linear-gradient(180deg, #24AA49 0%, #0E441D 100%)";
  const progress = xp % 100;
  return (
    <div className="flex space-x-2 sm:w-4/6 w-[22.8rem] p-4">
      <p className="text-lg mt-[-0.3rem]">XP</p>
      <ProgressBar progress={progress} colorType={overallLevelColor} />
      <p className="font-bold sm:mt-[-0.1rem] sm:w-[4rem]  w-[2.8rem]">
        LV {level + 1}
      </p>
    </div>
  );
}
