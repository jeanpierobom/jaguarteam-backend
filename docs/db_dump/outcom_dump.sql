-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: outcom
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `city`
--
use outcom;

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `country_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `city_fk0` (`country_id`),
  CONSTRAINT `city_fk0` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Vancouver',1),(2,'Toronto',1),(3,'Calgary',1),(4,'Richmond',1),(5,'Montreal',1),(6,'Mumbai',2),(7,'Delhi',2),(8,'Brasilia',3),(9,'Rio de Janeiro',3),(10,'Sao Paulo',3),(11,'Seattle',4),(12,'New York',4),(13,'Edmonton',1),(14,'Ottawa',1),(15,'Winnipeg',1),(16,'Hamilton',1),(17,'London',1),(18,'Victoria',1),(19,'Halifax',1),(20,'Chicago',4),(21,'Dallas',4),(22,'Orlando',4),(23,'Atlanta',4),(24,'Paris',6),(25,'Madrid',7),(26,'Manchester',8),(27,'Lisbon',9),(28,'Buenos Aires',10);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `start_time` varchar(8) DEFAULT NULL,
  `duration` time NOT NULL,
  `class_type` varchar(50) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `location_lat` varchar(30) DEFAULT NULL,
  `location_long` varchar(30) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `class_completed` tinyint(1) NOT NULL,
  `rating_to_student` float DEFAULT NULL,
  `rating_to_teacher` float DEFAULT NULL,
  `review_to_teacher` text,
  `review_to_student` text,
  `message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,1,4,'2019-07-22 18:38:22','03:00 PM','01:00:00','Fishing','Amazonia','9.3444','10.555',15.9,1,4,4,'Good','Excellent',NULL),(2,1,4,'2019-07-22 18:38:22','03:00 PM','01:00:00','Banking','CIBC Richmond','1.11111','2.22222',17,1,5,4,'Amazing','Excellent',NULL),(3,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Shopping','Wall Mart','1.11111','2.22222',16,1,5,4.5,'Amazing class','Excellent',NULL),(4,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Shopping','Wall Mart','1.11111','2.22222',16,1,5,4.5,'Amazing class','Excellent',NULL),(5,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Hiking',NULL,NULL,NULL,15.9,1,NULL,4.5,'Amazing class',NULL,NULL),(6,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Hiking','Grouse Mountain','3.3333','4.4444',15.9,1,NULL,4.5,'Amazing class',NULL,NULL),(7,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Hiking','Grouse Mountain','3.3333','4.4444',15.9,1,NULL,4.5,'Amazing class',NULL,NULL),(8,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Hiking','Grouse Mountain','3.3333','4.4444',15.9,1,NULL,4.5,'Amazing class',NULL,NULL),(9,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Hiking','Grouse Mountain','3.3333','4.4444',15.9,1,NULL,4.5,'Amazing class',NULL,NULL),(10,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Hiking','Grouse Mountain','3.3333','4.4444',15.9,1,NULL,4.5,'Amazing class',NULL,NULL),(11,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Hiking','Grouse Mountain','3.3333','4.4444',15.9,1,NULL,4.5,'Amazing class',NULL,NULL),(12,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Hiking','Grouse Mountain','3.3333','4.4444',15.9,1,NULL,4.5,'Amazing class',NULL,NULL),(13,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Hiking','Grouse Mountain','3.3333','4.4444',15.9,1,NULL,4.5,'Amazing class',NULL,NULL),(14,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Hiking','Grouse Mountain','3.3333','4.4444',15.9,1,NULL,4.5,'Amazing class',NULL,NULL),(15,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Hiking','Grouse Mountain','3.3333','4.4444',15.9,1,NULL,4.5,'Amazing class',NULL,NULL),(16,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Hiking','Amazonia','9.3444','10.555',15.9,1,NULL,4.5,'Amazing class',NULL,'This is a new message'),(17,1,13,'2019-07-22 18:37:24','03:00 PM','01:00:00','Hiking','Grouse Mountain','3.3333','4.4444',15.9,1,NULL,4.5,'Amazing class',NULL,'This is a message'),(18,1,4,'2019-07-22 18:41:38','10:00 AM','01:00:00','Hiking','Metrotown, Burnaby, BC, Canada','49.2276257','-123.00757569999999',-1,1,NULL,4,'Great class',NULL,'Hello. This is my first class.'),(19,1,4,'2019-07-22 18:41:38','12:00 PM','01:00:00','Hiking','4700 Kingsway, Burnaby, BC V5H 4N2, Canada','49.2274622','-122.9999852',-1,1,NULL,4,'Great class',NULL,'This is my second class'),(20,1,4,'2019-07-22 18:41:38','11:00 AM','01:00:00','Hiking','4700 Kingsway, Burnaby, BC V5H 4N2, Canada','49.2274622','-122.9999852',-1,1,NULL,4,'Great class',NULL,'This is my third class.'),(21,1,4,'2019-07-22 18:41:38','01:00 PM','01:00:00','Hiking','4700 Kingsway, Burnaby, BC V5H 4N2, Canada','49.2274622','-122.9999852',-1,1,NULL,4,'Great class',NULL,'Last class I promise...'),(22,1,13,'2019-07-22 18:24:50','07:00 PM','01:00:00','Banking','Canada Place','3.3333','4.4444',15.9,0,NULL,4,NULL,NULL,'This is a message from the student'),(23,1,13,'2019-07-22 18:24:50','04:00 PM','01:00:00','Banking','CIBC at Canada Place','3.3333','4.4444',15.9,0,NULL,4,NULL,NULL,'This is a message from the student'),(24,1,4,'2019-07-22 18:41:38','02:00 PM','01:00:00','Hiking','999 Canada Pl, Vancouver, BC V6C 3T4, Canada','49.2888248','-123.11112089999999',-1,1,NULL,4,'Great class',NULL,'Learn more'),(25,1,13,'2019-07-24 00:00:00','10:00 AM','01:00:00','Hiking','Metrotown, Burnaby, BC, Canada','49.2276257','-123.00757569999999',-1,0,NULL,NULL,NULL,NULL,'hi'),(26,1,13,'2019-07-24 00:00:00','11:00 AM','01:00:00','Hiking','4700 Kingsway, Burnaby, BC V5H 4N2, Canada','49.2274622','-122.9999852',-1,0,NULL,NULL,NULL,NULL,'Cabroncito'),(27,1,10,'2019-07-26 00:00:00','02:00 PM','01:00:00','Hiking','999 Canada Pl, Vancouver, BC V6C 3T4, Canada','49.2888248','-123.11112089999999',-1,0,NULL,NULL,NULL,NULL,'Test'),(28,1,11,'2019-07-25 00:00:00','02:00 PM','01:00:00','Banking','Vancouver City Centre Station, Granville St, Vancouver, BC V7Y 1K8, Canada','49.282461999999995','-123.11861179999998',-1,0,NULL,NULL,NULL,NULL,'Test'),(29,1,4,'2019-07-25 00:00:00','04:00 PM','01:00:00','Hiking','999 Canada Pl, Vancouver, BC V6C 3T4, Canada','49.2888248','-123.11112089999999',-1,0,NULL,NULL,NULL,NULL,'Test'),(30,1,13,'2019-07-27 00:00:00','11:00 AM','01:00:00','Shopping','null','49.224206','-123.108453',-1,0,NULL,NULL,NULL,NULL,'Banking'),(31,1,13,'2019-07-25 00:00:00','06:00 PM','01:00:00','Banking','999 Canada Pl, Vancouver, BC V6C 3T4, Canada','49.2888248','-123.11112089999999',-1,0,NULL,NULL,NULL,NULL,'Test'),(32,1,13,'2019-07-26 00:00:00','11:00 AM','01:00:00','Banking','null','49.224206','-123.108453',-1,0,NULL,NULL,NULL,NULL,'test');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_type`
--

DROP TABLE IF EXISTS `class_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `class_type_fk0` (`teacher_id`),
  CONSTRAINT `class_type_fk0` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_type`
--

LOCK TABLES `class_type` WRITE;
/*!40000 ALTER TABLE `class_type` DISABLE KEYS */;
INSERT INTO `class_type` VALUES (3,'Banking','Let`s go to the bank and learn new vocabulary there',5),(4,'Banking','Let`s go to the bank and learn new vocabulary there',6),(41,'Hiking',' ',13),(42,'Shopping',' ',13),(43,'Banking',' ',13),(44,'Hiking',' ',12),(45,'Fishing',' ',12),(46,'Shopping',' ',12),(50,'Hiking',' ',44),(51,'Fishing',' ',44),(52,'Shopping',' ',44),(53,'Banking','',4),(54,'Hiking','',4),(55,'Shopping','',4),(56,'Banking','',7),(57,'Hiking','',7),(58,'Shopping','',7),(59,'Banking','',8),(60,'Hiking','',8),(61,'Shopping','',8),(62,'Banking','',9),(63,'Hiking','',9),(64,'Shopping','',9),(65,'Banking','',10),(66,'Hiking','',10),(67,'Shopping','',10),(68,'Banking','',11),(69,'Hiking','',11),(70,'Shopping','',11),(71,'Banking','',14),(72,'Hiking','',14),(73,'Shopping','',14),(74,'Banking','',15),(75,'Hiking','',15),(76,'Shopping','',15),(77,'Banking','',16),(78,'Hiking','',16),(79,'Shopping','',16),(80,'Banking','',17),(81,'Hiking','',17),(82,'Shopping','',17),(83,'Banking','',18),(84,'Hiking','',18),(85,'Shopping','',18),(86,'Banking','',19),(87,'Hiking','',19),(88,'Shopping','',19),(89,'Banking','',20),(90,'Hiking','',20),(91,'Shopping','',20),(92,'Banking','',45),(93,'Hiking','',45),(94,'Shopping','',45),(95,'Shopping','',5),(96,'Shopping','',6),(97,'Hiking','',5),(98,'Hiking','',6);
/*!40000 ALTER TABLE `class_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (10,'Argentina'),(3,'Brazil'),(1,'Canada'),(8,'England'),(6,'France'),(2,'India'),(5,'Mexico'),(9,'Portugal'),(7,'Spain'),(4,'United States of America');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite_teacher`
--

DROP TABLE IF EXISTS `favorite_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorite_teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `favorite_teacher_fk0` (`student_id`),
  KEY `favorite_teacher_fk1` (`teacher_id`),
  CONSTRAINT `favorite_teacher_fk0` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`),
  CONSTRAINT `favorite_teacher_fk1` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_teacher`
--

LOCK TABLES `favorite_teacher` WRITE;
/*!40000 ALTER TABLE `favorite_teacher` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorite_teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES (1,'English'),(2,'French'),(3,'Punjabi'),(4,'Spanish'),(5,'Portuguese');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `message` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `message_fk0` (`sender_id`),
  KEY `message_fk1` (`receiver_id`),
  CONSTRAINT `message_fk0` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`),
  CONSTRAINT `message_fk1` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_availability`
--

DROP TABLE IF EXISTS `teacher_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_availability` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) NOT NULL,
  `day_of_week` int(11) NOT NULL,
  `begin` varchar(8) NOT NULL,
  `end` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacher_availability_fk0` (`teacher_id`),
  CONSTRAINT `teacher_availability_fk0` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_availability`
--

LOCK TABLES `teacher_availability` WRITE;
/*!40000 ALTER TABLE `teacher_availability` DISABLE KEYS */;
INSERT INTO `teacher_availability` VALUES (1,7,1,'08:00 AM','09:00 AM'),(2,7,1,'03:00 PM','05:00 AM'),(3,7,2,'08:00 AM','10:00 AM'),(4,7,3,'08:00 AM','11:00 AM'),(5,7,4,'08:00 AM','09:00 AM'),(6,1,1,'08:00 AM','09:00 AM'),(7,1,1,'03:00 PM','05:00 AM'),(8,1,2,'08:00 AM','10:00 AM'),(9,1,3,'08:00 AM','11:00 AM'),(10,1,4,'08:00 AM','09:00 AM'),(120,13,1,'08:00 AM','09:00 AM'),(121,13,1,'03:00 PM','05:00 AM'),(122,13,2,'08:00 AM','10:00 AM'),(123,13,3,'08:00 AM','11:00 AM'),(124,13,4,'08:00 AM','09:00 AM'),(125,12,1,'08:00 AM','09:00 AM'),(126,12,1,'03:00 PM','05:00 AM'),(127,12,2,'08:00 AM','10:00 AM'),(128,12,3,'08:00 AM','11:00 AM'),(129,12,4,'08:00 AM','09:00 AM'),(135,44,1,'08:00 AM','09:00 AM'),(136,44,1,'03:00 PM','05:00 AM'),(137,44,2,'08:00 AM','10:00 AM'),(138,44,3,'08:00 AM','11:00 AM'),(139,44,4,'08:00 AM','09:00 AM');
/*!40000 ALTER TABLE `teacher_availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_language`
--

DROP TABLE IF EXISTS `teacher_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacher_language_fk0` (`teacher_id`),
  KEY `teacher_language_fk1` (`language_id`),
  CONSTRAINT `teacher_language_fk0` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`),
  CONSTRAINT `teacher_language_fk1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_language`
--

LOCK TABLES `teacher_language` WRITE;
/*!40000 ALTER TABLE `teacher_language` DISABLE KEYS */;
INSERT INTO `teacher_language` VALUES (19,4,1),(20,13,1),(21,5,1),(22,6,1),(23,7,1),(24,8,1),(25,9,1),(26,10,1),(27,11,1),(28,12,1),(29,14,1),(30,15,2),(31,16,2),(32,17,2),(33,18,2),(34,10,3),(35,11,3),(36,20,3),(37,19,4),(38,45,4),(39,17,5),(40,18,5),(41,44,1);
/*!40000 ALTER TABLE `teacher_language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` char(1) NOT NULL DEFAULT 'S',
  `name` varchar(255) NOT NULL,
  `city_id` int(11) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `bio` text,
  `mother_country_id` int(11) DEFAULT NULL,
  `teacher_price` float DEFAULT NULL,
  `teacher_type` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_fk0` (`city_id`),
  KEY `user_fk1` (`mother_country_id`),
  CONSTRAINT `user_fk0` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`),
  CONSTRAINT `user_fk1` FOREIGN KEY (`mother_country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'andersonhborba@gmail.com','pwd','S','Anderson Borba',1,'1985-01-01','An international student who is willing to learn more languages!',3,NULL,NULL),(2,'user2@email.com','pwd','S','A Student from Brazil',2,'2000-01-01','An international student who is willing to learn more languages!',3,NULL,NULL),(3,'user3@email.com','pwd','S','A Student from Mexico',2,'2000-01-01','An international student who is willing to learn more languages!',5,NULL,NULL),(4,'teacher4@gmail.com','pwd','T','Jean Pierobom',1,'2000-01-01','A person with passion for teaching and sharing experiences with people',1,17,'C'),(5,'teacher5@gmail.com','pwd','T','Joao Caldas',1,'2000-01-01','A person with passion for teaching and sharing experiences with people',4,15.9,'C'),(6,'teacher6@gmail.com','pwd','T','Gian Baggio',2,'2000-01-01','A person with passion for teaching and sharing experiences with people',2,15.9,'C'),(7,'teacher7@gmail.com','pwd','T','Gabriela Medeiros',1,'1985-01-01','A person with passion for teaching and sharing experiences with people',1,15,'C'),(8,'teacher8@gmail.com','pwd','T','Flavia Oliveira',1,'1985-01-01','A person with passion for teaching and sharing experiences with people',1,15,'C'),(9,'teacher9@gmail.com','pwd','T','Sebastian Gonzales',1,'1985-01-01','A person with passion for teaching and sharing experiences with people',1,15,'C'),(10,'teacher10@gmail.com','pwd','T','Ratan Bathia',1,'1985-01-01','A person with passion for teaching and sharing experiences with people',1,15,'C'),(11,'teacher11@gmail.com','pass','T','Akansha Agarwal',1,'1985-01-01','A person with passion for teaching and sharing experiences with people',1,19,'C'),(12,'teacher12@gmail.com','pass','T','Rodrigo Krueger',2,'1987-01-01','A person with passion for teaching and sharing experiences with people',1,15,'C'),(13,'eduardo.landa@outlook.com','pwd','T','Eduardo Landa',1,'1987-01-01','A person with passion for teaching and sharing experiences with people',1,15,'P'),(14,'teacher14@gmail.com','pwd','T','Bryan Mueller',2,'1985-01-01','A person with passion for teaching and sharing experiences with people',1,15,'C'),(15,'teacher15@gmail.com','pwd','T','Wesley Collin',1,'1985-01-01','A person with passion for teaching and sharing experiences with people',1,15,'C'),(16,'teacher16@gmail.com','pwd','T','Luccio Pierini',1,'1985-01-01','A person with passion for teaching and sharing experiences with people',1,15,'C'),(17,'teacher17@gmail.com','pwd','T','Mary Kuster',1,'1985-01-01','A person with passion for teaching and sharing experiences with people',1,15,'C'),(18,'teacher18@gmail.com','pwd','T','Patricia Addams',1,'1985-01-01','A person with passion for teaching and sharing experiences with people',1,15,'C'),(19,'teacher19@gmail.com','pwd','T','Sergio Garcia',1,'1985-01-01','A person with passion for teaching and sharing experiences with people',1,15,'C'),(20,'teacher20@gmail.com','pwd','T','Harminder Mall',1,'1999-01-01','A person with passion for teaching and sharing experiences with people',1,15,'C'),(40,'pierobom@gmail.com','pass','S','Jean Student',NULL,'1999-01-01','An international student who is willing to learn more languages!',1,NULL,NULL),(41,'pierobom@gmail.com','pass','S','Jean Student',NULL,'1999-01-01','An international student who is willing to learn more languages!',1,NULL,NULL),(42,'pierobom@gmail.com','pass','S','Jean Student',NULL,'1999-01-01','An international student who is willing to learn more languages!',1,NULL,NULL),(44,'teacher44@gmail.com','pwd','T','Harminder Mall',1,'1987-01-01','A person with passion for teaching and sharing experiences with people',1,15,'C'),(45,'teacher45@gmail.com','secret','T','Michel Telo',1,'1999-01-01','A person with passion for teaching and sharing experiences with people',1,15.9,'C'),(46,'student@outcom.io','secret','S','Outcom Demo Student',1,'2000-01-01','An international student who is willing to learn more languages!',1,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-24 22:42:50
