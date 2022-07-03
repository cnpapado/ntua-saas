# MICROSERVICE 03 - Fake FTP Server/ENTSOE alternative 

This is getting towards becoming an API giving access to the ENTSOE datasets, like the ENTSOE SFTP would. The datasets are stored in an AWS S3 bucket.

## Restful endpoints

### todo

## Kafka debugging using the CLI

```
confluent kafka cluster list
confluent kafka cluster use <cluster-id>
confluent kafka topic consume <topic-name> -b --print-key
or
confluent kafka topic produce <topic-name> --parse-key --delimiter ,
```
you may need `export PATH=$(pwd)/bin:$PATH` before using kafka cli