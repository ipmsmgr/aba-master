Install:

- Install node.js
- Navigate to server directory:
```cd server```
- Install server libraries via node package manager:
```npm install```
- Install bower package manager for client side libraries: 
```npm install -g bower```
- Navigate to client directory:
```cd client```
- Install client libraries using bower:
```bower install```
- Start the Grunt task, which makes sure that the SASS files are recompiled when changed. SASS files are CSS pre-processor files.
```cd client```
```grunt```

Setup:

- Set user specific configuration. To do so, follow these steps:
    - create a new file called ```<user>.json``` in the ```config``` directory.
    - set environment variable ```NODE_ENV``` to ```<user>```
    - find details at https://github.com/lorenwest/node-config
    - make sure to open new terminal windows so that the environment variables are present


Run:
- Start MondoDB:
```mongod --dbpath <path do db directory>```
- Navigate to server directory:
```cd server```
- Start server:
```node server.js```
