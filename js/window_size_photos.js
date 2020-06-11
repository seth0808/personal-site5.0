var small_size = true;
var num_images = 11;
setInterval(function(){ 
    if (window.innerWidth < 700){
        if (small_size == false){
            $("#content").css("width", "350");
            $("h1").css("width", "350");
            $(".item").css("width", "330")
            $(".item").css("height", "250")
            $(".img_container").css("height", "150")
            $(".img_container").css("width", "270")
            $(".img_container").css("margin-left", "30")
            resize_all(false)
            small_size = true;
        }
    }else {
        if (small_size) {
            $("#content").css("width", "690");
            $("h1").css("width", "690");
            $(".item").css("width", "660")
            $(".item").css("height", "400")
            $(".img_container").css("height", "300")
            $(".img_container").css("width", "540")
            $(".img_container").css("margin-left", "60")
            resize_all(true)
            small_size = false;
        }
        
    }

}, 1000);

function resize_all(up){
    for (var i = 0; i < num_images; i++){
        $("#img" + (i + 1)).css("height", resize_image($("#img" + (i + 1)).css("height"), up))
        $("#img" + (i + 1)).css("margin-top", resize_image($("#img" + (i + 1)).css("margin-top"), up))
    }
}

function resize_image(current_size, up){
    var value = parseInt(current_size.substring(0, current_size.length - 2));
    if (up){
        value = value * 2;
    }else {
        value = value / 2;
    }
    return value + "px";
}
