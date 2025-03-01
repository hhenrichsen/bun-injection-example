CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`done` integer DEFAULT false NOT NULL
);
