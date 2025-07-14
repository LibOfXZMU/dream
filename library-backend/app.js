const express = require('express');
const app = express();
const conn = require('./js/conn');
const { nanoid } = require('nanoid');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 路由
const adminRouter = require('./order/admin.js');
const readerRouter = require('./order/reader.js');
app.use(readerRouter);
app.use(adminRouter);

// 登录接口
app.post('/login', (req, res) => {
  const data = req.body;
  if (!data) return res.json({ msg: '没有提交数据！', status: 0 });
  if (!data.phone) return res.json({ msg: '账号不能为空', status: 0 });
  if (!data.password) return res.json({ msg: '密码不能为空', status: 0 });
  if (data.isAdmin == 'true' || data.isAdmin === true) {
    conn.query('SELECT * FROM admin WHERE id=? AND password=?', [data.phone, data.password], (err, rows) => {
      if (err) return res.json({ msg: '数据库错误', status: 0 });
      if (rows && rows.length > 0) {
        res.json({ msg: '管理员登录成功', status: 200, userName: data.phone, isAdmin: true });
      } else {
        res.json({ msg: '管理员账号或密码错误！', status: 0 });
      }
    });
  } else {
    conn.query('SELECT readerId,readerName,phone,borrowTimes,ovdTimes FROM reader WHERE phone=? AND password=?', [data.phone, data.password], (err, rows) => {
      if (err) return res.json({ msg: '数据库错误', status: 0 });
      if (rows && rows.length > 0) {
        res.json({
          msg: '学生登录成功',
          status: 200,
          readerId: rows[0].readerId,
          readerName: rows[0].readerName,
          readerPhone: rows[0].phone,
          borrowTimes: rows[0].borrowTimes,
          ovdTimes: rows[0].ovdTimes,
          isAdmin: false
        });
      } else {
        res.json({ msg: '账号密码错误或该用户未注册！', status: 0 });
      }
    });
  }
});

// 图书接口
app.post('/books', (req, res) => {
  conn.query('SELECT * FROM book ORDER BY borrowedTimes DESC', (err, rs) => {
    let data = rs || [];
    if (err) return res.json({ msg: '数据库错误', status: 0, data: [] });
    if (data.length > 0) {
      res.json({ msg: '书籍请求成功', status: 200, data: rs });
    } else {
      res.json({ msg: '书籍请求数据为空', status: 0, data: [] });
    }
  });
});

// 书籍查找
app.post('/searchbook', (req, res) => {
  let data = req.body;
  const query = '%' + data.name + '%';
  conn.query('SELECT * FROM book WHERE bookName LIKE ? OR author LIKE ?', [query, query], (err, result) => {
    if (err) return res.json({ msg: '数据库错误', status: 0, data: [] });

    if (result && result.length > 0)
      res.json({ msg: '查询成功！', data: result, status: 200 });
    else
      res.json({ msg: '查询结果为空！', status: 0, data: [] });
  });
});


app.listen(8989, () => {
  console.log('服务器启动成功! 端口: 8989');
});