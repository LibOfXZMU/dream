const express = require('express');
const router = express.Router();
const conn = require('../js/conn');
const { nanoid } = require('nanoid');

// 获取个人信息
router.post('/initreader', (req, res) => {
  const data = req.body;
  conn.query('SELECT email,readerId,readerName,phone,borrowTimes,ovdTimes FROM reader WHERE readerId=?', [data.readerId], (err, rows) => {
    if (err) return res.json({ msg: '数据库错误', status: 0 });
    if (rows && rows.length > 0) {
      res.json({
        msg: '学生获取信息成功！',
        status: 200,
        readerId: rows[0].readerId,
        readerName: rows[0].readerName,
        readerPhone: rows[0].phone,
        borrowTimes: rows[0].borrowTimes,
        ovdTimes: rows[0].ovdTimes,
        email: rows[0].email,
        isAdmin: false,
      });
    } else {
      res.json({ msg: '学生获取信息失败！', status: 0 });
    }
  });
});

// 注册
router.post('/register', (req, res) => {
  const data = req.body;
  if (!data) return res.json({ msg: '没有提交数据！', status: 0 });
  if (!data.userName) return res.json({ msg: '用户名不能为空', status: 0 });
  if (!data.phone) return res.json({ msg: '手机号不能为空', status: 0 });
  if (!data.email) return res.json({ msg: '邮箱不能为空', status: 0 });
  if (!data.password) return res.json({ msg: '密码不能为空', status: 0 });
  const readerId = nanoid();
  const regexp = /^(\+\d{2,3}-)?\d{11}$/;
  if (!regexp.test(data.phone)) return res.json({ msg: '手机号格式错误', status: 0 });
  conn.query('SELECT * FROM reader WHERE phone=?', [data.phone], (err, rs) => {
    if (err) return res.json({ msg: '数据库错误', status: 0 });
    if (rs.length > 0) {
      res.json({ msg: '该手机号已经注册过！', status: 0 });
    } else {
      conn.query('INSERT INTO reader VALUES (?, ?, ?, ?, 0, 0, ?)', [readerId, data.userName, data.password, data.phone, data.email], (err2) => {
        if (err2) return res.json({ msg: '数据库错误', status: 0 });
        res.json({ msg: '注册成功', status: 200 });
      });
    }
  });
});

// 预约记录
router.post('/reserve', (req, res) => {
  const data = req.body;
  conn.query(
      `SELECT reserve.readerId,book.bookId,reserve.status,book.author,book.bookName,reserve.date
       FROM reserve
              LEFT JOIN book ON reserve.bookId=book.bookId
       WHERE reserve.readerId=?`,
      [data.readerId],
      (err, rs) => {
        if (err) return res.json({ msg: '数据库错误', status: 0, data: [] });
        let result = rs || [];
        res.json({
          msg: result.length ? '读者请求预订记录成功' : '读者请求预订记录为空',
          status: result.length ? 200 : 0,
          data: result
        });
      }
  );
});

// 添加预约
router.post('/addreserve', (req, res) => {
  const data = req.body;
  conn.query('SELECT * FROM book WHERE bookId=?', [data.bookId], (err, rs) => {
    if (err) return res.json({ msg: '数据库错误', status: 0 });
    if (rs.length > 0) {
      conn.query('INSERT INTO reserve VALUES (?, ?, ?, ?)', [data.readerId, data.bookId, data.date, data.status]);
      res.json({ msg: '预约成功！', status: 200 });
    } else {
      res.json({ msg: '不好意思，该书当前库存不足！', status: 0 });
    }
  });
});

// 删除预约
router.post('/cancelreserve', (req, res) => {
  const data = req.body;
  conn.query('DELETE FROM reserve WHERE bookId=? AND readerId=? AND date=?', [data.bookId, data.readerId, data.date]);
  res.json({ msg: '取消预约成功！', status: 200 });
});

// 续借
router.post('/continueborrow', (req, res) => {
  const data = req.body;
  conn.query(
      `UPDATE borrow SET status='续借',borrowDate=NOW(),returnDate=DATE_ADD(NOW(), INTERVAL 1 MONTH)
       WHERE readerId=? AND bookId=? AND borrowDate=?`,
      [data.readerId, data.bookId, data.borrowDate]
  );
  res.send({ msg: '续借成功！', status: 200 });
});

// 借阅记录
router.post('/borrows', (req, res) => {
  const data = req.body;
  conn.query(
      `SELECT * FROM borrowinfo WHERE readerId=? ORDER BY borrowDate DESC`,
      [data.readerId],
      (err, rs) => {
        if (err) return res.json({ msg: '数据库错误', status: 0, data: [] });
        let result = rs || [];
        res.json({
          msg: result.length ? '读者请求借阅记录成功' : '读者请求借阅记录为空',
          status: result.length ? 200 : 0,
          data: result
        });
      }
  );
});

// 借书
router.post('/addborrow', (req, res) => {
  const data = req.body;
  conn.query('INSERT INTO borrow VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), NULL, "未归还")', [data.readerId, data.bookId]);
  conn.query('UPDATE book SET amount = amount - 1 WHERE bookId=?', [data.bookId]);
  conn.query('UPDATE book SET borrowedTimes = borrowedTimes + 1 WHERE bookId=?', [data.bookId]);
  conn.query('UPDATE reader SET borrowTimes = borrowTimes + 1 WHERE readerId=?', [data.readerId]);
  conn.query('UPDATE reserve SET status="已借阅" WHERE bookId=? AND readerId=? AND date=?', [data.bookId, data.readerId, data.date]);
  res.json({ msg: '添加借书记录成功！', status: 200 });
});

// 还书
router.post('/returnbook', (req, res) => {
  const data = req.body;
  conn.query('UPDATE book SET amount = amount + 1 WHERE bookId=?', [data.bookId]);
  conn.query('UPDATE borrow SET status="已归还",realDate=NOW() WHERE bookId=? AND readerId=? AND borrowDate=?', [data.bookId, data.readerId, data.borrowDate]);
  conn.query('SELECT UNIX_TIMESTAMP(returnDate) as returnDate FROM borrow WHERE bookId=? AND readerId=? AND borrowDate=?', [data.bookId, data.readerId, data.borrowDate], (err, rs) => {
    if (rs && rs.length > 0) {
      let realDate = Math.floor(Date.now() / 1000);
      let returnDate = rs[0].returnDate;
      if (realDate > returnDate) {
        conn.query('UPDATE reader SET ovdTimes = ovdTimes + 1 WHERE readerId=?', [data.readerId]);
        res.json({ msg: '还书成功，您已逾期！', status: 100 });
      } else {
        res.json({ msg: '还书成功！', status: 200 });
      }
    } else {
      res.json({ msg: '还书失败！', status: 0 });
    }
  });
});

// 获取通知
router.post('/getnotifications', (req, res) => {
  const { readerId } = req.body;
  if (!readerId) {
    return res.json({ status: 0, msg: '读者ID不能为空！', data: [] });
  }
  const sql = 'SELECT * FROM notification WHERE readerId = ? ORDER BY date DESC';
  conn.query(sql, [readerId], (err, results) => {
    if (err) {
      console.error(err);
      return res.json({ status: 0, msg: '查询失败，数据库错误！', data: [] });
    }
    res.json({ status: 200, msg: '获取通知成功！', data: results });
  });
});

// 标记已读
router.post('/marknotificationasread', (req, res) => {
  const { notificationId } = req.body;
  if (!notificationId) {
    return res.json({ status: 0, msg: '通知ID不能为空！' });
  }
  const sql = 'UPDATE notification SET isRead = TRUE WHERE notificationId = ?';
  conn.query(sql, [notificationId], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ status: 0, msg: '标记已读失败！' });
    }
    res.json({ status: 200, msg: '标记已读成功！' });
  });
});

module.exports = router;