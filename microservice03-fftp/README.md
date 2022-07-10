# MICROSERVICE 03 - Fake FTP Server/ENTSOE alternative 

This is a microservice giving access to the ENTSOE datasets, like the ENTSOE SFTP would. The datasets can be stored in an AWS S3 bucket either locally.

Each csv is periodically downloaded and published into a kafka topic.

It also provides an REST api for debugging and monitoring purposes.

## Installation and use
1) `npm install`
1) Rename `config.env.template` into `config.env` and adjust the values to fit your own setup. 
- If you want to use the debugging api start the rest server with `node routes.js`.
- To download and publish a single datafile use:  
```shell
node publish_csv.js -f <FILENAME> -t <KAFKA_TOPIC> [--local <PATH>]
```
If `--local` flag is ommited then the dataset file specified in `<FILENAME>` is downloaded from the S3 bucket (which is configured in `config.env`) and published in the `<KAFKA_TOPIC>` Confluent topic.

If `--local` flag is provided then the files are not downloaded from AWS rather pulled locally from `<PATH>`. 

- To periodically download and publish all the datafiles use:
```shell
python3 publisher_deamon.py --dataset [agpt/fft/atl] --topic <KAFKA_TOPIC> --start-date 2022-1-1 --end-date 2022-2-2 --sec <SECS> [--local <PATH>]
```
With this script, every file of the [agpt/fft/atl] dataset is published into the kafka topic every `<SECS>` seconds. The filename (eg. `YYYY_MM_DD_HH_AggregatedGenerationPerType16.1.BC.csv`) is automatically generated ranging from `<START_DATE>` up to `<END_DATE>`

See `python3 publisher_deamon.py -h` for more.


## File structure

- `aws.js`: connectivity with AWS S3 buckets (connect to a bucket, download a single object, list all objects)
- `kafka.js`: connectivity with Kafka brockers (publish messages into a topic)
- `publish_csv.js`: main module of this system: downloads and publishes a single datafile
- `publisher_deamon.py`: Python script which periodically calls `publish_csv.js` for each dataset file. 
- `routes.js`: server for the REST api
- `tests/`: mocha unit tests



## Restful endpoints

#### /download-files
Download an object from S3 bucket.
- `GET`
- **params**: 
  - `csv_path` : path+filename of the object to be downloaded relative to bucket's root (eq.`/download-file?csv_path=datasets/agpt/2022_01_01_02_AggregatedGenerationPerType16.1.BC.csv`)
- **return**:
  - on success: 200 status code. A new filename named `newfile.csv` is created with the contents of the downloaded file.
  - on failure: 400 status.

#### /check-availability
Checks if the S3 is available and if we can connect to it.
- `GET`
- **params**: 
  - none
- **return**:
  - on success: 200 status code and the following object:
  ```javascript
  {
    status: "Success", 
    headBucket_ret_data: <DATA>, 
    headBucket_ret_error: null
  }
  ```  

  - on failure: 400 status code code and the following object:
  ```javascript
  {
    status: "Error", 
    headBucket_ret_data: null, 
    headBucket_ret_error: <ERROR>
  }
  ```

#### /get-objects
Lists all objects in the S3 bucket.
- `GET`
- **params**: 
  - none
- **return**:
  - on success: 200 status code and the following object:
  ```javascript
  {
    bucket_objects: <JSON_LIST>, 
    error: "false"
  }
  ```  

  - on failure: 400 status code code and the following object:
  ```javascript
  {
    bucket_objects: null, 
    error: "true"
  }
  ```

## Tests
Run unit tests with `npm test`.


## Kafka debugging using the CLI
Use:
```
confluent kafka cluster list
confluent kafka cluster use <cluster-id>
confluent kafka topic consume <topic-name> -b --print-key
or
confluent kafka topic produce <topic-name> --parse-key --delimiter ,
```
you may need to run `export PATH=$(pwd)/bin:$PATH` before using kafka cli