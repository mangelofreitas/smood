from datetime import datetime
from elasticsearch import Elasticsearch

#Change this to IP (or set it as a /etc/hosts entry)
host = "shift"
db = Elasticsearch(["shift"], port=9200)

