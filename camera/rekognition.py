import boto3
import botocore
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
        Image = imageS3
    )
    return response

def detect_faces(imageS3):
    response = rekognition.detect_faces(
        Attributes = ["ALL"],
        Image = imageS3
    )
    return response

def delete_photo(filename):
    s3.Object(TEMP_BUCKET, filename).delete()