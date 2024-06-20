import Image from "next/image";

export default function BeginQuestSection() {
  return (
    <div className="flex sm:space-x-8 space-x-[2px] justify-center mt-6">
      <div className="flex flex-col justify-center items-center space-y-4 bg-dark-green rounded shadow-xl h-72 sm:p-12 mb-8 w-[8rem] sm:w-[12rem] md:w-[14rem] lg:w-[16rem]">
        <h1 className="sm:text-2xl text-xl font-bold">Mage</h1>
        <Image src="/witch-hat.png" width={60} height={60} alt="Wizard hat" />
        <p className="sm:text-sm text-xs text-center">
          High intelligence and magic.
        </p>
        <button className="bg-green sm:px-6 px-2 sm:py-2 py-2 sm:text-base text-sm rounded-md">
          Begin Quest
        </button>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 bg-dark-green rounded shadow-xl h-72 sm:p-12 mb-8 w-[8rem] sm:w-[12rem] md:w-[14rem] lg:w-[16rem]">
        <h1 className="sm:text-2xl text-xl font-bold">Warrior</h1>
        <Image
          src="/spear.png"
          width={60}
          height={60}
          alt="Spears and shield"
        />
        <p className="sm:text-sm text-xs text-center">
          High strength and defense.
        </p>
        <button className="bg-green sm:px-6 px-2 sm:py-2 py-2 sm:text-base text-sm rounded-md">
          Begin Quest
        </button>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 bg-dark-green rounded shadow-xl h-72 sm:p-12 mb-8 w-[8rem] sm:w-[12rem] md:w-[14rem] lg:w-[16rem]">
        <h1 className="sm:text-2xl text-xl font-bold">Rogue</h1>
        <Image src="/dagger.png" width={60} height={60} alt="Dagger" />
        <p className="sm:text-sm text-xs text-center">
          High agility and stealth.
        </p>
        <button className="bg-green sm:px-6 px-2 sm:py-2 py-2 sm:text-base text-sm rounded-md">
          Begin Quest
        </button>
      </div>
    </div>
  );
}
