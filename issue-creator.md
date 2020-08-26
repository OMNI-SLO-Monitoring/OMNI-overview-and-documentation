# Issue Creator

The Issue Creator can receive incoming logs and save them in a mongo Database. In addition to that, the Issue Creator creates an Issue out of that incoming log, send that issue to the [API](https://github.com/ccims/ccims-backend/), to deal with that issue and it can assign a Issue ID to that log that was received from the API.

## Installation and Setup
[How to set up the Issue Creator](https://github.com/ccims/issue-creator/blob/dev/README.md) \
[Sandro's API](https://github.com/ccims/ccims-backend/tree/apiMockup) has to run in order to assign an Issue ID (currently the mock up). If logs are send to the issue creator without it running, the log will be saved without the issue ID.


## Functionalities
 The main feature of the Issue Creator is to process incoming logs from the monitoring services. Currently it processes 4 different kind of log messages: CB open-, CPU utilization-, Timeout exceeded- and Error-Response Log messages. 

### 1. Provided Endpoints:
#### GET endpoints:  
* **/** \
  Successful response: Returns all logs from the database with the Issue ID. \
  Erroneous response: Rejects the request.

* **/:id** \
  Successful response: Returns all logs associated to the id of a service \
  Erroneous response: Rejects the request.

#### POST endpoints:  
* **/** \
Endpoint for sending the Log Message \
  Successful response: Returns: "Received!" and the received API response on the console\
  Erroneous response: Rejects the request.
  
### 2. Creating an Issue and sending it to the API
Out of the incoming log, the issue creator creates an Issue in the [issue format]( https://github.com/ccims/issue-creator/blob/dev/src/IssueFormat.ts) provided by the [graphql schema](https://github.com/ccims/ccims-backend/blob/schemas/schemas/schema.graphql) . The Issue contains all the information of the Log message and is send to the API by the Issue Creator. If the request was successful it receives an Issue ID from the API which can be assigned to the associated log. 

### 3. Saving the Logs in a database
The incoming log, with the received issue ID, will be saved in the mongo database sitting on http://localhost:27017/. 
The logs saved in the database can be viewed in the [Monitoring Frontend](https://github.com/ccims/monitoring-frontend) in the Log Table View by clicking on **Logs**. Here currently viewed without the Issue ID. In order to view the Issue ID, send a GET request to the Issue Creator.

![Logs in the Monitoring Frontend](https://raw.githubusercontent.com/ccims/issue-creator/dev/documentation/Screenshot%20Monitoring%20Frontend.png)
