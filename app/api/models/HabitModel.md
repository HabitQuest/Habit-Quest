# Habit Model

This model represents a habit tied to a specific user.

## Fields

- `id` (String): Unique identifier for the habit. Auto-generated using `cuid()`.
- `habit` (String): Name or description of the habit.
- `habitType` (String): Type/category of the habit.
- `time` (String): Time of the habit (defaults to "00:00").
- `userId` (String): ID of the user who owns this habit.
- `user` (User): The user this habit belongs to (many-to-one relation).
- `isThumbsUp` (Boolean): Whether the habit has been marked positively. Defaults to `false`.
- `isThumbsDown` (Boolean): Whether the habit has been marked negatively. Defaults to `false`.
- `createdAt` (DateTime): Timestamp when habit was created.
- `updatedAt` (DateTime): Timestamp for when habit was last updated.

## Notes

- Linked to `User` via a foreign key (`userId`).
