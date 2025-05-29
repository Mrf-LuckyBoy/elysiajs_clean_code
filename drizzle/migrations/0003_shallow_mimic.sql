ALTER TABLE `guardian` MODIFY COLUMN `idcard` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `guardian` MODIFY COLUMN `phone` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `person` MODIFY COLUMN `idcard` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `person` MODIFY COLUMN `phone` varchar(255) NOT NULL;