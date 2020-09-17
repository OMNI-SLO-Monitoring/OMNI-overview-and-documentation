# Log Types

We are distinguishing between 4 different Log Types each corresponding to different types of Errors: CPU, Error, Timeout and CB_Open Errors. 

## Example Situations for using a Log Type

### 1. CPU
Imagine a user who wants to work with our registered service to do something. His Computer is on the slower side and after experiencing problems with his CPU on his device before, he sets the CPU threshold to make report if the CPU utilization exceeds 80% for 3 minutes in our [Prometheus Client](https://github.com/ccims/overview-and-documentation/blob/gh-pages/alert-converter.md).
```shell
#Alert for CPU load being over 80% for 3 minutes
  - alert: HostHighCpuLoad
    expr: 100 - (avg by (instance) (irate(windows_cpu_time_total{mode="idle"}[1m])) * 100) > 80
    for: 3m
    labels:
      severity: warning
    annotations:
      summary: "Host high CPU load (instance {{ $labels.instance }})"
      description: "{ \"descriptionMessage\" : \"CPU load is > 80%\" \n , \"LogType\" : \"cpu\" \n , \"VALUE\" : {{$value}} }"
```
After about an hour of work the user starts getting distracted with texting people on his Laptop and he starts watching some videos, opening tab after tab on his browser; all while this service is running on his Laptop. Our monitoring service notices the high CPU load and our Prometheus Client creates a [Log Message ](https://github.com/ccims/logging-message-format/blob/dev/src/logging-message-format.ts) with the Log Type **CPU**. 
### 2. Timeout 
Our example User once again wants to work with their registered service to do something but this time around he wants to send a get request to another service. However, due to his connection breaking down, the request was timed out. Ideally, the service then reports the error in the [Error Format](https://github.com/ccims/logging-message-format/blob/dev/src/error-format.ts) to the Error Response Monitor from which a Log Message with the type **Timeout** will be created.
### 3. Error 
Our User example User wants to work on his registered service again. This time around he wants to check whether his service outputs the semantically correct response. This is done via our [Monitoring frontend](https://github.com/ccims/monitoring-frontend). ![Choosing Semantical correct response](https://i.gyazo.com/c5694c97e3c9a6fb9bdd8019123c11b3.png)\
If his service now outputs a semantically different response from the Expected Response, our monitor will show in the UI that the expected and the actual Response do not match.

 ![Incorrect Response](https://i.gyazo.com/111c3fbaf6ca706d96efd9506c52c168.png)\
 In this case a [Log Message ](https://github.com/ccims/logging-message-format/blob/dev/src/logging-message-format.ts) with the Log Type **Error** will be created and eventually an Issue. 
### 4. CBOpen
Imagine the Example User working on a system consisting of 2 services and a *Circuit Breaker*, that is set to open at 3 consecutive failures, between them. Our user wants to send a request some data via an HTTP request from 1 service to another. However, the service that is supposed to respond to the request is currently down and thus our impatient example user tries to send more requests which will ultimately timeout. That leads to the Circuit Breaker opening, which will then sends an error message in the [Error Format](https://github.com/ccims/logging-message-format/blob/dev/src/error-format.ts) to our monitoring service which will then be used to create a Log Message with the Log Type **CB_Open**.

