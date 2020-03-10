const express   = require("express"),
      app       = express(),
      bodyParser= require("body-parser"),
      port      = 5000;

//Set the app
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

// RESTful Routes
app.get("/", (req, res) => {
  res.render("index");
})

app.get("/articles", (req, res) => {
  res.render("articles");
})

app.post("/articles", (req, res) => {
  res.render("sent", {review : req.body.review});
})

app.listen(process.env.PORT || port, () => {
  console.log("The app is running");
})