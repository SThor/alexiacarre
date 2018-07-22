var canvas = {
  canvas:null,
  ctx:null,
  color_bg:"white",
  color_main:"black",
  padding:50,
  settings:{
    iterations:300,
    angle:(137.5*Math.PI/180)*1.0,
    goldenRatio:1.61803398875,
    radius:2
  },
  palette:[
    "#bbf67f",
    "#a6df86",
    "#91c88c",
    "#7bb093",
    "#669999"
    ],
  resizeCanvas : function() {
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight - grid.canvas.offsetTop;
    
    var minSide = Math.min(window.innerWidth,window.innerHeight);
    
    canvas.canvas.width = (4/5)*minSide;
    canvas.canvas.height = (4/5)*minSide;
    
    /**
     * Your drawings need to be inside this function otherwise they will be reset when
     * you resize the browser window and the canvas goes will be cleared.
     */
    canvas.drawStuff();
  },
  
  hexToRGB:function(hex){
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  },
  
  lerp:function(a,b,t){
    var color1 = canvas.hexToRGB(a);
    var color2 = canvas.hexToRGB(b);
    
    return "rgb("+((color1.r*t)+(color2.r*1-t))+","+((color1.g*t)+(color2.g*1-t))+","+((color1.b*t)+(color2.b*1-t))+")";
  },
  
  getRainbowColor:function(i, total){
    var frequency = 0.3;
    
    //value = Math.sin(frequency*increment)*amplitude + center;
    
    red   = Math.sin(frequency*i + 0) * 127 + 128;
    green = Math.sin(frequency*i + 2) * 127 + 128;
    blue  = Math.sin(frequency*i + 4) * 127 + 128;
    return "rgba("+red+","+green+","+blue+","+0.1+")";
  },
  
  drawStuff: function() {
    canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvas.ctx.clearRect(0,0,canvas.canvas.width,canvas.canvas.height);
    canvas.ctx.fillStyle = canvas.color_bg;
    canvas.ctx.fillRect(0,0,canvas.canvas.width,canvas.canvas.height);
    canvas.ctx.strokeStyle = canvas.color_main;
    canvas.ctx.translate(0.5+canvas.padding,0.5+canvas.padding);
    //canvas.ctx.strokeRect(0,0,canvas.canvas.width-1-2*canvas.padding,canvas.canvas.height-1-2*canvas.padding);
    
    canvas.ctx.setTransform(1,0,0,1,canvas.canvas.width/2,canvas.canvas.height/2);
    canvas.ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    var i,j;
    for(i=0;i<canvas.settings.iterations*10;i++){
      canvas.ctx.strokeStyle = "rgba(0, 0, 0, "+(0.5-i*0.0002)+")";
      //canvas.ctx.strokeStyle = canvas.lerp(canvas.palette[4],canvas.palette[0],(Math.sqrt(i)*canvas.settings.radius*1.5)/(Math.sqrt(canvas.settings.iterations*10)*canvas.settings.radius*1.5))
      canvas.ctx.beginPath();
      canvas.ctx.arc(0,Math.sqrt(i)*canvas.settings.radius*1.5,canvas.settings.radius,0,2*Math.PI);
      canvas.ctx.stroke();
      canvas.ctx.rotate(canvas.settings.angle);
    }
    for(i=0;i<canvas.settings.iterations;i++){
    canvas.ctx.strokeStyle = "rgba(0, 0, 0, "+10/i+")";
      canvas.ctx.beginPath();
      canvas.ctx.arc(0,Math.sqrt(i)*canvas.settings.radius*5,canvas.settings.radius,0,2*Math.PI);
      canvas.ctx.fillStyle="black";
      canvas.ctx.stroke();
      canvas.ctx.rotate(canvas.settings.angle);
    }
    /*canvas.ctx.beginPath();
    canvas.ctx.arc(0,0,Math.sqrt(i)*canvas.settings.radius*10,0,2*Math.PI);
    canvas.ctx.stroke();
    canvas.ctx.rotate(canvas.settings.angle);
    canvas.ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";*/
    for(i=0;i<canvas.settings.iterations/3;i++){
      canvas.ctx.strokeStyle = "rgba(0, 0, 0, "+0.002*i+")";
      //canvas.ctx.strokeStyle = canvas.getRainbowColor(i)
      //var color = canvas.hexToRGB(canvas.palette[i%5])
      //canvas.ctx.strokeStyle = "rgba("+color.r+","+color.g+","+color.b+","+0.2+")";
      canvas.ctx.beginPath();
      canvas.ctx.arc(0,Math.sqrt(i)*canvas.settings.radius,canvas.settings.radius*i,0,2*Math.PI);
      canvas.ctx.fillStyle="black";
      canvas.ctx.stroke();
      canvas.ctx.rotate(canvas.settings.angle);
    }
  }
};

canvas.canvas = document.getElementById('canvas');
canvas.ctx = canvas.canvas.getContext('2d');
window.addEventListener('resize', canvas.resizeCanvas, false);
canvas.resizeCanvas();