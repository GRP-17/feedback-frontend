# feedback-frontend
The frontend of the application for feedback analysis.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. 

### Prerequesites
*npm* - is used as the package manager to manage the dependencies. You will need npm on your machine inorder to install the required project dependencies.

*node.js* - the project is a react app so it uses node.

### Installing
Firstly this is just the frontend of the app which needs a backend to communicate with (retrieve data from), so firstly you need to [setup a backend](https://github.com/GRP-17/feedback-backend) and someway of adding feedback to the backend, this will be done by [a feedback-component](https://github.com/GRP-17/feedback-component) (although any method of posting data to the backend can work e.g. curl).

Once the backend is setup you will need:
1. it's base url (e.g. `https://*your app name*.herokuapp.com/` for a heroku deployment.)

Move into the [feedback-frontend-app](https://github.com/GRP-17/feedback-frontend/wiki/Project-File-Structure#feedback-frontend-app) folder and then run `npm install` and the dependencies should be installed to your system.
```bash
$ npm install
```

![npm install example](https://user-images.githubusercontent.com/43950567/56083270-78c75200-5e1a-11e9-991a-d926fa851b48.PNG)

You will need to add the base url to the config.js (in the src folder). This will allow the app to retrieve data from your backend and it can then display the data on this app.

![base url example](https://user-images.githubusercontent.com/43950567/56083316-1b7fd080-5e1b-11e9-9f02-95c3aff80121.PNG)

once you are ready to launch it for development and testing you can start it locally using `npm start`
```bash
$ npm start
```

![npm start example](https://user-images.githubusercontent.com/43950567/56084106-2d1aa580-5e26-11e9-8d45-3bf21d979341.PNG)

Congratulations it should be installed and working now :D

### Deployment
To deploy this to a live system you just need to build the app files using `npm run build` (inside the feedback-frontend-app folder).
```bash
$ nom run build
```

Using the `serve` dependency you can serve these built files from a live system. 
```bash
$ serve -s build
```

This should be enough to get a live version of this app working.


## Built with
- [React.js](https://reactjs.org/) - the javascript framework used
- [npm](https://www.npmjs.com/) - dependency manager

## Index of dependencies
```
1. "antd": "^3.15.0", // A UI desgin library.
2. "axios": "^0.18.0", // A library for sending http requests e.g. POST, GET etc...
3. "babel-plugin-import": "^1.11.0",
4. "moment": "^2.24.0",
5. "react": "^16.8.1", 
6. "react-app-rewired": "^1.6.2",
7. "react-dom": "^16.8.1",
8. "react-router-dom": "^4.3.1", // Used to add different paths e.g. /dashboards , /home etc... 
9. "react-scripts": "2.1.1",
10. "recharts": "^1.4.2", // A UI design library for graphs.
11. "serve": "^10.1.1" // Used to serve the built files on a live system.
```

## License
This project is licensed under the MIT License. See [LICENSE.md](/LICENSE)

## Related
- [feedback-backend](https://github.com/GRP-17/feedback-backend)
- [feedback-component](https://github.com/GRP-17/feedback-component)
