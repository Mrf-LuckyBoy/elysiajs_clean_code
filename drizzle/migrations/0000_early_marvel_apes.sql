CREATE TABLE `address` (
	`hcode` varchar(36) NOT NULL,
	`hcode_hdc` varchar(100) NOT NULL,
	`hno` varchar(100) NOT NULL,
	`village` varchar(255) NOT NULL,
	`street` varchar(255) NOT NULL,
	`moo` varchar(255) NOT NULL,
	`villcode` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `address_hcode` PRIMARY KEY(`hcode`)
);
--> statement-breakpoint
CREATE TABLE `address_code` (
	`addresscode` varchar(100) NOT NULL,
	`provcode` varchar(100) NOT NULL,
	`provname` varchar(255) NOT NULL,
	`distcode` varchar(100) NOT NULL,
	`distname` varchar(255) NOT NULL,
	`subdistcode` varchar(100) NOT NULL,
	`subdistname` varchar(255) NOT NULL,
	`area` varchar(100) NOT NULL,
	`areacode` varchar(100) NOT NULL,
	`zipcode` varchar(100) NOT NULL,
	CONSTRAINT `address_code_addresscode` PRIMARY KEY(`addresscode`)
);
--> statement-breakpoint
CREATE TABLE `guardian` (
	`guardian_id` varchar(36) NOT NULL,
	`relationships` varchar(100) NOT NULL,
	`idcard` varchar(13) NOT NULL,
	`title` varchar(100) NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`birth` date NOT NULL,
	`phone` varchar(10) NOT NULL,
	`hcode` varchar(100) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `guardian_guardian_id` PRIMARY KEY(`guardian_id`),
	CONSTRAINT `guardian_idcard_unique` UNIQUE(`idcard`)
);
--> statement-breakpoint
CREATE TABLE `medical_history` (
	`med_id` varchar(36) NOT NULL,
	`chronic_disease` varchar(255) NOT NULL,
	`allergy_history` varchar(255) NOT NULL,
	`allergy_symptoms` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `medical_history_med_id` PRIMARY KEY(`med_id`)
);
--> statement-breakpoint
CREATE TABLE `person` (
	`pid` varchar(36) NOT NULL,
	`pid_hdc` varchar(36) NOT NULL,
	`med_id` varchar(255) NOT NULL,
	`hcode_cid` varchar(100) NOT NULL,
	`sex` varchar(1) NOT NULL,
	`idcard` varchar(13) NOT NULL,
	`title` varchar(100) NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`birth` date NOT NULL,
	`phone` varchar(10) NOT NULL,
	`boot_type` varchar(255) NOT NULL,
	`status` enum('approve','cancel','delete') NOT NULL,
	`reason_cancel` varchar(255) NOT NULL,
	`consent` boolean NOT NULL DEFAULT false,
	`hcode` varchar(100) NOT NULL,
	`guardian` varchar(100) NOT NULL,
	`is_delect` boolean DEFAULT false,
	`village` varchar(100) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `person_pid` PRIMARY KEY(`pid`),
	CONSTRAINT `person_idcard_unique` UNIQUE(`idcard`)
);
--> statement-breakpoint
CREATE TABLE `relationship` (
	`relationship_id` varchar(45) NOT NULL,
	`relationship_th` varchar(45) NOT NULL,
	`relationship_en` varchar(45) NOT NULL,
	CONSTRAINT `relationship_relationship_id` PRIMARY KEY(`relationship_id`)
);
--> statement-breakpoint
CREATE TABLE `title_normalize` (
	`title_id` varchar(45) NOT NULL,
	`title_th` varchar(45) NOT NULL,
	`title_en` varchar(45) NOT NULL,
	CONSTRAINT `title_normalize_title_id` PRIMARY KEY(`title_id`)
);
--> statement-breakpoint
CREATE TABLE `user_provider` (
	`user_id` varchar(36) NOT NULL,
	`cid_hash` varchar(255) NOT NULL,
	`hos_code` varchar(10) NOT NULL,
	`hos_name` varchar(255),
	`title` varchar(255),
	`fname` varchar(255),
	`lname` varchar(255),
	`position` varchar(255) NOT NULL,
	`createAt` timestamp,
	`updateAt` timestamp,
	CONSTRAINT `user_provider_user_id` PRIMARY KEY(`user_id`),
	CONSTRAINT `custom_unique` UNIQUE(`cid_hash`,`hos_code`)
);
--> statement-breakpoint
CREATE TABLE `user_provider_vhv` (
	`user_id` varchar(36) NOT NULL,
	`cid_hash` varchar(255) NOT NULL,
	`hos_code` varchar(10) NOT NULL,
	`hos_name` varchar(255),
	`title` varchar(255),
	`fname` varchar(255),
	`lname` varchar(255),
	`position` varchar(255) NOT NULL,
	`createAt` timestamp,
	`updateAt` timestamp,
	CONSTRAINT `user_provider_vhv_user_id` PRIMARY KEY(`user_id`),
	CONSTRAINT `custom_unique` UNIQUE(`cid_hash`,`hos_code`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `address` ADD CONSTRAINT `address_villcode_address_code_addresscode_fk` FOREIGN KEY (`villcode`) REFERENCES `address_code`(`addresscode`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `guardian` ADD CONSTRAINT `guardian_hcode_address_hcode_fk` FOREIGN KEY (`hcode`) REFERENCES `address`(`hcode`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `guardian` ADD CONSTRAINT `guardian_title_title_normalize_title_id_fk` FOREIGN KEY (`title`) REFERENCES `title_normalize`(`title_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `guardian` ADD CONSTRAINT `guardian_relationships_relationship_relationship_id_fk` FOREIGN KEY (`relationships`) REFERENCES `relationship`(`relationship_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `person` ADD CONSTRAINT `person_med_id_medical_history_med_id_fk` FOREIGN KEY (`med_id`) REFERENCES `medical_history`(`med_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `person` ADD CONSTRAINT `person_title_title_normalize_title_id_fk` FOREIGN KEY (`title`) REFERENCES `title_normalize`(`title_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `person` ADD CONSTRAINT `person_hcode_address_hcode_fk` FOREIGN KEY (`hcode`) REFERENCES `address`(`hcode`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `person` ADD CONSTRAINT `person_hcode_cid_address_hcode_fk` FOREIGN KEY (`hcode_cid`) REFERENCES `address`(`hcode`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `person` ADD CONSTRAINT `person_guardian_guardian_guardian_id_fk` FOREIGN KEY (`guardian`) REFERENCES `guardian`(`guardian_id`) ON DELETE no action ON UPDATE no action;