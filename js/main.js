var table;

function preload() {
    // var url = 'data/data.json';
    // loadedJSON = loadJSON(url);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    //update dimensions of subdivisions of canvas
    dimsX = (windowWidth / (total / 2));
    dimsY = (windowHeight / 2);

    //update x,y positions of subdivisions of canvas
    for (i in graphics) {
        graphics[i].resize();
    }

}

function setup() {
    //temp usage of a google spreadsheet to test incoming data to variables
    var url = "https://docs.google.com/spreadsheets/d/1cfKGJSZkAcqkaEwFFzr7LIaFs__M2ok2ijWo8j6M0_k/pubhtml";
    var url2 = 'https://docs.google.com/spreadsheets/d/1hFS6zEkE_nrIVhsf4ESZi8UzQ_2cD4gNZGski1YGyPg/pubhtml';
    // Tabletop expects some settings
    var settings = {
        key: url, // The url of the published google sheet
        callback: gotData, // A callback for when the data comes in
        simpleSheet: true // This makes things simpler for just a single worksheet of rows
    }

    // Make the request
    table = Tabletop.init(settings);



    var cnv = createCanvas(windowWidth, windowHeight);
    //position canvas absolutely
    cnv.position(0, 0);
    background(color('#FFFFA2'));
    colors = [color('#FFFFA2'), color('#271A61'), color('#D4B8FF'), color('#FF6777'), color('#3DCCFF'), color('#b3f7af')]
    dimsX = (windowWidth / (total / 2))
    dimsY = (windowHeight / 2)

    //create 6 instances and push to an array 'graphics'
    createAllVis();


} //setup over

function updateAllData(data) {
    for (i in data) {
        q1Results[i] = data[i]['Q1: Where did you get your data from?'];
        q2Answers[i] = data[i]['Q2:Did you do any JS before ITP?'];
        q3Answers[i] = data[i]['Q3: Would you rather do D3 or Chart JS?'];
        q4Answers[i] = data[i]["Q4: Whats' the correct javascript version of this jquery thing?"];
        q5Answers[i] = data[i]["Q5: How good at javascript are you?"];
        //q4Answers
        // if (q4Answers[i] == "el.style.display='none'"){
        //
        // }

        // console.log(q4Answers[i])
        // console.log(data[i]['Q3: Would you rather do D3 or Chart JS?'])

    }
}
//the callback from the table top initializing
function gotData(data) {
    // for (i in data){
    setInterval(table.fetch(updateAllData(data)), 5000)
        // }
}

function draw() {

    // gotData();
    background(colors[2]);

    for (var i = 0; i < total; i++) {
        //draw the background of all rectangles every frame
        graphics[i].predata();
        //for each one, if it's started show it's graph
        if (graphics[i].started == true) {
            graphics[i].showStatGraphics();
        }

    }
}


//this gets called once in setup
function createAllVis() {
    for (var i = 0; i < total; i++) {
        if (i < 3) {
            graphics.push(new Vis(i, i * dimsX, 0, false, questions[i]));
        } else {
            graphics.push(new Vis(i, [i % 3] * dimsX, dimsY, false, questions[i]));
        }
    }
}

//-------------------------------------//------------------------//

// Vis Class object
function Vis(num, x, y, started, question) {
    //instantiate
    this.num = num;
    this.started = started
    this.question = question
    this.x = x;
    this.y = y;
    var centerX = this.x + (dimsX / 2)
    var centerY = this.y + (dimsY / 2)
    this.centerX = centerX
    this.centerY = centerY
    this.closeLid = 100
    var scn3Ready = false
    var x2,y2,x3,y3;

    //call this on p5's window resize function
    this.resize = function() {
        this.centerX = this.x + (dimsX / 2)
        this.centerY = this.y + (dimsY / 2)

        if (this.num < 3) {
            this.x = this.num * dimsX;
            this.y = 0;
        } else {
            this.x = [this.num % 3] * dimsX;
            this.y = dimsY;
        }
    }

    //background, gets called right away in the draw loop and never stops
    this.predata = function() {
        textAlign(LEFT);
        noStroke();
        fill(colors[this.num]);
        //background rectangle
        //x,y is the pos of the rectangle
        rect(this.x, this.y, dimsX, dimsY);

    }

    this.getLiveData = function() {

        }
        // add this if audience is ready for the question
    this.showStatGraphics = function() {
        if (num == 0) {

            for (var i = 0; i < 16; i++) {
                textSize(18)
                var col = colors[i % colors.length]
                if (i < 8) {
                    fill(col)
                    rect(this.x, this.y + (dimsY / 8 * i), dimsX / 2, dimsY / 8)
                    if (col != colors[1]) {
                        fill(colors[1])
                    } else {
                        fill(colors[0])
                    }
                    if (q1Results[i] != '') {

                        text(q1Results[i], this.x + 10, this.y + (dimsY / 8 * i) + (dimsY / 16))
                    }
                } else {

                    fill(col)
                    rect(this.x + dimsX / 2, this.y + (dimsY / 8 * [i % 8]), dimsX / 2, dimsY / 8)
                    if (col != colors[1]) {
                        fill(colors[1])
                    } else {
                        fill(colors[0])
                    }
                    if (q1Results[i] != '') {
                        text(q1Results[i], this.x + dimsX / 2 + 10, this.y + (dimsY / 8 * [i % 8]) + +(dimsY / 16))
                    }
                }

            }
        } else if (num == 1) {
            q2Results[0] = q2Answers.filter(function(x) {
                return x == 'yes'
            }).length
            q2Results[1] = q2Answers.filter(function(x) {
                return x == 'no'
            }).length

            // console.log(q2Results)


            push();
            translate(this.centerX, this.centerY);
            // rotate(frameCount / 50.0);
            q1Polygon(0, 0, 80, 60, 'yes');
            q1Polygon(0, 0, 80, 60, 'no');
            pop();
            textSize(40)
            textAlign(CENTER)
            fill(colors[0])
            text('NO', this.x + (dimsX * .20), this.y + (dimsY * .15))
            text('YES', this.x + (dimsX * .80), this.y + (dimsY * .85))


        } else if (num == 2) {
            q2D3 = q3Answers.filter(function(x) {
                return x == 'D3'
            }).length
            q2CJS = q3Answers.filter(function(x) {
                return x == 'Chart'
            }).length
            var totalAnswers = q2CJS+q2D3
            // console.log(totalAnswers)
            var D3height = map(q2D3, 0, 16, 20, dimsY * .9)
            var D3rad = map(q2D3, 0, 16, 0, 120)
            var CJSheight = map(q2CJS, 0, 16, 20, dimsY * .9)
            var CJSrad = map(q2CJS, 0, 16, 0, 120)
            fill(colors[1])
            stroke(colors[1])
            strokeWeight(12.0);
            strokeCap(ROUND);
            var lineHeightAvg = this.centerY + (dimsY * .08)
            var L = dimsX*.45
            x2=this.centerX-L
            x3=x2+2*L
            y2 = map(q2D3, 0, totalAnswers, lineHeightAvg-dimsY*.3, lineHeightAvg+dimsY*.3)
            y3 = map(q2CJS, 0, totalAnswers, lineHeightAvg-dimsY*.3, lineHeightAvg+dimsY*.3)



            triangle(this.centerX, lineHeightAvg+(dimsY*.01), this.centerX + (dimsX * .24), this.centerY + (dimsY * .35), this.centerX - (dimsX * .24), this.centerY + (dimsY * .35));
            stroke(colors[5])
            line(this.centerX, lineHeightAvg, x2, y2)
            line(this.centerX, lineHeightAvg, x3, y3)
            // line(this.x + (dimsX * .15), this.y + D3height, this.x + (dimsX * .85), CJSheight);
            fill(colors[3])
            stroke(colors[3])
            ellipse(this.x + (dimsX * .20), this.y + y2 - (D3rad * .5+12), D3rad, D3rad)
            ellipse(this.x + (dimsX * .80), this.y + y3 - (CJSrad * .5+12), CJSrad, CJSrad)
            noStroke()
            textSize(40)
            textAlign(CENTER)
            fill(colors[0])
            text('D3', this.x + (dimsX * .20), this.y + (dimsY * .15))
            text('CJS', this.x + (dimsX * .80), this.y + (dimsY * .15))

        } else if (num == 3) {

            q4Results[0] = q4Answers.filter(function(x) {
                return x != "el.style.display = 'none'"
            }).length
            q4Results[1] = q4Answers.filter(function(x) {
                    return x == "el.style.display = 'none'"
                }).length
                // console.log(q4Results[1])
            var moveUp = 0

            var destination = this.y + (dimsY * .15)
            if (scn3Ready == false) {
                var currentY = this.centerY

                fill(colors[5])
                textAlign(CENTER)
                textSize(40)
                text("$(el).hide();", this.centerX, this.centerY)
                if (mouseIsPressed && mouseX < this.x + dimsX && mouseY > dimsY) {
                    // console.log('scene 3 mouse was pressed')
                    scn3Ready = true

                }
            }
            if (scn3Ready) {

                fill(colors[5])
                textAlign(CENTER)
                textSize(40)
                text("$(el).hide();", this.centerX, this.centerY - 100)
                fill(colors[4])
                textAlign(CENTER)
                textSize(30)
                text("el.style.display = 'none'", this.centerX, this.centerY)
                fill(colors[2])
                var i = 0
                    // console.log(-7*q4Results[1])
                while (i < q4Results[1]) {
                    if (i < 6) {

                        ellipse(this.x + dimsX * .2 + (i * 50), this.y + dimsY * .7, 40, 40)
                    } else {
                        ellipse(this.x + dimsX * .2 + ([i % 6] * 50), this.y + dimsY * .86, 40, 40)

                    }
                    i++
                }
                // rect(this.x+dimsX*.2, this.y+dimsY*.8,60,-7*q4Results[0])
                // rect(this.x+dimsX*.7, this.y+dimsY*.8,60,-7*q4Results[1])
            }

        } else
        if (num == 4) {

          noStroke()
            fill(colors[0])
            ellipse(this.centerX, this.centerY, dimsX * .6, dimsX * .6)
            fill(colors[5])
            ellipse(this.centerX, this.centerY, dimsX * .35, dimsX * .35)
            for (i in q5Answers) {
                q5Radius[i] = map(q5Answers[i], 1, 10, dimsX * .31, 0)
                fill(colors[3])
                var x = this.centerX + q5Radius[i] * Math.cos(angle);
                var y = this.centerY + q5Radius[i] * Math.sin(angle);
                angle += (2 * Math.PI) / 16;
                ellipse(x, y, 16, 16)
            }
        } else if (num == 5) {
            eyeoffset = dimsX * .2
            bagPull = map(tiredAvg, 0, 10, eyeBagPullMax, 0)
            mouthpull = map(tiredAvg,0,10,.3,-.3)

            fill(colors[0])
            strokeWeight(8)
            stroke(colors[1])
            ellipse(this.centerX + eyeoffset, this.y + (dimsY * .3), pupilRad * 1.5, pupilRad * 1.5)
            ellipse(this.centerX - eyeoffset, this.y + (dimsY * .3), pupilRad * 1.5, pupilRad * 1.5)
            fill(colors[1])
            ellipse(this.centerX + eyeoffset, this.y + (dimsY * .3), pupilRad * .45, pupilRad * .45)
            ellipse(this.centerX - eyeoffset, this.y + (dimsY * .3), pupilRad * .45, pupilRad * .45)
            noStroke();
            fill(colors[0])
            ellipse(this.centerX + eyeoffset, this.y + (dimsY * .29), pupilRad * .1, pupilRad * .1)
            ellipse(this.centerX - eyeoffset, this.y + (dimsY * .29), pupilRad * .1, pupilRad * .1)
            strokeWeight(6)
            stroke(colors[4])
            noFill();
            strokeCap(ROUND)
            //bags under eyes
            var i = 1
            var startbagY = (dimsY * .2) + pupilRad + this.y
            while (i < tiredAvg-1) {
              bezier(
              this.centerX-40,
              startbagY + i * (dimsY * .05),
              this.centerX-40,
              startbagY + i * (dimsY * .05)+(i*20),
              this.centerX - (dimsX*.35),
              startbagY + i * (dimsY * .05)+(i*20),
              this.centerX - (dimsX*.35),
              startbagY + i * (dimsY * .05)
              );
              //start x, starty, pullx, pully, pullx, pully,end x, endy
                bezier(
                this.centerX+40,
                startbagY + i * (dimsY * .05),
                this.centerX+40,
                startbagY + i * (dimsY * .05)+(i*20),
                this.centerX + (dimsX*.35),
                startbagY + i * (dimsY * .05)+(i*20),
                this.centerX + (dimsX*.35),
                startbagY + i * (dimsY * .05)
                );
                i++
            }
            // mouth
            stroke(colors[3])

            bezier(this.x + (dimsX * .15), this.y + (dimsY * .7), this.x + (dimsX * .15), this.y + (dimsY * .7)+ (dimsY * mouthpull), this.x + (dimsX * .75), this.y + (dimsY * .7) + (dimsY * mouthpull), this.x + (dimsX * .75), this.y + (dimsY * .7));

            // bezier curve for mouth
            //bezier curves for under eye bags

            fill(colors[3])
            noStroke();
            //bezier curve for nose or upload file
            //add eye lids with path or poly
            eyelid(this.centerX + (eyeoffset * .3), this.y + (dimsY * .3), this.centerX + (eyeoffset * 2), this.y + (dimsY * .3), bagPull, 'right')
            eyelid(this.centerX - (eyeoffset * .3), this.y + (dimsY * .3), this.centerX - (eyeoffset * 2), this.y + (dimsY * .3), bagPull, 'left')



        }
        // fill(colors[(this.num + 1) % total])
        //     // rect(centerX, centerY, 20, 10)
        // textSize(dimsX * .1);
        // // text(question, this.x + (dimsX * .06), this.y + (dimsY * .1));
        //is this doing anything?
        started = true
    }

    // show the information in a popup
    this.showResults = function() {

    }

}




///////////////other fucntions////

function q1Polygon(x, y, radius, npoints, answer) {

    var angle = TWO_PI / npoints;
    var amount = TWO_PI * (q2Results[0] / 16)
    if (answer == 'yes') {
        fill(colors[2])

        var a = 0
        var b = TWO_PI * (q2Results[0] / 16)
        beginShape();
        for (a = 0; a < TWO_PI; a += angle) {
            var sx = x + cos(a) * radius;
            var sy = y + sin(a) * radius;
            vertex(sx, sy);


        }
        endShape(CLOSE);
    } else if (answer == 'no') {
        fill(colors[4])
        beginShape();

        for (b = amount; b < TWO_PI; b += angle) {
            var sx = x + cos(b) * radius;
            var sy = y + sin(b) * radius;
            vertex(sx, sy);

        }
        endShape(CLOSE);
    }


}

function eyelid(startx, starty, endx, endy, pulllid, side) {
    if (side == 'right') {
        beginShape();
        vertex(startx, starty);


        bezierVertex(startx - 10, starty - 100, startx + 90, starty - 100, endx, endy);
        bezierVertex(endx, endy, startx + 90, starty - pulllid, startx, starty);
        endShape();
    } else {
        beginShape();
        vertex(startx, starty);
        bezierVertex(startx + 10, starty - 100, startx - 100, starty - 100, endx, endy);
        bezierVertex(endx, endy, startx - 100, starty - pulllid, startx, starty);
        endShape();

    }
}
