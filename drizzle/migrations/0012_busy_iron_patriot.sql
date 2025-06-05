ALTER TABLE `title_normalize` RENAME COLUMN `title_en` TO `title_th_short`;--> statement-breakpoint
ALTER TABLE `title_normalize` MODIFY COLUMN `title_th` varchar(45);--> statement-breakpoint
ALTER TABLE `title_normalize` MODIFY COLUMN `title_th_short` varchar(45);--> statement-breakpoint
ALTER TABLE `title_normalize` ADD `gender` varchar(3);