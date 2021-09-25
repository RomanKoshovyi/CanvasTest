let 
    start, end, step, y, Xtemp, Ytemp, temp, arr = Array(0),
    i1 = document.getElementById("i1"),
    i2 = document.getElementById("i2"),
    i3 = document.getElementById("i3"),
    out = document.getElementById("out"),
    ymin = document.getElementById("ymin"),
    ymax = document.getElementById("ymax"),
    xmin = document.getElementById("xmin"),
    xmax = document.getElementById("xmax"),
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    grad = ctx.createLinearGradient(0,0,500,0);

document.addEventListener('DOMContentLoaded', Clear());

function Clear(){
    i1.innerHTML = ""; i2.innerHTML = ""; i3.innerHTML = "";
    start = 0; end = 0; step = 0;
    out.innerHTML = "";
    xmin.innerHTML = ""; xmax.innerHTML = "";
    ymin.innerHTML = ""; ymax.innerHTML = "";

    ctx.clearRect(0,0,500,500);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0,250); ctx.lineTo(500, 250);
    ctx.moveTo(250,0); ctx.lineTo(250, 500);
    ctx.closePath();
    ctx.stroke();
}

function Run(){
    Clear();
    start = Number(document.getElementById("start").value);
    end = Number(document.getElementById("end").value);
    step = Number(document.getElementById("step").value);
    i1.innerHTML = "Start = " + start;
    i2.innerHTML = "End = " + end;
    i3.innerHTML = "Step = " + step;
    out.style.fontSize = String(out.clientWidth/20)+"px";
    for (let x = start; x <= end; x+=step){
        y = -Math.pow((Math.E), 2*(Math.pow(x, 2)))*Math.tan(Math.abs(2*x));
        out.innerHTML += "y("+x.toFixed(1)+") = " + y + "<br/>";
        arr.push(y);
    }
    Ytemp = Math.abs(arr[0]); i = 0;
    do{
        temp = arr[i];
        if (Math.abs(temp) > Ytemp) Ytemp = Math.abs(temp);
        i++;
    }while(i < arr.length);
    ymin.innerHTML = -Ytemp.toFixed(2);
    ymax.innerHTML = Ytemp.toFixed(2);
    if (Math.abs(start) > Math.abs(end)) {
        Xtemp = Math.abs(start);
    }
    else Xtemp = Math.abs(end);
    xmin.innerHTML = -Xtemp.toFixed(2);
    xmax.innerHTML = Xtemp.toFixed(2);
    graph();
}

function graph(){
    grad.addColorStop('0', 'red');
    grad.addColorStop('1', 'blue');
    ctx.fillStyle = grad;
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.lineWidth = 2;
    let x = 250, y = 250;
    while(arr.length>0){
        x = 250 + 250*(start/Xtemp);
        temp = arr.splice(0,1);
        y = 250 - 250*(temp/Ytemp);
        start+=step;
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}