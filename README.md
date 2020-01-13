A legacy payment systems simulator that accepts HTTP requests and generates an ISO message to be sent over TCP. 

Specifically designed to interact with ISO-Open-API-Adaptor: https://github.com/appliedpayments/ISO-Open-API-Adaptor

### TCP Client
This is a TCP client designed to connect with the ISO-Open-API-Adaptor TCP server. It sends ISO messages across the connection.

### HTTP Server
This is an HTTP server that exposes endpoints. The given input is used to construct the ISO messages to be sent across the TCP connection.

### Configuration
Some environment variables are required:

| FIELD                    | DEFAULT                           |
| ------------------------ | --------------------------------- |
| HTTP_HOST                | localhost                         |
| HTTP_PORT                | 4000                              |
| TCP_HOST                 | localhost                         |
| TCP_PORT                 | 3001                              |


### Endpoints

Method | Path | Description | Expected Input
|-|-|-|-
*post* | /withdrawal | accepts a MSISDN and an amount which is used to generate an ISO0100 message | { MSISDN: string, amount: string }
*post* | /authorization | accepts an OTP which is used to generate an ISO0200 message | { otp: string }
