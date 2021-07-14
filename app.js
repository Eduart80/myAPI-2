//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/myAPI", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const articleSchema = {
  firstName: String,
  lastName: String,
  age: Number,
  city: String,
};
const Article = mongoose.model("Article", articleSchema);
///////////////////// All CRUD  //////////////////
app.route("/articles")

  .get(function (req, res) {
    Article.find(function (err, articles) {
      if (err) return res.status(400).send(error.detail[0].message);
      res.send(articles);
    });
  })

  .post(function (req, res) {
    const newArt = new Article({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      city: req.body.String,
    });

    newArt.save(function (err) {
      if (err) return res.status(400).send(error.detail[0].message);
      res.send(newArt);
    });
  })

  .delete(function (req, res) {
    Article.deleteMany((err) => {
      if (!err) {
        res.send("OK");
      } else {
        res.send(err);
        console.log(err);
      }
    });
  });
///////////  Specific article  //////////////////
app.route("/articles/:_id_")

.get(function(req,res){
  Article.findOne(
    {title:req.params._id_}, function(err, foundFunction){
      if(foundFunction){
        res.send("meso me shume")
        //res.send(foundFunction);
      }else{
        res.send(err);
      }
    })
});

/////////////////////////
// app.get("/articles", (req, res) => {
//   Article.find(function (err, foundArticles) {
//     if (err) return res.status(400).send(error.detail[0].message);
//     res.send(foundArticles);
//   });
// });
// /////////////////////
// app.post("/articles", function (req, res) {
//   const newArt = new Article({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     age: req.body.age,
//     city: req.body.String,
//   });

//   newArt.save(function (err) {
//     if (err) return res.status(400).send(error.detail[0].message);
//     res.send(newArt);
//   });
//   console.log(Array.toString(newArt));
// });

///////////////////////

// .put(function (req, res) {
  //   Article.updateOne(
  //     {_id: req.params.articles},
  //       {firstName: req.body.firstName,
  //       lastName: req.body.lastName,
  //       age: req.body.age,
  //       city: req.body.String},
  //       {overwrite: true},
  //     function(err){
  //     if (!err) {
  //       res.send("Successfully updated.");
  //     } else {
  //       res.send(err);
  //     }
  //     });
  // })

  // .patch(function(req,res){
  //   Article.update(
  //     {title:req,params},
  //     {$set : req.body},
  //     function(!err){
  //       res.send("Successfully updated");
  //     }else{
  //       res.send(err);
  //     }
  //   )
  // })

  ////////////////////////////////

// app.delete("/articles/:id", function (req, res) {
//   Article.deleteOne((err) => {
//     if (!err) {
//       res.send("OK");
//     } else {
//       res.send(err);
//       console.log(err);
//     }
//   });
// });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
