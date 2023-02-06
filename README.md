# Energy Live 2022 :part_alternation_mark: :zap:
> Get visualized real-time energy stock exchange data.


EnergyLive 2022 helps you visualize real time data from the energy stock exchange based on various criteria. 
It was developed as the semester project for the "Software-as-a-Service technologies" course at NTUA.
![](header.png)

| Team Members |
|---------------------|
|Evangelia Grizaniti|
|Christos Nikolopoulos|
|Konstantinos Nikolaos Papadopoulos|
|Despoina Mousadi|
|Elisavet Lydia Alvanaki|

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

## Usage example
![image](https://user-images.githubusercontent.com/49884434/179519926-501d564c-faaa-425b-9ec3-6ae440c40746.png)

![image](https://user-images.githubusercontent.com/49884434/179599967-d7fd1122-243b-472e-8f81-6e7b8403c0ae.png)

![image](https://user-images.githubusercontent.com/49884434/179520398-1540c591-721e-4619-9aff-009ebf4de313.png)

![image](https://user-images.githubusercontent.com/49884434/179520556-3d5797a2-cfd9-4927-91b0-61d24fc27e27.png)

### jMeter stress testing on server deployed on Cloud Run
(Specs: 1 CPU, 500MB memory)
![image](https://user-images.githubusercontent.com/49884434/179575851-fe697617-b0aa-4882-b83b-e4cca290b6ce.png)


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
 
