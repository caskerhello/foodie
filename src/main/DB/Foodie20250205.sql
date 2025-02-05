-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: foodie
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookmarks`
--

DROP TABLE IF EXISTS `bookmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmarks` (
  `bookmarksid` int NOT NULL AUTO_INCREMENT,
  `postid` int DEFAULT NULL,
  `placeid` int DEFAULT NULL,
  `memberid` int DEFAULT NULL,
  PRIMARY KEY (`bookmarksid`),
  KEY `bookmarks_ibfk_1` (`postid`),
  KEY `bookmarks_ibfk_2` (`placeid`),
  KEY `bookmarks_ibfk_3` (`memberid`),
  CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`postid`) REFERENCES `post` (`postid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`placeid`) REFERENCES `place` (`placeid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarks_ibfk_3` FOREIGN KEY (`memberid`) REFERENCES `member` (`memberid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarks`
--

LOCK TABLES `bookmarks` WRITE;
/*!40000 ALTER TABLE `bookmarks` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `imagesid` int NOT NULL AUTO_INCREMENT,
  `postid` int DEFAULT NULL,
  `savefilename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`imagesid`),
  KEY `images_ibfk_1` (`postid`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`postid`) REFERENCES `post` (`postid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (8,11,'KakaoTalk_20250117_1915009131737165055774.jpg'),(9,11,'KakaoTalk_20250117_191500913_011737165059691.jpg'),(10,11,'KakaoTalk_20250117_191500913_021737165064899.jpg'),(11,12,'KakaoTalk_20250113_1356108321737169307960.jpg'),(12,13,'굴보쌈1737180077901.jpeg'),(13,14,'말차라뗴1737180179389.jpeg'),(14,15,'망고주스1737180380446.jpeg'),(15,16,'돼지국밥1737198435044.jpeg'),(16,17,'버거킹와퍼1737198597964.jpeg'),(17,18,'즉떡1737338262574.jpg'),(18,19,'다운로드1737340319596.jpg'),(19,20,'20250120_1132471737340379928.png'),(20,21,'3C36C9E5-5882-4688-B6C8-D270A22CFD99_1_102_o1737340977311.jpeg'),(21,22,'다운로드 (1)1737350813276.jpg'),(22,23,'다운로드 (1)1737350966450.jpg'),(23,24,'다운로드 (1)1737351044587.jpg'),(25,26,'다운로드 (1)1737351318108.jpg'),(26,27,'다운로드 (1)1737351377684.jpg'),(27,28,'일미1737419733757.jpg'),(28,28,'일미11737419736160.jpg'),(29,29,'육전국밥1737505229031.jpg'),(30,30,'보승회관1737505411710.jpg'),(31,31,'오로지라멘1737505431924.jpg'),(32,32,'돈까스1737505455741.jpg'),(33,33,'서브웨이1737505482553.jpg'),(34,33,'서브웨이1737505510681.jpg'),(35,34,'서브웨이1737505655118.jpg'),(36,35,'컴포즈1737505570688.jpg'),(37,36,'메가커피1737505697007.jpg'),(38,37,'화다인1737506571553.jpg'),(39,37,'화다인 11737506602625.jpg'),(40,37,'화다인1737506608108.jpg'),(41,37,'화다인 11737506610744.jpg'),(42,37,'화다인 21737506613457.jpg'),(43,44,'kfc1737588584218.jpg'),(44,45,'리사르1737592077186.jpg'),(45,45,'리사르11737592079931.jpg'),(46,46,'밀푀유나베1737678306472.jpg'),(47,47,'이자까야 나무1737707539134.jpg'),(48,47,'이자까야 나무11737707543714.jpg'),(49,48,'20250127_0931011737937877661.png'),(50,49,'보승회관1737938297919.jpg'),(51,50,'돈까스전원1738061407446.jpeg'),(52,51,'버거킹21738223426409.jpeg'),(53,52,'태성관1738301534471.jpg'),(54,52,'태성관11738301539938.jpg'),(55,53,'매머드1738636740857.jpg'),(56,54,'KakaoTalk_20250204_1231002211738639923835.jpg'),(57,54,'KakaoTalk_20250204_1230597821738639926194.jpg');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `likesid` int NOT NULL AUTO_INCREMENT,
  `postid` int DEFAULT NULL,
  `memberid` int DEFAULT NULL,
  PRIMARY KEY (`likesid`),
  KEY `likes_ibfk_1` (`postid`),
  KEY `likes_ibfk_2` (`memberid`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`postid`) REFERENCES `post` (`postid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`memberid`) REFERENCES `member` (`memberid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (18,17,1),(27,18,6),(28,19,6),(29,17,6),(30,16,6),(31,15,6),(33,14,6),(34,13,6),(35,12,6),(36,11,6),(37,20,1),(38,21,1),(40,26,5),(41,27,5),(42,24,5),(43,23,5),(44,22,5),(45,21,5),(46,20,5),(48,19,5),(49,18,5),(50,17,5),(51,16,5),(52,27,1),(56,28,1),(59,28,5),(60,37,1),(62,44,5),(63,47,6),(65,48,1),(66,49,1),(68,46,5),(69,49,5),(71,52,5),(72,52,1),(73,54,1);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting`
--

DROP TABLE IF EXISTS `meeting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meeting` (
  `meetingid` int NOT NULL AUTO_INCREMENT,
  `datetime` datetime(6) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `max_participants` int NOT NULL,
  `organizer` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `memberid` int DEFAULT NULL,
  PRIMARY KEY (`meetingid`),
  KEY `FKhbd5g7uhejvlmmex3itad3hcj` (`memberid`),
  CONSTRAINT `FKhbd5g7uhejvlmmex3itad3hcj` FOREIGN KEY (`memberid`) REFERENCES `member` (`memberid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting`
--

LOCK TABLES `meeting` WRITE;
/*!40000 ALTER TABLE `meeting` DISABLE KEYS */;
INSERT INTO `meeting` VALUES (2,'2025-02-03 08:42:51.139132','서울 종로구 삼일대로 385-1',99,1,'Y','굿모닝 갈사람!!!',1),(4,'2025-02-03 18:54:27.800964','서울 종로구 종로10길 5',1,5,'Y','떡볶이 먹고싶다',5);
/*!40000 ALTER TABLE `meeting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `memberid` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `profileimg` varchar(255) DEFAULT NULL,
  `profilemsg` varchar(255) DEFAULT NULL,
  `snsid` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `zipnum` varchar(45) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`memberid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'허내강','a','$2a$10$vCNNyWXz3OWsfiImLM8JluGsJc/NNf9sWMZup0dzwYsHqNa6QAYCS','','OIP1737504432142.jpg','아무리 봐도 내가 젤 잘생김',NULL,NULL,NULL,NULL),(3,'선생님','b','$2a$10$gadXCuYUR.j/2BHbNm4BiuWoKh.EGpLE6uQpoE41da7AKHIBZHOZq','b','KakaoTalk_20250117_191500913_021737178946008.jpg',NULL,NULL,NULL,NULL,NULL),(4,'권두홍','c','$2a$10$gadXCuYUR.j/2BHbNm4BiuWoKh.EGpLE6uQpoE41da7AKHIBZHOZq','','20210125＿2043011737338153359.jpg','딸바딸바',NULL,NULL,NULL,NULL),(5,'츄~♡','권두홍@abc.com','$2a$10$nK14K83DrjxcOkzFoAEP5egDVa40GQs3hdXKvEuGU00zyhhuZ8dka','','chu31737506561637.jpg','츄에요 츄~',NULL,NULL,NULL,NULL),(6,'차이현','abc@naver.com','$2a$10$4fQr1pLC42GeU7f9AWKD1OxuxsQcjI28Emmf1uIPDQXNHHaKYq2Ce','','717107_1131734_1457 (1)1737505059802.jpg','',NULL,NULL,NULL,NULL),(7,'ham12','ham12','$2a$10$o5nlZAJQPMiaHtZrmTp1XuHORflWse56a81lI3tno0nxR0fGt3l0S','','4441737419239514.jpg','ㅇㅇㅇ',NULL,NULL,NULL,NULL),(8,'이윤형','dldbsgud','$2a$10$gadXCuYUR.j/2BHbNm4BiuWoKh.EGpLE6uQpoE41da7AKHIBZHOZq','','81737419369526.png','',NULL,NULL,NULL,NULL),(9,'화다인','a@a.a','$2a$10$gadXCuYUR.j/2BHbNm4BiuWoKh.EGpLE6uQpoE41da7AKHIBZHOZq','0507-1388-1209','화다인1737506521335.jpg','강남 논현맛집 분위기 좋은 소개팅 장소',NULL,NULL,NULL,NULL),(10,'캉캉쓰','a@a.com','$2a$10$vCNNyWXz3OWsfiImLM8JluGsJc/NNf9sWMZup0dzwYsHqNa6QAYCS','010-1111-1111','','나는 멋쟁이',NULL,NULL,NULL,NULL),(11,'테스트','test@test.com','$2a$10$9sSzeHV5xPZvxl4AUZdpgumk.pobMW6IlA5i/qlRbmlZbdE2WaJ2i','','','',NULL,NULL,NULL,NULL),(12,'o3o','o3o_s2__@naver.com','$2a$10$9b2XA2epwDdDg6vdO4OBDeWnREjAhkLvex9o7GH66aUYs91iZlpF2','','cropped_image1738566758267.png','',NULL,NULL,NULL,NULL),(13,'abc','abc@abc.com','$2a$10$1/aW5mnb2MCZVPfWyoqANuzcc7gMaF2QlG0FtJZu6gEd0sIk1xitK','111-1111-1111','cropped_image1738576155216.png','1111',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participants` (
  `participantid` int NOT NULL AUTO_INCREMENT,
  `meetingid` int DEFAULT NULL,
  `memberid` int DEFAULT NULL,
  PRIMARY KEY (`participantid`),
  KEY `FKlk52t1ww023bcogjerbr8od6v` (`memberid`),
  CONSTRAINT `FKlk52t1ww023bcogjerbr8od6v` FOREIGN KEY (`memberid`) REFERENCES `member` (`memberid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES (3,2,1),(4,2,10),(7,2,11),(9,2,5),(10,4,5);
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `placeid` int NOT NULL AUTO_INCREMENT,
  `reviewamount` int DEFAULT NULL,
  `avestars` double DEFAULT NULL,
  `kakaoplaceid` int DEFAULT NULL,
  `category` int DEFAULT NULL,
  `place_name` varchar(255) DEFAULT NULL,
  `road_address_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `place_url` varchar(255) DEFAULT NULL,
  `x` double DEFAULT NULL,
  `y` double DEFAULT NULL,
  PRIMARY KEY (`placeid`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES (14,1,4,10042350,2,'파르투내','서울 중구 마른내로 154','02-2278-7770','http://place.map.kakao.com/10042350',127.005007402647,37.5646113781936),(15,2,3.5,26980469,1,'굿모닝 삼일대로점','서울 종로구 삼일대로 385-1','02-720-2566','http://place.map.kakao.com/26980469',126.9873132179,37.5690833463602),(16,1,4,9820808,1,'삼해집 종로점','서울 종로구 수표로20길 16-15','02-2273-0266','http://place.map.kakao.com/9820808',126.99091042050365,37.56992520791063),(17,1,3,8430510,5,'스타벅스 인사점','서울 종로구 인사동길 14','1522-3232','http://place.map.kakao.com/8430510',126.98688705882,37.5722187634845),(18,1,4,1069885614,5,'고망고 종로2가점','서울 종로구 삼일대로 390-1','02-2275-2481','http://place.map.kakao.com/1069885614',126.98797421225,37.5694474177344),(19,1,4,1630483489,1,'합천돼지국밥','서울 종로구 삼일대로 418-3','02-742-4142','http://place.map.kakao.com/1630483489',126.98797832774378,37.57201255177833),(20,1,3,20373593,2,'버거킹 종로점','서울 종로구 종로 94','02-2285-4838','http://place.map.kakao.com/20373593',126.9880794053405,37.569935767942724),(21,1,3,12630379,1,'맛보래즉석떡볶이','서울 종로구 인사동3길 9','02-720-4831','http://place.map.kakao.com/12630379',126.986253218801,37.5718222535336),(22,1,2,1057345145,1,'명륜진사갈비 종로관철점','서울 종로구 종로14길 24','02-734-8560','http://place.map.kakao.com/1057345145',126.986760842738,37.5690184140281),(23,1,5,8758064,1,'계림 종로본점','서울 종로구 돈화문로4길 39','02-2263-6658','http://place.map.kakao.com/8758064',126.994503220999,37.5701578866786),(24,1,5,314463146,2,'런던베이글뮤지엄 안국점','서울 종로구 북촌로4길 20','','http://place.map.kakao.com/314463146',126.98619979029458,37.5791779669736),(25,1,5,2044022572,1,'전주집','서울 종로구 종로11길 30-1','02-737-3070','http://place.map.kakao.com/2044022572',126.985612551361,37.5716455821446),(26,1,4,8696442,1,'황소고집','서울 종로구 청계천로 75-1','02-722-5747','http://place.map.kakao.com/8696442',126.98603082395006,37.56858044604639),(27,2,5,2109438998,1,'수정식당','서울 종로구 관수동 3-6','02-2279-4319','http://place.map.kakao.com/2109438998',126.9887597376499,37.569744823644825),(28,1,4,7818113,1,'대련집','서울 종로구 종로16길 37','02-2265-5349','http://place.map.kakao.com/7818113',126.98891841085968,37.56839334531018),(29,1,5,761215524,1,'일미식당','서울 종로구 삼일대로26길 6','02-744-6589','http://place.map.kakao.com/761215524',126.98857585285505,37.57307668623735),(30,1,4,2068604109,1,'육전국밥 종각역점','서울 종로구 종로 68','02-723-6782','http://place.map.kakao.com/2068604109',126.984947300808,37.5698921623491),(31,2,4,1748060038,1,'보승회관 종로점','서울 종로구 삼일대로 382','02-2272-0530','http://place.map.kakao.com/1748060038',126.98797885877,37.5687086018527),(32,1,3,1414375847,4,'오로지라멘 종각본점','서울 종로구 삼일대로15길 8','02-722-7123','http://place.map.kakao.com/1414375847',126.98700535937634,37.56891572770026),(33,1,4,15449214,2,'수제왕돈가스','서울 종로구 삼일대로 393-1','','http://place.map.kakao.com/15449214',126.987421766551,37.5697825304831),(34,2,2.5,19157195,2,'써브웨이 종로점','서울 종로구 종로 77','02-737-0034','http://place.map.kakao.com/19157195',126.98593256813055,37.57040783343064),(35,1,4,1908037317,5,'컴포즈커피 종로YMCA점','서울 종로구 종로 69','02-723-0857','http://place.map.kakao.com/1908037317',126.98539771817605,37.57040218230985),(36,1,2,2015755028,5,'메가MGC커피 종각역점','서울 종로구 종로 80-2','02-737-0802','http://place.map.kakao.com/2015755028',126.986416565447,37.569942796293),(37,1,5,1289084754,2,'화다인','서울 강남구 학동로2길 56','0507-1388-1209','http://place.map.kakao.com/1289084754',127.02359638510144,37.507936191230186),(38,7,4,682818717,5,'리사르커피 종로','서울 종로구 종로5길 7','','http://place.map.kakao.com/682818717',126.980552874098,37.5706177225279),(39,1,3,26944704,2,'KFC 청계천점','서울 종로구 청계천로 35','02-720-7947','http://place.map.kakao.com/26944704',126.98147010143195,37.56925646598366),(40,2,3.5,742894106,4,'이자카야나무 종각점','서울 종로구 종로10길 16','02-722-6787','http://place.map.kakao.com/742894106',126.984288629989,37.5692956175322),(41,1,5,737162819,2,'우드스탁','서울 종로구 삼일대로17길 43','','http://place.map.kakao.com/737162819',126.985108191198,37.5691227326144),(42,1,5,133783216,4,'돈까스전원','서울 성동구 왕십리로24길 13','0507-1346-7104','http://place.map.kakao.com/133783216',127.034100604547,37.5636442956378),(43,1,4,1796430644,2,'버거킹 왕십리센트라스점','서울 성동구 왕십리로 410','070-7438-8625','http://place.map.kakao.com/1796430644',127.02939134619812,37.56466458869931),(44,1,5,138373768,3,'태성관','서울 종로구 인사동8길 6-4','02-765-3343','http://place.map.kakao.com/138373768',126.98584989013953,37.57363680979749),(45,1,4,150549313,5,'매머드익스프레스 관철동점','서울 종로구 삼일대로 383','','http://place.map.kakao.com/150549313',126.98741851952593,37.568897752542235),(46,1,5,119091591,4,'오레노야끼 종로점','서울 종로구 우정국로 45-27','0507-1449-0575','http://place.map.kakao.com/119091591',126.98135030481,37.5730370231094);
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `postid` int NOT NULL AUTO_INCREMENT,
  `memberid` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `writedate` datetime DEFAULT CURRENT_TIMESTAMP,
  `stars` int DEFAULT NULL,
  `placeid` int DEFAULT NULL,
  PRIMARY KEY (`postid`),
  KEY `post_ibfk_1` (`placeid`),
  KEY `post_ibfk_2` (`memberid`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`placeid`) REFERENCES `place` (`placeid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`memberid`) REFERENCES `member` (`memberid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (11,1,'샤슬릭 샤샤샤','2025-01-18 10:51:18',4,14),(12,1,'굿모닝은 우리 급식','2025-01-18 12:02:15',3,15),(13,1,'오후 포스팅','2025-01-18 15:01:48',4,16),(14,1,'말차라떼','2025-01-18 15:05:23',3,17),(15,1,'망고주스','2025-01-18 15:06:39',4,18),(16,1,'추울땐 돼지국밥','2025-01-18 20:07:27',4,19),(17,1,'귀찮을땐 와퍼','2025-01-18 20:10:08',3,20),(18,4,'인사동 괜찮은 떡볶이집','2025-01-20 10:57:53',3,21),(19,5,'종로 좀 덜 맛집','2025-01-20 11:32:01',2,22),(20,6,'계림 닭도리탕 떡추가 꼭 하세요!!! ㅋㅋㅋ','2025-01-20 11:33:37',5,23),(21,6,'웨이팅이 엄청 난데 맛은 있네요 ㅎㅎㅎㅎㅎ','2025-01-20 11:43:07',5,24),(22,5,'전주집 할머니 제육 존마탱\n#전주집 #할머니 @제육 @존마','2025-01-20 14:27:29',5,25),(23,5,'황소고집\n허름한데 고기 숫불제육 존맛이지만 조금 살짝 아쉬운거는 고기의 양이 좀 적음\n그런데 밥이 무한리필','2025-01-20 14:29:37',4,26),(24,5,'수정식당\n쌈밥\n제육 정식쌈밥 정식 시키면 된찌도 그냥 줌\n#제육 #쌈밥 #된찌\n','2025-01-20 14:30:50',5,27),(26,5,'대련집\n칼국수 맛잇고 양 많이줌니도~~~~~\n단점 웨이팅이 겁나 길어유~ 웨이팅때문에 별점깍','2025-01-20 14:35:28',4,28),(27,5,'이번주 굿모닝 메뉴','2025-01-20 14:36:40',4,15),(28,5,'\n일미식당 여기 제육 존맛 많이 줘여 청국장도 개존맛','2025-01-21 09:35:52',5,29),(29,5,'육전국밥 \n요기 나름 맛있는데 세트로 먹어야하 좀 느낌잇게 먹을수 있음\n막국수 육전세트랑 소고기국밥 육전세트랑 먹어봣는데\n소고기국밥은 별로 막국수는 존맛','2025-01-22 09:22:21',4,30),(30,5,'보승회관\n보승회관은 점바점이긴한데 울동네 보승회관은 고기 퀄리티가 별론데\n요기는 존맛탱','2025-01-22 09:23:42',4,31),(31,5,'오로지 라멘\n요기는 좀 매우요 저같은 맵찌리한테는 좀 잘 안맞긴한데\n먹으면 너무 기침나는 매운맛입니다','2025-01-22 09:24:36',3,32),(32,1,'돈까스집','2025-01-22 09:24:49',4,33),(33,5,'저같은 아저씬 서브웨이 주문할줄 몰라서\n어려움 알려줘요 어케해야 맛잇게 주문할수 있을지\n맛잇게 먹는 방법 알려줘요 비싼데 맛잇게 먹고싶어요','2025-01-22 09:25:57',1,34),(34,1,'서브웨이 종로점','2025-01-22 09:27:49',4,34),(35,5,'아침마다 나의 졸음으로 몽롱한 잠을 깨워주는 커피\n컴포즈에서 빅포즈아메리카노 먹으면 하루가 길어져요~~~~\n어디서 봣는데 커피는 잠깨고 나서 두시간뒤에 먹는게 가장 효과적이고 건강에 좋데요 참고하세요~~~~~~\n','2025-01-22 09:28:04',4,35),(36,5,'컴포즈 내부 인테리어 때문에 한동안 먹엇던 메가커피\n컴포즈 아메리카노보다 조금 써서 제입맛엔 안맞는','2025-01-22 09:29:06',2,36),(37,9,'화다인은 분위기 좋고 맛도 좋은 장소입니다.\n꼭 같이 가고 싶은 사람들과 가서 살치살을 먹고싶습니다.','2025-01-22 09:44:19',5,37),(44,1,'11일 마다 가는 KFC','2025-01-23 08:30:13',3,39),(45,5,'리사르 나는 잘','2025-01-23 09:28:44',4,38),(46,1,'술을 좋아하진 않지만 즐거웠다.','2025-01-24 09:25:32',4,40),(47,5,'이자카야 나무 속쓰려 어흑','2025-01-24 17:33:43',3,40),(48,1,'취향에 맞는 음악을 신청할 수 있고\n생맥주, 하이볼, 양주와 어울리는 안주가 맛있는곳\n종로 골목 안쪽에 숨어있어서 아는 사람이 별로 없어서\n시끄럽지 않다는 장점도 있음','2025-01-27 09:32:26',5,41),(49,5,'오늘 점심은 머먹지 굿모닝도 안하는데\n보승회관이나 가까? 눈비 오는디','2025-01-27 09:38:52',4,31),(50,1,'우리집 주변 돈까스 원탑','2025-01-28 19:50:26',5,42),(51,1,'버거킹 센트라스 맛있다','2025-01-30 16:50:44',4,43),(52,5,'여기는 태성관 탕볶밥 머그면 탕슉 완전 마니 줘여\n가성비 짱~~! 오늘은 군만두도 서비스로 줬어요','2025-01-31 14:32:34',5,44),(53,1,'매머드커피 가성비 좋아요','2025-02-04 11:39:12',4,45),(54,12,'오코노미야끼가 존맛인 곳. 야끼소바도 맛있는데 오코노미야끼만큼은 아님. 2인 시키면 나오는 돈페이 야끼라는 삼겹계란말이는 별로. 그냥 단독으로 두개 시키는 게 훨씬 나을 듯','2025-02-04 12:33:26',5,46);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `post_member_place_view`
--

DROP TABLE IF EXISTS `post_member_place_view`;
/*!50001 DROP VIEW IF EXISTS `post_member_place_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `post_member_place_view` AS SELECT 
 1 AS `postid`,
 1 AS `post_content`,
 1 AS `post_write_date`,
 1 AS `post_stars`,
 1 AS `memberid`,
 1 AS `nickname`,
 1 AS `email`,
 1 AS `member_phone`,
 1 AS `profileimg`,
 1 AS `profilemsg`,
 1 AS `snsid`,
 1 AS `provider`,
 1 AS `zipnum`,
 1 AS `member_address`,
 1 AS `placeid`,
 1 AS `kakaoplaceid`,
 1 AS `category`,
 1 AS `place_name`,
 1 AS `road_address_name`,
 1 AS `place_phone`,
 1 AS `place_url`,
 1 AS `place_x`,
 1 AS `place_y`,
 1 AS `reviewamount`,
 1 AS `place_ave_stars`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `post_member_view`
--

DROP TABLE IF EXISTS `post_member_view`;
/*!50001 DROP VIEW IF EXISTS `post_member_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `post_member_view` AS SELECT 
 1 AS `postid`,
 1 AS `post_content`,
 1 AS `writedate`,
 1 AS `stars`,
 1 AS `placeid`,
 1 AS `memberid`,
 1 AS `nickname`,
 1 AS `email`,
 1 AS `member_phone`,
 1 AS `profileimg`,
 1 AS `profilemsg`,
 1 AS `snsid`,
 1 AS `provider`,
 1 AS `zipnum`,
 1 AS `address`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reply` (
  `replyid` int NOT NULL AUTO_INCREMENT,
  `postid` int DEFAULT NULL,
  `memberid` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `writedate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`replyid`),
  KEY `reply_ibfk_1` (`postid`),
  KEY `reply_ibfk_2` (`memberid`),
  CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`postid`) REFERENCES `post` (`postid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reply_ibfk_2` FOREIGN KEY (`memberid`) REFERENCES `member` (`memberid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
INSERT INTO `reply` VALUES (9,17,1,'와퍼 굿','2025-01-19 22:46:49'),(21,18,6,'여기 추천???','2025-01-20 11:35:42'),(22,18,1,'안가봄 ㅋㅋㅋ 그냥 데이터 넣은거에여','2025-01-20 11:37:28'),(25,27,5,'1/21 메뉴는 나에게는 별로엿어','2025-01-22 09:35:23'),(26,27,5,'1/22일 메뉴는 상당히 기대가 됩니다.','2025-01-22 09:35:41'),(27,33,5,'알려주면 평점 올려줌다','2025-01-22 09:36:00'),(28,31,5,'안메운건 별로구 매운건 기침나오고 정도를 좀 지켜줫으면함','2025-01-22 09:36:32'),(29,28,5,'여기는 좁고 그런데 제육도 많이 줌다~~~~~ 청국장도 추가해서 먹었는데 청국장도 존맛 그런데 냄시는 각오~~~~~!!!!!!!!!!!','2025-01-22 09:37:14'),(30,23,5,'요기 조금 불추~~~~~ 제육이 너무 적어','2025-01-22 09:37:51'),(31,22,5,'할머니랑 친해지면 좋음','2025-01-22 09:38:05'),(32,19,5,'여기 솔찍히 명륜진사중 가봤던 지점중 젤 별로','2025-01-22 09:38:24'),(33,18,5,'떡볶이 먹고싶다 ','2025-01-22 09:38:37'),(34,33,1,'ㅋㅋㅋㅋㅋ','2025-01-22 09:38:45'),(35,17,5,'버거킹구','2025-01-22 09:38:51'),(36,16,5,'여기 가보고 싶은데 맨날 말로만 그러넹','2025-01-22 09:39:03'),(37,15,5,'망고주수~~~','2025-01-22 09:39:14'),(38,13,5,'맛있엇겟당','2025-01-22 09:39:24'),(39,11,5,'샤슬릭 또먹고싶다','2025-01-22 09:39:34'),(40,37,1,'허은우가 돈많이 벌어서 꼭 사줄게 ㅋㅋㅋㅋ','2025-01-22 10:26:56'),(41,28,1,'셋이가서 청국장1개랑 제육2개 시키믄 딱인디','2025-01-22 10:27:45'),(42,37,9,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ','2025-01-22 10:32:40'),(43,32,5,'여기 가라앉는 고기씀?','2025-01-23 17:33:45'),(44,46,5,'아 속쓰려','2025-01-24 14:31:32'),(45,44,5,'케이 에프 씨','2025-01-24 14:31:47'),(46,32,1,'두드린 생고기','2025-01-24 14:33:27'),(47,19,1,'그래서 가자고 안하는구만','2025-01-24 14:34:12'),(48,13,1,'왔어야지','2025-01-24 14:34:38'),(49,11,1,'쌈싸 사주셈','2025-01-24 14:34:47'),(50,49,1,'오 맛있겟는디','2025-01-27 12:28:54'),(51,52,1,'후용씨가 짜장면 맛없다고해서 못간 태성관','2025-01-31 18:11:13'),(52,54,1,'고고','2025-02-04 14:19:20'),(53,54,12,'아맞다 여기 웨이팅있어요... 6시 반에 갔다가 약 40분 기다렸슴다.. 그래도 맛나서 용서했어여','2025-02-04 14:33:36');
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `reply_member_view`
--

DROP TABLE IF EXISTS `reply_member_view`;
/*!50001 DROP VIEW IF EXISTS `reply_member_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `reply_member_view` AS SELECT 
 1 AS `replyid`,
 1 AS `postid`,
 1 AS `reply_content`,
 1 AS `writedate`,
 1 AS `memberid`,
 1 AS `nickname`,
 1 AS `email`,
 1 AS `member_phone`,
 1 AS `profileimg`,
 1 AS `profilemsg`,
 1 AS `snsid`,
 1 AS `provider`,
 1 AS `zipnum`,
 1 AS `address`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `post_member_place_view`
--

/*!50001 DROP VIEW IF EXISTS `post_member_place_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `post_member_place_view` AS select `p`.`postid` AS `postid`,`p`.`content` AS `post_content`,`p`.`writedate` AS `post_write_date`,`p`.`stars` AS `post_stars`,`m`.`memberid` AS `memberid`,`m`.`nickname` AS `nickname`,`m`.`email` AS `email`,`m`.`phone` AS `member_phone`,`m`.`profileimg` AS `profileimg`,`m`.`profilemsg` AS `profilemsg`,`m`.`snsid` AS `snsid`,`m`.`provider` AS `provider`,`m`.`zipnum` AS `zipnum`,`m`.`address` AS `member_address`,`pl`.`placeid` AS `placeid`,`pl`.`kakaoplaceid` AS `kakaoplaceid`,`pl`.`category` AS `category`,`pl`.`place_name` AS `place_name`,`pl`.`road_address_name` AS `road_address_name`,`pl`.`phone` AS `place_phone`,`pl`.`place_url` AS `place_url`,`pl`.`x` AS `place_x`,`pl`.`y` AS `place_y`,`pl`.`reviewamount` AS `reviewamount`,`pl`.`avestars` AS `place_ave_stars` from ((`post` `p` join `member` `m` on((`p`.`memberid` = `m`.`memberid`))) join `place` `pl` on((`p`.`placeid` = `pl`.`placeid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `post_member_view`
--

/*!50001 DROP VIEW IF EXISTS `post_member_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `post_member_view` AS select `p`.`postid` AS `postid`,`p`.`content` AS `post_content`,`p`.`writedate` AS `writedate`,`p`.`stars` AS `stars`,`p`.`placeid` AS `placeid`,`m`.`memberid` AS `memberid`,`m`.`nickname` AS `nickname`,`m`.`email` AS `email`,`m`.`phone` AS `member_phone`,`m`.`profileimg` AS `profileimg`,`m`.`profilemsg` AS `profilemsg`,`m`.`snsid` AS `snsid`,`m`.`provider` AS `provider`,`m`.`zipnum` AS `zipnum`,`m`.`address` AS `address` from (`post` `p` join `member` `m` on((`p`.`memberid` = `m`.`memberid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `reply_member_view`
--

/*!50001 DROP VIEW IF EXISTS `reply_member_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `reply_member_view` AS select `r`.`replyid` AS `replyid`,`r`.`postid` AS `postid`,`r`.`content` AS `reply_content`,`r`.`writedate` AS `writedate`,`m`.`memberid` AS `memberid`,`m`.`nickname` AS `nickname`,`m`.`email` AS `email`,`m`.`phone` AS `member_phone`,`m`.`profileimg` AS `profileimg`,`m`.`profilemsg` AS `profilemsg`,`m`.`snsid` AS `snsid`,`m`.`provider` AS `provider`,`m`.`zipnum` AS `zipnum`,`m`.`address` AS `address` from (`reply` `r` join `member` `m` on((`r`.`memberid` = `m`.`memberid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-05  9:49:54
