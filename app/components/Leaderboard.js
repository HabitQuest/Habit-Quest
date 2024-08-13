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
    <div className="w-full bg-dark-green rounded-3xl p-4 pb-8">
      <h2 className="text-center text-white text-xl font-bold mb-4">
        Leaderboard
      </h2>
      {isLoading ? (
        <p className="text-center text-white">Loading...</p>
      ) : leaders.length > 0 ? (
        <div className="flex flex-col w-full">
          {leaders.map((user, index) => (
            <div
              key={index}
              className="flex flex-row items-center px-4 py-2 border-b border-gray-200 text-white"
            >
              <div className="flex items-center w-8">
                {index === 0 && <FaCrown className="text-gold" />}
                {index !== 0 && (
                  <span className="text-base font-bold">{index + 1}.</span>
                )}
              </div>

              <div className="flex justify-center items-center rounded-full overflow-hidden w-10 h-10 border-2 border-yellow mx-4">
                {user.userCharacter ? (
                  <Image
                    src={user.userCharacter}
                    width={60}
                    height={60}
                    alt="Character Avatar"
                    style={{
                      objectFit: "cover",
                    }}
                    priority
                  />
                ) : (
                  <FaUser className="w-6 h-6 text-yellow" />
                )}
              </div>
              <span className="text-sm sm:text-base flex-1 min-w-[120px]">
                {user.username}
              </span>
              <span className="text-xs sm:text-sm text-yellow w-24 text-center">
                Level {user.overallLevel}
              </span>
              <span className="text-xs sm:text-sm text-neon-green w-24 text-right">
                EXP {user.overallEXP}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white">No data available.</p>
      )}
    </div>
  );
}

export default Leaderboard;
