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
	CONSTRAINT `user_provider_cid_hash_unique` UNIQUE(`cid_hash`),
	CONSTRAINT `user_provider_hos_code_unique` UNIQUE(`hos_code`)
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
	CONSTRAINT `user_provider_vhv_cid_hash_unique` UNIQUE(`cid_hash`),
	CONSTRAINT `user_provider_vhv_hos_code_unique` UNIQUE(`hos_code`),
	CONSTRAINT `user_provider_vhv_position_unique` UNIQUE(`position`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
