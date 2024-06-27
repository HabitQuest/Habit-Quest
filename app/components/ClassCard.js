"use client";
import { balthazar } from "../lib/fonts";
import Image from "next/image";
import { useState } from "react";

export default function ClassCard({
  title,
  imageUrl,
  description,
  pickLabel,
  learnMoreLabel,
  learnMoreInfo,
  onPick,
}) {
  const [showMore, setShowMore] = useState(false);

  const handleLearnMore = () => {
    setShowMore(!showMore);
  };
  return (
    <>
      <article className="flex flex-col justify-center items-center space-y-4 mt-8 bg-dark-green p-4 sm:w-72 w-full">
        <h1 className="text-xl">{title}</h1>
        <Image src={imageUrl} width={50} height={50} alt={title} />
        <p className="text-sm p-2">{description}</p>
        <div className="flex flex-col mt-4 space-y-4">
          <button
            className="bg-green py-2 sm:px-12 px-16 w-full rounded-full font-bold"
            onClick={onPick}
          >
            {pickLabel}
          </button>
          <button
            onClick={handleLearnMore}
            className="bg-yellow py-2 sm:px-12 px-16 w-full rounded-full font-semibold"
          >
            {learnMoreLabel}
          </button>
        </div>
        <div
          className={`mt-4 overflow-hidden transition-max-height duration-500 ease-in-out ${
            showMore ? "max-h-screen" : "max-h-0"
          }`}
        >
          {showMore && (
            <ul
              className={`${balthazar.className} text-center text-sm mt-2 list-disc list-inside`}
            >
              {learnMoreInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </>
  );
}
