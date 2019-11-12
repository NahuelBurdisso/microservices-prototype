# Run Docker compose
docker-compose up --build

# Stop all Docker container
docker stop $(docker ps -a -q)

# Remove all Docker container
docker rm $(docker ps -a -q)