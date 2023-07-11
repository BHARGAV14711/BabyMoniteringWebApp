img = "";
Status = "";
objects = [];

function preload() {

}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    alarm = createVideo("alarm.wav");
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (Status != "") {
            r = random(255);
            g = random(255);
            b = random(255);


        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("Status").innerHTML = "Status : Object Detected";
            document.getElementById("NumberOfObjects").innerHTML = "Number of objects detected are = "+objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            X_position = floor(objects[i].x );
            Y_position = floor(objects[i].y );

            text(objects[i].label + " " + percent + "%  X= " + X_position+ " Y= " + Y_position+ 15,objects[i].x +15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label = "person"){
                alarm.stop();
                document.getElementById("status").innerHTML = "Baby detected";
            }else{
                alarm.play();
                getElementById("status").innerHTML = "Baby not detected";
            }
            if(objects.length < 0){
                alarm.play();
                getElementById("status").innerHTML = "Baby not detected";
            }
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!")
    Status = true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

