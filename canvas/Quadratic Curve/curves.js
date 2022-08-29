var canvas,
  ctx,
  code,
  point,
  style,
  drag = null,
  dPoint;

// 初始化
function Init(quadratic) {
  point = {
    p1: { x: 100, y: 250 },
    p2: { x: 400, y: 250 },
  };

  if (!quadratic) {
    point.cp1 = { x: 250, y: 100 };
  } else {
    point.cp1 = { x: 150, y: 100 };
    point.cp2 = { x: 350, y: 100 };
  }

  style = {
    curve: { width: 6, color: "#333" }, //曲线
    cpline: { width: 1, color: "#C00" }, //线
    point: {
      //圆圈
      radius: 10,
      width: 2,
      color: "#900",
      fill: "rgba(200,200,200,0.5)",
    },
  };

  // 线型默认值
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // event handlers
  canvas.onmousedown = DragStart;
  canvas.onmousemove = Dragging;
  canvas.onmouseup = canvas.onmouseout = DragEnd;

  DrawCanvas();
}

function DrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 控制线
  ctx.lineWidth = style.cpline.width;
  ctx.strokeStyle = style.cpline.color;
  ctx.beginPath();
  ctx.moveTo(point.p1.x, point.p1.y);
  ctx.lineTo(point.cp1.x, point.cp1.y);
  if (checked) {
    ctx.moveTo(point.p2.x, point.p2.y);
    ctx.lineTo(point.cp2.x, point.cp2.y);
  } else {
    ctx.lineTo(point.p2.x, point.p2.y);
  }
  ctx.stroke();

  // 曲线
  ctx.lineWidth = style.curve.width;
  ctx.strokeStyle = style.curve.color;
  ctx.beginPath();
  ctx.moveTo(point.p1.x, point.p1.y);
  if (checked) {
    ctx.bezierCurveTo(
      point.cp1.x,
      point.cp1.y,
      point.cp2.x,
      point.cp2.y,
      point.p2.x,
      point.p2.y
    );
  } else {
    ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p2.x, point.p2.y);
  }
  ctx.stroke();

  // 控制点
  for (let p in point) {
    ctx.beginPath();
    ctx.lineWidth = style.point.width;
    ctx.strokeStyle = style.point.color;
    ctx.fillStyle = style.point.fill;
    ctx.arc(point[p].x, point[p].y, style.point.radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
  }
  ShowCode();
}

function ShowCode() {
  if (code) {
    if (checked) {
      code.firstChild.nodeValue = `
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d")
        ctx.lineWidth = '${style.curve.width}';
        ctx.strokeStyle = '${style.curve.color}';
        ctx.beginPath();
        ctx.moveTo(${point.p1.x},${point.p1.y}); 
        ctx.bezierCurveTo(${point.cp1.x},${point.cp1.y},${point.cp2.x},${point.cp2.y},${point.p2.x},${point.p2.y});
        ctx.stroke();`;
    } else {
      code.firstChild.nodeValue = `
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d")
        ctx.lineWidth = '${style.curve.width}';
        ctx.strokeStyle = '${style.curve.color}';
        ctx.beginPath();
        ctx.moveTo(${point.p1.x},${point.p1.y}); 
        ctx.bezierCurveTo(${point.cp1.x},${point.cp1.y},${point.p2.x},${point.p2.y});
        ctx.stroke();`;
    }
  }
}

function DragStart(e) {
  e = MousePos(e);
  let dx, dy;
  for (let p in point) {
    dx = point[p].x - e.x;
    dy = point[p].y - e.y;
    //判断鼠标是否在圆圈内
    if (dx ** 2 + dy ** 2 < style.point.radius ** 2) {
      drag = p;
      dPoint = e;
      canvas.style.cursor = "move";
      return;
    }
  }
}

function Dragging(e) {
  if (drag) {
    e = MousePos(e);
    point[drag].x += e.x - dPoint.x;
    point[drag].y += e.y - dPoint.y;
    dPoint = e;
    DrawCanvas();
  }
}

function DragEnd() {
  drag = null;
  canvas.style.cursor = "default";
  DrawCanvas();
}

function MousePos(event) {
  event = event ? event : window.event;
  return {
    x: event.pageX - canvas.offsetLeft,
    y: event.pageY - canvas.offsetTop,
  };
}

// main__start
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
checkbox = document.querySelector("#checkbox");
code = document.getElementById("code");

let checked = false;
Init(checked);
checkbox.addEventListener("change", function () {
  checked = checkbox.checked;
  Init(checked);
});
