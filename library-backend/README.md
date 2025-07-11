Ⅰ、npm install 安装依赖

Ⅱ、npm run dev 启动程序

注意：

①lib文件夹下有sql代码

②修改js文件夹下面的conn.js的数据库账密


⑤如果出现管理员界面借阅记录展示不出来，那是因为视图创建失败，可尝试以下 SQL

CREATE USER 'root'@'%' IDENTIFIED BY 'PASSWORD';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
DROP VIEW IF EXISTS `borrowinfo`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`%` SQL SECURITY DEFINER VIEW `borrowinfo` AS select `borrow`.`readerId` AS `readerId`,`book`.`bookId` AS `bookId`,`reader`.`readerName` AS `readerName`,`book`.`bookName` AS `bookName`,`borrow`.`borrowDate` AS `borrowDate`,`borrow`.`returnDate` AS `returnDate`,`borrow`.`realDate` AS `realDate` from ((`borrow` left join `reader` on((`borrow`.`readerId` = `reader`.`readerId`))) left join `book` on((`borrow`.`bookId` = `book`.`bookId`)));
DROP VIEW IF EXISTS `reportinfo`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`%` SQL SECURITY DEFINER VIEW `reportinfo` AS select `a`.`status` AS `status`,`a`.`commentId` AS `commentId`,`a`.`reporterId` AS `reporterId`,`a`.`reportdate` AS `reportdate`,`b`.`readerId` AS `readerId`,`reader`.`readerName` AS `readerName`,`b`.`bookId` AS `bookId`,`book`.`bookName` AS `bookName`,`b`.`date` AS `date`,`b`.`content` AS `content` from (((`report` `a` left join `comment` `b` on((`a`.`commentId` = `b`.`commentId`))) left join `reader` on((`b`.`readerId` = `reader`.`readerId`))) left join `book` on((`b`.`bookId` = `book`.`bookId`)));

