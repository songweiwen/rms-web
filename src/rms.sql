/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : rms

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 20/03/2021 23:41:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for rms_configuration_log
-- ----------------------------
DROP TABLE IF EXISTS `rms_configuration_log`;
CREATE TABLE `rms_configuration_log` (
  `id` int DEFAULT NULL,
  `cl_line_name` varchar(255) DEFAULT NULL,
  `cl_site_name` varchar(255) DEFAULT NULL,
  `cl_device_tag` varchar(255) DEFAULT NULL,
  `cl_device_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for rms_far_device
-- ----------------------------
DROP TABLE IF EXISTS `rms_far_device`;
CREATE TABLE `rms_far_device` (
  `id` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL COMMENT '远端机编号',
  `device_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '远端机名称',
  `device_light_id` int NOT NULL COMMENT '光模块',
  `device_near_id` int NOT NULL COMMENT '归属哪个近端机',
  `device_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '远端机地址',
  `device_ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '远端机IP',
  `device_port` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '远端机端口号',
  `device_version` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '远端机版本',
  `device_describe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '远端机描述',
  `device_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `faguanggaojing` int NOT NULL DEFAULT '0' COMMENT '发光告警',
  `shouguanggaojing` int NOT NULL DEFAULT '0' COMMENT '收光告警',
  `guzhanggaojing` int NOT NULL DEFAULT '0' COMMENT '故障告警',
  `zhubobigaojing` int NOT NULL DEFAULT '0' COMMENT '驻波比告警',
  `guowengaojing` int NOT NULL DEFAULT '0' COMMENT '过温告警',
  `guogonglvgaojing` int NOT NULL DEFAULT '0' COMMENT '过功率告警',
  `shangxingguzhang` int NOT NULL DEFAULT '0' COMMENT '上行故障',
  `upsgaojing` int NOT NULL DEFAULT '0' COMMENT 'UPS告警',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rms_far_device
-- ----------------------------
BEGIN;
INSERT INTO `rms_far_device` VALUES (1, 1, '远端机01号', 10, 1, '达因瑞康公司', NULL, NULL, NULL, NULL, '2021-03-20 22:49:56', 0, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO `rms_far_device` VALUES (2, 2, '远端机02号', 11, 1, '希电公司', NULL, NULL, NULL, NULL, '2021-03-20 22:49:57', 0, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO `rms_far_device` VALUES (3, 3, '远端机03号', 12, 1, '物业公司', NULL, NULL, NULL, NULL, '2021-03-20 22:50:00', 0, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO `rms_far_device` VALUES (4, 70, '远端机70号', 70, 2, '航天三院', NULL, NULL, NULL, NULL, '2021-03-20 22:50:01', 0, 0, 0, 0, 0, 0, 0, 0);
INSERT INTO `rms_far_device` VALUES (5, 71, '远端机71号', 71, 2, '装甲兵工程学院', NULL, NULL, NULL, NULL, '2021-03-20 22:50:02', 0, 0, 0, 0, 0, 0, 0, 0);
COMMIT;

-- ----------------------------
-- Table structure for rms_near_device
-- ----------------------------
DROP TABLE IF EXISTS `rms_near_device`;
CREATE TABLE `rms_near_device` (
  `id` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL COMMENT '近端机编号',
  `device_name` varchar(255) NOT NULL COMMENT '近端机名称',
  `device_light_id` int DEFAULT NULL COMMENT '光模块',
  `device_address` varchar(255) DEFAULT NULL COMMENT '近端机地址',
  `device_ip` varchar(255) DEFAULT NULL COMMENT '近端机IP',
  `device_port` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '近端机端口号',
  `device_version` varchar(255) DEFAULT NULL COMMENT '近端机版本',
  `device_describe` varchar(255) DEFAULT NULL COMMENT '近端机描述',
  `device_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `shouguanggonglv` int NOT NULL DEFAULT '0' COMMENT '收光功率状态',
  `faguanggonglv` int NOT NULL DEFAULT '0' COMMENT '发光功率状态',
  `upsgaojing` int NOT NULL DEFAULT '0' COMMENT 'UPS告警',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rms_near_device
-- ----------------------------
BEGIN;
INSERT INTO `rms_near_device` VALUES (1, 1, '近端机01号', 1, '北京丰台区中核路', NULL, NULL, NULL, NULL, '2021-03-20 22:57:08', 0, 0, 0);
INSERT INTO `rms_near_device` VALUES (2, 2, '近端机02号', 2, '北京市丰台区长辛店', NULL, NULL, NULL, NULL, '2021-03-20 22:57:08', 0, 0, 0);
INSERT INTO `rms_near_device` VALUES (3, 3, '近端机03号', 3, '北京市东城区和平里', NULL, NULL, NULL, NULL, '2021-03-20 22:57:10', 0, 0, 0);
COMMIT;

-- ----------------------------
-- Table structure for rms_state_log
-- ----------------------------
DROP TABLE IF EXISTS `rms_state_log`;
CREATE TABLE `rms_state_log` (
  `id` int NOT NULL,
  `sl_line_name` varchar(255) DEFAULT NULL COMMENT '线路名称',
  `sl_site_name` varchar(255) DEFAULT NULL COMMENT '站点名称',
  `sl_device_tag` varchar(255) DEFAULT NULL COMMENT '设备标识',
  `sl_device_name` varchar(255) DEFAULT NULL COMMENT '设备名称',
  `sl_device_type` varchar(255) DEFAULT NULL COMMENT '设备类型',
  `sl_time` datetime DEFAULT NULL COMMENT '时间',
  `sl_operation_type` varchar(255) DEFAULT NULL COMMENT '操作类型',
  `sl_check` varchar(255) DEFAULT NULL COMMENT '检测结果',
  `sl_user` varchar(255) DEFAULT NULL COMMENT '操作用户',
  `sl_breakdown` varchar(255) DEFAULT NULL COMMENT '是否故障',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for rms_user
-- ----------------------------
DROP TABLE IF EXISTS `rms_user`;
CREATE TABLE `rms_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `user_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `user_role` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户角色',
  `user_admin` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT '管理权限',
  `user_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `user_check` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '1' COMMENT '核销权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rms_user
-- ----------------------------
BEGIN;
INSERT INTO `rms_user` VALUES (1, 'admin', 'admin1', 'ROLE_ADMIN', '1', '2021-03-18 12:01:26', '1');
INSERT INTO `rms_user` VALUES (4, 'songweiwen', 'admin', 'ROLE_USER', '1', '2021-03-18 17:27:44', '1');
INSERT INTO `rms_user` VALUES (6, '13', '3', 'ROLE_USER', '1', '2021-03-20 11:25:11', '1');
INSERT INTO `rms_user` VALUES (7, '1', '3', 'ROLE_USER', '1', '2021-03-20 11:25:26', '1');
COMMIT;

-- ----------------------------
-- Table structure for rms_web
-- ----------------------------
DROP TABLE IF EXISTS `rms_web`;
CREATE TABLE `rms_web` (
  `id` int NOT NULL,
  `web_title` varchar(255) DEFAULT NULL COMMENT '标题名',
  `web_admin` varchar(255) DEFAULT NULL COMMENT '标题权限',
  `web_tag` varchar(255) DEFAULT NULL COMMENT 'tag',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rms_web
-- ----------------------------
BEGIN;
INSERT INTO `rms_web` VALUES (1, '主页', '0', 'HOME');
INSERT INTO `rms_web` VALUES (2, '设备管理', '0', 'SL');
INSERT INTO `rms_web` VALUES (3, '故障管理', '1', 'CL');
INSERT INTO `rms_web` VALUES (4, '数据管理', '1', 'SITE');
INSERT INTO `rms_web` VALUES (5, '设置参数', '1', 'LINE');
INSERT INTO `rms_web` VALUES (6, '用户管理', '1', 'USER');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
