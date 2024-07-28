"use client";
import Image from "next/image";
import withAuth from "../components/withAuth";
import { useUser } from "../_contexts/UserContext";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import HabitList from "../components/HabitList";
import ClassStats from "../components/ClassStats";
import Quests from "../components/Quests";
import { NewHabitModal } from "../components/NewHabit";
import OverallLevelBar from "../components/OverallLevelBar";
import EditHabitModal from "../components/EditHabit";

import {
  handleSaveHabit,
  handleThumbsUp,
  handleThumbsDown,
  handleEditMode,
  handleSaveEdit,
  handleDeleteHabit,
  resetHabitStatus,
  handleResetAllHabits,
} from "./habitHandlers";

function Dashboard() {
  const { user, setUser } = useUser();
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editHabitId, setEditHabitId] = useState(null);
  const [editHabitName, setEditHabitName] = useState("");
  const [editHabitType, setEditHabitType] = useState("");
  const [editHabitTime, setEditHabitTime] = useState("00:00");
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
    deleteCookie("user");
    router.push("/sign-in");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoadingSpinner />;
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
      <div className="flex justify-center sm:space-x-52 space-x-16 p-6 rounded">
        <h2 className="sm:text-3xl text-xl font-bold mb-2">{user.username}</h2>
        <h1 className="text-gold sm:text-4xl text-2xl font-semibold">
          LV {user.overallLevel}
        </h1>
      </div>

      <OverallLevelBar xp={user.overallEXP} level={user.overallLevel} />

      <div className="flex sm:w-full md:max-w-[58rem] flex-wrap space-y-8 sm:grid-flow-row lg:gap-x-8">
        <HabitList
          setShowModal={setShowHabitModal}
          habits={habits}
          onThumbsUp={(habitId) =>
            handleThumbsUp(habitId, habits, setHabits, user, setUser)
          }
          onThumbsDown={(habitId) =>
            handleThumbsDown(habitId, habits, setHabits, user, setUser)
          }
          resetHabitStatus={(habitId) => resetHabitStatus(habitId, setHabits)}
          handleEditMode={(habit) =>
            handleEditMode(
              habit,
              setEditHabitId,
              setEditHabitName,
              setEditHabitType,
              setShowEditModal
            )
          }
          handleSaveEdit={(id) =>
            handleSaveEdit(
              id,
              editHabitName,
              editHabitType,
              setHabits,
              setShowEditModal
            )
          }
          handleDeleteHabit={(id) => handleDeleteHabit(id, setHabits)}
          editMode={editMode}
          setEditMode={setEditMode}
          editHabitId={editHabitId}
          editHabitName={editHabitName}
          setEditHabitName={setEditHabitName}
          editHabitType={editHabitType}
          setEditHabitType={setEditHabitType}
        />

        <ClassStats
          playerClass={user.userClass}
          mageProgress={user.mageEXP}
          warriorProgress={user.warriorEXP}
          rogueProgress={user.rogueEXP}
          mageLevel={user.mageLevel}
          warriorLevel={user.warriorLevel}
          rogueLevel={user.rogueLevel}
        />

        <Quests />
      </div>

      <NewHabitModal
        showModal={showHabitModal}
        setShowModal={setShowHabitModal}
        onSave={(newHabit) =>
          handleSaveHabit(newHabit, setHabits, setShowHabitModal)
        }
      />

      <EditHabitModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        habitId={editHabitId}
        habitName={editHabitName}
        habitType={editHabitType}
        habitTime={editHabitTime}
        setEditHabitName={setEditHabitName}
        setEditHabitType={setEditHabitType}
        setEditHabitTime={setEditHabitTime}
        handleSaveEdit={(id, name, type, time) =>
          handleSaveEdit(id, name, type, time, setHabits, setShowEditModal)
        }
      />

      <div className="flex sm:flex-row flex-col justify-center items-center w-full sm:space-y-0 sm:space-x-12 space-y-4 mt-24">
        <button
          onClick={() => handleResetAllHabits(user.id, setHabits)}
          className="sm:w-[30%] w-full bg-blue text-white px-4 py-2 rounded-3xl text-sm sm:text-base"
        >
          New Day? Reset Habits
        </button>
        <button
          onClick={handleLogout}
          className="sm:w-[30%] w-full bg-red-600 text-white px-4 py-2 rounded-3xl text-sm sm:text-base font-bold"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
