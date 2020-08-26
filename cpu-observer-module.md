# CPU-utilization-observer 

The CPU-utilization-observer is an importable module and is used to fetch the cpu value and a simulated value by accessing a port that is created by this module.

## Installation and Setup
[How to set up the CPU-utilization-observer](https://github.com/ccims/cpu-utilization-observer) 

## Functionalities

The main feature of the CPU-utilization-observer is to create a port on /cpu to fetch the real cpu value and cpu/simulated to fetch a simulated,  hardcoded value. The ports will be available at 'http://hostname/cpu' or 'http://hostname/cpu/simulated' 

#### GET endpoints created:
* **/cpu** \
  Successful response type:  Returns a the real, current CPU value. \
  Erroneous response type: Rejects the request.
  
* **/cpu/simulated** \
  Successful response type: Returns a fixed simulated CPU value. \
  Erroneous response type: Rejects the request.


## Additional Information

In our Project the module is currently only in use for the [CPU Monitor backend](https://github.com/ccims/CPU-tracking-monitoring-service) to scrape the cpu value. But this module can be used in different Backends as well to get the (simulated) CPU value.
