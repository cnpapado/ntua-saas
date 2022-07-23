# Demo microservice with CI-CD with Docker, AWS and Travis

This is just a demo application in a docker container. (In our private repo) Travis CI handles auto test execution and automatically deploys it into an AWS EC2 instance.

## Notes
### AWS
- Add custom TCP rule allowing port 8000
- SSH with `ssh -i /home/c/Downloads/mykeypair.pem ubuntu@35.173.1.14`
- If you get an "unprotected private key file!" error message while attempting to ssh to the instance try changing the private key's permissions: `chmod 400 /path/to/privatekey.pem`

### Docker 
- Build with
```
sudo docker build -t <img-name> .
```
(note the fullstop = dockerfile path)
- Run the instance in background with 
```
sudo docker run -p 8000:8000 <img-name> &
```
8000:8000 passes the traffic from host port 8000 to container's port 8000
