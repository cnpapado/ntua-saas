# Build docker image
docker build . -t sample-app
# Run docker image
docker run -it -p 3000:3000 sample-app