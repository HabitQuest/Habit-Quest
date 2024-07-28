import { useState, useEffect } from "react";
import { balthazar } from "../lib/fonts";

export default function EditHabitModal({
  showModal,
  setShowModal,
  habitId,
  habitName,
  habitType,
  habitTime,
  handleSaveEdit,
}) {
  const [localHabitName, setLocalHabitName] = useState(habitName);
  const [localHabitType, setLocalHabitType] = useState(habitType);
  const [localHabitTime, setLocalHabitTime] = useState(habitTime);

  useEffect(() => {
    setLocalHabitName(habitName);
    setLocalHabitType(habitType);
    setLocalHabitTime(habitTime);
  }, [habitName, habitType, habitTime]);

  const handleSave = () => {
    handleSaveEdit(habitId, localHabitName, localHabitType, localHabitTime);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-dark-green p-4 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Habit</h2>
        <input
          type="text"
          value={localHabitName}
          onChange={(e) => setLocalHabitName(e.target.value)}
          className={`w-full bg-green p-2 mb-4 border rounded ${balthazar.className}`}
        />
        <select
          value={localHabitType}
          onChange={(e) => setLocalHabitType(e.target.value)}
          className={`w-full bg-green p-2 mb-4 border rounded ${balthazar.className}`}
        >
          <option value="Physical">Physical</option>
          <option value="Mental">Mental</option>
          <option value="Swift">Swift</option>
        </select>

        <input
          id="time"
          type="time"
          value={localHabitTime}
          onChange={(e) => setLocalHabitTime(e.target.value)}
          className="w-[8rem] bg-green mb-2 p-2 border rounded"
        />
        <div className="flex justify-end space-x-4 mt-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-transparent border border-red-500  text-red-500 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
