ALTER TABLE `inscl_normalize` MODIFY COLUMN `inscl_name_th` varchar(255);--> statement-breakpoint
ALTER TABLE `person` ADD `email` varchar(100);--> statement-breakpoint
ALTER TABLE `person` ADD CONSTRAINT `person_email_inscl_normalize_inscl_code_fk` FOREIGN KEY (`email`) REFERENCES `inscl_normalize`(`inscl_code`) ON DELETE no action ON UPDATE no action;