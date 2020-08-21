# CPU Tracking Monitoring Service

The CPU Tracking Monitoring Service is part of the Monitoring System and, as evident by its name, is used to Track the CPU utilization of different services, in particular NestJs services. \
Services that should be monitored by the CPU Tracking Monitor have to provide a special **/cpu** endpoint. This _cpu_ endpoint is provided by our **CPU utilization Observer** module. If you want to know how to implement this module into your NestJs service follow the [CPU utilization Observer installation steps](). \
The CPU Tracking Monitor is divided into a frontend and a backend part. The frontend can be found in the [Combined Monitoring Frontend](https://github.com/ccims/monitoring-frontend) under the **CPU Utilization** tab, whereas the backend is implemented as its own service.

## Installation and Setup

Both the Combined Monitoring Frontend and the CPU Tracking Monitor backend must be installed and up and running for the CPU Tracking Monitoring Service to fully function.

[How to set up CPU Monitor backend](https://github.com/ccims/CPU-tracking-monitoring-service) \
[How to set Monitoring frontend](https://github.com/ccims/monitoring-frontend)

In the following examples we are going to use the [Database Service](https://ccims.github.io/overview-and-documentation/database-service) of our Monitoring Environment to Track its CPU utilization. If you want to test the functionality of the CPU Tracking Monitor with this service install the **backend** part of the Database Service so its _/cpu_ endpoint can be queried by the CPU Tracking Monitor. 

Furthermore, the CPU Tracking Monitoring service will automatically send Log-Messages to the [Issue Creator]() as soon as either a given maximum CPU Threshhold is exceeded or a minimum value is undercut. If theses Log Messages need to be saved it is necessary for the Issue Creator to also be installed and running. 

## Structure

CPU Tracking Monitoring Service frontend: 

![CPU Monitor Overall](https://github.com/ccims/CPU-tracking-monitoring-service/blob/Dev/documentation/Pics/CPU_Monitor_overall.PNG?raw=true)

## Functionalities

The main feature of the CPU tracking Monitoring Service is to query given /cpu endpoint of a NestJs service for CPU utilization and detect whether specific values are exceeded or undercut. All functionalities will be described using the Database Service which provides such a CPU endpoint. 

### 1. Add new CPU endpoint

A new CPU enpoint can be selected by clicking the **Add** button on the top right part of your screen. A new dialog will then popup:

![CPU Monitor add endpoint](https://github.com/ccims/CPU-tracking-monitoring-service/blob/Dev/documentation/Pics/CPU_Monitor_add_endpoint.PNG?raw=true)

Enter a name for the CPU Endpoint as well as the URL of the CPU endpoint that should be observed. Keep in mind that the service that is getting monitored should be providing its configured _/cpu_ endpoint which means that under normal circumstances your entered URL must end with "/cpu".

![CPU Monitor Name URL](https://github.com/ccims/CPU-tracking-monitoring-service/blob/Dev/documentation/Pics/CPU_Monitor_Name_URL.PNG?raw=true)

Select the minimal and critical CPU utilization. If the CPU utilization is not inside this given range a Log Message is reported to the Issue Creator. The values represent the percentage of the CPU utilization so thereofore only numbers between 0 and 100 are valid to enter in both input fields. \
Furthermore, make sure that the minimum value is not higher than the max. value, as in that case a log for either too high or too low CPU utilitazion would always be created or even worse, a log for both too high and too little CPU utilization, which makes no sense at all. \
If you do not want to use both the minimum and the maximum threshhold just enter either _0_ or _100_ in their respective input field as these value cannot be exceeded/undercut. 

![CPU Monitor Name URL](https://github.com/ccims/CPU-tracking-monitoring-service/blob/Dev/documentation/Pics/CPU_Monitor_min_max.PNG?raw=true)

And finally, you can add the query frequency in milliseconds of the CPU Monitor. Logically, there are only positive numbers allowed for this input field. We recommend using a query frequency of at least one second for the CPU Monitor as too small numbers do result in a very high query frequency and therefore in a flooding of CPU Logs in case the thersholds are exceeded. 

![CPU Monitor Name URL](https://github.com/ccims/CPU-tracking-monitoring-service/blob/Dev/documentation/Pics/CPU_Monitor_Query_frequency.PNG?raw=true)

Click the **Save** button and the CPU endpoint will be added to your list of all monitored CPU endpoints.

### 2. Edit CPU endpoint

Editing CPU endpoints can be done by going to the CPU endpoint which you want to edit and clicking the **Edit** button. A new dialog with all the previoulsy selected values will then popup and you can change these values as explained in section 1.

![CPU Monitor Name URL](https://github.com/ccims/CPU-tracking-monitoring-service/blob/Dev/documentation/Pics/CPU_Monitor_edit_endpoint.PNG?raw=true)

### 3. Delete CPU endpoint

To delete a CPU endpoint simply click on the **Delete** Button. Note that the deletion process cannot be undone! If you want to remonitor a deleted CPU endpoint you have to add a new CPU endpoint and reenter your values. 

![CPU Monitor Name URL](https://github.com/ccims/CPU-tracking-monitoring-service/blob/Dev/documentation/Pics/CPU_Monitor_delete_endpoint.PNG?raw=true)
