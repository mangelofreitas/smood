import rekognition
import pprint
pp = pprint.PrettyPrinter(indent=4)

pp.pprint(rekognition.rekognition.list_faces(
    CollectionId='smood'
))