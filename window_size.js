setInterval(function(){ 

    if (window.innerWidth < 700){
        $("#content").css("width", "350");
        $("h1").css("width", "350");
    }else {
        $("#content").css("width", "690");
        $("h1").css("width", "690");
    }

}, 3000);
