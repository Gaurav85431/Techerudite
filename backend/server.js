const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: "",
  database: "reglogin"
});

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pushpamgaurav3@gmail.com',
    pass: 'ejemeomzfoqpcklv'
  }
});

const sendVerificationEmail = (email, token) => {
  const mailOptions = {
    from: 'pushpamgaurav3@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking the following link: http://localhost:3000/verify-email?token=${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};



app.post('/register/customer', (req, res) => {
  const sql = "INSERT INTO reslogin (firstName, lastName, email, password, role) VALUES (?)";
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
    'customer'
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    sendVerificationEmail(req.body.email, token);
    return res.json("Customer registration successful. Please verify your email.");

  });
});



app.post('/register/admin', (req, res) => {
  const sql = "INSERT INTO reslogin (firstName, lastName, email, password, role) VALUES (?)";
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
    'admin'
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    sendVerificationEmail(req.body.email, token);
    return res.json("Admin registration successful. Please verify your email.");

  });
});



app.get('/verify-email', (req, res) => {
  const token = req.query.token;
  const sql = "UPDATE reslogin SET isVerified = TRUE WHERE verificationToken = ?";
  db.query(sql, [token], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.affectedRows === 0) {
      return res.json("Invalid token");
    }
    return res.json("Email verified successfully");
  });
});



app.post('/login', (req, res) => {
  const sql = "SELECT * FROM reslogin WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      const user = data[0];
      if (user.role === 'admin') {
        return res.json("Success");
      } else {
        return res.json("You are not allowed to login from here");
      }
    } else {
      return res.json("Failed");
    }
  });
});

app.listen(3000, () => {
  console.log(`Server started at port 3000`);
});
