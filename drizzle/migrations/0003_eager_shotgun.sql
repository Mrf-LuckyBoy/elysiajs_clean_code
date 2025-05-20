ALTER TABLE `user_provider` DROP INDEX `user_provider_cid_hash_unique`;--> statement-breakpoint
ALTER TABLE `user_provider` DROP INDEX `user_provider_hos_code_unique`;--> statement-breakpoint
ALTER TABLE `user_provider_vhv` DROP INDEX `user_provider_vhv_cid_hash_unique`;--> statement-breakpoint
ALTER TABLE `user_provider_vhv` DROP INDEX `user_provider_vhv_hos_code_unique`;--> statement-breakpoint
ALTER TABLE `user_provider_vhv` DROP INDEX `user_provider_vhv_position_unique`;--> statement-breakpoint
ALTER TABLE `user_provider` ADD CONSTRAINT `user_provider_cid_hash_hos_code_unique` UNIQUE(`cid_hash`,`hos_code`);--> statement-breakpoint
ALTER TABLE `user_provider` ADD CONSTRAINT `custom_unique` UNIQUE(`cid_hash`,`hos_code`);--> statement-breakpoint
ALTER TABLE `user_provider_vhv` ADD CONSTRAINT `user_provider_vhv_cid_hash_hos_code_unique` UNIQUE(`cid_hash`,`hos_code`);--> statement-breakpoint
ALTER TABLE `user_provider_vhv` ADD CONSTRAINT `custom_unique` UNIQUE(`cid_hash`,`hos_code`);