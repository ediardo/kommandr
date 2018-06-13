# kommandr.com

Utilize a centralized command center at Kommandr.com and discover, learn, save, and share commands. Watch demo video [here](https://www.youtube.com/watch?v=TWnx7LMQmI0)

## Prerequisites
1. docker
2. npm
3. git client
4. MySQLWorkbench (optional)
5. MongoDB Compass Community (optional)

## Installation

### Clone this repo
```
$ git clone git@github.com:kommandr/kommandr.git
$ cd kommandr
```

### Initialize and download git submodules
This repo depends on 3 repositories:
- ui: the ReactJS application
- api: the Node.js application + GraphQL
- recommendr: the recommendation system

#### Initialize the repositories:
`$ git submodule init`

#### Download the source code
`$ git submodule update`

### Create docker images
`$ docker-compose build`
Keep in mind that this process can take a long time

### Create docker containers
`$ docker-compose up`

### Restore initial database state
```
$ cd src/backend/api
$ bash scripts/createDatabases.sh
```

### Access the application

#### On macOS/Linux
Go to http://localhost:5000/
