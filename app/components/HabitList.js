"use client";
import { useState } from "react";
import { IoPencil } from "react-icons/io5";
import HabitsLoading from "./HabitsLoading";
import HabitCard from "./HabitCard";

export default function HabitList({
  setShowModal,
  habits,
  onThumbsUp,
  onThumbsDown,
  handleEditMode,
  handleDeleteHabit,
}) {
  const [editMode, setEditMode] = useState(false);

  const handleThumbsUpClick = (habitId) => {
    console.log("HabitList: Thumbs up clicked for habit:", habitId);
    onThumbsUp(habitId);
  };

  const handleThumbsDownClick = (habitId) => {
    console.log("HabitList: Thumbs down clicked for habit:", habitId);
    onThumbsDown(habitId);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-yellow font-bold">Daily Habits</h1>
        <div className="flex items-center gap-4">
          <button
            className={`bg-dark-green text-lg flex justify-center items-center hover:bg-yellow hover:text-black transition-colors duration-200 rounded-full w-12 h-12 ${
              editMode ? "text-neon-blue" : "text-white"
            }`}
            onClick={() => setEditMode(!editMode)}
          >
            <IoPencil />
          </button>
          <button
            className="bg-dark-green text-white px-4 py-2 rounded-xl hover:bg-yellow hover:text-black transition-colors duration-200"
            onClick={() => setShowModal(true)}
          >
            + New Habit
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {!habits ? (
          <HabitsLoading />
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              editMode={editMode}
              onThumbsUp={handleThumbsUpClick}
              onThumbsDown={handleThumbsDownClick}
              handleEditMode={handleEditMode}
              handleDeleteHabit={handleDeleteHabit}
            />
          ))
        )}
      </div>
    </div>
  );
}
