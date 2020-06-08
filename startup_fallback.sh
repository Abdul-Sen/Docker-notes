docker-compose up dockerpg
echo "starting 15 second sleep"
sleep 15
echo "slee over, starting node server"
docker-compose up server
