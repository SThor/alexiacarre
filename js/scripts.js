var canvas = {
  canvas:null,
  ctx:null,
  color_bg:"white",
  color_main:"black",
  padding:50,
  settings:{
    iterations:300,
    angle:137.5*Math.PI/180,
    goldenRatio:1.61803398875
  },
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
  
  drawStuff: function() {
    canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvas.ctx.clearRect(0,0,canvas.canvas.width,canvas.canvas.height);
    canvas.ctx.fillStyle = canvas.color_bg;
    canvas.ctx.fillRect(0,0,canvas.canvas.width,canvas.canvas.height);
    canvas.ctx.strokeStyle = canvas.color_main;
    canvas.ctx.translate(0.5+canvas.padding,0.5+canvas.padding);
    //canvas.ctx.strokeRect(0,0,canvas.canvas.width-1-2*canvas.padding,canvas.canvas.height-1-2*canvas.padding);
    
    canvas.ctx.setTransform(1,0,0,1,canvas.canvas.width/2,canvas.canvas.height/2);
    var i,j;
    for(i=0;i<canvas.settings.iterations;i++){
      canvas.ctx.beginPath();
      canvas.ctx.arc(0,Math.sqrt(i)*5,2,0,2*Math.PI);
      canvas.ctx.fillStyle="black";
      canvas.ctx.fill();
      canvas.ctx.rotate(canvas.settings.angle);
      //canvas.ctx.lineWidth = Math.log(i)
    }
    canvas.ctx.beginPath();
    canvas.ctx.arc(0,0,Math.log2(i*i)+i*canvas.settings.goldenRatio,0,2*Math.PI);
    canvas.ctx.stroke();
    canvas.ctx.rotate(canvas.settings.angle);
    
  }
};

canvas.canvas = document.getElementById('canvas');
canvas.ctx = canvas.canvas.getContext('2d');
window.addEventListener('resize', canvas.resizeCanvas, false);
canvas.resizeCanvas();