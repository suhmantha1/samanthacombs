#!/bin/bash

#Enter the Mongo DB name (should be same locally and remotely).
dbName=sam

#Enter the Project name (should be what you called it for stagecoach).
projectName=sam

#Enter the SSH username/url for the remote server.
remoteSSH=nodeapps@45.79.189.133

echo "YOU ARE SYNCING FROM DEVELOPMENT TO STAGING,\n NOW IS YOUR CHANCE TO CONTROL+C..."
sleep 5
echo "Syncing MongoDB"

mongodump -d $dbName -o /tmp/mongodump.$dbName &&
rsync -av  /tmp/mongodump.$dbName/ $remoteSSH:/tmp/mongodump.$dbName  &&
ssh $remoteSSH mongorestore --drop -d $dbName /tmp/mongodump.$dbName/$dbName &&
echo "Syncing Files" &&
rsync -av --delete ./public/uploads/ $remoteSSH:/opt/stagecoach/apps/$projectName/uploads &&
echo "Synced up to dev to production"