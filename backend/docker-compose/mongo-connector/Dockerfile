FROM python:3.9-buster

ENV DEBIAN_FRONTEND noninteractive
ENV TZ Asia/Shanghai

# Installing Mongo Connector which will connect MongoDB and Elasticsearch
RUN pip install mongo-connector && pip install 'mongo-connector[elastic5]'

COPY startup.sh /tmp/

# Sample usage when no commands is given outside
CMD ["/bin/bash", "/tmp/startup.sh"]