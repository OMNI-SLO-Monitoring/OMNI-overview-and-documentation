# Price Service
The Price Service can be regarded an active actor in the Monitoring Environment. It communicates with the Database Service by sending HTTP requests to its exposed endpoints and has inbuilt circuit breaker which, to an extent, can be customized by the user to satisfy their desired service communication latitude. These requests are sent once the exposed endpoints of the Price Service itself receive requests. Hence, the Price Service is highly dependent on the Database Service and must be used in conjunction with it to capitalize on its fullest potential. \
With its circuit breaker implementation, the Price Service is equipped with the necessary tools to detect abnormalities when communicating with the Database Service, which is able to deliberately simulate deviant behaviour. If during service communication abnormalities such as timeout of responses, server error and the like occur, the Price Service reports the issue at hand to the Error-Response Monitor. Similar to the dependency of the Database Service, the Error-Response Monitor must ideally be used in conjunction with the Price Service and the Database Service as well to obtain a highly functioning environment. 


## Installation and Setup

The Price Service consists of a frontend and a backend component. It is advised to have both up and running to quickly adjust and update the circuit breaker settings as well as send requests using the interface and to receive visual feedback of the outcome of the request. As mentioned prior, the [Database Service](https://ccims.github.io/overview-and-documentation/database-service) as well as [Error-Response Monitor](https://ccims.github.io/overview-and-documentation/error-response-monitor) are crucial dependencies of the Price Service and thus must be up and running during the usage of it. 

[How to set up Price Service backend (see "Backend" section)](https://github.com/ccims/price-service/blob/dev/README.md) \
[How to set up Price Service frontend (see "Frontend" section)](https://github.com/ccims/price-service/blob/dev/README.md)

## Pictures
The User Interface of the Price Service
![Price Service UI](https://github.com/ccims/price-service/blob/dev/documentation/FullUI.png?raw=true)

## Functionalities
The Price Service encompasses multiple functionalities which revolve around service communication. Here, the ability to send requests and receive responses when interacting with the Database Service presents the fundamental function for additional features to be build upon such as the circuit breaker logic. 

### Communication with the Database Service
Once up and running at localhost:3300, once can use the interface of the Price Service to directly send requests to the Database Service. Needless to say, the service itself then exposes various endpoints, which upon encountering a request, sends a request to the Database Service. This means that peripheral services can call certain endpoints of the Price Service to indirectly communicate with the Database Service. At http://localhost:3300/api a list of all API endpoints, generated from the Swagger IO, can be obvserved. The corresponding Swagger JSON file can be founed at http://localhost:3300/api-json.

#### GET endpoints:
* **/request** \
  Sends a HTTP GET request to the Database Service at http://localhost:3000. 
 
* **/request/balance** \
  Sends a HTTP GET request to the Database Service's endpoint at /request-handler/balance.
  
* **/request/customer-name** \
  Sends a HTTP GET request to the Database Service's endpoint at /request-handler/customer-name.
  
* **/request/account-worth** \
  Sends a HTTP GET request to the Database Service's endpoint at /account-worth.
  

The user is given the freedom to determine which request to send in the user interface. Here the label of the selections are intuitively mapped to the endpoints of the Database Service, requests are ultimately sent to.

![Price Service Request Types](https://github.com/ccims/price-service/blob/dev/documentation/RequestTypes.PNG?raw=true)


After confirming the selection of the request type, the user can execute the request by clicking the "Send request to database" button. 

![Price Service Send Button](https://github.com/ccims/price-service/blob/dev/documentation/SendRequestButton.PNG?raw=true)


The outcome of the request is rendered in the "Output" section. Based on the response settings of the Database Service and the circuit breaker settings of the Price Service, the request can either be a success or a failure. In both cases, a feedback is provided to the user visually and if response data is fetched, it is displayed too. \
If a request fails, the Price Service additionally sends a report which conforms the [Error Format](https://github.com/ccims/logging-message-format/blob/dev/src/error-format.ts) to the Error-Response Monitor stating the details of the failure.

![Successful Request](https://github.com/ccims/price-service/blob/dev/documentation/SuccessfulRequest.PNG?raw=true)
![Failed Request](https://github.com/ccims/price-service/blob/dev/documentation/FailedRequestLarge.PNG?raw=true)

### The Circuit Breaker
The Circuit Breaker is applied to all requests the user can choose from in the interface, and hence it is applied to all requests the Price Service can send. \
We discern between two circuit breaker types: the Consecutive Breaker and the Sample Breaker. The type can be specified in the interface under "Circuit Breaker Config".

![Circuit Breaker Types](https://github.com/ccims/price-service/blob/dev/documentation/BreakerTypes.PNG?raw=true)


Each type bears its own distinct properties, providing the user the possibility of choosing the type most apt for their environment. 

![Consecutive Breaker](https://github.com/ccims/price-service/blob/dev/documentation/ConsecutiveBreaker.png?raw=true) ![Sampling Breaker](https://github.com/ccims/price-service/blob/dev/documentation/SampleBreaker.png?raw=true)


By clicking the "Change Configuration" button, the circuit breaker settings are updated. 

![Change Configuration Button](https://github.com/ccims/price-service/blob/dev/documentation/ChangeConfigButton.PNG?raw=true)


This update is visually stated in the "Output" section. 

![Breaker Update](https://github.com/ccims/price-service/blob/dev/documentation/BreakerUpdate.PNG?raw=true)
