// Canvas Setup //
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
// End Canvas Setup //

class Ball {
    constructor(position){
        this.x = position[0];
        this.y = position[1];
        this.radius = 0.1;
        this.gen_velocity();
        this.start_flag = true;
        this.end_radius = Math.random() * 10;
    }

    gen_velocity(){

        if (Math.random() < 0.5){
            this.y_vel = Math.random() * 5;
        }else {
            this.y_vel = Math.random() * -5;
        }
        
        if (Math.random() < 0.5){
            this.x_vel = Math.random() * 5;
        }else {
            this.x_vel = Math.random() * -5;
        }

    }

    collision() {
        if (this.x + 100 < 0 || this.x - 100 > window.innerWidth || this.y + 100 < 0 || this.y - 100 > window.innerHeight){
            this.radius = 0;
            this.gen_velocity();
            var position = random_start();
            this.x = position[0];
            this.y = position[1];
            this.start_flag = true;
        }
    }

    move(){
        this.x += this.x_vel;
        this.y += this.y_vel;
        this.collision();
    }

    draw(){
        if (this.start_flag){
            this.radius += 0.1;
            c.beginPath();
            c.shadowColor = 'rgb(100,100,100)';
            c.shadowBlur = 5;
            c.shadowOffsetX = 7;
            c.shadowOffsetY = 7;
            //   (x, y, r, sAngle, eAngle, cc)
            c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            c.fillStyle = 'rgb(0, 0, 0)';
            c.strokeStyle = 'rgba(0,0,0)';
            c.fill();
            c.stroke();
            if (this.radius > this.end_radius){
                this.start_flag = false;
            }
        }else{
            this.move();
            c.beginPath();
            c.shadowColor = 'rgb(100,100,100)';
            c.shadowBlur = 5;
            c.shadowOffsetX = 7;
            c.shadowOffsetY = 7;
            //   (x, y, r, sAngle, eAngle, cc)
            c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            c.fillStyle = 'rgb(0, 0, 0)';
            c.strokeStyle = 'rgba(50,50,50)';
            c.fill();
            c.stroke();
        }
        
    }
}

class Line {
    constructor(){
        this.lines = [];
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight

        this.random_var_x = Math.random()
        this.random_var_y = Math.random()
    }

    draw() {   
        var new_x = 0;
        if (Math.random() < this.random_var_x){
            new_x = this.x + Math.random() * 3;
        }else{
            new_x = this.x - Math.random() * 3;
        }

        var new_y = 0;
        if (Math.random() < this.random_var_y){
            new_y = this.y + Math.random() * 3;
        }else{
            new_y = this.y - Math.random() * 3;
        }

        if (new_x < 0 || new_x > window.innerWidth || new_y < 0 || new_y > window.innerHeight){
            this.x = Math.random() * window.innerWidth
            this.y = Math.random() * window.innerHeight
            this.random_var_x = Math.random()
            this.random_var_y = Math.random()
            this.lines = [];
        }else {
            this.lines.push([this.x, this.y, new_x, new_y])
            this.x = new_x;
            this.y = new_y;
        }
        
        
        for (var i=0; i < this.lines.length; i++){
            c.beginPath()

            c.strokeStyle = 'rgb(0,0,0)';
            c.moveTo(this.lines[i][0],this.lines[i][1]);
            c.lineTo(this.lines[i][2], this.lines[i][3]);
            c.stroke()
            c.closePath()
        }
    }
}

class Box {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 25;
        this.color_flag = false;

        this.r = 240;
        this.g = 240;
        this.b = 240;

        this.increasing = false;
    }

    change_color(){
        if (this.color_flag == false){
            this.color_flag = true;
            this.increasing = false;
        }
    }

    draw(){
        if (this.color_flag){
            if (this.increasing){
                this.r +=1;
                this.g +=1;
                this.b +=1;
                if (this.r == 240){
                    this.color_flag = false;
                }
            }else{
                this.r -=1;
                this.g -=1;
                this.b -=1;
                if (this.r == 0){
                    this.increasing = true;
                }
            }
        }
        c.shadowColor = 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
        c.shadowBlur = 3;
        c.shadowOffsetX = 1;
        c.shadowOffsetY = 1;
  
        c.fillStyle = 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
        c.fillRect(this.x, this.y, this.width, this.width);
    }
}

class Boxes {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.boxes = []
        for (var i = 0; i < 10; i++){
            for (var j = 0; j < 10; j++){
                this.boxes.push(new Box_4(x + i * 10,y + j * 10, x + 50, y + 50));
            }
        }
    }

    draw() {
        for (var i=0; i < this.boxes.length; i++){
            this.boxes[i].draw();
        }
    }
            
}
        

class Box_4 {
    constructor(x, y, center_x, center_y){
        this.x = x;
        this.y = y;
        this.width = 10;
        this.color_flag = false;

        this.r = 10;
        this.g = 10;
        this.b = 10;

        this.x_vel = 0;
        this.y_vel = 0;
        this.x_acc = 0;
        this.y_acc = 0;

        this.timer = 0;

        this.x_change = this.x - center_x
        this.y_change = this.y - center_y
    }

    handle_one(){
        if (this.timer <= 300){
            this.x_acc = this.x_change / 5000;
            this.y_acc = this.y_change  / 5000;
        }else if(this.timer <= 900){
            this.x_acc =  this.x_change  / -5000;
            this.y_acc =  this.y_change / -5000;
        }else if (this.timer <= 1200){
            this.x_acc = this.x_change  / 5000;
            this.y_acc = this.y_change / 5000;
        }else {
            this.x_acc = 0;
            this.y_acc = 0;
        }
        

    }

    move(){
        this.x += this.x_vel;
        this.y += this.y_vel;

        this.x_vel += this.x_acc;
        this.y_vel += this.y_acc;
    }

    draw(){
        this.timer += 1;
        this.handle_one()
        if (this.timer > 1200) {
            this.timer = 0;
        }

        this.move()

        c.shadowColor = 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
        c.shadowBlur = 3;
        c.shadowOffsetX = 1;
        c.shadowOffsetY = 1;
  
        c.fillStyle = 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
        c.fillRect(this.x, this.y, this.width, this.width);
    }
}

class Box_5 {
    constructor(level, x, y){
        this.x = x;
        this.y = y;
        this.width = 20;
        this.level = level

        this.y_vel = 1;
        this.y_acc = 1;

        this.collided = false;

    }

    collision(){
        
        if (this.y + this.width > window_height - (this.level * this.width)){
            this.y = window_height - ((this.level+1) * this.width);
            this.collided = true;
        }
        
    }

    move(){
        this.y += this.y_vel;
        this.collision();
        
    }

    draw(){
        if (this.collided == false){
            this.move();
        }else {
            if (this.y < 0){
                boxes = [];
            }
        }
        c.shadowColor = 'rgb(0,0,0)';
        c.shadowBlur = 3;
        c.shadowOffsetX = 1;
        c.shadowOffsetY = 1;
  
        c.fillStyle = 'rgb(50,50,50)';
        c.fillRect(this.x, this.y, this.width, this.width);
    }
}

//Canvas 0
var boxes = []
var timer = 0;

function animate() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    requestAnimationFrame(animate);
    for (var i=0; i < boxes.length; i++){
        boxes[i].draw();
    }
    timer += 1;
    if (timer == 25){
        boxes[Math.floor(Math.random() * boxes.length)].change_color();
        timer = 0;
    }  
}


//Canvas 1
var balls = []

function random_start(){
    return [Math.random() * window.innerWidth, Math.random() * window.innerHeight];
}

function animate_1() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    requestAnimationFrame(animate_1);

    for (var i=0; i < balls.length; i++){
        balls[i].draw();
    }   
}    

//Canvas 2

var line = new Line();
var flag = true;

function animate_2() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    requestAnimationFrame(animate_2);
    line.draw() 
}    

//Canvas 3
var cluster = [new Boxes(window.innerWidth/2 + 100, window.innerHeight/2 + 100), new Boxes(window.innerWidth/2 - 200, window.innerHeight/2 + 100), new Boxes(window.innerWidth/2 + 100, window.innerHeight/2 - 200), new Boxes(window.innerWidth/2 - 200, window.innerHeight/2 - 200)];

function animate_3() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    requestAnimationFrame(animate_3);
    for (var i =0; i < cluster.length; i++){
        cluster[i].draw();
    }
}

//Canvas 4

var box_width = window.innerWidth / 30 + 5
var window_height = window.innerHeight;
var level = 1;

function animate_4() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    requestAnimationFrame(animate_4);
    if (boxes == []){
        level = 0;
    }
    if (timer > 500) {
        for (var i = 0; i < box_width; i ++){
            boxes.push(new Box_5(level, i * 30, Math.random() * -500 - 100));
            
        }
        level +=1;
        timer = 0;
    }
    for (var i = 0; i < boxes.length; i++){
        boxes[i].draw();
    }
    timer += 1;
}


var random_num = Math.floor(Math.random() * 5)
if (random_num == 0){
    for (var i = 0; i < 35; i++){
        for (var j = 0; j < 35; j++){
            boxes.push(new Box(i * 50, j * 50));
        }
    }
    animate()
}else if (random_num == 1){
    for (var i = 0; i < 50; i++){
        balls.push(new Ball(random_start()));
    }
    animate_1()
}else if (random_num == 2){    
    animate_2()
}else if (random_num == 3){
    animate_3()
}else {
    for (var i = 0; i < box_width; i ++){
        boxes.push(new Box(0, i * 30, Math.random() * -500 - 10));
    }
    animate_4()
}



    



