const express = require('express');
const router = express.Router();
const conn = require('../js/conn');
const { nanoid } = require('nanoid');

// 管理员获取借阅记录
router.post('/borrowslist', (req, res) => {
  conn.query('SELECT * FROM borrowinfo', (err, rs) => {
    let data = rs || []
    if (data.length == 0) res.json({ msg: '管理员请求借阅记录为空', status: 0, data: rs });
    else res.json({ msg: '管理员请求借阅记录成功', status: 200, data: data });
  });
});

// 管理员获取预订记录
router.post('/reservelist', (req, res) => {
  conn.query(`SELECT reader.readerId,book.bookId,readerName,bookName,date FROM reserve
    LEFT JOIN reader ON reserve.readerId=reader.readerId
                LEFT JOIN book ON reserve.bookId=book.bookId`, (err, rs) => {
    let data = rs || []
    if (data.length == 0) res.json({ msg: '管理员请求预订记录为空', status: 0 });
    else res.json({ msg: '管理员请求预订记录成功', status: 200, data: rs });
  });
});

// 管理员删除借阅记录
router.post('/deleteborrow', (req, res) => {
  let data = req.body;
  conn.query('DELETE FROM borrow WHERE readerId=? AND bookId=? AND borrowDate=?', [data.readerId, data.bookId, data.borrowDate]);
  res.json({ msg: '管理员删除借阅记录成功', status: 200 });
});

// 管理员通过名称查询借阅信息
router.post('/searchborrow', (req, res) => {
  let data = req.body;
  conn.query('SELECT * FROM borrowinfo WHERE borrowinfo.readerName=?', [data.info], (err, reader) => {
    reader = reader || []
    conn.query('SELECT * FROM borrowinfo WHERE borrowinfo.bookName LIKE ?', [`%${data.info}%`], (err, book) => {
      book = book || []
      const map = {};
      for (let r of reader) map[r.bookId + r.readerId + r.borrowDate] = r;
      for (let b of book) map[b.bookId + b.readerId + b.borrowDate] = b;
      const result = Object.values(map);
      if (result.length > 0) res.json({ msg: '查询成功！', status: 200, data: result });
      else res.json({ msg: '查询失败！', status: 0 });
    });
  });
});

// 管理员获取人员信息
router.post('/initreaderlist', (req, res) => {
  conn.query('SELECT * FROM reader', (err, rs) => {
    let data = rs || []
    if (data.length == 0) res.json({ msg: '管理员请求人员记录为空', status: 0 });
    else res.json({ msg: '管理员请求人员记录成功', status: 200, data: data });
  });
});

// 管理员删除人员信息
router.post('/delperson', (req, res) => {
  let data = req.body;
  conn.query('DELETE FROM reader WHERE readerId=?', [data.readerId]);
  res.send({ msg: '删除人员成功！', status: 200 });
});

// 管理员添加图书
router.post('/adminaddbooks', (req, res) => {
  let data = req.body;
  conn.query('SELECT * FROM book WHERE position=?', [data.position], (err, rs) => {
    if (rs.length > 0) {
      res.send({ msg: '该位置已有书籍存放！', status: 0 });
    } else {
      conn.query('INSERT INTO book VALUES (?, ?, ?, ?, ?, ?, 0, 1)', [nanoid(), data.bookName, data.author, data.amount, data.position, data.amount]);
      res.send({ msg: '添加书籍成功！', status: 200 });
    }
  });
});

// 管理员修改图书信息
router.post('/changebookinfo', (req, res) => {
  let data = req.body;
  let status = data.status;
  switch (status) {
    case '1':
      conn.query('UPDATE book SET bookName=? WHERE bookId=?', [data.value, data.bookId]);
      res.send({ status: 200, msg: '修改书名成功！' });
      break;
    case '2':
      conn.query('UPDATE book SET author=? WHERE bookId=?', [data.value, data.bookId]);
      res.send({ status: 200, msg: '修改作者成功！' });
      break;
    case '3':
      conn.query('SELECT * FROM book WHERE position=?', [data.value], (err, rs) => {
        if (rs.length > 0) {
          return res.send({ msg: '该位置已有书籍存放！', status: 0 });
        } else {
          conn.query('UPDATE book SET position=? WHERE bookId=?', [data.value, data.bookId]);
          res.send({ status: 200, msg: '修改位置成功！' });
        }
      });
      break;
    case '4':
      conn.query('UPDATE book SET amount=? WHERE bookId=?', [data.value, data.bookId]);
      conn.query('UPDATE book SET totalAmount=totalAmount + ? WHERE bookId=?', [data.difference, data.bookId]);
      res.send({ status: 200, msg: '修改当前库存成功！' });
      break;
    default: break;
  }
});

// 管理删除图书
router.post('/delbook', (req, res) => {
  let data = req.body;
  conn.query('UPDATE book SET status=0 WHERE bookId=?', [data.bookId]);
  res.send({ msg: '删除图书成功', status: 200 });
});

// 管理员发送通知
router.post('/sendnotification', (req, res) => {
  const { readerId, message } = req.body;
  if (!readerId || !message) {
    return res.json({ status: 0, msg: '读者ID和消息内容不能为空！' });
  }
  const sql = 'INSERT INTO notification (readerId, message, date) VALUES (?, ?, NOW())';
  conn.query(sql, [readerId, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ status: 0, msg: '发送失败，数据库错误！' });
    }
    res.json({ status: 200, msg: '通知发送成功！' });
  });
});

module.exports = router;