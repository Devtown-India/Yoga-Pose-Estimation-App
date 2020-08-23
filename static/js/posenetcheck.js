let pose;
let skelton;
function setup(){
	createCanvas(500,500);
	video=createCapture(
	{
		     video: {
        
         facingMode: {
          exact: "user"
        }
     }

	}
		);
	
	console.log('video loaded');
	video.hide();
	posenet=ml5.poseNet(video,onloaded);
	posenet.on("pose",getposes);

}

function getposes(poses){
	console.log(poses);
	if(poses.length>0){
		pose=poses[0];
		skelton=poses[0].skeleton;
	}

	
	
	
	
}

function onloaded(){
	console.log('posenet loaded');
}

function draw(){
	image(video,0,0);
	fill('yellow');
	if(pose){
		for (var i=0;i<17;i++) {
			var x=pose.pose.keypoints[i].position.x;
			var y=pose.pose.keypoints[i].position.y;
			ellipse(x,y,12,12);
		}
		if(skelton){
		for(var i=0;i<skelton.length;i++){
			let p1=skelton[i][0];
			let p2=skelton[i][1];
			strokeWeight(2);
			stroke(255);
			line(p1.position.x,p1.position.y,p2.position.x,p2.position.y);
		}
	}
		
	}

}