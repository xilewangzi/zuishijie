var express = require('express');
var app = express();
app.use(express.static("public"));
app.use(express.static("data"));
app.get("/",function(req,res){
  res.set("Content-Type","text/html;charset=utf-8");
  res.sendFile(__dirname+"/views/home.html")
});
app.get("/cityWalk",function(req,res){
  res.set("Content-Type","text/html;charset=utf-8");
  res.sendFile(__dirname+"/views/cityWalk.html")
});
app.get("/foot",function(req,res){
    res.set("Content-Type","text/html");
    res.sendFile(__dirname+"/views/foot1.html");
});
app.get("/font",function(req,res){
    res.set("Content-Type","text/html");
    res.sendFile(__dirname+"/views/foot2.html");
})
var server = app.listen(8082,function(){
  console.log("启动服务,端口号：8082");
});