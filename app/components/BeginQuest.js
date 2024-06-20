import Image from "next/image";

export default function BeginQuestSection() {
  return (
    <div className="flex flex-wrap sm:flex-nowrap justify-center sm:space-x-8 mt-6">
      <div className="flex flex-col justify-center items-center space-y-4 bg-dark-green rounded shadow-xl h-72 sm:p-10 mb-8 w-full sm:w-[12rem] md:w-[14rem] lg:w-[16rem]">
        <h1 className="text-2xl">Mage</h1>
        <Image src="/witch-hat.png" width={60} height={60} alt="Wizard hat" />
        <p className="text-sm text-center">High intelligence and magic.</p>
        <button className="bg-green sm:px-6 px-24 py-2 rounded-md">
          Begin Quest
        </button>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 bg-dark-green rounded shadow-xl h-72 sm:p-12 mb-8 w-full sm:w-[12rem] md:w-[14rem] lg:w-[16rem]">
        <h1 className="text-2xl">Warrior</h1>
        <Image
          src="/spear.png"
          width={60}
          height={60}
          alt="Spears and shield"
        />
        <p className="text-sm text-center">High strength and defense.</p>
        <button className="bg-green sm:px-6 px-24 py-2 rounded-md">
          Begin Quest
        </button>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 bg-dark-green rounded shadow-xl h-72 sm:p-12 mb-8 w-full sm:w-[12rem] md:w-[14rem] lg:w-[16rem]">
        <h1 className="text-2xl">Rogue</h1>
        <Image src="/dagger.png" width={60} height={60} alt="Dagger" />
        <p className="text-sm text-center">High agility and stealth.</p>
        <button className="bg-green sm:px-6 px-24 py-2 rounded-md">
          Begin Quest
        </button>
      </div>
    </div>
  );
}
