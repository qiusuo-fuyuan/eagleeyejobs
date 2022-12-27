FROM python:3.9-buster

ENV DEBIAN_FRONTEND noninteractive
ENV TZ Asia/Shanghai

# Installing Mongo Connector which will connect MongoDB and Elasticsearch
RUN pip install mongo-connector && pip install 'mongo-connector[elastic5]' \
    && pip install 'elastic2-doc-manager[elastic5]'


COPY startup.sh /tmp/

RUN chmod +x /tmp/startup.sh

# Sample usage when no commands is given outside
CMD ["/tmp/startup.sh"]