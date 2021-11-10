* **Name:** John Nachreiner
* **Heroku Deployment URL:** https://john-nachreiner-swe432-hw3.herokuapp.com/

### Documentation of Web App and React Components

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

This repo contains a barebones Node.js app using [Express 4](http://expressjs.com/) and a barebones React app with a few components.