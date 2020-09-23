
# Error-Response Monitor

The Error-Response Monitor is used to monitor services in terms of their application functionality. Different services can be selected to be monitored in the **Monitoring Selection** tab. As soon as a service is registered the Error-Response Monitor is able to receive its error reports and convert them into our own [Log Message Format](). These Log messages are visualized for each service and automatically inserted into a Kafka Queue which is included in the Error-Response Monitor itself. From this Kafka Queue, the Issue Creator is then able to retrieve the logs created by the Error-Response Monitor. 
Furthermore, one can also probe for semantical correctness by evaluating whether an endpoint is returning an expected value.

## Installation and Setup

The Error-Response Monitor used its own **backend** service. Its **frontend** however is part of the [Combined Monitoring Frontend](). Make sure to install and start both the frontend and backend by following their installation steps: 

[How to setup Error-Response backend](https://github.com/ccims/error-response-monitoring-service) \
[How to set Monitoring frontend](https://github.com/ccims/monitoring-frontend)

The Error-Response Monitor will send received logs to a message queue so the Issue Creator can save the Log Messages in a database and convert the Log Message into an issue accordingly. If you want your LogMessages to be saved and issues created make sure to install and run the [Issue Creator](https://github.com/ccims/issue-creator) backend as well. 


## Structure

This the view of the Error-Response Monitor in the combined monitoring frontend to check for semantical correctness.

Error-Response:
![Error-Response Overall](https://github.com/ccims/error-response-monitoring-service/blob/dev/documentation/Pics/Error_Response_overall.PNG?raw=true)

## Functionalities
Aside from receiving error messages from services, a chief feature is the ability to test for semantical correctness of http responses by manually sending requests to a specific endpoint. \
Whether receiving error messages or encountering undesired behaviour when testing for semantical correctness, a log is subsequently created with the necessary information and inserted into the Kafka Queue.

## 1. Checking for semantical correctness

If you want to manually check if an endpoint is returning correct values go to the **Error-Response** tab of the Monitoring Frontend. 

Initially you can see two input fields. First, enter the URL of the endpoint you want to query. After this select whether the request type is an http _GET_ or _POST_ request. More input fields will then appear based on your selection. 

![Error-Response Overall](https://github.com/ccims/error-response-monitoring-service/blob/dev/documentation/Pics/Error_response_URL_and_type.PNG?raw=true)

### GET requests:
We are going to have a look a the _GET_ request first. Enter your expected response when sending a request to this endpoint and click the **Send Request** button to send the request to the given endpoint. If the request is successful the returned value will be shown below the **Your Response** text. 

![Error-Response Overall](https://github.com/ccims/error-response-monitoring-service/blob/dev/documentation/Pics/Error_response_GET_success.PNG?raw=true)

In case the request is not succesful or the response does not match the expected value an error text will be shown and a Log Message will automatically be created. This Log Message can be seen within the **Work Check Logs** field. 



![Error-Response Overall](https://github.com/ccims/error-response-monitoring-service/blob/dev/documentation/Pics/Error_response_GET_log.PNG?raw=true)

### POST requests:
The process does work similarly when selecting the _POST_ request. Here you need to enter the excpected status code of the response as well as the post body when sending the request. After that the **Send Request** button can be clicked. 

![Error-Response Overall](https://github.com/ccims/error-response-monitoring-service/blob/dev/documentation/Pics/Error_response_POST_success.PNG?raw=true)

If the returned status code matches the expected one the response body will be shown below the **Your Response** text. However, if the status codes do not match an error text will be shown and a Log Message will be created which can be seen in the **Work check Logs** field. 

![Error-Response Overall](https://github.com/ccims/error-response-monitoring-service/blob/dev/documentation/Pics/Error_response_POST_log.PNG?raw=true)

## 2. Kafka Queue
As mentioned before, the Error-Response Monitor writes logs into a Kafka Queue which is directly coupled to be Monitor itself meaning the Kafka Queue is defined and specified in the Error-Response Monitor and is additionally started with the Monitor upon using Docker Compose. localhost:9092 is the respective url the Kafka Queue. Hence the Error-Response Monitor takes on the role of a producer that connects itself to the Kafka Queue, writes the log into it and lastly disconnects whenever dispatching a log which thereupon is consumed by the Issue Creator. There is one Kafka broker across the Monitoring Environment that specifically is responsible to accommodate these logs. Correspondingly, all logs are classified under the topic of "logs".

## Additional Information

If you want to see all Logs received by the Error-Response Monitor please go to the **Log Table View which is part of the [Issue Creator](https://ccims.github.io/overview-and-documentation/issue-creator). The Log table not only displays Log reveived by the Error-Response Monitor but also from the [CPU Tracking Monitoring Service](https://ccims.github.io/overview-and-documentation/cpu-tracking-monitor), as well as received Logs from other Monitoring systems. 
