# feedback-frontend

The frontend of the application for feedback analysis.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. 

### Prerequisites
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

Congratulations! It should be installed and working now.

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

|                          Dependency                          |  Version  |                         Description                          |                            Usage                             |
| :----------------------------------------------------------: | :-------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|                 [antd](https://ant.design/)                  | `^3.15.0` | An enterprise-class UI design language and React-based implementation with a set of high-quality React components |         Used to style most of appearance of the app.         |
|           [axios](https://github.com/axios/axios)            | `^0.18.0` |    Promise based HTTP client for the browser and node.js     |      As a convenient tool to make requests to backend.       |
| [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) | `^1.11.0` |      A babel plugin for importing components on demand.      | Used to import `antd` components on demand so as to reduce the size of the final built app. |
|                [moment](http://momentjs.com/)                | `^2.24.0` |       Parse, validate, manipulate, and display dates.        | Used to parse the date object / timestamp sent from backend as formatted date string to be shown. |
|                [react](https://reactjs.org/)                 | `^16.8.1` |      A JavaScript library for building user interfaces.      |         A base framework language to build our app.          |
| [react-app-rewired](https://github.com/timarney/react-app-rewired) | `^1.6.2`  |      One of create-react-app's custom config solutions.      | Used to customize the webpack config so as to import style files on demand. |
|   [react-color](http://casesandberg.github.io/react-color)   | `^2.17.0` | A Collection of Color Pickers from Sketch, Photoshop, Chrome, Github, Twitter, Material Design & more. |        Used to specify the colors of feedback labels.        |
|     [react-dom](https://reactjs.org/docs/react-dom.html)     | `^16.8.1` | This package provides DOM-specific methods that can be used at the top level of app. |         As a necessary peer dependency with `react`.         |
|  [react-router-dom](https://reacttraining.com/react-router)  | `^4.3.1`  |                Declarative routing for React.                |               Used to navigate between pages.                |
| [react-scripts](https://github.com/facebook/create-react-app) |  `2.1.1`  | This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app). | Used to run development and build the production of the react app. |
|               [recharts](http://recharts.org)                | `^1.4.2`  |   A composable charting library built on React components.   |             Used to render graphs on dashboard.              |
|            [serve](https://github.com/zeit/serve)            | `^10.1.1` |          Static file serving and directory listing.          |        Used to serve the app on a server like Heroku.        |

## License
This project is licensed under the MIT License. See [LICENSE.md](/LICENSE)

## Related
- [feedback-backend](https://github.com/GRP-17/feedback-backend)
- [feedback-component](https://github.com/GRP-17/feedback-component)
