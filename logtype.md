# Log Types

We are distinguishing between 4 different Log Types each corresponding to different types of Errors: CPU, Error, Timeout and CB_Open Errors. 

## Example Situations for using a Log Type

### 1. CPU
Imagine a user who wants to work with our registered service to do something. His Computer is on the slower side and after experiencing problems with his CPU on his device before, he sets the CPU threshold to make report if the CPU utilization exceeds 80% for 3 minutes in our [Prometheus Client](https://github.com/ccims/overview-and-documentation/blob/gh-pages/alert-converter.md).
```yaml
#Alert for avg CPU load being over 80% for 3 minutes
  - alert: HostHighCpuLoad
    expr: 100 - (avg by (instance) (irate(windows_cpu_time_total{mode="idle"}[1m])) * 100) > 80
    for: 3m
    labels:
      severity: warning
    annotations:
      summary: "Host high CPU load (instance {{ $labels.instance }})"
      description: "{ \"descriptionMessage\" : \"CPU load is > 80%\" \n , \"LogType\" : \"cpu\" \n , \"VALUE\" : {{$value}} }"
```
After about an hour of work the user starts getting distracted with texting people on his Laptop and he starts watching some videos, opening tab after tab on his browser; all while this service is running on his Laptop. The Prometheus Client notices the high CPU utilization and sends the alert first to the Prometheus Alert Manager which then sends it to our Alert Converter. The Alert Converter will create a  [Log Message ](https://github.com/ccims/logging-message-format/blob/dev/src/logging-message-format.ts) with the Log Type **CPU** out of the Prometheus Alert. 

 <img src="https://i.gyazo.com/ba91c1584d2a8f3b02cc6f1d446a0a75.png" width="1080" height="250">


 ![Log Cpu](https://github.com/ccims/overview-and-documentation/blob/master/formats/LogMessageFormat/Example_Logs_model/CPU_Log.png?raw=true)

### 2. Timeout 
Our example User once again wants to work with their registered service to do something but this time around he wants to send a get request to another service. However, due to his connection breaking down, the request was timed out. In this case, the service then reports the error in the [Error Format](https://github.com/ccims/logging-message-format/blob/dev/src/error-format.ts) to the Error Response Monitor from which a Log Message with the type **Timeout** will be created. 

 <img src="https://i.gyazo.com/4952e1606bab745d1300f5d21c92cf23.png" width="1080" height="250">

![Log Timeout](https://github.com/ccims/overview-and-documentation/blob/master/formats/LogMessageFormat/Example_Logs_model/Timeout_Log.png?raw=true)

### 3. Error 
Our User example User wants to work on his registered service again. This time around he wants to check whether his service outputs a semantically correct response. This is done via our [Monitoring frontend](https://github.com/ccims/monitoring-frontend). 

![Choosing Semantical correct response](https://i.gyazo.com/c5694c97e3c9a6fb9bdd8019123c11b3.png)

If his service now outputs a semantically different response from the Expected Response, our monitor will show in the UI that the expected and the actual Response do not match.

![Incorrect Response](https://i.gyazo.com/111c3fbaf6ca706d96efd9506c52c168.png)\
 In this case a [Log Message ](https://github.com/ccims/logging-message-format/blob/dev/src/logging-message-format.ts) with the Log Type **Error** will be created and eventually an Issue. 

<img src="https://i.gyazo.com/f47f969e900b619ff9a5df568e7b7e22.png" width="1080" height="250">

![Log Error](https://github.com/ccims/overview-and-documentation/blob/master/formats/LogMessageFormat/Example_Logs_model/Error_Response_Log.png?raw=true)

### 4. CBOpen
Imagine the Example User working on a system consisting of 2 services and a *Circuit Breaker*, that is set to open at 3 consecutive failures, between them. Our user wants to send a request some data via an HTTP request from 1 service to another. However, the service that is supposed to respond to the request is currently down and thus our impatient example user tries to send more requests which will ultimately timeout. That leads to the Circuit Breaker opening, which will then sends an error message in the [Error Format](https://github.com/ccims/logging-message-format/blob/dev/src/error-format.ts) to our monitoring service which will then be used to create a Log Message with the Log Type **CB_Open**.

<img src="https://i.gyazo.com/8454682e4f0b3726b0bf3c0ad112bcf2.png" width="1080" height="250">

![Log CB Open](https://github.com/ccims/overview-and-documentation/blob/master/formats/LogMessageFormat/Example_Logs_model/CBOpen_Log.png?raw=true)


