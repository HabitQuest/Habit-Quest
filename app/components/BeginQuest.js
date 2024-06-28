import Image from "next/image";
import Link from "next/link";

export default function BeginQuestSection() {
  return (
    <div className="flex sm:space-x-8 space-x-2 justify-center mt-6">
      <div className="flex flex-col justify-center items-center space-y-4 bg-dark-green rounded shadow-xl sm:h-72 sm:p-12 p-2 mb-8 w-[7rem] sm:w-[12rem] md:w-[14rem] lg:w-[16rem]">
        <h1 className="sm:text-2xl text-xl font-bold">Mage</h1>
        <Image src="/witch-hat.png" width={50} height={50} alt="Wizard hat" />
        <p className="sm:text-sm text-[0.56rem] px-[0.2rem] text-center">
          High intelligence and magic.
        </p>
        <Link href="sign-up">
          <button className="bg-green sm:px-6 px-2 sm:py-2 py-2 sm:text-base text-xs rounded-md">
            Begin Quest
          </button>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 bg-dark-green rounded shadow-xl sm:h-72 sm:p-12 p-2 mb-8 w-[7rem] sm:w-[12rem] md:w-[14rem] lg:w-[16rem]">
        <h1 className="sm:text-2xl text-xl font-bold">Warrior</h1>
        <Image
          src="/spear.png"
          width={50}
          height={50}
          alt="Spears and shield"
        />
        <p className="sm:text-sm text-[0.6rem] px-[0.2rem] text-center">
          High strength and defense.
        </p>
        <Link href="sign-up">
          <button className="bg-green sm:px-6 px-2 sm:py-2 py-2 sm:text-base text-xs rounded-md">
            Begin Quest
          </button>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 bg-dark-green rounded shadow-xl sm:h-72 sm:p-12 p-2 mb-8 w-[7rem] sm:w-[12rem] md:w-[14rem] lg:w-[16rem]">
        <h1 className="sm:text-2xl text-xl font-bold">Rogue</h1>
        <Image src="/dagger.png" width={50} height={50} alt="Dagger" />
        <p className="sm:text-sm text-[0.6rem] px-[0.2rem] text-center">
          High agility and stealth.
        </p>
        <Link href="sign-up">
          <button className="bg-green sm:px-6 px-2 sm:py-2 py-2 sm:text-base text-xs rounded-md">
            Begin Quest
          </button>
        </Link>
      </div>
    </div>
  );
}
