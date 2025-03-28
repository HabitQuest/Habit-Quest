import Image from "next/image";
import ProgressBar from "./ProgressBar";

export default function ClassStats({
  playerClass,
  mageProgress,
  warriorProgress,
  rogueProgress,
  mageLevel,
  warriorLevel,
  rogueLevel,
}) {
  const mageProgressColor = "linear-gradient(180deg, #3384FC 0%, #1E4F96 100%)";
  const warriorProgressColor =
    "linear-gradient(180deg, #F0432C 0%, #8A2719 100%)";
  const rougeProgressColor =
    "linear-gradient(180deg, #24AA49 0%, #0E441D 100%)";

  return (
    <div className="w-full lg:max-w-[24rem] bg-blue p-4 rounded-3xl">
      <div className="flex">
        <div className="flex flex-col space-y-6 p-4">
          <Image
            src="/witch-hat.png"
            width={50}
            height={50}
            alt="Wizard hat"
            loading="lazy"
          />
          <Image
            src="/spear.png"
            width={50}
            height={50}
            alt="Spears and shield"
            loading="lazy"
          />
          <Image
            src="/dagger.png"
            width={50}
            height={50}
            alt="Dagger"
            loading="lazy"
          />
        </div>
        <div className="w-full space-y-10 mt-7">
          <ProgressBar progress={mageProgress} colorType={mageProgressColor} />
          <ProgressBar
            progress={warriorProgress}
            colorType={warriorProgressColor}
          />
          <ProgressBar
            progress={rogueProgress}
            colorType={rougeProgressColor}
          />
        </div>
        <div className="flex flex-col space-y-[2.14rem] ml-2 mt-7 font-bold text-white">
          <p className="text-blue bg-yellow text-center w-[1.4rem] h-[1.4rem] rounded-full">
            {mageLevel}
          </p>
          <p className="text-blue bg-yellow   text-center w-[1.4rem] h-[1.4rem] rounded-full">
            {warriorLevel}
          </p>
          <p className="text-blue bg-yellow  text-center w-[1.4rem] h-[1.4rem] rounded-full">
            {rogueLevel}
          </p>
        </div>
      </div>
      <div className="text-center font-bold text-3xl pt-2">
        <h1 className="[text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)]">
          {playerClass}
        </h1>
      </div>
    </div>
  );
}
