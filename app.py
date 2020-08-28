from flask import Flask,render_template,request,send_file,send_from_directory,jsonify

import pickle
import numpy as np

app = Flask(__name__,static_folder='static',template_folder='templates')

model=pickle.load(open('model_training/model_1200.pkl','rb+'))

@app.route('/b.mp4',methods=['POST','GET'])
def return_files():
	if request.method=='GET':
		try:
			return send_file('static/assets/a.mp4', attachment_filename='a.mp4')
		except Exception as e:
			return str(e)


@app.route('/',methods=['POST','GET'])
def main():
    if request.method=='GET':
        return render_template('posedetection.html')
    if request.method=='POST':
        inputs=[x for x in request.form.values()]
        inputs_parse=list(inputs)
        inputs_parse_float=[float(x) for x in inputs_parse]
        result=model.predict([inputs_parse_float])
        print(result)
        return result[0]
        
    

if __name__=='__main__':
    app.run()


