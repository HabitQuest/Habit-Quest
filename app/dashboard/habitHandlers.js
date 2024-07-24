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
    const habit = habits.find((habit) => habit.id === habitId);
    if (habit.isThumbsUp) return;

    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId
          ? { ...habit, isThumbsUp: true, isThumbsDown: false }
          : habit
      )
    );

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
        prevHabits.map((habit) => (habit.id === habitId ? updatedHabit : habit))
      );
      const newUser = await fetch(`/api/users/${user.id}`).then((res) =>
        res.json()
      );
      setUser(newUser);
    } else {
      console.error("Failed to update habit thumbs up state");

      setHabits(habits);
    }
  } catch (error) {
    console.error("Error updating habit thumbs up state:", error);

    setHabits(habits);
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
    const habit = habits.find((habit) => habit.id === habitId);
    if (habit.isThumbsDown) return;

    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId
          ? { ...habit, isThumbsUp: false, isThumbsDown: true }
          : habit
      )
    );

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
        prevHabits.map((habit) => (habit.id === habitId ? updatedHabit : habit))
      );
      const newUser = await fetch(`/api/users/${user.id}`).then((res) =>
        res.json()
      );
      setUser(newUser);
    } else {
      console.error("Failed to update habit thumbs down state");

      setHabits(habits);
    }
  } catch (error) {
    console.error("Error updating habit thumbs down state:", error);

    setHabits(habits);
  }
};

export const handleEditMode = (
  habit,
  setEditHabitId,
  setEditHabitName,
  setEditHabitType,
  setEditMode
) => {
  setEditHabitId(habit.id);
  setEditHabitName(habit.habit);
  setEditHabitType(habit.habitType);
  setEditMode(true);
};

export const handleSaveEdit = async (
  id,
  editHabitName,
  editHabitType,
  setHabits,
  setEditHabitId,
  setEditMode
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

export const resetHabitStatus = async (habitId, setHabits) => {
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
        prevHabits.map((habit) => (habit.id === habitId ? updatedHabit : habit))
      );
    } else {
      console.error("Failed to reset habit status");
    }
  } catch (error) {
    console.error("Error resetting habit status:", error);
  }
};

export const handleResetAllHabits = async (userId, setHabits) => {
  try {
    const response = await fetch("/api/habits/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      const data = await response.json();
      setHabits(data);
    } else {
      console.error("Failed to reset all habits");
    }
  } catch (error) {
    console.error("Error resetting all habits:", error);
  }
};
