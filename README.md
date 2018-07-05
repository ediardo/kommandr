# kommandr.com

Utilize a centralized command center at Kommandr.com and discover, learn, save, and share commands. Watch demo video [here](https://www.youtube.com/watch?v=TWnx7LMQmI0)


## Installation
The installation process is segmented in four steps:
 1. Cloning this repo
 2. Docker images and containers
 3. The backend and the database
 4. The UI

### Prerequisites
1. docker and docker-compose
2. npm
3. git client

### Clone this repository
Download the source code of this repository to your computer. This repo only contains high-level configuration for deployment with docker-compose
```
$ git clone git@github.com:kommandr/kommandr.git
$ cd kommandr
```

#### Initialize and download git submodules
This repo depends on 3 repositories:
- ui: the facing part of the project that lets user to fetch and store information
- api: the  application that sits on the server and manages connection to two databases and responds to API calls via GraphQL
- recommendr: the recommendation system that suggests similar programs that perform a similar task.
- tldr-pages-parser: a set of scripts built on JS that reads Markdown files from TL;DR Pages project and transforms them into objects that can be later used programmatically
- kmdr.sh: the command-line client that lets you use Kommandr from the terminal.

#### Download the source code
```
$ git submodule update --init
```
This will pull the source code of the submodules after registering their names and urls into the `.git/config`. 

### Docker images and containers
Kommandr uses Docker containers for development and production. While not all of the projects are containerized, both the database layer and recommendation system are always put into containers for development and production environments. More details can be found inside of the compose files `docker-compose.dev.yml` and docker-compose.prod.yml`

#### Step into the root directory of the project
```
$ cd kommandr
```

#### Build Dockerimages
##### Development
```
$ docker-compose -f docker-compose.dev.yml build
```
##### Production
```
$ docker-compose -f docker-compose.prod.yml build
```

*Keep in mind that this process can take a long time to complete.*

#### Create and start Docker containers
##### Development
```
$ docker-compose -f docker-compose.dev.yml up
```
##### Production
```
$ docker-compose -f docker-compose.prod.yml up 
```

### The backend and the database layer

#### Configure database endpoints
Create the configuration files for the database and edit as appropiate
```
$ cd src/api/config
$ cp config.json.example config.json
$ cp db.mongo.json.example db.mongo.json
$ cp db.sql.json.example db.sql.json
```

#### Install backend dependencies
```
$ cd src/api
$ npm install -g sequelize-cli
$ npm install
```
#### Restore initial database state
```
$ bash createDatabases.sh
```

### The UI
#### Download packages
```
$ cd src/ui
$ npm install
```

#### Start the server for development
```
$ npm start
```

#### Build for production
##### Set KMDR_API_ENDPOINT environment variable
```
$ export KMDR_API_ENDPOINT=http://endpoint
```
##### Build a production-ready bundle
```
$ npm run build
```
##### Start the server
```
$ npm install -g serve
$ serve -s build/
```

### Troubleshooting
Pending...
