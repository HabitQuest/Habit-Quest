import { useEffect, useState } from "react";
import { FaCrown, FaUser } from "react-icons/fa";
import Image from "next/image";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLeaders(data);
        setIsLoading(false);
        console.log("Leaderboard Data:", data);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
        setIsLoading(false);
      });
  }, []);
  console.log(leaders);

  return (
    <div className="w-full bg-dark-green rounded-2xl sm:rounded-3xl p-3 sm:p-4">
      <h2 className="text-center text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4">
        Leaderboard
      </h2>
      {isLoading ? (
        <p className="text-center text-white">Loading...</p>
      ) : leaders.length > 0 ? (
        <div className="flex flex-col w-full">
          {leaders.map((user, index) => (
            <div
              key={index}
              className="flex flex-row items-center px-2 sm:px-4 py-1.5 sm:py-2 border-b border-gray-200/20 text-white"
            >
              <div className="flex items-center w-6 sm:w-8">
                {index === 0 && <FaCrown className="text-gold" />}
                {index !== 0 && (
                  <span className="text-sm sm:text-base font-bold">
                    {index + 1}.
                  </span>
                )}
              </div>

              <div className="flex justify-center items-center rounded-full overflow-hidden w-8 h-8 sm:w-10 sm:h-10 border-2 border-yellow mx-2 sm:mx-4">
                {user.userCharacter ? (
                  <Image
                    src={user.userCharacter}
                    width={40}
                    height={40}
                    alt="Character Avatar"
                    className="w-full h-full object-cover"
                    priority
                  />
                ) : (
                  <FaUser className="w-5 h-5 sm:w-6 sm:h-6 text-yellow" />
                )}
              </div>
              <span className="text-xs sm:text-sm flex-1 min-w-[80px] sm:min-w-[120px] truncate pr-2">
                {user.username}
              </span>
              <span className="text-[10px] sm:text-sm text-yellow w-14 sm:w-20 text-center whitespace-nowrap">
                Level {user.overallLevel}
              </span>
              <span className="text-[10px] sm:text-sm text-bright-green w-14 sm:w-20 text-right whitespace-nowrap">
                EXP {user.overallEXP}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white text-sm">No data available.</p>
      )}
    </div>
  );
}
export default Leaderboard;
