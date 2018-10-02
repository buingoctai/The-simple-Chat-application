var count=0;
var express=require("express");
var app=express();

app.use(express.static("public"));

app.set("view engine","ejs");
app.set("views","./views");

var server=require("http").Server(app);
var io=require("socket.io")(server);
server.listen(3000);

var mangUsers=["AAA"];

io.on("connection",function(socket){
    console.log("co nguoi ket noi"+socket.id);
    socket.on("client-send-Username",function(data){
        if(mangUsers.indexOf(data)>=0){
            //tra ve dang ky that bai
             socket.emit("server-send-dki-thatbai");

        }else{//dang ky thanh cong
            mangUsers.push(data);

            socket.Username=data;
            socket.emit("server-dki-thanhcong",data)
            io.sockets.emit("server-send-danhsach-Users",mangUsers);
        }
    });

    socket.on("logout",function(){
        mangUsers.splice(mangUsers.indexOf(socket.Username),1);
        socket.broadcast.emit("server-send-stop-dau-hieu-go-chu");
        socket.broadcast.emit("server-send-danhsach-Users",mangUsers);
    
    });
    socket.on("user-send-message",function(data){
       
        io.sockets.emit("server-send-message",{un:socket.Username,nd:data});
    });

    socket.on("toi-dang-go-chu",function(){
        console.log("dang go chu");
        var s=socket.Username;
        console.log(s);
        socket.broadcast.emit("server-gui-dau-hieu-dang-go",{infor:s,UserArray:mangUsers});
    });

    socket.on("toi-da-dung-go-chu",function(){
        socket.broadcast.emit("server-send-stop-dau-hieu-go-chu");
    });
    socket.on("disconnect",function(){
        socket.broadcast.emit("server-send-stop-dau-hieu-go-chu");
    });
});  


app.get("/",function(req,res){
    res.render("trangchu.ejs");
});