# Prometheus Alert Converter

The Prometheus Alert Converter turns Prometheus Alerts into messages that conform the defined [Log Message Format](https://github.com/ccims/logging-message-format/blob/dev/src/logging-message-format.ts). It extracts the information corresponding to the fields of the Log Message Format from Prometheus Alerts and populates the resulting logs accordingly. After having completed the conversion, the Alert Converter appends the logs into the Kafka Queue which is included in the [Error-Response Monitor](https://ccims.github.io/overview-and-documentation/error-response-monitor) for the Issue Creator to retrieve them. Hence, the Alert Converter is part of the Prometheus Monitoring Setup, an auxiliary constituent of our Monitoring Environment, and therefore works solely in conjunction with multiple services which will be addressed in the 'Installation and Setup' section.

## Installation and Setup 

[How To Setup Alert Converter](https://github.com/ccims/Prometheus-Alert-Converter/blob/dev/README.md) \
As mentioned before, the Alert Converter has numerous dependencies all of which are mentioned in the guide above. The Prometheus Client, the Prometheus Alert Manager, the Windows Exporter as well as the Kafka Queue in the Error-Response Monitor must be up and running in order to achieve the desired performance of the Alert Converter.
Once setup, the Alert Converter is located at localhost:3900, the Prometheus Client at localhost:9090, the Prometheus Alertmanager at localhost:9093, the Windows Exporter at localhost:9182 and lastly the Kafka Queue at localhost:9092.

## Functionalities

The fundamental functionalities comprise the reception of the Alerts from the Alert Manager. the conversion into logs of the above-mentioned Log Message Format and the insertion into the Kafka Queue for further retrieval. 

### Receiving and Handling Alerts
The Alert Converter receives Prometheus Alerts from the Prometheus Alert Manager. These Alerts are created when a certain rule defined in the configuration of the Prometheus Client is violated. As of now, we have defined three rules in total. \
The first rule is the most important one and it prescribes that the CPU utilization must not exceed 80%. To realize this pulse check approach, the Windows Exporter exposes a /metrics endpoint for the Prometheus Client to scrape. Here, it is crucial to mention that the Windows Exporter measures only the CPU utilization of Windows Systems. In the future, our setup may adopt the Node Exporter which will enable the CPU measurement of Linux Systems. \
The second rule makes sure that the Alert Converter is indeed up and running, and thus able to receive Alerts. \
Ultimately, the thrid rule probes the validity of newly created rules. For the Alert Converter to pertain an Alert to the corresponding Log Type however, rules must have names that contains the substring of one of the Log Types from the Log Message Format and the description must contain 'Value = $value'.

Once an active rule has been violated, the Prometheus Client will create an Alert that undergoes a 'Pending' stage before being fired in the 'Firing' stage to the Alert Manager which thereupon transfers the Alert to the Alert Converter. It then extracts the information pertinent to the log based on the Log Message Format from the content of the received Alert and populates the log instance. The created log is then appended to the Kafka Queue under the topic of 'logs' for the Issue Creator to retrieve it.

