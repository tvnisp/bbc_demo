const express   = require("express"),
      app       = express(),
      bodyParser= require("body-parser"),
      port      = 4000;

//Set the app
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.render("index");
})

app.get("/articles", (req, res) => {
  res.render("articles");
})

app.post("/articles", (req, res) => {
  res.render("sent");
})

app.listen(port, function() {
  console.log("The app is running");
})