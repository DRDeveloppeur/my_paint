var canvasFront = document.getElementById('front-canvas'),
    canvasBack = document.getElementById('back-canvas'),
    ctxf = canvasFront.getContext('2d'),
    ctxb = canvasBack.getContext('2d');

var canvasWidth = document.getElementById('canvas-width'),
    canvasHeight = document.getElementById('canvas-height');

var canvasPosition;

var mouseX, mouseY,
    mouseXl = document.getElementById('mouseX'),
    mouseYl = document.getElementById('mouseY');

var tools = [], size = [];

tools.pencil = document.getElementById('pencil');
tools.eraser = document.getElementById('eraser');
tools.line = document.getElementById('line');
tools.rectangle = document.getElementById('rectangle');
tools.circle = document.getElementById('circle');
tools.fillcircle = document.getElementById('fillcircle');
tools.fillrectangle = document.getElementById('fillrectangle');

size.small = document.getElementById('small');
size.middle = document.getElementById('middle');
size.big = document.getElementById('big');

var eraserSize = 8,
    eraserCursor = "url('images/eraserCursor.png')";

var canvasClear = document.getElementById('clear-canvas'),
    save = document.getElementById('save'),
    fileImg = document.getElementById('img-file'),
    properties = document.getElementById('properties'),
    imgWidth = document.getElementById('img-width'),
    imgHeight = document.getElementById('img-height');

var startX = 100, startY = 100;

window.onload = function () {
  canvasPosition = canvasBack.getBoundingClientRect();
}

canvasWidth.onchange = function () {
  canvasFront.width = canvasWidth.value;
  canvasBack.width = canvasWidth.value;
}

canvasHeight.onchange = function () {
  canvasFront.height = canvasHeight.value;
  canvasBack.height = canvasHeight.value;
}

canvasFront.onmousemove = function (e) {
  mouseX = e.clientX - canvasPosition.left;
  mouseY = e.clientY - canvasPosition.top;
  mouseXl.innerHTML = Math.ceil(mouseX);
  mouseYl.innerHTML = Math.ceil(mouseY);
}

canvasClear.onclick = function () {
  canvasBack.width = canvasBack.width;
  canvasFront.width = canvasFront.width;
}

addAllHAndlers(tools, "tool-active");
addAllHAndlers(size, "size-active");

function addAllHAndlers (arr, className) {
  for (var item in arr) {
    arr[item].onmousedown = addHandler(arr[item], arr, className);
  }
}

function addHandler(element, arr, className) {
  return function() {
    removeAllClasses(arr);
    element.setAttribute("class", className);
  }
}

function removeAllClasses(arr) {
  for(var item in arr) {
    arr[item].removeAttribute('class');
  }
}

size.small.onclick = function (e) {
  ctxb.lineWidth = 1;
  eraserSize = 8;
  ctxb.strokeStyle = e.srcElement.value;
  ctxb.fillStyle = e.srcElement.value;
  eraserCursor = "url('images/eraserCursor.png'), auto";
}

size.middle.onclick = function (e) {
  ctxb.lineWidth = 5;
  eraserSize = 16;
  ctxb.strokeStyle = e.srcElement.value;
  ctxb.fillStyle = e.srcElement.value;
  eraserCursor = "url('images/eraserCursor.png'), auto";
}

size.big.onclick = function (e) {
  ctxb.lineWidth = 15;
  eraserSize = 32;
  ctxb.strokeStyle = e.srcElement.value;
  ctxb.fillStyle = e.srcElement.value;
  eraserCursor = "url('images/eraserCursor.png'), auto";
}

var processing = false;
var operations = {};

operations['mousedown'] = function () {
};
operations['mouseup'] = function () {
};
operations['mousemove'] = function () {
};

canvasFront.addEventListener("mousedown", function () {
  operations['mousedown'](event);
});
canvasFront.addEventListener("mouseup", function () {
  operations['mouseup'](event);
});
canvasFront.addEventListener("mousemove", function () {
  operations['mousemove'](event);
});

save.onclick = function () {
   var image = canvasFront.toDataURL("image/png").replace("image/png", "image/octet-stream");
   window.location.href = image;
}

tools.pencil.onclick = function () {
  canvasFront.style.cursor = "url('images/cursor/cursor.cur'), auto";
  operations['mousedown'] = function () {
    processing = true;
    ctxb.beginPath();
  };
  operations['mousemove'] = function (e) {
    if (processing) {
      mouseX = e.clientX - canvasPosition.left;
      mouseY = e.clientY - canvasPosition.top;
      ctxb.lineTo(mouseX, mouseY);
      ctxb.stroke();
    };
  };
  operations['mouseup'] = function () {
    processing = false;
  };
};

tools.line.onclick = function () {
  canvasFront.style.cursor = "url('images/cursor/cursor.cur'), auto";
  var cp = 1;

  operations['mousedown'] = function (e) {
    if (cp == 1) {
      ctxb.beginPath();
      mouseX = e.clientX - canvasPosition.left;
      mouseY = e.clientY - canvasPosition.top;
      ctxb.moveTo(mouseX, mouseY);
    }
    operations['mouseup'] = function () {
      cp++;
      processing = false;
    }
    if (cp == 2) {
      mouseX = e.clientX - canvasPosition.left;
      mouseY = e.clientY - canvasPosition.top;
      ctxb.lineTo(mouseX, mouseY);
      ctxb.stroke();
      cp = 0;
    }
  }
}

tools.rectangle.onclick = function () {
  canvasFront.style.cursor = "url('images/cursor/cursor.cur'), auto";
	processing = false;
  var cp = 1;
	operations['mousedown'] = function (e) {
    processing = true;
    if (cp == 1) {
      ctxb.beginPath();
      x0 = e.clientX - canvasPosition.left;
      y0 = e.clientY - canvasPosition.top;
    }

    operations['mouseup'] = function () {
      cp++;
      processing = false;
    };
    if (cp == 2) {
      mouseX = e.clientX - canvasPosition.left;
      mouseY = e.clientY - canvasPosition.top;
      var x = Math.min(mouseX,	x0),
      y = Math.min(mouseY,	y0),
      w = Math.abs(mouseX - x0),
      h = Math.abs(mouseY - y0);
      ctxb.strokeRect(x, y, w, h);
      cp = 0;
    }
	};
  operations['mousemove'] = function () {}
};

tools.fillrectangle.onclick = function () {
  canvasFront.style.cursor = "url('images/cursor/cursor.cur'), auto";
	processing = false;
  var cp = 1;
	operations['mousedown'] = function (e) {
    processing = true;
    if (cp == 1) {
      ctxb.beginPath();
      x0 = e.clientX - canvasPosition.left;
      y0 = e.clientY - canvasPosition.top;
    }

    operations['mouseup'] = function () {
      cp++;
      processing = false;
    };
    if (cp == 2) {
      mouseX = e.clientX - canvasPosition.left;
      mouseY = e.clientY - canvasPosition.top;
      var x = Math.min(mouseX,	x0),
      y = Math.min(mouseY,	y0),
      w = Math.abs(mouseX - x0),
      h = Math.abs(mouseY - y0);
      ctxb.fillRect(x, y, w, h);
      cp = 0;
    }
	};
  operations['mousemove'] = function () {}
};

tools.circle.onclick = function () {
  canvasFront.style.cursor = "url('images/cursor/cursor.cur'), auto";
	processing = false;
  var cp = 1;
	operations['mousedown'] = function (e) {
    processing = true;
    if (cp == 1) {
      ctxb.beginPath();
      x0 = e.clientX - canvasPosition.left;
      y0 = e.clientY - canvasPosition.top;
    }

    operations['mouseup'] = function () {
      cp++;
      processing = false;
    };
    if (cp == 2) {
      mouseX = e.clientX - canvasPosition.left;
      mouseY = e.clientY - canvasPosition.top;
      var radius = Math.sqrt(Math.pow((x0 - mouseX), 2) + Math.pow((y0 - mouseY), 2));
      ctxb.arc(x0, y0, radius, 0, 2 * Math.PI, false);
      ctxb.stroke();
      cp = 0;
    }
	};
  operations['mousemove'] = function () {}
};

tools.fillcircle.onclick = function () {
  canvasFront.style.cursor = "url('images/cursor/cursor.cur'), auto";
	processing = false;
  var cp = 1;
	operations['mousedown'] = function (e) {
    processing = true;
    if (cp == 1) {
      ctxb.beginPath();
      x0 = e.clientX - canvasPosition.left;
      y0 = e.clientY - canvasPosition.top;
    }

    operations['mouseup'] = function () {
      cp++;
      processing = false;
    };
    if (cp == 2) {
      mouseX = e.clientX - canvasPosition.left;
      mouseY = e.clientY - canvasPosition.top;
      var radius = Math.sqrt(Math.pow((x0 - mouseX), 2) + Math.pow((y0 - mouseY), 2));
      ctxb.arc(x0, y0, radius, 0, 2 * Math.PI, false);
      ctxb.fill();
      cp = 0;
    }
	};
  operations['mousemove'] = function () {}
};

tools.eraser.onclick = function () {
  canvasFront.style.cursor = "url('images/cursor/cursor.cur'), auto";
  operations['mousedown'] = function () {
    processing = true;
  }
  operations['mousemove'] = function () {
    canvasFront.style.cursor = eraserCursor;
    if (processing) {
      ctxb.clearRect(mouseX, mouseY, eraserSize, eraserSize);
    };
  };
  operations['mouseup'] = function () {
    processing = false;
  }
};

 color.onchange = function (e) {
  ctxb.strokeStyle = e.srcElement.value;
  ctxb.fillStyle = e.srcElement.value;
 }

fileImg.onchange = function () {
  var file = fileImg.files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    var dataUri = event.target.result;
    img = new Image();
    img.onload = function () {
      ctxb.strokeRect(startX, startY, img.width, img.height);
      ctxb.drawImage(img, startX, startY);
      operations['mousemove'] = function () {
        if (processing) {
          canvasFront.width = canvasFront.width;
          ctxb.strokeRect(mouseX, mouseY, imgWidth.value, imgHeight.value);
          ctxb.drawImage(img, mouseX, mouseY, imgWidth.value, imgHeight.value);
        };
      };
      operations['mouseup'] = function () {
        properties.style.display = 'none';
        canvasFront.width = canvasFront.width;
        processing = false;
        ctxb.drawImage(img, mouseX, mouseY, imgWidth.value, imgHeight.value);
        operations['mousemove'] = undefined;
        operations['mouseup'] = function () {
          processing = false;
        };
      };
    };
    img.src = dataUri;
    properties.style.display = "block";
    imgWidth.value = img.width;
    imgHeight.value = img.height;
  };
  reader.readAsDataURL(file);
}

imgWidth.addEventListener("change", changeImgSize);
imgHeight.addEventListener("change", changeImgSize);

function changeImgSize() {
  canvasFront.width = canvasFront.width;
  ctxb.strokeRect(startX, startY, imgWidth.value, imgHeight.value)
  ctxb.drawImage(img, startX, startY, imgWidth.value, imgHeight.value);
}

invert.onclick = function () {
  var imageData = ctxb.getImageData(startX, startY, imgWidth.value, imgHeight.value);
  for (var i = 0; i < imageData.length; i+=4) {
    for (var j = i; j < i + 3; j++) {
      imageData.data[j] = 255 - imageData.data[j];
    }
  }
  ctxb.putImageData(imageData, startX, startY);
};
