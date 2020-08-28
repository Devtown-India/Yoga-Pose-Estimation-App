let fingers;
let pose;
let skelton;
let model;
let posee;
let posenet,posenet1,posenet2;
let video,video1,video2;
let state='stay';
let s="start";
let json={};
let w=0;
let labels='a';
function setup(){
	createCanvas(640,800);
	video= createVideo(['../static/assets/a_final.mp4']);
  	video.hide(); 
  	video1= createVideo(['../static/assets/b.mp4']);
  	video1.hide(); 
  	video2= createVideo(['../static/assets/c.mp4']);
  	video2.hide(); 
  	

			
posenet=ml5.poseNet(video,onloaded);
posenet1=ml5.poseNet(video1,onloaded);
posenet2=ml5.poseNet(video2,onloaded);

	posenet.on("pose",getposes);

	

	

}

function posenetmodel(){
	posenet=ml5.poseNet(video,onloaded);

	posenet.on("pose",getposes);
	
}

function onloadedmodel(){
	console.log('neuralNetwork loaded');
}

function getposes(poses){
	if (state=='collect'){
console.log(poses);
	}
	
	posee=poses;
	if(poses.length>0){
		pose=poses[0];
		skelton=poses[0].skeleton;
	}

	
	
	
	
}


function mousePressed() {
	state='collect';
  video.loop(); // set the video to loop and start playing
} 

function onloaded(){
	console.log('posenet loaded');
}

function draw(){
	if(labels=='a'){
	image(video,0,0);

	}
	else if(labels=='b'){
	image(video1,0,0);
		
	}
	else if(labels=='c'){
	image(video2,0,0);
		
	}
		
	fill('yellow');
	if(pose && state=='collect' && s=='start'){
		let input=[];

		for (var i=0;i<17;i++) {
			var x=pose.pose.keypoints[i].position.x;
			var y=pose.pose.keypoints[i].position.y;
			input.push(x);
			input.push(y);
			ellipse(x,y,12,12);

		}
		let label=w.toString();
		json[label]=input;
		console.log(input.length);
		w=w+1;
		if(w==400 && labels=='a'){
			labels='b';
			video.pause();
			delete(posenet);
			delete(video);
			video1.loop();
			state='stop';
			posenet1.on("pose",getposes);
			
		
		}
		if(w==800 && labels=='b'){

			labels='c';
			video1.pause();
			delete(posenet1);
			delete(video1);
			state='stop';
			video2.loop();
			posenet2.on("pose",getposes);
		}
		if(w==1200 && labels=='c'){

			delete(posenet2);
			delete(video2);
			state='stop';
			saveJSON(json,'data.json');
		}
		
	
		
	}
 
}


