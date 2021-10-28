# SWE-432 HW-3 Starter Application

## Submission Information

### Student Information

*Please fill in this information before submission*

* **Student Name:** John Nachreiner
* **Student G-Number:** 01116844
* **Heroku Deployment URL:** https://john-nachreiner-swe432-hw3.herokuapp.com/

### Documentation of your Web App and React Components

*Here please describe your (at least) 3 different React components as well as the overall purpose of your web application. We provide an example below of what we expect this documentation to look like.*

**General App Description:** This web application provides information about new items in the fortnite marketplace loaded from the fortnite database at fortniteapi.com. This app can help people find data on new items in the marketplace such as names, types, rarites, and descriptions.

* **Endpoint 1:** Retrieve the list of new item names in the marketplace
  * API Endpoint: GET /items
  * Example: GET /items
  * Expected Output: (a list of new item names from the fortnite marketplace)

* **Endpoint 2:** Retrieve detailed information on each item in the list of new items in the marketplace
  * API Endpoint: GET /items/detailed
  * Example: GET /items/detailed
  * Expected Output: (an array of json objects containing detailed item data for each item)
  i.e. {
    "name": "Smallcophagus",
    "description": "Don't open it. You're not gonna like what you see.",
    "rarity": "rare",
    "type": "backpack",
    "tags": [
        "Cosmetics.Source.ItemShop",
        "Cosmetics.Filter.Season.18",
        "Cosmetics.UserFacingFlags.HasVariants",
        "Cosmetics.Set.StampArtist"
    ]
  }

* **Endpoint 3:** Retrieve detailed information on a specified item in the marketplace
  * API Endpoint: GET /items/:itemName
  * Example: GET /items/Smallcophagus
  * Expected Output: 
  {
    "name": "Smallcophagus",
    "description": "Don't open it. You're not gonna like what you see.",
    "rarity": "rare",
    "type": "backpack",
    "tags": [
        "Cosmetics.Source.ItemShop",
        "Cosmetics.Filter.Season.18",
        "Cosmetics.UserFacingFlags.HasVariants",
        "Cosmetics.Set.StampArtist"
    ]
}

* **Component 1:** App Component
	* API Endpoint:
      * GET /items/detailed
  * Expected display: An html table, made by the List component, of the detailed firebase data, and a list of descriptions mapped by the paragraph component.

* **Component 2:** List Component
* API Endpoint:
    * GET /items/detailed
  * Expected display: A table with The names of each table category and the data for each table element displayed by the Display component

* **Component 3:** Display Component
* API Endpoint:
    * GET /items/detailed
  * Expected display: A table entry in the Display components table, specifying item name, rarity, and type

* **Component 4:** Paragraph Component
* API Endpoint:
    * GET /items/detailed
  * Expected display: A list entry in the App components description list specifying item name and description

## Project Overview

This repo contains a barebones Node.js app using [Express 4](http://expressjs.com/) and a barebones React app with a single component. You will use this as the "base" version of your Microserivce + Front-end application for HW Assignment #3. You will simply create a copy of this repo through GitHub classroom and then work in that repo. 

## Homework Assignment 3 Detailed Instructions

You can find the deatiled instructions for HW Assignment #3 on the [course webpage](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f21/hw3). Please read these carefully before getting started.

## Running this Project Locally

Make sure you have [Node.js](http://nodejs.org/) and (optionally) the [Heroku CLI](https://cli.heroku.com/) installed. You only need the Heroku CLI installed if you plan to deploy the project from the CLI instead of the Heroku web interface. See the [HW Assignment #3 instructions](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f21/hw3) for more details.

*Note the following commands assume a Unix-based enviornment. If you are on windows, you may need to use something such as Windows Subsystem for Linux (https://docs.microsoft.com/en-us/windows/wsl/about).*

```sh
$ git clone <repo-name>
$ cd <repo-name>
$ npm install
$ npm run setup
$ npm start
```

After executing these commands, your express backend and React frontend should now be running on [localhost:5000](http://localhost:5000/). You can visit this page in your web browser to view your front-end user interface. You can also access your microservice endpoints (e.g., [localhost:5000/cities](http://localhost:5000/cities). Please see the [HW #3 instructions](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f21/hw3) for more information on how this works.

## Deploying to Heroku

Check out [our instructions](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f21/hw3) for deploying your application to Heroku. You can use the button below for quick access to your Heroku account.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Testing with Continuous Integration

**Note that you are not required to test your project with Jest for HW3, however, we have enabled this functionality in case you would like to use it. If you would like to remove the tests, you can remove the `.github` directory from the repo.**

Currently, this repo is set up to run the Jest tests in the `app.test.js` file upon each commit to the `main` branch of the repository. If any of the tests fail, the CI process will fail and this will be indicated with red "X" on the main page of your repo, and GitHub will likely also send you a notification email that your automated tests have failed.

Currently, the tests are configured to run by getting deployed to a remote virtual server with an Ubuntu operating system, where the `npm install` and `npm test` commands are executed.

You can find the [GitHub Actions](https://github.com/features/actions) script for this CI job [here](.github/workflows/ci.yml) if you want to learn more.

## Additional Resources

For more information about using Node.js on Heroku, see these Heroku Dev Center articles:

- [React Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [Express Documentation](https://expressjs.com/en/5x/api.html)
- [Supertest Documentation](https://www.npmjs.com/package/supertest)
- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
