# NTUA ECE SAAS 2022 PROJECT
  
## TEAM (56)
  # Energy Live 2022 :part_alternation_mark: :zap:
> Get visualized real-time energy stock exchange data.


EnergyLive 2022 helps you visualize real time data from the energy stock exchange based on various criteria. 

![](header.png)

## Project structure

    .
    ├── architecture                     # UML diagrams of project architecture
    ├── microservice01_frontend          # Frontend microservice to display real-time charts 
    ├── microservice03-fftp              # Microservice to emulate ftp server, places data in kafka topics in set intervals 
    ├── microservice05-ATL               # Actual Total Load Firestore database configuration
    ├── microservice09-AGPT              # Generation Per Type Firestore database configuration
    ├── microservice10-FFT               # Cross Border Flows Firestore database configuration
    ├── microservice06-intermediate      # Handler for refresh requests
    ├── microserviceXX-dev               # Sandbox microservices used for development-debugging
    └── README.md

## Installation

Windows:

```
npm install
```
## Run frontend locally 
1) Clone the repo
2) Change current folder to frontend
```
cd microservice01_frontend
```
3) Run
```
npm start
```
<em>(Or run locally as a container using <br>
```docker build . -t sample-app```
```docker run -it -p 3000:3000 sample-app```)<br>
> **Warning**
> Don't forget to replace the working directory in the Dockerfile with your current working directory
</em>



## Run frontend remotely
https://microservice01frontend-5dhg4gvi6a-ey.a.run.app

## Run backend locally 
1) Clone the repo
2) Change current folder to backend
```
cd microservice06-intermediate
```
3) Run 
```
node server.js
```
<em>(Or run locally as a container using <br>
```docker build . -t sample-app```
```docker run -it -p 3000:3000 sample-app```)<br>
> **Warning**
> Don't forget to replace the working directory in the Dockerfile with your current working directory
</em>

## Run backend remotely
Send GET requests to: https://microservice06-intermediate-vslormdula-ey.a.run.app

## Usage example
![image](https://user-images.githubusercontent.com/49884434/179519926-501d564c-faaa-425b-9ec3-6ae440c40746.png)

![image](https://user-images.githubusercontent.com/49884434/179599967-d7fd1122-243b-472e-8f81-6e7b8403c0ae.png)

![image](https://user-images.githubusercontent.com/49884434/179520398-1540c591-721e-4619-9aff-009ebf4de313.png)

![image](https://user-images.githubusercontent.com/49884434/179520556-3d5797a2-cfd9-4927-91b0-61d24fc27e27.png)

### jMeter stress testing on server deployed on Cloud Run
(Specs: 1 CPU, 500MB memory)
![image](https://user-images.githubusercontent.com/49884434/179575851-fe697617-b0aa-4882-b83b-e4cca290b6ce.png)

## Team Members
Evangelia Grizaniti<br>
Christos Nikolopoulos<br>
Konstantinos Nikolaos Papadopoulos<br>
Despoina Mousadi<br>
Elisavet Lydia Alvanaki<br>



  
## Kafka & database setup  
***
**how to fetch data from AWS bucket and store them in Firestore Databases(3 depending on the Dataset)**

_You have to open 6 terminals_

* In 3 of them cd to /microservice03-fftp
* Run npm install in order to install all the packages needed
* In 1st 2nd and 3rd terminal run the command 
_python3 publisher_deamon.py --dataset [fft/agpt/atl] --topic [fft/agpt/atl]-csv --start-date 2022-1-1 --end-date 2022-2-2 --sec X
***where X is user defined*** 
_recommended time: 10 minutes to resemble functionality of entsoe service but in order to quickly spot data updates/fixes 40-50 secs will suffice_
* In the other 3 terminals
    * Cd to microservice05-ATL then `npm install` and then `npm run dev` --- Topics from kafka being read and data being inserted into database
    * Cd to microservice09-AGPT and follow the above mentioned steps
    * Cd to microservice10-FFT same here

Now the `consumer.js` scripts are the ones that consume data from Kafk topics and place them into the appropriate database whose configuration can be seen under /firebase/firebase-config.js
We have opted for 3 different Firebase projects, each with its own Firestore Database so as to better manage the data and the queries applied to them
Under /kafka directory the configurations for kafka clients/consumers are explicitly declared

>There you have it!

***Very important***
In case of errors appearing in ATL/AGPT/FFT terminals such as _TLS cliend disconnected before establishing a secure connection_ you have 2 options(the first one almost always works)
1. Wait till you see data objects appearing in terminal(new csv file has probably just been read and placed into Kafka topics)
2. In case data is flowing in fftp terminal but not in the mentioned above terminals Ctrl+C and reset all all terminals

Similar with errors in the fftp terminals
---
The first option is usually the one to go with as csv files are being fetched from AWS bucked and placed into Kafka topics

  
