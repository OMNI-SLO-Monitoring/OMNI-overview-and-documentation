# Account Service

The Account service is part of the monitoring environment and is used to Send requests to the [Price Service](https://ccims.github.io/overview-and-documentation/price-service) and [Database Service](https://ccims.github.io/overview-and-documentation/database-service). Its features were kept very basic and simple which is the reason why this service only consists of a frontend part with no backend provided.  
Requests sent to the Price Service are also transferred to the Database Service. The reason behind this implementation was to provide a chain request where the http request is traveling through multiple services. In case one service is malfunctioning in such a chain request, multiple services would send errors to the monitoring system. With the account service this behaviour can be simulated and can be used to seee how the monitoring system deals with these multi-errors. 

## Installation and setup
The Account Service consists of a frontend and a backend component.
Follow the frontend [installation steps](https://github.com/ccims/account-service/blob/dev/frontend/README.md) given in the Github Repository of the Account Service (with default configurations the Account Service sits on [localhost:4100](http://localhost:4100/)). \
The backend [installation steps](https://github.com/ccims/account-service/blob/dev/account-service-backend/README.md) can also be found in Github Repository of the Account Service. The backend is located at [localhost:3200](http://localhost:3200/)).
Furthermore, the backend of the Database Service and the Price Service should also be installed and running in order to use all functionalities of the Account Service. \
If errors are returned the Account service will automatically try to send reports to the Monitoring System, so make sure that the [Error Response Service](https://github.com/ccims/error-response-monitoring-service) of the Monitoring System is also running if you want to detect these errors in form of Log Messages. 

## Structure

Account Service UI:

![Account Service](https://github.com/ccims/account-service/blob/dev/documentation/Pics/Account_Service_full.PNG?raw=true)

## Functionalities

The Account service is able to send different http GET requests to the Database-service as well as the Price-service using its backend. The responses of the respective http request is then shown on on screen. In case the Database- or the Price Service is not available an error is returned. In this case the Account service will send an error report to the monitoring system, given that the latter is also running. 

### 1. Sending requsts to Database Service

To send requests to the Database Service, select the Database service in the **Request Destination** field. The request type can also be selected in the field below. \
By clicking the **Send Request** button the request will now be sent to the URL of the database service.

![Account service DB config](https://github.com/ccims/account-service/blob/dev/documentation/Pics/Account_Service_DB_config.PNG?raw=true)

Depending on the configuration of the Database Service the response will be shown in the Output field. This may take some timme as the Database Service has a default simulated response time of 5 seconds.

![Account Service](https://github.com/ccims/account-service/blob/dev/documentation/Pics/Account_Service_DB_request_success.PNG?raw=true)

If the request fails the failed response is highlighted red. The Account service will automatically try to reach the monitoring system in order to send an error report.

![Account Service](https://github.com/ccims/account-service/blob/dev/documentation/Pics/Account_Service_DB_request_fail.PNG?raw=true)

### 2. Sending requests to Price Service

Sending requests to the Price Service works, in its core, very similarly to requests sent to the Database Service. Note that requests sent to the Price Service are transferred to the Database Service. Hence, the same results can be expected when sending requests to the Price Service or the Database Service. As explained in the section above this approach was used to simulate a chain request. \
Select the Price Service in the **Request Destination** and the type of request in the **Choose Request** field. 

![Account Service](https://github.com/ccims/account-service/blob/dev/documentation/Pics/Account_Service_Price_config.PNG?raw=true)

If the request was successful the result will be shown in the output field.

![Account Service](https://github.com/ccims/account-service/blob/dev/documentation/Pics/Account_Service_Price_request_success.PNG?raw=true)

If either the Price or Database service is not available an error will be shown. The Monitoring System, if available, will automatically be informed about this error. 

![Account Service](https://github.com/ccims/account-service/blob/dev/documentation/Pics/Account_Service_Price_request_fail.PNG?raw=true)
