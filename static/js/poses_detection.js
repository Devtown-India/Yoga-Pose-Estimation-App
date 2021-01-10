let fingers;
let pose;
let skelton;
let model;
let posee;
let posenet,posenet1,posenet2;
let video,video1,video2;
let state='stay';
let pose_state='off';
let s="start";
let json={};
let w=0;
let labels='a';
function setup(){
	createCanvas(640,800);
		video=createCapture(
	{
		     video: {
        
         facingMode: {
          exact: "environment"
        }
     }

	}
		);
	
video.hide(); 
  	

			
posenet=ml5.poseNet(video,onloaded);

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
	}
	
	posee=poses;
	if(poses.length>0){
		pose=poses[0];
		if(pose.pose.keypoints.length==17){
			pose_state='on';
		}
		else{
			pose_state='off';
		}
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
	var form_data=new FormData();

	if(pose && pose_state=='on'){
		let input=[];

		for (var i=0;i<17;i++) {
			var x=pose.pose.keypoints[i].position.x;
			var y=pose.pose.keypoints[i].position.y;
			input.push(x);
			input.push(y);
			form_data.append('json_x'+i,x);
			form_data.append('json_y'+i,y);
			


		}
        $.ajax({
            type: 'POST',
            url: '/',
            data: form_data,
            contentType: false,
            processData: false,
        }).done(function(data, textStatus, jqXHR){
            
            $('#result').text(data);



        }).fail(function(data){
            alert('error!');
        });

		
	}
	else{
		            $('#result').text("Pose Not Detected");

	}
 
}


