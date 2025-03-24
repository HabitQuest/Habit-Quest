import {
  IoThumbsUp,
  IoThumbsDown,
  IoPencil,
  IoTrash,
  IoTimer,
} from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { formatTime } from "../utils/formatTime";
import { balthazar, inter } from "../lib/fonts";

const typeColors = {
  Physical: "bg-dark-red",
  Mental: "bg-dark-blue",
  Swift: "bg-dark-task-green",
};

export default function HabitCard({
  habit,
  editMode,
  onThumbsUp,
  onThumbsDown,
  handleEditMode,
  handleDeleteHabit,
}) {
  console.log("HabitCard rendered with habit:", habit);
  console.log("Habit duration:", habit.duration);

  const handleThumbsUpClick = () => {
    console.log("Thumbs up clicked for habit:", habit.id);
    onThumbsUp(habit.id);
  };

  const handleThumbsDownClick = () => {
    console.log("Thumbs down clicked for habit:", habit.id);
    onThumbsDown(habit.id);
  };

  return (
    <div
      className={`${typeColors[habit.habitType]} rounded-xl sm:p-4 p-1 mb-4`}
    >
      {/* Main Content */}
      <div className="flex items-center">
        {/* Left Buttons Container */}
        {editMode ? (
          <div className="flex flex-col gap-2 mr-4">
            <button
              className="bg-[#2A2A2A] text-neon-blue text-lg flex justify-center items-center hover:bg-[#1A1A1A] transition-colors duration-200 rounded-full w-12 h-12"
              onClick={() => handleEditMode(habit)}
            >
              <IoPencil className="w-5 h-5" />
            </button>
            <button
              className="bg-[#2A2A2A] text-neon-red text-lg flex justify-center items-center hover:bg-[#1A1A1A] transition-colors duration-200 rounded-full w-12 h-12"
              onClick={() => handleDeleteHabit(habit.id)}
            >
              <IoTrash className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mr-4">
            <button
              className={`bg-[#2A2A2A] flex justify-center items-center hover:bg-[#1A1A1A] transition-colors duration-200 rounded-full w-12 h-12 ${
                habit.isThumbsUp ? "text-[#1A4731] bg-[#2A8B2A]" : "text-white"
              }`}
              onClick={handleThumbsUpClick}
            >
              <IoThumbsUp className="min-w-[16px] min-h-[16px] sm:w-5 sm:h-5" />
            </button>
            <button
              className={`bg-[#2A2A2A] flex justify-center items-center hover:bg-[#1A1A1A] transition-colors duration-200 rounded-full w-12 h-12 ${
                habit.isThumbsDown ? "text-neon-red bg-[#471A1A]" : "text-white"
              }`}
              onClick={handleThumbsDownClick}
            >
              <IoThumbsDown className="min-w-[16px] min-h-[16px] sm:w-5 sm:h-5" />
            </button>
          </div>
        )}

        {/* Habit Content */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <div>
              {/* Habit Name */}
              <div
                className={`${balthazar.className} p-1 text-xl text-white ${
                  habit.isThumbsUp || habit.isThumbsDown ? "line-through" : ""
                }`}
              >
                {habit.habit}
              </div>
              {/* Time */}
              <div className="flex flex-col gap-2">
                <span className="bg-[#2A2A2A] text-yellow text-sm px-4 py-1 rounded-full inline-flex items-center justify-center">
                  {formatTime(habit.time)}
                </span>
                <div className="flex gap-2 items-center">
                  <span className="bg-[#2A2A2A]/60 border border-gold text-gold text-sm px-4 py-1 rounded-full inline-flex items-center gap-2">
                    <BsFire className="min-w-[16px] min-h-[16px] sm:w-5 sm:h-5 text-orange-500" />
                    <span>Streak</span>
                    <span>{habit.streak || 0}</span>
                  </span>
                  {habit.duration && (
                    <span className="bg-[#2A2A2A] text-yellow text-sm px-4 py-1 rounded-full inline-flex items-center gap-2">
                      <IoTimer className="min-w-[16px] min-h-[16px] sm:w-5 sm:h-5 text-yellow" />
                      {habit.duration >= 60
                        ? `${Math.floor(habit.duration / 60)}`
                        : `${habit.duration}`}
                      <span className={inter.className}>
                        {habit.duration >= 60 ? "h" : "m"}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Type Badge */}
            <span
              className={`${
                typeColors[habit.habitType]
              } text-sm px-3 py-1 ml-2`}
            >
              {habit.habitType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
