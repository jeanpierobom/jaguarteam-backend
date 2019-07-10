CREATE TABLE `user` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`email` varchar(100) NOT NULL,
	`password` varchar(255) NOT NULL,
	`user_type` char NOT NULL DEFAULT 'S',
	`name` varchar(255) NOT NULL,
	`city_id` INT,
	`birth_date` DATE,
	`bio` TEXT,
	`mother_country_id` INT,
	`user_type` char NULL DEFAULT 'S',
	`teacher_price` FLOAT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `class` (
	`id` int NOT NULL AUTO_INCREMENT,
	`student_id` INT NOT NULL,
	`teacher_id` INT NOT NULL,
	`date` TIMESTAMP NOT NULL,
	`start_time` varchar(8),
	`duration` TIME NOT NULL,
	`class_type` varchar(50),
	`location` varchar(255),
	`location_lat` varchar(30),
	`location_long` varchar(30),
	`price` FLOAT,
	`class_completed` bool NOT NULL,
	`rating_to_student` FLOAT,
	`rating_to_teacher` FLOAT,
	`review_to_teacher` TEXT,
	`review_to_student` TEXT,
	`message` VARCHAR(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE `city` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	`country_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `favorite_teacher` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`student_id` INT NOT NULL,
	`teacher_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `language` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `teacher_language` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`teacher_id` INT NOT NULL,
	`language_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `class_type` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(50) NOT NULL,
	`description` varchar(255) NOT NULL,
	`teacher_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `message` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`sender_id` INT NOT NULL,
	`receiver_id` INT NOT NULL,
	`date` TIMESTAMP NOT NULL,
	`message` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `teacher_availability` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`teacher_id` INT NOT NULL,
	`day_of_week` INT NOT NULL,
	`begin` VARCHAR(8) NOT NULL,
	`end` VARCHAR(8) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `country` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

ALTER TABLE `user` ADD CONSTRAINT `user_fk0` FOREIGN KEY (`city_id`) REFERENCES `city`(`id`);

ALTER TABLE `user` ADD CONSTRAINT `user_fk1` FOREIGN KEY (`mother_country_id`) REFERENCES `country`(`id`);

ALTER TABLE `class` ADD CONSTRAINT `class_fk0` FOREIGN KEY (`student_id`) REFERENCES `user`(`id`);

ALTER TABLE `class` ADD CONSTRAINT `class_fk1` FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`);

ALTER TABLE `class` ADD CONSTRAINT `class_fk2` FOREIGN KEY (`class_type_id`) REFERENCES `class_type`(`id`);

ALTER TABLE `city` ADD CONSTRAINT `city_fk0` FOREIGN KEY (`country_id`) REFERENCES `country`(`id`);

ALTER TABLE `favorite_teacher` ADD CONSTRAINT `favorite_teacher_fk0` FOREIGN KEY (`student_id`) REFERENCES `user`(`id`);

ALTER TABLE `favorite_teacher` ADD CONSTRAINT `favorite_teacher_fk1` FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`);

ALTER TABLE `teacher_language` ADD CONSTRAINT `teacher_language_fk0` FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`);

ALTER TABLE `teacher_language` ADD CONSTRAINT `teacher_language_fk1` FOREIGN KEY (`language_id`) REFERENCES `language`(`id`);

ALTER TABLE `class_type` ADD CONSTRAINT `class_type_fk0` FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`);

ALTER TABLE `message` ADD CONSTRAINT `message_fk0` FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`);

ALTER TABLE `message` ADD CONSTRAINT `message_fk1` FOREIGN KEY (`receiver_id`) REFERENCES `user`(`id`);

ALTER TABLE `teacher_availability` ADD CONSTRAINT `teacher_availability_fk0` FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`);
