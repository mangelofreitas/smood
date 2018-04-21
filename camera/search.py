import os
from db import db
import rekognition
from time import time

def get_data_by_face_id(face_ids):
    '''
    Searches elastic and returns all references of this face id.
    '''
    data = {}
    for face_id in face_ids
        try:
            response = db.search(index="shift-simplified", body=body={
              'query': {
                'term': {
                    'faceId': face_id
                    }
                }
              }
            )
            #This is a list containing all the results for the queried facial id
            data[face_id] = response['hits']['hits']
        except Exception as e:
            print("Failed to retrieve information for face id {}".format(face_id))
    return data

def get_face_ids(imageS3):
    '''
    Params: imageS3 in bucket format
    Returns face_id if found or None if not found
    '''
    face_ids = []
    face_matches = rekognition.search_faces(imageS3)
    if face_matches:
        for face_match in face_matches:
            face_ids.append(face['Face']['FaceId'])
    #Lets keep it simple for now and return only the first found match to avoid massive calls for now
    return [face_ids[0]]

def upload_photo(image_path):
    '''
    Uploads a photo to an S3 Bucket
    Returns an S3 image object (dict)
    '''
    image_name = image_path.replace('/', 'TAGGED_TO_REMOVE')
    image_name = image_name.replace('\\', 'TAGGED_TO_REMOVE')
    image_name = image_name.split('TAGGED_TO_REMOVE')[-1]
    image_name = image_name + "_{}".format(str(time()))
    with open(image_path, 'r') as f:
        rekognition.send_photo(f, image_name)

    imageS3 = {
        "S3Object": {
            "Bucket": "shiftappens",
            "Name": image_name
         }}

    return imageS3

def main():
    if len(sys.argv) < 2:
    print("Error: Please use the following format: python search.py FULL_PATH_TO_IMAGE")
    exit(1)
    image_path = sys.argv[1]
    imageS3 = upload_photo(image_path)
    face_ids = get_face_ids(imageS3)
    rekognition.delete_photo(imageS3['S3Object']['Name'])
    return get_data_by_face_id(face_ids)

if __name__ == "__main__" :
    main()




