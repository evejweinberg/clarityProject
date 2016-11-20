
//some test numbers that will get replaced
var totalNum = [1,2,3,4,5,6];
var q1Results=['', '', 'the place where', 'not sure yet still deciding', "googles traffic data", 'suuuuuuuuuuup long words', 'goverment free data', 'five thiry eight','internet', 'nyc.gov', 'the place where','internet', 'nyc.gov', '','','','','']
var q2Answers=[1,1,1,1,0,1,0,1,0,1,0,1,1,0,1,0]
var q2Results=[8,8]
var q3Answers=[1,1,1,1,0,1,0,1,0,1,0,1,1,0,1,0]
var q4Answers=[0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0] //quiz right or wrong
var q4Results=[8,8]
var q5Answers=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var q5Radius= [160,140,10,160,100,160,160,160,160,160,160,160,160,160,160,160]
var q6Answers=[9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9] //how tired
var eyeoffset = 60
var pupilRad = 60
var eyeBagPullMax = 100;
var bagPull,tiredAvg,q2D3,q2CJS, mouthpull;
var angle = 0


//----------calculate results//-----------//
tiredAvg = getAvg(q6Answers)

q5Radius = q5Answers.map(function(x){return (x/10)*150})



var graphics = []; // will hold each rectangle visualization
var dims;
var colors = []
var questions = ['Where did you get \nyour data for the \nmidterm from?', 'Did you use \n javascript before ITP?', 'Would you rather learn D3 or ChartJS?', 'Favorite Event Handler?', 'How well do you \nknow javascript?','How tired are you?']

var total = 6;

window.addEventListener("load", init);
window.addEventListener("resize", checkSizes);


for (i in totalNum){
// document.getElementById('"box'+ i+'"').addEventListener("click", Run+i, false);

  document.getElementById("box0").addEventListener("click", Run0, false);
  document.getElementById("box1").addEventListener("click", Run1, false);
  document.getElementById("box2").addEventListener("click", Run2, false);
  document.getElementById("box3").addEventListener("click", Run3, false);
  document.getElementById("box4").addEventListener("click", Run4, false);
  document.getElementById("box5").addEventListener("click", Run5, false);
}

function init(){
}

function checkSizes(){
  // resizze all javascript boxes but not p5 boxes
  var t = $(window).height()/2
  $(".box").height(t);
  $(".box > p").height(t*.7)
}



function Run0(){
  $('#box0 > p').fadeOut();
  $('#box0').css("background-color", "transparent")
  graphics[0].started=true
}

function Run1(){
  $('#box1 > p').fadeOut()
  $('#box1').css("background-color", "transparent")
  graphics[1].started=true

}

function Run2(){
  $('#box2 > p').fadeOut()
  $('#box2').css("background-color", "transparent")
  graphics[2].started=true

}

function Run3(){
  $('#box3 > p').fadeOut()
  $('#box3').css("background-color", "transparent")
    graphics[3].started=true

}

function Run4(){
  $('#box4 > p').fadeOut()
  $('#box4').css("background-color", "transparent")
    graphics[4].started=true
}

function Run5(){
  $('#box5 > p').fadeOut()
  $('#box5').css("background-color", "transparent")
    graphics[5].started=true
}


function getAvg(arrayInput){
  var sum = arrayInput.reduce(function(a, b) { return a + b; });
  console.log(sum)
  var avg = sum / arrayInput.length;
console.log(sum)
  return avg
}
