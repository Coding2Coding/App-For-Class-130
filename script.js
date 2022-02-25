song = "";
volume = 0;
speed = 0;
leftWristXCoordinate = 0;
leftWristYCoordinate = 0;
rightWristXCoordinate = 0;
rightWristYCoordinate = 0;
isLeftWristOnTheCanvas = "";
isRightWristOnTheCanvas = "";

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.position(570, 200);

    video = createCapture(VIDEO);
    video.hide();

    poseNetModel = ml5.poseNet(video, modelLoaded);
    poseNetModel.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("inside modelLoaded function, posenet model is working");
}
function draw() {
    image(video, 0, 0, 400, 400);
    
    fill("#69d7ff");
    stroke("ffc0ff");

    if(isRightWristOnTheCanvas > 0.2) {

        circle(rightWristXCoordinate, rightWristYCoordinate, 14);

        if(rightWristYCoordinate > 0  && rightWristYCoordinate <= 100) {
            document.getElementById("speed").innerHTML = "x0.4";
            song.rate(0.4);
        }

        else if(rightWristYCoordinate > 100 && rightWristYCoordinate <= 200) {
            document.getElementById("speed").innerHTML = "x1";
            song.rate(1);
        }

        else if(rightWristYCoordinate > 200 && rightWristYCoordinate <= 300) {
            document.getElementById("speed").innerHTML = "x1.5";
            song.rate(1.5);
        }

        else if(rightWristYCoordinate > 300 && rightWristYCoordinate <= 400) {
            document.getElementById("speed").innerHTML = "x2";
            song.rate(2);
        }
    }

    if(isLeftWristOnTheCanvas > 0.2) {
        circle(leftWristXCoordinate, leftWristYCoordinate, 14);
        numberLeftWristY = Number(leftWristYCoordinate);
        noDecimalLeftWristY = floor(numberLeftWristY);
        leftWristYDivide1000 = noDecimalLeftWristY/1000;
        volume = leftWristYDivide1000*2;
        document.getElementById(volume).innerHTML = volume;
        song.setVolume(volume);
    }
}

function playSong() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stopSong() {
    song.stop();
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        
        isRightWristOnTheCanvas = results[0].pose.keypoints[10].score;
        isLeftWristOnTheCanvas = results[0].pose.keypoints[9].score;
        console.log("isLeftWristOnTheCanvas: " + isLeftWristOnTheCanvas + ", isRightWristOnTheCanvas: " + isRightWristOnTheCanvas);

        leftWristXCoordinate = results[0].pose.leftWrist.x;
        leftWristYCoordinate = results[0].pose.leftWrist.y;
        console.log("Left Wrist X Coordinate: " + leftWristXCoordinate + ", Left Wrist Y Coordinate: " + leftWristYCoordinate);
        rightWristXCoordinate = results[0].pose.rightWrist.x;
        rightWristYCoordinate = results[0].pose.rightWrist.y;
        console.log("Right Wrist X Coordinate: " + rightWristXCoordinate + ", Right Wrist Y Coordinate: " + rightWristYCoordinate);
    }
}