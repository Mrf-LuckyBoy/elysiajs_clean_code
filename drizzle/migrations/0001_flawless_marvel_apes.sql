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
CREATE TABLE `title_normalize` (
	`title_id` varchar(45) NOT NULL,
	`title_th` varchar(45) NOT NULL,
	`title_en` varchar(45) NOT NULL
);
