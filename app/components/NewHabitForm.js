import { useState } from "react";
import { useUser } from "../_contexts/UserContext";
import { balthazar } from "../lib/fonts";

export default function NewHabitForm({ onSave, setShowModal }) {
  const [habit, setHabitName] = useState("");
  const [habitType, setHabitType] = useState("");
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        habit,
        habitType,
        userId: user.id,
      }),
    });

    if (response.ok) {
      const newHabit = await response.json();
      onSave(newHabit);
      setShowModal(false);
      setHabitName("");
      setHabitType("");
    } else {
      console.error("Failed to create new habit");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <label
          className="block text-gray-100 text-sm font-bold mb-2"
          htmlFor="habitName"
        >
          Habit Name
        </label>
        <input
          id="habit"
          type="text"
          value={habit}
          onChange={(e) => setHabitName(e.target.value)}
          className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none placeholder:italic ${balthazar.className}`}
          placeholder="Enter habit name"
          required
        />
      </div>

      <div>
        <label className="block text-gray-100 text-sm font-bold mb-2">
          Habit Type
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="habitType"
              value="Physical"
              checked={habitType === "Physical"}
              onChange={(e) => setHabitType(e.target.value)}
              className="form-radio"
              required
            />
            <span className="bg-neon-red text-center w-[6rem] rounded-2xl">
              Physical
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="habitType"
              value="Mental"
              checked={habitType === "Mental"}
              onChange={(e) => setHabitType(e.target.value)}
              className="form-radio"
              required
            />
            <span className="bg-neon-blue text-center w-[6rem] rounded-2xl">
              Mental
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="habitType"
              value="Swift"
              checked={habitType === "Swift"}
              onChange={(e) => setHabitType(e.target.value)}
              className="form-radio"
              required
            />
            <span className="bg-neon-green text-center sm:w-[6rem] w-[4rem] rounded-2xl">
              Swift
            </span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          className="px-6 py-2 text-white bg-emerald-500 rounded-lg"
          type="submit"
        >
          + Add
        </button>
      </div>
    </form>
  );
}
