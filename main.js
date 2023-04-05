var song = "";
var tocando = false;

var volume = 0;

var rightWristyX = 0;
var rightWristyY = 0;

var leftWristyX = 0;
var leftWristyY = 0;

var scoreLeftWrist = 0;
var scoreRightWrist = 0;

var inNumberLeftWristY = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("O modelo PoseNet foi inicializado");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist = " + scoreLeftWrist);  
        
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("ScoreLeftWrist = " + scoreLeftWrist + "ScoreRightWrist = " + scoreRightWrist);      
        
        leftWristyX = results[0].pose.leftWrist.x;
        leftWristyY = results[0].pose.leftWrist.y;
        console.log("LeftWridtX = " + leftWristyX + "LeftWristY = " + leftWristyY);

        rightWristyX = results[0].pose.rightWrist.x;
        rightWristyY = results[0].pose.rightWrist.y;
        console.log("RightWridtX = " + rightWristyX + "RightWristY = " + rightWristyY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreLeftWrist > 0.2)
    {
        circle(leftWristyX, leftWristyY, 20);

        inNumberLeftWristY = Number(leftWristyY);
        removeDecimals = floor(inNumberLeftWristY);

        volume = removeDecimals / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;

        song.setVolume(volume);
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristyX, rightWristyY, 20);

        if(rightWristyY > 0 && rightWristyY <= 100) 
        {
            document.getElementById("speed").innerHTML = "Velocidade = 0.5x";
            song.rate(0.5);
        }
        else if (rightWristyY > 100 && rightWristyY <= 200)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 1x";
            song.rate(1); 
        }
        else if (rightWristyY > 200 && rightWristyY <= 300)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 1.5x";
            song.rate(1.5); 
        }
        else if (rightWristyY > 300 && rightWristyY <= 400)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 2x";
            song.rate(2); 
        }
        else if (rightWristyY > 400)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 2.5";
            song.rate(2.5); 
        }
    }
}

function play()
{
    if (tocando == false)
    {
        song.play();
        tocando = true

        document.getElementById("bt").className = "btn btn-danger playButton";
        document.getElementById("bt").innerHTML = "Parar"
    }
    else
    {
        song.stop();
        tocando = false

        document.getElementById("bt").className = "btn btn-success playButton";
        document.getElementById("bt").innerHTML = "Reproduzir"
    }
    
    song.setVolume(0.5);
    song.rate(1);

}