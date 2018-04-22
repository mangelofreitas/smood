from datetime import datetime
from elasticsearch import Elasticsearch

#Change this to IP (or set it as a /etc/hosts entry)
host = "206.189.30.185"
db = Elasticsearch([host], port=9200)

