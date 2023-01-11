const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: '3b5c7d9e5f6g7h8i9j0k1l2m3n4o5p6q7',
  resave: false,
  saveUninitialized: true
}));


app.use("/src", express.static("src"));
app.use("/Assets", express.static("Assets"));
app.use("/minuman", express.static("minuman"));
app.use("/makanan", express.static("makanan"));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "halik909021",
  database: "testing",
});

con.connect((err) => {
  if (err) throw err
  console.log("database connected ...");

  // POST

  app.post("/daftar", (req, res) => {
    let data = req.body;
    const sql = `INSERT INTO customers (nama, username, password) VALUES ("${data.nama}", "${data.username}", "${data.password}")`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect("/");
    });
  });

  app.post('/submit', (req, res) => {
    let data = req.body;
    if (Array.isArray(data)) {
      // Kirim data ke database
      const sql = "INSERT INTO products (name, price, jumlah, tables) VALUES ?";
      con.query(sql, [data.map(item => [item.tittle, item.price, item.quantity, item.meja])], (err, results) => {
        if (err) throw err;
        res.redirect("/pembayaran");
      });
    } else {
      console.error('Error');
    }
  });

  app.post("/login", (req, res) => {
    let data = req.body;
    const sql = "SELECT * FROM customers WHERE username = ? and password = ?";
    con.query(sql, [data.username, data.password], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        req.session.loggedIn = true;
        req.session.username = results[0].username;
        res.redirect("/wellcome");
      }
      else {
        res.redirect("/");
      }
    });
  });

  // POST END

  // GET
  app.get("/namauser", (req, res) => {
    if (err) throw err;
    if (req.session.username) {
      res.send(req.session.username);
    } else {
      res.send('Anda Belum Login')
    }
  })

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  app.get('/logout', (req, res) => {
    req.session.destroy((error) => {
      if (error) throw error
      res.redirect('/')
    })
  })

  app.get("/daftar", (req, res) => {
    res.sendFile(__dirname + "/public/daftar.html");
  });

  app.get("/wellcome", (req, res) => {
    res.sendFile(__dirname + "/public/wellcome.html");
  });
  

  app.get("/menu", (req, res) => {
    res.sendFile(__dirname + "/public/menu.html");
  });

  app.get("/pembayaran", (req, res) => {
    res.sendFile(__dirname + "/public/pembayaran.html");
  });

  // GET END

});

app.listen(8000, () => {
  console.log("Server Ready ...")
});