const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")
const User = require("./models/user")

const app = express()
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
  secret: 'secret123',
  resave: true,
  saveUninitialized: true,
}))
app.use(flash())
require("./config/mongoose")


app.get("/", (req, res) => {
  // res.send("error")
  const error = "" || req.flash('error')
  console.log(error)
  res.render("index", { error })
})

app.post("/", (req, res) => {
  res.render("index")
})

app.post("/login", (req, res) => {
  const { email, password } = req.body
  return User.findOne({ "email": email, "password": password })
    .lean()
    .then(user => {
      if (user) {
        res.render("login", { user })
      } else {
        // alert(`${email} 不存在或 密碼錯誤`)
        req.flash('error', `${email} 不存在或密碼錯誤`)
        res.redirect("/")
      }
    })
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log("Listening on localhost:3000")
})