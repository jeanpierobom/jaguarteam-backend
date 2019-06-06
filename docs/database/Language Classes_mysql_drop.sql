ALTER TABLE `user` DROP FOREIGN KEY `user_fk0`;

ALTER TABLE `user` DROP FOREIGN KEY `user_fk1`;

ALTER TABLE `class` DROP FOREIGN KEY `class_fk0`;

ALTER TABLE `class` DROP FOREIGN KEY `class_fk1`;

ALTER TABLE `class` DROP FOREIGN KEY `class_fk2`;

ALTER TABLE `city` DROP FOREIGN KEY `city_fk0`;

ALTER TABLE `favorite_teacher` DROP FOREIGN KEY `favorite_teacher_fk0`;

ALTER TABLE `favorite_teacher` DROP FOREIGN KEY `favorite_teacher_fk1`;

ALTER TABLE `teacher_language` DROP FOREIGN KEY `teacher_language_fk0`;

ALTER TABLE `teacher_language` DROP FOREIGN KEY `teacher_language_fk1`;

ALTER TABLE `class_type` DROP FOREIGN KEY `class_type_fk0`;

ALTER TABLE `message` DROP FOREIGN KEY `message_fk0`;

ALTER TABLE `message` DROP FOREIGN KEY `message_fk1`;

ALTER TABLE `teacher_availability` DROP FOREIGN KEY `teacher_availability_fk0`;

DROP TABLE IF EXISTS `user`;

DROP TABLE IF EXISTS `class`;

DROP TABLE IF EXISTS `city`;

DROP TABLE IF EXISTS `favorite_teacher`;

DROP TABLE IF EXISTS `language`;

DROP TABLE IF EXISTS `teacher_language`;

DROP TABLE IF EXISTS `class_type`;

DROP TABLE IF EXISTS `message`;

DROP TABLE IF EXISTS `teacher_availability`;

DROP TABLE IF EXISTS `country`;

