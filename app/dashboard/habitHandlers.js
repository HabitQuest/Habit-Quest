export const handleSaveHabit = (newHabit, setHabits, setShowModal) => {
  setHabits((prevHabits) => [...prevHabits, newHabit]);
  setShowModal(false);
};

export const handleThumbsUp = async (
  habitId,
  habits,
  setHabits,
  user,
  setUser
) => {
  try {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) {
      console.error("Habit not found:", habitId);
      return;
    }

    console.log("Current habit state:", {
      id: habit.id,
      streak: habit.streak,
      isThumbsUp: habit.isThumbsUp,
    });

    if (habit.isThumbsUp) {
      console.log("Habit already thumbs up");
      return;
    }

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
      console.log("Received updated habit:", updatedHabit);

      // Update habits state
      setHabits((prevHabits) =>
        prevHabits.map((h) => (h.id === habitId ? updatedHabit : h))
      );

      // Update user state
      const userResponse = await fetch(`/api/users/${user.id}`);
      if (userResponse.ok) {
        const updatedUser = await userResponse.json();
        setUser(updatedUser);
        // Update the user cookie with the new data
        document.cookie = `user=${JSON.stringify(updatedUser)}; path=/`;
      }
    } else {
      const errorText = await response.text();
      console.error("Failed to update habit:", errorText);
    }
  } catch (error) {
    console.error("Error in handleThumbsUp:", error);
  }
};

export const handleThumbsDown = async (
  habitId,
  habits,
  setHabits,
  user,
  setUser
) => {
  try {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) {
      console.error("Habit not found:", habitId);
      return;
    }

    console.log("Current habit state:", {
      id: habit.id,
      streak: habit.streak,
      isThumbsDown: habit.isThumbsDown,
    });

    if (habit.isThumbsDown) {
      console.log("Habit already thumbs down");
      return;
    }

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
      console.log("Received updated habit:", updatedHabit);

      // Update habits state
      setHabits((prevHabits) =>
        prevHabits.map((h) => (h.id === habitId ? updatedHabit : h))
      );

      // Update user state
      const userResponse = await fetch(`/api/users/${user.id}`);
      if (userResponse.ok) {
        const updatedUser = await userResponse.json();
        setUser(updatedUser);
        // Update the user cookie with the new data
        document.cookie = `user=${JSON.stringify(updatedUser)}; path=/`;
      }
    } else {
      const errorText = await response.text();
      console.error("Failed to update habit:", errorText);
    }
  } catch (error) {
    console.error("Error in handleThumbsDown:", error);
  }
};

export const handleEditMode = (
  habit,
  setEditHabitId,
  setEditHabitName,
  setEditHabitType,
  setEditHabitTime,
  setEditHabitDuration,
  setShowEditModal
) => {
  setEditHabitId(habit.id);
  setEditHabitName(habit.habit);
  setEditHabitType(habit.habitType);
  setEditHabitTime(habit.time);
  setEditHabitDuration(habit.duration || "");
  setShowEditModal(true);
};

export const handleSaveEdit = async (
  id,
  editHabitName,
  editHabitType,
  editHabitTime,
  editHabitDuration,
  setHabits,
  setShowEditModal
) => {
  try {
    const response = await fetch(`/api/habits/${id}/details`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        habit: editHabitName,
        habitType: editHabitType,
        time: editHabitTime,
        duration: editHabitDuration ? parseInt(editHabitDuration) : null,
      }),
    });

    if (response.ok) {
      const updatedHabit = await response.json();
      setHabits((prevHabits) =>
        prevHabits.map((habit) => (habit.id === id ? updatedHabit : habit))
      );
      setShowEditModal(false);
    } else {
      console.error("Failed to update habit");
    }
  } catch (error) {
    console.error("Error updating habit:", error);
  }
};

export const handleDeleteHabit = async (id, setHabits) => {
  try {
    const response = await fetch(`/api/habits/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
    } else {
      console.error("Failed to delete habit");
    }
  } catch (error) {
    console.error("Error deleting habit:", error);
  }
};

export const handleResetAllHabits = async (userId, setHabits) => {
  try {
    const response = await fetch("/api/habits/reset", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      const updatedHabits = await response.json();
      setHabits(updatedHabits);
    } else {
      console.error("Failed to reset all habits");
    }
  } catch (error) {
    console.error("Error resetting all habits:", error);
  }
};
