FROM python:2-alpine
COPY server/requirements.txt /server/requirements.txt
RUN pip install -r /server/requirements.txt

COPY server /server
COPY aws /root/.aws
WORKDIR /server
CMD python app.py
