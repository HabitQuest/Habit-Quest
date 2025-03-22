# User Model

This model represents a user of the application.

## Fields

- `id` (String): Unique identifier for the user. Auto-generated using `cuid()`.
- `username` (String): Unique username of the user.
- `email` (String): Unique email of the user.
- `hash` (String): Hashed password for authentication.
- `userClass` (String?): Optional user class (e.g., "warrior", "mage", etc.).
- `userCharacter` (String?): Optional selected character for the user.
- `overallEXP` (Int): Overall experience points. Defaults to 0.
- `overallLevel` (Int): Overall level of the user. Defaults to 1.
- `warriorEXP` (Int): Experience points for warrior class. Defaults to 0.
- `warriorLevel` (Int): Warrior level. Defaults to 1.
- `mageEXP` (Int): Experience points for mage class. Defaults to 0.
- `mageLevel` (Int): Mage level. Defaults to 1.
- `rogueEXP` (Int): Experience points for rogue class. Defaults to 0.
- `rogueLevel` (Int): Rogue level. Defaults to 1.
- `createdAt` (DateTime): Timestamp when user was created.
- `updatedAt` (DateTime): Timestamp for when user was last updated.
- `habits` (Habit[]): List of habits related to the user (one-to-many relation).

## Notes

- Related to `Habit` via a one-to-many relationship.