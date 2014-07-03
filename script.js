$(function() {
  var LINE_NUM = 30;
  var CELL_SIZE = 25;
  var BOX_SIZE = 27;
  var CELL_NUM = LINE_NUM * CELL_SIZE;
  var SPEED = 100;

  var canvas = document.getElementById("lifegame");
  if (!canvas || !canvas.getContext) return;

  var board = canvas.getContext("2d");
  var line_list = new Array

  make_board();
  work();

  $("#normal").on("click", normal);

  function make_board() {
    board.strokeStyle = "#660000"
    board.fillStyle = "#663366"
    for (var y=0; y<LINE_NUM; ++y) {
      line_list.push(new Array);
      for (var x=0; x<LINE_NUM; ++x)
        board.strokeRect(1+x*(BOX_SIZE+2), 1+y*(BOX_SIZE+2), BOX_SIZE, BOX_SIZE);
    }
    board.globalAlpha = 0.6;
  }


  var timer;
  function work() {
    normal();
    $("#action").on("click", function() {
      var act = $(this);
      if (act.html() == "Run") {
        act.html("Stop");
        timer = setInterval(run, SPEED);
      } else if (act.html() == "Stop") {
        act.html("Run");
        clearInterval(timer);
      }
    });
  }

  function normal() {
    clear();
    for (var y=0; y<LINE_NUM; ++y) {
      line_list[y] = [];
      for (var x=0; x<LINE_NUM; ++x) {
        if (Math.random() < 0.5)
          line_list[y].push(false)
        else
          line_list[y].push(new Object( {x: 2+x*(CELL_SIZE+4), y: 2+y*(CELL_SIZE+4)} ));
      }
    }
    draw();
  }

  function clear() {
    for (var y=0; y<LINE_NUM; ++y) {
      for (var x=0; x<LINE_NUM; ++x)
        board.clearRect(2+x*(CELL_SIZE+4), 2+y*(CELL_SIZE+4), CELL_SIZE, CELL_SIZE);  
    }
  }

  function move() {
    clear();

    var neighbor = 0;
    var list_instanse = new Array;
    function check(place) {
      if (place != false) neighbor++;
    }

    for (var y=0; y<LINE_NUM; ++y) {
      list_instanse.push(new Array);
      for (var x=0; x<LINE_NUM; ++x) {
        if (y!=0) {
          check(line_list[y-1][x]);
          if (x!=0)      check(line_list[y-1][x-1]);
          if (x!=LINE_NUM-1) check(line_list[y-1][x+1]);
        }

        if (x!=0 ) check(line_list[y][x-1]);
        if (x!=LINE_NUM-1) check(line_list[y][x+1]);

        if (y!=LINE_NUM-1) {
          check(line_list[y+1][x]);
          if (x!=0)     check(line_list[y+1][x-1]);
          if (x!=LINE_NUM-1) check(line_list[y+1][x+1]);
        }
        if (neighbor<2 || neighbor>3)
          list_instanse[y][x] = false;
        else
          list_instanse[y][x] = line_list[y][x];
        if (neighbor == 3)
          list_instanse[y][x] = new Object( {x: 2+x*(CELL_SIZE+4), y: 2+y*(CELL_SIZE+4)} );
        neighbor = 0;
      }
    }
    line_list = list_instanse;
  }

  function draw() {
    line_list.forEach(function(line) {
      line.forEach(function(cell) {
        if (cell != false)
          board.fillRect(cell.x, cell.y, CELL_SIZE, CELL_SIZE);  
      });
    });
  }

  function run(act) {
    move();
    draw();
  }
});

