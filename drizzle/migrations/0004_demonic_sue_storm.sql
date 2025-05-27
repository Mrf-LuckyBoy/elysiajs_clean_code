CREATE TABLE `inscl_normalize` (
	`inscl_code` varchar(15) NOT NULL,
	`inscl_name_th` varchar(15),
	CONSTRAINT `inscl_normalize_inscl_code` PRIMARY KEY(`inscl_code`)
);
--> statement-breakpoint
ALTER TABLE `person` ADD `inscl_code` varchar(50) NOT NULL;