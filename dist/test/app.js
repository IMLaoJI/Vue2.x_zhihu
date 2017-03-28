/*
* @Author: LONG
* @Date:   2017-03-20 18:16:06
* @Last Modified by:   LONG
* @Last Modified time: 2017-03-23 21:19:29
*/

var express = require("express");
var app = express();
var router = require("./router/routes.js");

app.set("view engine", "ejs");

//静态页面
app.use(express.static("./public"));
 
 app.get("/vue", router.showvue); //显示首页

 app.listen(3500);
console.log("监听3500");