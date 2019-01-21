
/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`af_school` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `school`;

/*Table structure for table `student` */

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `id` int(11) NOT NULL COMMENT '学号',
  `name` varchar(32) NOT NULL COMMENT '姓名',
  `sex` tinyint(1) DEFAULT NULL COMMENT '性别',
  `phone` varchar(16) DEFAULT '13800000000' COMMENT '手机号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `student` */

insert  into `student`(`id`,`name`,`sex`,`phone`) values (20180001,'Alex',1,'14099000892'),(20180002,'Bob',1,'13810012334'),(20180003,'Tim',1,'13691243355'),(20180004,'Martain',1,'13234344352'),(20180005,'Ade',1,'13699292899'),(20180006,'Rose',0,'13819289890'),(20180007,'Marry',0,'13800000000'),(20180008,'Tonny',1,'13410012908'),(20180009,'Tom',1,'13509890090'),(20180010,'Gus',1,'18799891829'),(20180011,'Yuer',0,'13882938990');

/*Table structure for table `student_profile` */

DROP TABLE IF EXISTS `student_profile`;

CREATE TABLE `student_profile` (
  `id` int(11) NOT NULL COMMENT '学号',
  `photo` varchar(300) DEFAULT NULL COMMENT '照片',
  PRIMARY KEY (`id`),
  CONSTRAINT `student_profile_ibfk_1` FOREIGN KEY (`id`) REFERENCES `student` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `student_profile` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
