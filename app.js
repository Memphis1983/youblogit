//jshint esversion:6
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const Post = require("./models/Post");
const User = require("./models/User");

require("dotenv").config({ path: "./config/.env" });

connectDB();

const homeStartingContent = "Welcome to your Blog.";
const aboutContent = "Create your own blogs and share it.";
const contactContent =
  "Contact us if you like a new feature to be added or for any queries.";

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { about: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contact: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/posts/:postId", async (req, res) => {
  try {
    const post = await Post.find({ _id: req.params.postId });
    res.render("post.ejs", {
      title: post[0].title,
      content: post[0].content,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/compose", async (req, res) => {
  try {
    await Post.create({ title: req.body.title, content: req.body.content });
    console.log("Post has been added");
    // console.log(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
