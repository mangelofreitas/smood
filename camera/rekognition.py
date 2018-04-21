import boto3
import botocore
import pprint
pp = pprint.PrettyPrinter(indent=4)

global rekognition
rekognition = boto3.client('rekognition')

collection_id = "smood"
TEMP_BUCKET = 'shiftappens'


# S3
s3 = boto3.resource('s3')
global bucket

bucket = s3.Bucket(TEMP_BUCKET)

def create_collection(collection_id):
    response = rekognition.create_collection(
        CollectionId = collection_id
    )
    return response

def search_faces(imageS3):
    response = rekognition.search_faces_by_image(
        CollectionId = collection_id,
        Image = imageS3,
        MaxFaces = 100,
        FaceMatchThreshold = 70.0
    )
    if len(response['FaceMatches']) == 0:
        print("Lenght = 0")
        return None
    # print(response['FaceMatches'][0]['Face']['FaceId'])
    return response['FaceMatches']


def send_photo(file, filename):
    # Upload a new file
    data = file
    request = bucket.put_object(Key=filename, Body=data)
    return request

def index_faces(imageS3):
    """
    Parameters : dict on the following format
    {
       "S3Object" : {
         "Bucket" : val,
         "Name"   : val
        }
    }
    """
    response = rekognition.index_faces(
        CollectionId = collection_id,
        Image = imageS3,
        DetectionAttributes=['ALL']
    )
    return response

def detect_faces(imageS3):
    response = rekognition.detect_faces(
        Attributes = ["ALL"],
        Image = imageS3
    )
    return response

def emotions_parse(face):
    EMOTIONS = ['HAPPY', 'SAD', 'ANGRY', 'CONFUSED', 'DISGUSTED', 'SURPRISED', 'CALM', 'UNKNOWN']
    facial_emotion = {
        'HAPPY':0.0,
        'SAD':0.0,
        'ANGRY':0.0,
        'CONFUSED':0.0,
        'DISGUSTED':0.0,
        'SURPRISED':0.0,
        'CALM':0.0,
        'UNKNOWN':0.0
    }
    pp.pprint(face['Emotions'])
    for emotion in face['Emotions']:
        facial_emotion[emotion['Type']] = emotion['Confidence']
    return facial_emotion

def parse_result(result):
    faces = []
    for face_record in result['FaceRecords']:
        face = face_record['FaceDetail']
        facial_id = {
            'faceId': face_record['Face']['FaceId'],
            'gender': face['Gender']['Value'],
            'sunglasses': face['Sunglasses']['Value'],
            'eyeglasses': face['Eyeglasses']['Value'],
            'emotions': emotions_parse(face),
            'ageMax': face['AgeRange']['High'],
            'ageMin': face['AgeRange']['Low'],
            'eyesOpen': face['EyesOpen']['Value'],
            'mouthOpen': face['MouthOpen']['Value'],
            'mustache': face['Mustache']['Value'],
            'beard': face['Beard']['Value'],
            'smile': face['Smile']['Value'],
            'imageId': face_record['Face']['ImageId']
        }
        faces.append(facial_id)
    return faces

def delete_photo(filename):
    s3.Object(TEMP_BUCKET, filename).delete()