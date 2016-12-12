


var colors = ["#a63251", "#010540", "#65a6bf", "#f2d9ba","#f2695c","#5e6083"]


window.onload = function(){
  DrawData(people)
};



function DrawData(data) {

  //loop through all objects in the json
  for (var i in data){

    //create a div for each image, give it the class so it gets styled from the css
    var outerRowMama = document.getElementById('Mama')
    var firstChild = document.createElement('div')
    firstChild.className = "col-sm-2";
    firstChild.className += " first-child";
    var PortfolioItem = document.createElement('div')
    PortfolioItem.className = "portfolio-item";
    // PortfolioItem.className = "col-xs-2";
    // PortfolioItem.className += " tight-grid";
    // divColumn.appendChild(PortfolioItem)
    //add it ot the body
    firstChild.appendChild(PortfolioItem)
    outerRowMama.appendChild(firstChild);
    // PortfolioItem.className = "head";
    // PortfolioItem.id = 'div'+i
    // PortfolioItem.position = 'absolute'
    // PortfolioItem.style.left = i*50 + 'px'



    var img = document.createElement('img')
    img.src = data[i].url
    img.className = "inside"
    img.id = i
    PortfolioItem.appendChild(img)


    var string = "''"+ data[i].info+ "''"
    var newstring =  string.replace(/99/g, "<span class= 'big'>");
    var newstring2 =  newstring.replace(/98/g, "</span>");


    //create a div for the info of that person
    var divdescr = document.createElement('div');
    divdescr.innerHTML =  '<strong>'+ data[i].position + '</strong><br>' + data[i].name +  '<br>'+ newstring2;
    divdescr.className = "description";
    divdescr.style.color = colors[i%colors.length];
    divdescr.style.display = "none"
    divdescr.id='descr0'+i
    outerRowMama.appendChild(divdescr);


    var elems = $('.inside');
    // var texts = $('.adjectives');
    //if any image is rolled over
    elems.on('mouseenter', function(e) {
      // console.log(this)
    var num = this.id
        for (var i in people){
          if (i != num){
            $('#descr0'+i).fadeOut(10)
          } else {
            $('#descr0'+i).fadeIn()
          }

        }



    });

//     $('.portfolio-item').on('click', function() {
//     $(this).toggleClass('change');
// });

    $('.portfolio-item').click(function(e){
      // $(e.target ).offsetParent().css( "border", "2px solid green" );
      var targetObject = $(e.target).parent().parent()
      var otherTargets = $(e.target).parent().parent().siblings();
      var tween = TweenLite.to(targetObject, 1, {left:"632px", scale: "2", ease:Linear.easeNone});
      var othertween = TweenLite.to(otherTargets,1,{left:"0px", scale: "1"})
      console.log(targetObject)
      tween.play()
      othertween.play();
    // $(e.target).parent().parent().addClass('change');
    // $(e.target).parent().parent().siblings().removeClass('change')
    videoRequest()
  });




} //for loop over

} //function over


function videoRequest(parameter1, parameter2){
  //parse this string with dynamic parameters
  var jsonURL = "http://archive.org/advancedsearch.php?q=%28format%3AMPEG4+OR+format%3Ah.264%29+AND+something&fl%5B%5D=identifier&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&callback=callback"
  $.ajax({
    url: jsonURL,
    type: 'GET',
    dataType: 'json'
  }).done(function(data) {
    //parse the results from here and get the first identifier string,
    //push a new iframe element to the page
    //http://archive.org/embed/IDENTIFIER
    //<iframe src="https://archive.org/embed/commute" width="640" height="480" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>`
    console.log(data)
  });
}
