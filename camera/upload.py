import os
import threading
import time
import rekognition
import pprint
from db import db
import sys

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
            result = rekognition.detect_faces(imageS3)
            print("Uploaded photo")
            db.index(index='shift-{}'.format(event), doc_type='emotions', id=photo, body=result)
            print("Saved information on elasticsearch")
        except Exception as e:
            print(e)

if __name__ == "__main__" :
    if len(sys.argv) < 3:
        print("Error: Please use the following format: python upload.py FULL_PATH_TO_FOLDER NAME_OF_EVENT")
        exit(1)
    folder_path = sys.argv[1]
    list_of_photos = os.listdir(folder_path)
    upload_photos(folder_path, list_of_photos)