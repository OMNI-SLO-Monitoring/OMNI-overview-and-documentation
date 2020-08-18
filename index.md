# Issue-Creating Monitoring for SLA-driven Issue Management System

## 1. Introduction
This User Manual provides an elaborate insight into the Issue-Creating Monitoring of the SLA-driven Issue Management System and the entire environment built around it. Elucidations of the functionality and purpose of the individual components are located in their dedicated chapters. 

### Fundamentals
The Issue-Creating Monitoring System aims to detect errors in a microservice architecture and subsequently creates issues, characterizing very detailed the undesired behaviour. These issues are thereupon sent to a predefined API to be further processed and evaluated. 

This system dissected into its modular components comprises **two monitors** which produce and send logs corresponding to the observed errors, an **Issue Creator** that retrieves logs from the message queue and conducts a conversion into issues and a **message queue** responsible for the reception of logs from the monitors. In order to probe the system in an apt environment, we have set up various services that interact with requests as well as responses and additionally bear the capability of deliberately simulate malfunctioning behaviour. It is crucial to mention that the communication among services and between services and monitors is based upon HTTP. 

The monitoring process in and of itself adopts common monitoring techniques such as pulse checking, heartbeat reception and end-to-end checking. 

Pulse checking is realized by the CPU-Tracking Monitor which queries the cpu utilization of registered services whereas heartbeat reception is performed by the Error-Response Monitor that receives reported errors from services during service communication. End-to-end checks are realized by the latter service as well, in which the Database Service in particular can be tested through purposeful inquiring of its functionality. 

As briefly touched on before, error observations are formed to logs containing necessary detail for thorough comprehension of the unwanted behaviour and sent to the message queue. The Issue Creator extracts logs from the Message Queue and converts them into issues that satisfy a predefined Issue Format. From there on, issues are dispatched to the API of a separate constituent of the Issue Management System and are exposed to further assessment and processing.

## 2. Monitoring Environment
The Monitoring Environment in its entirety is composed of the Issue-Creating Monitoring System and the auxiliary services. This section offers in-depth understanding of each unit's functionality and usage.

### 2.1 Monitored Services 
The three services form the periphery of the central Monitoring System. They possess the ability to interact with each other by sending requests and responses through HTTP  and are chiefly designed to establish a tangible deployment environment for the Monitoring System. Hence, failure in behaviour can be elicited with selected services to examine the Monitoring System.

#### 2.1.1 Database Service

#### 2.1.1 Price Service

#### 2.1.1 Account Service

### 2.2 Monitors 
The monitors represent the core of the Monitoring System. Viewed as an aggregate, the system utilizes different monitoring techniques to detect erroneous behaviour of the services. 

#### 2.2.1 CPU-Tracking Monitor

#### 2.2.2 Error-Response Monitor

### 2.3 Issue Creation 
7´'?=(  ^1he Issue Creator component in combination with the message queue realize the module accounting for the issue creation in the system. Dequeueing logs from the message queue, the Issue Creator converts them into issues and dispatches them.

#### 2.3.1 Message Queue

#### 2.3.2 Issue Creator

[Gh_pages_format](https://ccims.github.io/overview-and-documentation/Gh_pages_format)

