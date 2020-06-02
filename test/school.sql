-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.7.26 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 school 的数据库结构
CREATE DATABASE IF NOT EXISTS `school` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `school`;

-- 导出  表 school.stu 结构
CREATE TABLE IF NOT EXISTS `stu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `name` varchar(20) NOT NULL COMMENT '学生名字',
  `school` varchar(20) NOT NULL COMMENT '学校名字',
  `nickname` varchar(20) NOT NULL COMMENT '学生小名',
  `age` int(11) NOT NULL COMMENT '学生年龄',
  `class_num` int(11) NOT NULL COMMENT '班级人数',
  `score` decimal(4,2) NOT NULL COMMENT '成绩',
  `phone` varchar(11) NOT NULL DEFAULT '0' COMMENT '电话号码',
  `email` varchar(64) DEFAULT NULL COMMENT '家庭网络邮箱',
  `ip` varchar(32) DEFAULT NULL COMMENT 'IP地址',
  `address` text COMMENT '家庭地址',
  `create_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。

-- 导出  表 school.todo 结构
CREATE TABLE IF NOT EXISTS `todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `qq` varchar(18) COLLATE utf8_unicode_ci NOT NULL,
  `openid` varchar(28) COLLATE utf8_unicode_ci NOT NULL,
  `todo_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='todo table';

-- 数据导出被取消选择。

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
