# feedback-frontend
The frontend of the application for feedback analysis.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. 

### Prerequesites
*npm* - is used as the package manager to manage the dependencies. You will need npm on your machine inorder to install the required project dependencies.

*node* - the project is a react app so it uses node.

### Installing
Firstly this is just the frontend of the app which needs a backend to communicate with (retrieve data from), so firstly you need to [setup a backend](https://github.com/GRP-17/feedback-backend) and someway of adding feedback to the backend, this will be done by [a feedback-component](https://github.com/GRP-17/feedback-component).

Once the backend is setup you will need:
1. it's base url

Move into the [feedback-frontend-app](https://github.com/GRP-17/feedback-frontend/wiki/Project-File-Structure#feedback-frontend-app#feedback-frontend-app) folder and then run `npm install` and the dependencies should be installed to your system.

You will need to add the base url to the config.js (in the src folder). This will allow the app to retrieve data from your backend and it can then display the data on this app.

Congratulations it should be installed and working now. :D

### Deployment
To deploy this to a live system you just need to build the app files using `npm build` (inside the feedback-frontend-app folder).

Using the Serve dependency you can serve these built files from a live system. `serve -s build`.

This should be enough to get a live version of this app working.

### Index of dependencies
1. "antd": "^3.15.0",
2. "axios": "^0.18.0",
3. "babel-plugin-import": "^1.11.0",
4. "moment": "^2.24.0",
5. "react": "^16.8.1",
6. "react-app-rewired": "^1.6.2",
7. "react-dom": "^16.8.1",
8. "react-router-dom": "^4.3.1",
9. "react-scripts": "2.1.1",
10. "recharts": "^1.4.2",
11. "serve": "^10.1.1"
