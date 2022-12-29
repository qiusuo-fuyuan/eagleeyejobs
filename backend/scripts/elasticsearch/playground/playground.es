
### get all the nodes in the cluster ###
GET /_cat/nodes



### get all the indices in the nodes ###
GET /_cat/indices?v


### search job title in workabroad.jobs index ####
GET /workabroad.job/_search
{
  "query": {
    "match": {
      "title": "Angular"
    }
  }
}


### search questions in workabroad.question index
GET /workabroad.question/_search
{
 "query": {
    "match": {
      "title": "Angular"
    }
  }
}