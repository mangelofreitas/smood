import os
import threading
import time
import rekognition
import pprint
from db import db
import sys
from datetime import datetime

pp = pprint.PrettyPrinter(indent=4)


def upload_photos(folder, list_of_photos, event_name):
    for photo in list_of_photos:
        with open("{}/{}".format(folder, photo), "r") as f:
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
                face['eventId'] = event_name
                db.index(index='shift-simplified', doc_type='emotions-simplified', id=photo, body=face)
            db.index(index='shift', doc_type='emotions', id=photo, body=result)
        except Exception as e:
            print(e)

if __name__ == "__main__" :
    if len(sys.argv) < 3:
        print("Error: Please use the following format: python upload.py FULL_PATH_TO_FOLDER NAME_OF_EVENT")
        exit(1)
    folder_path = sys.argv[1]
    event_id = sys.argv[2]
    list_of_photos = os.listdir(folder_path)
    upload_photos(folder_path, list_of_photos, event_id)