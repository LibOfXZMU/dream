/*
 Navicat Premium Data Transfer

 Source Server         : demo
 Source Server Type    : MySQL
 Source Server Version : 80037 (8.0.37)
 Source Host           : localhost:3306
 Source Schema         : library

 Target Server Type    : MySQL
 Target Server Version : 80037 (8.0.37)
 File Encoding         : 65001

 Date: 15/06/2025 20:20:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
                          `id` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                          `password` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
                          PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('admin', '123');
INSERT INTO `admin` VALUES ('superuser', 'admin888');
INSERT INTO `admin` VALUES ('lib001', 'libpass');

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
                         `bookId` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                         `bookName` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
                         `author` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                         `amount` int NULL DEFAULT NULL,
                         `position` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
                         `totalAmount` int NULL DEFAULT NULL,
                         `borrowedTimes` int NULL DEFAULT NULL,
                         `status` int NULL DEFAULT NULL,
                         PRIMARY KEY (`bookId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('B001', '三体：地球往事', '刘慈欣', 31, '01#12A#1-1', 30, 7, 0);
INSERT INTO `book` VALUES ('B002', '红楼梦', '曹雪芹', 25, '01#13A#1-2', 25, 10, 0);
INSERT INTO `book` VALUES ('B003', '活着', '余华', 18, '01#14A#1-3', 18, 4, 0);
INSERT INTO `book` VALUES ('B004', '百年孤独', '马尔克斯', 20, '01#15A#2-1', 20, 2, 0);
INSERT INTO `book` VALUES ('B005', '平凡的世界', '路遥', 40, '01#16A#2-2', 40, 9, 1);
INSERT INTO `book` VALUES ('B006', '小王子', '圣埃克苏佩里', 22, '01#17A#2-3', 22, 3, 0);
INSERT INTO `book` VALUES ('B007', '围城', '钱钟书', 17, '01#18A#3-1', 17, 5, 1);
INSERT INTO `book` VALUES ('B008', '假如给我三天光明', '海伦凯勒', 19, '01#19A#3-2', 19, 2, 1);
INSERT INTO `book` VALUES ('B009', '瓦尔登湖', '梭罗', 23, '01#20A#3-3', 23, 6, 1);
INSERT INTO `book` VALUES ('B010', '人类简史', '尤瓦尔', 35, '01#21A#4-1', 35, 8, 0);
INSERT INTO `book` VALUES ('B011', '追风筝的人', '胡赛尼', 28, '01#22A#4-2', 28, 4, 0);
INSERT INTO `book` VALUES ('B012', '解忧杂货店', '东野圭吾', 26, '01#23A#4-3', 26, 7, 1);
INSERT INTO `book` VALUES ('B013', '白夜行', '东野圭吾', 21, '01#24A#5-1', 21, 3, 1);
INSERT INTO `book` VALUES ('B014', '嫌疑人X的献身', '东野圭吾', 32, '02#12B#1-1', 32, 2, 0);
INSERT INTO `book` VALUES ('B015', '解体诸因', '阿西莫夫', 20, '02#13B#1-2', 20, 1, 0);
INSERT INTO `book` VALUES ('B016', '银河帝国', '阿西莫夫', 38, '02#14B#1-3', 38, 5, 1);
INSERT INTO `book` VALUES ('B017', '哈利·波特', 'J.K.罗琳', 45, '02#15B#2-1', 45, 13, 0);
INSERT INTO `book` VALUES ('B018', '傲慢与偏见', '简·奥斯汀', 27, '02#16B#2-2', 27, 9, 1);
INSERT INTO `book` VALUES ('B019', '呼啸山庄', '艾米莉·勃朗特', 24, '02#17B#2-3', 24, 4, 1);
INSERT INTO `book` VALUES ('B020', '简·爱', '夏洛蒂·勃朗特', 29, '02#18B#3-1', 29, 6, 0);
INSERT INTO `book` VALUES ('B021', '老人与海', '海明威', 31, '02#19B#3-2', 31, 3, 1);
INSERT INTO `book` VALUES ('B022', '悲惨世界', '雨果', 22, '02#20B#3-3', 22, 2, 1);
INSERT INTO `book` VALUES ('B023', '福尔摩斯探案集', '柯南·道尔', 36, '02#21B#4-1', 36, 11, 0);
INSERT INTO `book` VALUES ('B024', '时间简史', '霍金', 33, '02#22B#4-2', 33, 8, 1);
INSERT INTO `book` VALUES ('B025', '资治通鉴', '司马光', 42, '02#23B#4-3', 42, 5, 1);
INSERT INTO `book` VALUES ('B026', '史记', '司马迁', 38, '02#24B#5-1', 38, 7, 1);
INSERT INTO `book` VALUES ('B027', '三国演义', '罗贯中', 41, '03#12C#1-1', 41, 15, 1);
INSERT INTO `book` VALUES ('B028', '西游记', '吴承恩', 40, '03#13C#1-2', 40, 12, 0);
INSERT INTO `book` VALUES ('B029', '水浒传', '施耐庵', 35, '03#14C#1-3', 35, 10, 1);
INSERT INTO `book` VALUES ('B030', '唐诗三百首', '蘅塘退士', 30, '03#15C#2-1', 30, 6, 0);

-- ----------------------------
-- Table structure for reader
-- ----------------------------
DROP TABLE IF EXISTS `reader`;
CREATE TABLE `reader`  (
                           `readerId` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                           `readerName` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
                           `password` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
                           `phone` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
                           `borrowTimes` bigint NULL DEFAULT NULL,
                           `ovdTimes` bigint NULL DEFAULT NULL,
                           `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
                           PRIMARY KEY (`readerId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of reader
-- ----------------------------
INSERT INTO `reader` VALUES ('1001', '张三', '123', '13800000001', 15, 3, 'zhangsan@example.com');
INSERT INTO `reader` VALUES ('1002', '李四', 'pass234', '13800000002', 9, 0, 'lisi@example.com');
INSERT INTO `reader` VALUES ('1003', '王五', 'pass345', '13800000003', 7, 1, 'wangwu@example.com');
INSERT INTO `reader` VALUES ('1004', '赵六', 'pass456', '13800000004', 25, 3, 'zhaoliu@example.com');
INSERT INTO `reader` VALUES ('1005', '周七', 'pass567', '13800000005', 5, 0, 'zhouqi@example.com');
INSERT INTO `reader` VALUES ('1006', '冯八', 'pass678', '13800000006', 12, 0, 'fengba@example.com');
INSERT INTO `reader` VALUES ('1007', '孙九', 'pass789', '13800000007', 13, 1, 'sunjiu@example.com');
INSERT INTO `reader` VALUES ('1008', '吴十', 'pass890', '13800000008', 4, 0, 'wushi@example.com');
INSERT INTO `reader` VALUES ('1009', '郑十一', 'pass901', '13800000009', 18, 0, 'zhengshiyi@example.com');
INSERT INTO `reader` VALUES ('1010', '王十二', 'pass012', '13800000010', 21, 3, 'wangshier@example.com');
INSERT INTO `reader` VALUES ('1011', '钱十三', 'pass111', '13800000011', 5, 1, 'qianshisan@example.com');
INSERT INTO `reader` VALUES ('1012', '孙十四', 'pass112', '13800000012', 8, 0, 'sunsishi@example.com');
INSERT INTO `reader` VALUES ('1013', '周十五', 'pass113', '13800000013', 3, 0, 'zhou15@example.com');
INSERT INTO `reader` VALUES ('1014', '吴十六', 'pass114', '13800000014', 2, 0, 'wu16@example.com');
INSERT INTO `reader` VALUES ('1015', '郑十七', 'pass115', '13800000015', 14, 2, 'zheng17@example.com');
INSERT INTO `reader` VALUES ('1016', '王十八', 'pass116', '13800000016', 7, 1, 'wang18@example.com');
INSERT INTO `reader` VALUES ('1017', '冯十九', 'pass117', '13800000017', 11, 0, 'feng19@example.com');
INSERT INTO `reader` VALUES ('1018', '陈二十', 'pass118', '13800000018', 6, 0, 'chen20@example.com');
INSERT INTO `reader` VALUES ('1019', '林二一', 'pass119', '13800000019', 8, 1, 'lin21@example.com');
INSERT INTO `reader` VALUES ('1020', '赵二二', 'pass120', '13800000020', 13, 0, 'zhao22@example.com');


-- ----------------------------
-- Table structure for borrow
-- ----------------------------
DROP TABLE IF EXISTS `borrow`;
CREATE TABLE `borrow`  (
                           `readerId` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                           `bookId` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                           `borrowDate` datetime NOT NULL,
                           `returnDate` datetime NULL DEFAULT NULL,
                           `realDate` datetime NULL DEFAULT NULL,
                           `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
                           PRIMARY KEY (`readerId`, `bookId`, `borrowDate`) USING BTREE,
                           INDEX `fk_borrow_book`(`bookId`) USING BTREE,
                           CONSTRAINT `fk_borrow_reader` FOREIGN KEY (`readerId`) REFERENCES `reader` (`readerId`) ON DELETE CASCADE ON UPDATE CASCADE,
                           CONSTRAINT `fk_borrow_book` FOREIGN KEY (`bookId`) REFERENCES `book` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of borrow
-- ----------------------------
INSERT INTO `borrow` VALUES ('1001', 'B001', '2025-06-01 10:00:00', '2025-06-15 10:00:00', '2025-06-15 14:09:44', '已归还');
INSERT INTO `borrow` VALUES ('1002', 'B002', '2025-06-02 14:00:00', '2025-06-16 14:00:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1003', 'B003', '2025-06-03 11:30:00', '2025-06-17 11:30:00', '2025-06-12 09:00:00', '已归还');
INSERT INTO `borrow` VALUES ('1004', 'B004', '2025-06-04 09:10:00', '2025-06-18 09:10:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1005', 'B005', '2025-06-05 08:20:00', '2025-06-19 08:20:00', '2025-06-15 07:00:00', '已归还');
INSERT INTO `borrow` VALUES ('1006', 'B006', '2025-06-06 07:40:00', '2025-06-20 07:40:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1007', 'B007', '2025-06-07 15:00:00', '2025-06-21 15:00:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1008', 'B008', '2025-06-08 16:00:00', '2025-06-22 16:00:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1009', 'B009', '2025-06-09 17:00:00', '2025-06-23 17:00:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1010', 'B010', '2025-06-10 18:00:00', '2025-06-24 18:00:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1011', 'B011', '2025-06-11 12:00:00', '2025-06-25 12:00:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1012', 'B012', '2025-06-12 13:00:00', '2025-06-26 13:00:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1013', 'B013', '2025-06-13 15:30:00', '2025-06-27 15:30:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1014', 'B014', '2025-06-14 10:20:00', '2025-06-28 10:20:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1015', 'B015', '2025-06-14 11:00:00', '2025-06-28 11:00:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1016', 'B016', '2025-06-13 09:30:00', '2025-06-27 09:30:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1017', 'B017', '2025-06-08 13:00:00', '2025-06-22 13:00:00', '2025-06-14 13:00:00', '已归还');
INSERT INTO `borrow` VALUES ('1018', 'B018', '2025-06-12 14:00:00', '2025-06-26 14:00:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1019', 'B019', '2025-06-10 15:00:00', '2025-06-24 15:00:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1020', 'B020', '2025-06-05 11:30:00', '2025-06-19 11:30:00', NULL, '未归还');
INSERT INTO `borrow` VALUES ('1001', 'B021', '2025-05-20 09:00:00', '2025-06-03 09:00:00', '2025-06-02 08:00:00', '已归还');
INSERT INTO `borrow` VALUES ('1002', 'B022', '2025-05-22 10:00:00', '2025-06-05 10:00:00', '2025-06-03 09:00:00', '已归还');
INSERT INTO `borrow` VALUES ('1003', 'B023', '2025-05-25 11:00:00', '2025-06-08 11:00:00', '2025-06-07 10:00:00', '已归还');
INSERT INTO `borrow` VALUES ('1004', 'B024', '2025-05-28 12:00:00', '2025-06-11 12:00:00', '2025-06-10 11:00:00', '已归还');

-- ----------------------------
-- Table structure for reserve
-- ----------------------------
DROP TABLE IF EXISTS `reserve`;
CREATE TABLE `reserve`  (
                            `readerId` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                            `bookId` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                            `date` datetime NOT NULL,
                            `status` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
                            PRIMARY KEY (`readerId`, `bookId`, `date`) USING BTREE,
                            INDEX `fk_reserve_book`(`bookId`) USING BTREE,
                            CONSTRAINT `fk_reserve_reader` FOREIGN KEY (`readerId`) REFERENCES `reader` (`readerId`) ON DELETE CASCADE ON UPDATE CASCADE,
                            CONSTRAINT `fk_reserve_book` FOREIGN KEY (`bookId`) REFERENCES `book` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of reserve
-- ----------------------------
INSERT INTO `reserve` VALUES ('1001', 'B011', '2025-06-03 10:00:00', '待取书');
INSERT INTO `reserve` VALUES ('1002', 'B012', '2025-06-04 11:00:00', '已取书');
INSERT INTO `reserve` VALUES ('1003', 'B013', '2025-06-05 12:00:00', '已取书');
INSERT INTO `reserve` VALUES ('1004', 'B014', '2025-06-06 13:00:00', '待取书');
INSERT INTO `reserve` VALUES ('1005', 'B015', '2025-06-07 14:00:00', '已取书');
INSERT INTO `reserve` VALUES ('1006', 'B016', '2025-06-08 15:00:00', '已取书');
INSERT INTO `reserve` VALUES ('1007', 'B017', '2025-06-09 16:00:00', '待取书');
INSERT INTO `reserve` VALUES ('1008', 'B018', '2025-06-10 17:00:00', '已取书');
INSERT INTO `reserve` VALUES ('1009', 'B019', '2025-06-11 18:00:00', '待取书');
INSERT INTO `reserve` VALUES ('1010', 'B020', '2025-06-12 19:00:00', '已取书');
INSERT INTO `reserve` VALUES ('1011', 'B021', '2025-06-13 10:00:00', '待取书');
INSERT INTO `reserve` VALUES ('1012', 'B022', '2025-06-14 11:00:00', '已取书');
INSERT INTO `reserve` VALUES ('1013', 'B023', '2025-06-15 12:00:00', '待取书');
INSERT INTO `reserve` VALUES ('1014', 'B024', '2025-06-15 13:00:00', '已取书');
INSERT INTO `reserve` VALUES ('1015', 'B025', '2025-06-13 14:00:00', '待取书');
INSERT INTO `reserve` VALUES ('1016', 'B026', '2025-06-14 15:00:00', '已取书');
INSERT INTO `reserve` VALUES ('1017', 'B027', '2025-06-15 16:00:00', '待取书');
INSERT INTO `reserve` VALUES ('1018', 'B028', '2025-06-13 17:00:00', '已取书');
INSERT INTO `reserve` VALUES ('1019', 'B029', '2025-06-14 18:00:00', '待取书');
INSERT INTO `reserve` VALUES ('1020', 'B030', '2025-06-15 19:00:00', '已取书');
INSERT INTO `reserve` VALUES ('1001', 'B027', '2025-06-15 14:11:55', '已预约');
INSERT INTO `reserve` VALUES ('1001', 'B024', '2025-06-15 14:11:57', '已预约');

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
                                `notificationId` INT AUTO_INCREMENT PRIMARY KEY,
                                `readerId` VARCHAR(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                                `message` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                                `date` DATETIME NOT NULL,
                                `isRead` BOOLEAN DEFAULT FALSE,
                                FOREIGN KEY (`readerId`) REFERENCES `reader`(`readerId`) ON DELETE CASCADE
) ENGINE=InnoDB CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
-- View structure for borrowinfo
-- ----------------------------
DROP VIEW IF EXISTS `borrowinfo`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `borrowinfo` AS select `b`.`readerId` AS `readerId`,`bk`.`bookId` AS `bookId`,`r`.`readerName` AS `readerName`,`bk`.`bookName` AS `bookName`,`b`.`borrowDate` AS `borrowDate`,`b`.`returnDate` AS `returnDate`,`b`.`realDate` AS `realDate`,`b`.`status` AS `status` from ((`borrow` `b` left join `reader` `r` on((`b`.`readerId` = `r`.`readerId`))) left join `book` `bk` on((`b`.`bookId` = `bk`.`bookId`)));

SET FOREIGN_KEY_CHECKS = 1;