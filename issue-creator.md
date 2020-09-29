# Issue Creator

The Issue Creator can receive incoming logs and save them in a mongo Database. In addition to that, the Issue Creator creates an Issue out of that incoming log, send that issue to the [API](https://github.com/ccims/ccims-backend/), to deal with that issue and it can assign a Issue ID to that log that was received from the API.

## Installation and Setup
[How to set up the Issue Creator](https://github.com/ccims/issue-creator/blob/dev/README.md) \
[The Backend API](https://github.com/ccims/ccims-backend-gql/tree/dev) has to run in order to assign an Issue ID. If logs are send to the issue creator without it running, the log will be saved without the issue ID.
It is also crucial to mention that the Issue Creator works only in conjunction with the Kafka Queue which is in turn coupled to the Error-Response Monitor, meaning the Error-Response Monitor must be up and running with the Kafka Queue, achievable by using Docker compose (for more see [Error-Response Monitor Chapter](https://ccims.github.io/overview-and-documentation/error-response-monitor)) alongside the Issue Creator. They are hence important dependencies of the Issue Creator for it automatically connects to the Kafka Queue and consumes the content upon initialization.


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

* **/issue/:id** \
Endpoint for requesting an Issue with an Issue ID \
Successful response: Returns: The issue with a corresponding Issue and its data
Erroneous response: Rejects the request or send an error back if the Issue ID does not have an associated issue  

#### POST endpoints:  
* **/** \
Endpoint for sending the Log Message \
  Successful response: Returns: "Received!" and the received API response on the console\
  Erroneous response: Rejects the request.



### 2. Creating an Issue and sending it to the API
The Issue Creator encompasses a Log Receiver component which upon initialisation connects to the Kafka Queue described and intialized in the [Error-Response Monitor Chapter](https://ccims.github.io/overview-and-documentation/error-response-monitor) and subscribes to the the topic of "logs" under which all logs are classified. Taking on the role as a consumer, it will then consistently retrieve existing logs of the Kafka Queue. 
Out of the incoming log, the issue creator creates an Issue in the [issue format]( https://github.com/ccims/issue-creator/blob/dev/src/IssueFormat.ts) provided by the [graphql schema](https://github.com/ccims/ccims-backend/blob/schemas/schemas/schema.graphql) . The Issue contains all the information of the Log message and is sent to the API by the Issue Creator. If the request was successful it receives an Issue ID from the API which can be assigned to the associated log. 

### 3. Service Monitoring Selection
The [Monitoring Frontend](https://github.com/ccims/monitoring-frontend) encompasses a service registration or service selection view which allows the user to add services they would like to have monitored. These services are then inserted into the MongoDB database of the Issue Creator with their URL being their corresponding ID. After retrieving a log from the Kafka Queue, the Issue Creator will then assess with the informtion provided in the log whether or not the service which the log pertains to is already registered or not. Logs from unregistered services will not be processed whereas conversely logs from already registered service undergo the conversion and dispatch procedure and are lastly added to the database with their received Issue ID.

For the registration, the URL must conform to the form of the URLs in our environment file. \
An example URL would look like this: "http://localhost:1234/" \
Here, "http://" and the last "/" must be included. If the last "/" is omitted, the Issue Creator will automatically insert "/" at the end. 

![Service Monitoring Selection in the Monitoring Frontend](https://github.com/ccims/issue-creator/blob/dev/documentation/Screenshot%20Service%20Selection.png?raw=true)

### 4. Saving the Logs in a database
As mentioned before, the accepted logs, with their received issue ID, will be added in the MongoDB database located at http://localhost:27017/. 
The logs residing in the database can be viewed in the [Monitoring Frontend](https://github.com/ccims/monitoring-frontend) in the Log Table View by clicking on **Logs**. Here currently viewed without the Issue ID. In order to view the Issue ID, send a GET request to the Issue Creator. 

![Logs in the Monitoring Frontend](https://raw.githubusercontent.com/ccims/issue-creator/dev/documentation/Screenshot%20Monitoring%20Frontend.png)

### 5. Searching an Issue by ID
By sending a GET request to the endpoint: **/issue/:id** the issue associated with the given ID will be sent as a response if that issue exists. If the ID does not have an associated issue the error: "The specified ID is no valid node id" and a status code 500 will be returned.


