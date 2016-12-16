


var colors = ["#a63251", "#010540", "#65a6bf", "#f2d9ba","#f2695c","#5e6083","#a63251", "#010540", "#65a6bf", "#f2d9ba","#f2695c","#5e6083","#a63251", "#010540", "#65a6bf", "#f2d9ba","#f2695c","#5e6083","#a63251", "#010540", "#65a6bf", "#f2d9ba","#f2695c","#5e6083"]
var outerRowMama, lrgHead, ourDescription,alldescriptions=[];

window.onload = function(){
  DrawData(people)
};



function DrawData(data) {

  //loop through all objects in the json
  for (var i in data){

    //create a div for each image, give it the class so it gets styled from the css
    outerRowMama = document.getElementById('Mama')
    outerRowMama.style.position = 'relative'
    var firstChild = document.createElement('div')
    firstChild.className = "col-sm-2";
    firstChild.className += " first-child";
    var PortfolioItem = document.createElement('div')
    PortfolioItem.className = "portfolio-item";
    PortfolioItem.style.backgroundImage = "url("+data[i].url+")"
    PortfolioItem.className += " inside";
    firstChild.appendChild(PortfolioItem)
    outerRowMama.appendChild(firstChild);
    PortfolioItem.id = i


    var string = "'"+ data[i].info+ "'"
    var newstring =  string.replace(/99/g, "<span class= 'big'>");
    var newstring2 =  newstring.replace(/98/g, "</span>");


    //create a div for the info of that person
    var divdescr = document.createElement('div');
    divdescr.innerHTML =  '<strong>'+ data[i].position + '</strong><br>' + data[i].name ;
    alldescriptions.push(newstring2)
    // divdescr.innerHTML =  '<strong>'+ data[i].position + '</strong><br>' + data[i].name +  '<br>'+ newstring2;
    divdescr.className = "description";
    divdescr.style.color = colors[i%colors.length];
    divdescr.style.display = "none"
    divdescr.id='descr0'+i
    outerRowMama.appendChild(divdescr);

    // hero image
    lrgHead = document.createElement('div');
    outerRowMama.appendChild(lrgHead);
    lrgHead.className = 'lrgHead col-sm-4'

    ourDescription = document.getElementById('our-description');
    ourDescription.innerHTML = newstring2








    var elems = $('.inside');
    var texts = $('.description');
    // //if any image is rolled over
    elems.on('mouseenter', function(e) {
    var num = this.id
        for (var i in people){
          if (i != num){
            $('#descr0'+i).fadeOut(10)
          } else {

            $('#descr0'+i).fadeIn()
          }

        }

    });





} //for loop over

$('#clear-button').click(function(e){
  console.log('clear was clicked')
  lrgHead.style.backgroundImage = ''
  $('#mainBox').removeClass('grey-border')
  $('#videoBox').fadeOut()
  $('#clear-button').hide();
  $("#our-description").hide();


})

$('.portfolio-item').click(function(e){
  lrgHead.style.backgroundImage = e.target.style.backgroundImage
  $("#our-description").show()
  $("#our-description").html(alldescriptions[e.target.id])
  console.log(colors[e.target.id])
  document.getElementById('our-description').style.color = colors[e.target.id]

  $('#mainBox').addClass('grey-border')
  videoRequest(e.target.id)
});


} //function over





function videoRequest(num){
  $('#videoBox').fadeIn()
  $('#clear-button').show();

  var videString = Tempdata.response.docs[Math.floor(Math.random()*10)].identifier
  console.log(people[num].video)
  // document.getElementById('videoBox').src="https://archive.org/embed/"+videString;
  document.getElementById('videoBox').src=people[num].video;

  //parse this string with dynamic parameters
  // var jsonURL = "https://archive.org/advancedsearch.php?q=%28format%3AMPEG4+OR+format%3Ah.264%29+AND+something&fl%5B%5D=identifier&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json"
  // $.ajax({
  //   url: jsonURL,
  //   type: 'GET',
  //   dataType: 'json'
  // }).done(function(data) {
  //   //parse the results from here and get the first identifier string,
  //   //push a new iframe element to the page
  //   //http://archive.org/embed/IDENTIFIER
  //   //<iframe src="https://archive.org/embed/commute" width="640" height="480" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>`
  //   console.log(data)
  // });
}
