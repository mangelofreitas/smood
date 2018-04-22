import rekognition
from flask import Flask, render_template, jsonify, make_response, request
from random import randint
import requests
from threading import Thread
import threading

app = Flask(__name__)
global events_in_work
events_in_work = {}

def threaded_loop():
    for event in events_in_work:
        if event['status'] == 'complete':
            # requests.post('http://SOME_PLACE')
            pass
    threading.Timer(3, threaded_loop).start()

def event_process(photos, event='shiftappens'):
    events_in_work[event] = {'status':'inProgress'}
    for photo in photos:
        imageS3 = {
            "S3Object": {
                "Bucket": "shiftappens",
                "Name": photo['Name']
            }
        }
        try:
            str_timestamp = photo['CreateDate'].split('(')[1].split('+')[0]
            result = rekognition.index_faces(imageS3)
            result['timestamp'] = datetime.datetime.fromtimestamp(int(str_timestamp) / 1e3)
            faces = rekognition.parse_result(result)
            i = 0
            for face in faces:
                face['timestamp'] = datetime.datetime.fromtimestamp(int(str_timestamp) / 1e3)
                face['event'] = event
                db.index(index='shift-simplified', doc_type='emotions-simplified', id=photo['name']+'-{}'.format(str(i)), body=face)
                i = i + 1
            db.index(index='shift', doc_type='emotions', id=photo, body=result)
        except Exception as e:
            print(e)
            events_in_work[event]['status'] = 'failed'
        events_in_work[event]['status'] = 'complete'

@app.route('/', methods=['POST'])
def event():
    input = request.get_json()
    thread = Thread(target=event_process, args=[input['Files'], input['EventId']])
    thread.start()
    return make_response('OK', 200)

def start_backgroung():
    yourThread = threading.Timer(1, threaded_loop, ())


start_backgroung()
app.run(debug=True, host="0.0.0.0", threaded=True, port=5000)