"use client";
import Image from "next/image";
import withAuth from "../components/withAuth";
import { useUser } from "../_contexts/UserContext";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { eraseCookie } from "../utils/cookies";
import { useRouter } from "next/navigation";
import HabitList from "../components/HabitList";
import ClassStats from "../components/ClassStats";
import Quests from "../components/Quests";
import { NewHabitModal } from "../components/NewHabit";

function Dashboard() {
  const { user, setUser } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editHabitId, setEditHabitId] = useState(null);
  const [editHabitName, setEditHabitName] = useState("");
  const [editHabitType, setEditHabitType] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetch(`/api/habits?userId=${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setHabits(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch habits:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    eraseCookie("user");
    router.push("/sign-in");
  };

  const handleSaveHabit = (newHabit) => {
    setHabits((prevHabits) => [...prevHabits, newHabit]);
    setShowModal(false);
  };

  const handleThumbsUp = async (habitId) => {
    try {
      const response = await fetch(`/api/habits/${habitId}/thumbs`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isThumbsUp: true,
          isThumbsDown: false,
        }),
      });

      if (response.ok) {
        const updatedHabit = await response.json();
        setHabits((prevHabits) =>
          prevHabits.map((habit) =>
            habit.id === habitId ? updatedHabit : habit
          )
        );
      } else {
        console.error("Failed to update habit thumbs up state");
      }
    } catch (error) {
      console.error("Error updating habit thumbs up state:", error);
    }
  };

  const handleThumbsDown = async (habitId) => {
    try {
      const response = await fetch(`/api/habits/${habitId}/thumbs`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isThumbsUp: false,
          isThumbsDown: true,
        }),
      });

      if (response.ok) {
        const updatedHabit = await response.json();
        setHabits((prevHabits) =>
          prevHabits.map((habit) =>
            habit.id === habitId ? updatedHabit : habit
          )
        );
      } else {
        console.error("Failed to update habit thumbs down state");
      }
    } catch (error) {
      console.error("Error updating habit thumbs down state:", error);
    }
  };

  const handleEditMode = (habit) => {
    setEditHabitId(habit.id);
    setEditHabitName(habit.habit);
    setEditHabitType(habit.habitType);
    setEditMode(true);
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`/api/habits/${id}/details`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          habit: editHabitName,
          habitType: editHabitType,
        }),
      });

      if (response.ok) {
        const updatedHabit = await response.json();
        setHabits((prevHabits) =>
          prevHabits.map((habit) => (habit.id === id ? updatedHabit : habit))
        );
        setEditHabitId(null);
        setEditMode(false);
      } else {
        console.error("Failed to update habit");
      }
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      const response = await fetch(`/api/habits/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setHabits((prevHabits) =>
          prevHabits.filter((habit) => habit.id !== id)
        );
      } else {
        console.error("Failed to delete habit");
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const resetHabitStatus = async (habitId) => {
    try {
      const response = await fetch(`/api/habits/${habitId}/thumbs`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isThumbsUp: false,
          isThumbsDown: false,
        }),
      });

      if (response.ok) {
        const updatedHabit = await response.json();
        setHabits((prevHabits) =>
          prevHabits.map((habit) =>
            habit.id === habitId ? updatedHabit : habit
          )
        );
      } else {
        console.error("Failed to reset habit status");
      }
    } catch (error) {
      console.error("Error resetting habit status:", error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <div className="relative">
        {user?.userCharacter && (
          <div className="flex justify-center items-start w-44 h-44 rounded-full overflow-hidden border-4 border-gold">
            <Image
              src={user.userCharacter}
              width={200}
              height={200}
              alt="Character Avatar"
              style={{
                objectFit: "cover",
              }}
              priority
            />
          </div>
        )}
      </div>
      <div className="flex justify-center sm:space-x-52 space-x-16 p-6 rounded shadow-md">
        <h2 className="sm:text-3xl text-xl font-bold mb-2">{user.username}</h2>
        <h1 className="text-gold sm:text-4xl text-2xl font-semibold">
          LV {user.overallLevel}
        </h1>
      </div>
      <div className="flex sm:w-full md:max-w-[58rem] flex-wrap space-y-8 sm:grid-flow-row lg:gap-x-8">
        <HabitList
          setShowModal={setShowModal}
          habits={habits}
          onThumbsUp={handleThumbsUp}
          onThumbsDown={handleThumbsDown}
          resetHabitStatus={resetHabitStatus}
          handleEditMode={handleEditMode}
          handleSaveEdit={handleSaveEdit}
          handleDeleteHabit={handleDeleteHabit}
          editMode={editMode}
          setEditMode={setEditMode}
          editHabitId={editHabitId}
          editHabitName={editHabitName}
          setEditHabitName={setEditHabitName}
          editHabitType={editHabitType}
          setEditHabitType={setEditHabitType}
        />
        <ClassStats playerClass={user.userClass} />
        <Quests />
      </div>
      <NewHabitModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSave={handleSaveHabit}
      />
      <button
        onClick={handleLogout}
        className="mt-4 bg-dark-green text-white px-4 py-2 rounded"
      >
        Log out
      </button>
    </div>
  );
}

export default withAuth(Dashboard);
