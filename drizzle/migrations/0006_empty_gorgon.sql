ALTER TABLE `person` DROP FOREIGN KEY `person_email_inscl_normalize_inscl_code_fk`;
--> statement-breakpoint
ALTER TABLE `person` ADD CONSTRAINT `person_inscl_code_inscl_normalize_inscl_code_fk` FOREIGN KEY (`inscl_code`) REFERENCES `inscl_normalize`(`inscl_code`) ON DELETE no action ON UPDATE no action;