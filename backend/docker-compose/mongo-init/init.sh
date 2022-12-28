#!/bin/bash

RET=1; 
until [ ! $RET -ne 0 ]; do 
    mongo --host mongo1:27017 --eval \
        '
        db = (new Mongo("mongo1:27017")).getDB("test");
            config = {
                "_id" : "eagleeyejobs-replica-set",
                "members" : [
                {
                    "_id" : 0,
                    "host" : "mongo1:27017",
                    "priority": 100,
                }
                ]
            };
        rs.initiate(config);';
    RET=$?;
    echo $RET
    sleep 10;
done