import os
from subprocess import call, check_output
import threading
import time
from datetime import datetime
import rekognition
import pprint
from db import db
pp = pprint.PrettyPrinter(indent=4)

def take_photo():
    #Invokes adb via shell and takes photo.
    res = call(['adb', 'shell', 'am start -a android.media.action.IMAGE_CAPTURE'])
    if res != 0:
        raise Exception("Unable to start camera")
    time.sleep(1)
    res = call(['adb', 'shell', 'input keyevent KEYCODE_FOCUS'])
    if res != 0:
        raise Exception("Unable to focus camera")
    time.sleep(1)
    res = call(['adb', 'shell', 'input keyevent KEYCODE_CAMERA'])
    if res != 0:
        raise Exception("Unable to take photo")

def get_photo_name():
    res = check_output(['adb', 'shell', 'ls', '/sdcard/DCIM/Camera'])
    photo = res.replace('\n', '').split(' ')
    if photo:
        return photo[0]
    else:
        return None

def pull_photo(photo):
    #Invokes adb pull via shell to pull the last taken photo
    path_to_save = '/tmp/{}'.format(photo)
    res = call(['adb', 'pull', '/sdcard/DCIM/Camera/{}'.format(photo), path_to_save])

def clean_up_photo(photo):
    res = check_output(['adb', 'shell', 'rm', '/sdcard/DCIM/Camera/{}'.format(photo)])
    res = check_output(['rm', '/tmp/{}'.format(photo)])
    rekognition.delete_photo(photo)



def threaded_loop():
    take_photo()
    photo = get_photo_name()
    pull_photo(photo)
    with open("/tmp/{}".format(photo), "r") as f:
        print(rekognition.send_photo(f, photo))

    imageS3 = {
        "S3Object": {
            "Bucket": "shiftappens",
            "Name": photo
        }
    }
    try:
        result = rekognition.index_faces(imageS3)
        result['timestamp'] = datetime.now()
        faces = rekognition.parse_result(result)
        for face in faces:
            face['timestamp'] = datetime.now()
            db.index(index='shift-simplified', doc_type='emotions-simplified', id=photo, body=face)
        db.index(index='shift', doc_type='emotions', id=photo, body=result)
    except Exception as e:
        print(e)
    clean_up_photo(photo)

    threading.Timer(10, threaded_loop).start()
try:
    rekognition.create_collection(rekognition.collection_id)
except Exception as e:
    print("collection already exists")

take_photo()
threaded_loop()
