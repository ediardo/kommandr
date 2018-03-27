Kommandr.com
============

Utilize a centralized command center at Kommandr.com and discover, learn, save, and share commands. Watch demo video [here](https://www.youtube.com/watch?v=TWnx7LMQmI0)

This project is under development.
## Installation

### Clone the project
```shell
$ git clone git@github.com:kommandr/kommandr.git
 ```
 
### Install dependencies
```shell
$ cd kommandr
$ npm install --save
```

## Running kommandr.com locally
You need two terminal window/tabs opened #1 for backend and #2 for frontend. 

### Backend (terminal #1)
```shell
$ cd kommandr
```
#### Create Database
```shell
$ node_modules/.bin/sequelize db:migrate
```
#### Running Seeds
```shell
$ node_modules/.bin/sequelize db:seed:all
```

#### Starting the web server
```shell
$ npm start
```

### View GraphiQL (Optional)
Go to http://localhost:5001/graphiql

### Frontend (terminal #2)
```shell
$ cd kommandr
```

#### Starting webback dev server.
```shell
node scripts/start.js
```


More information coming SOON.

## Development
If you found any bug please create an issue on this repo.
