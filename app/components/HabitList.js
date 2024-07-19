"use client";
import { useState, useEffect } from "react";
import { useUser } from "../_contexts/UserContext";
import { balthazar } from "../lib/fonts";
import { IoThumbsUp, IoThumbsDown, IoPencil, IoTrash } from "react-icons/io5";
import HabitsLoading from "./HabitsLoading";
import ButtonLoading from "./ButtonLoading";

export default function HabitList({
  setShowModal,
  habits,
  onThumbsUp,
  onThumbsDown,
  resetHabitStatus,
  handleEditMode,
  handleSaveEdit,
  handleDeleteHabit,
  editMode,
  setEditMode,
  editHabitId,
  editHabitName,
  setEditHabitName,
  editHabitType,
  setEditHabitType,
}) {
  const [userHabits, setUserHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useUser();

  const typeColors = {
    Physical: "bg-neon-red",
    Mental: "bg-neon-blue",
    Swift: "bg-neon-green",
  };

  useEffect(() => {
    if (user) {
      fetch(`/api/habits?userId=${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserHabits(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch habits:", error);
          setIsLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (habits.length > 0) {
      setUserHabits(habits);
    } else {
      setUserHabits([]);
    }
  }, [habits]);

  const handleSaveEditWithLoading = async (id) => {
    setIsSaving(true);
    await handleSaveEdit(id);
    setIsSaving(false);
  };

  return (
    <div className="container flex flex-col justify-center items-center w-full bg-dark-green rounded-3xl pt-4">
      <div className="flex relative items-center justify-between">
        <h1 className="flex text-center font-bold text-2xl">Habit List</h1>
        <button
          className="absolute start-48 sm:start-72 text-2xl px-2 bg-green-500 text-white rounded-md"
          onClick={() => setEditMode(!editMode)}
        >
          ⁝
        </button>
      </div>

      <div className="p-4 flex flex-col space-y-8 mb-2">
        {isLoading ? (
          <HabitsLoading />
        ) : (
          userHabits.map((habit) => (
            <div className="flex space-x-6" key={habit.id}>
              {editMode ? (
                <>
                  <button
                    className="bg-green text-neon-blue text-lg flex justify-center items-center hover:bg-dark-green rounded-full w-[3.9rem] h-[2rem]"
                    onClick={() => handleEditMode(habit)}
                  >
                    <IoPencil />
                  </button>
                  {editHabitId === habit.id ? (
                    <div
                      className={`${balthazar.className} text-xl text-center ${
                        habit.isThumbsUp
                          ? "bg-emerald-700"
                          : habit.isThumbsDown
                          ? "bg-red-700"
                          : "bg-green"
                      } w-full px-[4vw] py-1 rounded-2xl`}
                    >
                      <div className="w-full flex justify-center space-x-2 relative">
                        <input
                          type="text"
                          value={editHabitName}
                          onChange={(e) => setEditHabitName(e.target.value)}
                          className="sm:w-full w-[3rem] bg-dark-green pl-2 outline-none rounded-md"
                        />
                        <select
                          value={editHabitType}
                          onChange={(e) => setEditHabitType(e.target.value)}
                          className="sm:w-full w-[1rem] bg-neon-blue outline-none rounded-md"
                        >
                          <option value="Physical">Physical</option>
                          <option value="Mental">Mental</option>
                          <option value="Swift">Swift</option>
                        </select>
                        <button
                          className="sm:w-[10rem] w-[3rem] text-base flex justify-center items-center text-white bg-emerald-500 rounded-xl"
                          onClick={() => handleSaveEditWithLoading(habit.id)}
                          disabled={isSaving}
                        >
                          {isSaving ? <ButtonLoading /> : "Save"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`${balthazar.className} text-xl text-center ${
                        habit.isThumbsUp
                          ? "bg-emerald-700"
                          : habit.isThumbsDown
                          ? "bg-red-700"
                          : "bg-green"
                      } w-full px-[8vw] py-1 rounded-2xl`}
                      onClick={() => resetHabitStatus(habit.id)}
                    >
                      <div className="w-full relative">
                        <span
                          className={`${
                            typeColors[habit.habitType]
                          } absolute -top-4 -left-12 rounded-2xl text-sm px-2 w-[4.8rem]`}
                        >
                          {habit.habitType}
                        </span>
                        <h2>{habit.habit}</h2>
                      </div>
                    </div>
                  )}
                  <button
                    className="bg-green text-neon-red text-lg flex justify-center items-center hover:bg-dark-green rounded-full w-[3.9em] h-[2rem]"
                    onClick={() => handleDeleteHabit(habit.id)}
                  >
                    <IoTrash />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={`bg-green text-neon-green text-lg flex justify-center items-center hover:bg-dark-green rounded-full w-[3.9rem] h-[2rem] ${
                      habit.isThumbsUp ? "bg-emerald-500" : ""
                    }`}
                    onClick={() => onThumbsUp(habit.id)}
                  >
                    <IoThumbsUp />
                  </button>
                  <div
                    className={`${balthazar.className} text-xl text-center ${
                      habit.isThumbsUp
                        ? "bg-emerald-700"
                        : habit.isThumbsDown
                        ? "bg-red-700"
                        : "bg-green"
                    } w-full px-[8vw] py-1 rounded-2xl cursor-pointer`}
                    onClick={() => resetHabitStatus(habit.id)}
                  >
                    <div className="w-full relative">
                      <span
                        className={`${
                          typeColors[habit.habitType]
                        } absolute -top-4 -left-12 rounded-2xl text-sm px-2 w-[4.8rem]`}
                      >
                        {habit.habitType}
                      </span>
                      <h2>{habit.habit}</h2>
                    </div>
                  </div>
                  <button
                    className="bg-green text-neon-red text-lg flex justify-center items-center hover:bg-dark-green rounded-full w-[4rem] h-[2rem]"
                    onClick={() => onThumbsDown(habit.id)}
                  >
                    <IoThumbsDown />
                  </button>
                </>
              )}
            </div>
          ))
        )}
        <button
          className="w-full font-bold text-center rounded-lg bg-green px-2 py-2 hover:text-gold"
          onClick={() => setShowModal(true)}
        >
          + Add new habit
        </button>
      </div>
    </div>
  );
}
