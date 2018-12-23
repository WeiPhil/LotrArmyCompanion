FROM python:3.7
ADD . /app/webserver
WORKDIR /app/webserver
RUN pip install -r requirements.txt
CMD ["python", "webserver.py"]