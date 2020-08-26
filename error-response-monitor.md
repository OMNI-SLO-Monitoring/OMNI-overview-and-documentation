
# Error-Response Monitor

The Error Response Monitor is used to monitor services in terms of their application functionality. Different services can be selected to be monitored in the **Monitoring Selection** tab. As soon as a service is registered the Error Response Monitor is able to receive its error reports and convert them into our own [Log Message Format](). These Log messages are visualized for each service and automatically transferred to the Issue Creator in order to either create a new issue out of the Log Message or assign the Log Message to an existing issue. \
Apart from registering service to automatically send errors to the monitoring system you can also manually check whether different endpoints are available. Furthermore, you can also check for semantical correctness by evaluating whether an endpoint is returning an expected value.

## Installation and Setup

The Error Response Monitor used its own **backend** service. Its **frontend** however is part of the [Combined Monitoring Frontend](). Make sure to install and start both the frontend and backend by following their installation steps: 

[How to setup Error Response backend](https://github.com/ccims/error-response-monitoring-service) \
[How to set Monitoring frontend](https://github.com/ccims/monitoring-frontend)

The Error Response Monitor will send received logs to a message queue so the Issue Creator can save the Log Messages in a database and convert the Log Message into an issue accordingly. If you want your LogMessages to be saved and issues created make sure to install and run the [Issue Creator](https://github.com/ccims/issue-creator) backend as well. 


## Structure

The Error Response frontend comprises two tabs in the combined monitoring frontend.

Monitoring Selection: 
![Monitoring Selection Overall](https://github.com/ccims/error-response-monitoring-service/blob/dev/payment-service-monitor/documentation/Pics/Monitoring_selection_overall.PNG?raw=true)

Error Response:
![Error Response Overall](https://github.com/ccims/error-response-monitoring-service/blob/dev/payment-service-monitor/documentation/Pics/Error_Response_overall.PNG?raw=true)

## Functionalities

The Error Response Monitor comes wiht two main features, the first one being able to register services to monitor. Only these services are able to send errors to the monitoring service, requests by any other service are ignored. This implenmentaion was chosen so that not any arbitrary service is able to send errors to the monitoring service. \
The second main feature is the ability to test for semantical correctnes of http responses by manually sending requests to a specific endpoint. \
In both features a Log Message is automatically created and sent to the issue creator in case of a detected error. 

## 1. Registering Services to monitor

Go to the **Monitoring Selection** tab in the Monitoring Frontend and click the **Add** button on the top right corner. A new dialog will then pop up. 

![Monitoring selection add service button](https://github.com/ccims/error-response-monitoring-service/blob/dev/payment-service-monitor/documentation/Pics/Monitoring_selection_add_service_button.PNG?raw=true)

Enter your own name for this monitoring selection and the URL of the service that is to be monitored. Confirm your setting by clicking the **Save** button. 

![Monitoring selection add service button](https://github.com/ccims/error-response-monitoring-service/blob/dev/payment-service-monitor/documentation/Pics/Monitoring_selection_add_service_entries.PNG?raw=true)

The service is now able to send Error reports to the Error Response Monitor and the newly added service is visible in the Monitoring Selection tab. 

![Monitoring selection add service button](https://github.com/ccims/error-response-monitoring-service/blob/dev/payment-service-monitor/documentation/Pics/Monitoring_selection_added_service_delete.PNG?raw=true)

A registered service can be removed by clicking the **Delete** button. 

## 2. Checking for semantical correctness

If you want to manually check if an endpoint is returning correct values go to the **Error Response** tab of the Monitoring Frontend. 

Initially you can see two input fields. First, enter the URL of the endpoint you want to query. After this select whether the request type is an http _GET_ or _POST_ request. More input fields will then appear based on your selection. 

![Error Response Overall](https://github.com/ccims/error-response-monitoring-service/blob/dev/payment-service-monitor/documentation/Pics/Error_response_URL_and_type.PNG?raw=true)

### GET requests:
We are going to have a look a the _GET_ request first. Enter your expected response when sending a request to this endpoint and click the **Send Request** button to send the request to the given endpoint. If the request is successful the returned value will be shown below the **Your Response** text. 

![Error Response Overall](https://github.com/ccims/error-response-monitoring-service/blob/dev/payment-service-monitor/documentation/Pics/Error_response_GET_success.PNG?raw=true)

In case the request is not succesful or the response does not match the expected value an error text will be shown and a Log Message will automatically be created. This Log Message can be seen within the **Work Check Logs** field. 



![Error Response Overall](https://github.com/ccims/error-response-monitoring-service/blob/dev/payment-service-monitor/documentation/Pics/Error_response_GET_log.PNG?raw=true)

### POST requests:
The process does work similarly when selecting the _POST_ request. Here you need to enter the excpected status code of the response as well as the post body when sending the request. After that the **Send Request** button can be clicked. 

![Error Response Overall](https://github.com/ccims/error-response-monitoring-service/blob/dev/payment-service-monitor/documentation/Pics/Error_response_POST_success.PNG?raw=true)

If the returned status code matches the expected one the response body will be shown below the **Your Response** text. However, if the status codes do not match an error text will be shown and a Log Message will be created which can be seen in the **Work check Logs** field. 

![Error Response Overall](https://github.com/ccims/error-response-monitoring-service/blob/dev/payment-service-monitor/documentation/Pics/Error_response_POST_log.PNG?raw=true)

## Additional Information

If you want to see all Logs received by the Error Response Monitor please go to the **Log Table View which is part of the [Issue Creator](https://ccims.github.io/overview-and-documentation/issue-creator). The Log table not only displays Log reveived by the Error Response Monitor but also from the [CPU Tracking Monitoring Service](https://ccims.github.io/overview-and-documentation/cpu-tracking-monitor), as well as received Logs from other Monitoring systems. 
