# kommandr.com

Utilize a centralized command center at Kommandr.com and discover, learn, save, and share commands. Watch demo video [here](https://www.youtube.com/watch?v=TWnx7LMQmI0)

## Prerequisites
1. docker
2. npm
3. git client
4. MySQLWorkbench (optional)
5. MongoDB Compass Community (optional)

## Installation

The installation process is segmented in four steps:
 1. Cloning the repo
 2. Docker images and containers
 3. The backend
 4. The GUI


### Cloning this repo
```
$ git clone git@github.com:kommandr/kommandr.git
$ cd kommandr
```

#### Initialize and download git submodules
This repo depends on 3 repositories:
- ui: the ReactJS application
- api: the Node.js application + GraphQL
- recommendr: the recommendation system

#### Initialize the repositories:
```
$ git submodule init
```

#### Download the source code
```
$ git submodule update
```

### Docker images and containers

#### Step into the root directory of the project
```
$ cd kommandr
```
#### Build images
```
$ docker-compose build
```

This command creates three images:
 - kommandr-api-mariadb
 - kommandr-api-mongodb
 - kommandr-recommendr

Keep in mind that this process can take a long time.

#### Create docker containers
```
$ docker-compose up
```

### The backend

#### Configure database endpoints
Create the configuration files for the database and edit as appropiate
```
$ cd src/backend/api/config
$ cp config.json.example config.json
$ cp db.mongo.json.example db.mongo.json
$ cp db.sql.json.example db.sql.json
```

#### Install backend dependencies
```
$ cd src/backend/api
$ npm install -g sequelize-cli
$ npm install
```
#### Restore initial database state
```
$ bash createDatabases.sh
```

### The UI
```
$ cd src/frontend/ui
$ npm install
```

Go to http://localhost:5000/


### The backend API (GraphQL)
Go to http://localhost:5001/graphql


### The SQL Database
Use the mysql client or MySQL Workbench to connnect to the database. Make sure to use the right credentials
```
$ mysql -u kommandr -p k0mm4ndr -h 127.0.0.1 -p 3306
```

### The MongoDB Database
Use MongoDB Compass using the right credentials (see config files)

## Development

### Installing new dependencies
You will need to rebuild the docker images. Depending on the project you are working on, follow the per-project instructions below:

*ui*
```
$ docker-compose build --no-cache --force-rm ui
```

*API*
```
$ docker-compose build --no-cache --force-rm api
```


*recommendr*
```
$ docker-compose build --no-cache --force-rm recommendr
```


## Troubleshooting
