#! /bin/sh

sshpass -p $DEPLOY_PASSWORD ssh -A travis@$DEPLOY_SERVER <<EOF
    cd $DEPLOY_DIR
    docker-compose up --force-recreate --no-deps -d notenic-api
    docker rmi -f jkostov/notenic-api:latest
    docker image prune -f
EOF
