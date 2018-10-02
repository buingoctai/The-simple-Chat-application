var socket=io("http://localhost:3000");
socket.on("server-send-dki-thatbai",function(){
    alert("Co nguoi da dang ky roi");
});

socket.on("server-send-danhsach-Users",function(data){
    $("#boxContent").html("");
    data.forEach(function(i) {
       $("#boxContent").append("<div class='user'>"+i+ "</div>");
    });
});
socket.on("server-dki-thanhcong",function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});

socket.on("server-send-message",function(data){
    $("#listMessages").append("<div class='ms'>"+data.un+":"+data.nd+"</div>");
});


socket.on("server-gui-dau-hieu-dang-go",function(data){
    //$("#thongbao").html("");
    $("#thongbao").append(data.infor+" đang gõ chữ "+"<img width=50px src='typing.gif'>");
    
});

socket.on("server-send-stop-dau-hieu-go-chu",function(){
    $("#thongbao").html("");
});
$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();



    $("#btnRegister").click(function(){
        socket.emit("client-send-Username",$("#txtUsername").val());
    });
    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#chatForm").hide(2000);
        $("#loginForm").show(1000);
    });
    $("#bntSendMessage").click(function(){
        socket.emit("user-send-message",$("#txtMessage").val());
    });


    $("#txtMessage").focusin(function(){
        socket.emit("toi-dang-go-chu");
    });
    $("#txtMessage").focusout(function(){
        socket.emit("toi-da-dung-go-chu");
    });

});