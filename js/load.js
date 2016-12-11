


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
    document.body.appendChild(divdescr);


    var elems = $('.images');
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
      console.log(e.target)
    $(e.target).parent().parent().addClass('change');
    $(e.target).parent().parent().siblings().removeClass('change')
  });
    //
    // $(".first-child").on('focus',function() {
    //    $(this).parent().addClass('change');
    // });
    //
    // var angle = 90;
    //   $(document).on("mousedown", ".portfolio-item", function(e) {
    //     console.log('clicked')
    //     console.log(e.target)
    //       e.target.parentElement.className += " change";
    //
    //
    //
    //
    //   });



} //for loop over
} //function over
