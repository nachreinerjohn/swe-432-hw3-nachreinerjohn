const express = require('express')
const fetch = require('node-fetch')
const path = require('path');
const admin = require('firebase-admin'); // uncomment to use Firebase
const app = express()

app.use(express.static(path.join(__dirname, 'client/build')));

// Firebase starter code appears below

let serviceAccount = require('./swe-432-hw3-994e2-firebase-adminsdk-d5gv2-503dce04a7');
const { database } = require('firebase-admin');
admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

/////////////////////////////////////////////////
let Cosmetics = []
var dataIsReady = false;

async function storeItemData(name, descrip, rarity, type, tags){
  return await db.collection('items').doc(name).set({
    description: descrip,
    rarity: rarity,
    type: type,
    tags: tags
  })
}

const getCosmetics = async ()=>{
    const cosmeticBody = await fetch("https://fortnite-api.com/v2/cosmetics/br/new");

    const cosmeticTemp = await cosmeticBody.json()

    //convert the incoming data into a smaller set of the information we will use
    for(let item of cosmeticTemp.data.items){
        const res = storeItemData(item.name, item.description, item.rarity.value, item.type.value, item.gameplayTags);
    }
  };

getCosmetics().then(() =>{
    dataIsReady = true;
}).catch(err =>{
    console.log(err);
})


//getting all items
app.get('/', async (req, res)=>{
    console.log('hello')
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }
    //create an array of items and push the names of every item onto it to return
    // let items = []
    // for(let item of Cosmetics){
    //     items.push(item.name);
    // }
    //res.send(items)
    const items = await db.collection('items').get()
    console.log(items)
    res.send(items)
  })

//getting a detailed list of all items and their values
app.get('/detailed', (req, res) =>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    res.json(Cosmetics);
})
//getting one item
app.get('/:itemName', (req, res) => {
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    const itemName = req.params.itemName;

    //if the item name was inputted, search through the data for that item name
    if(itemName){
        var found = false;
        for(let item of Cosmetics){
            if(item.name == itemName){
                found = true;
                res.json(item);
            }
        }
        if(!found){
            res.status(404);
            res.json({message : "Item not found"})
        }
    }
    else{
        res.status(400);
        res.json({error : "Invalid Input"})
    }
  })

//creating an item
app.post('/', (req, res) =>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    const {name, description, rarity, type, tags} = req.body
    //if all the dat has been input, create a new item with it and put it into the dataset
    if(name && description && rarity && type, tags){
        Cosmetics.push(new CosmeticItem(name, description, rarity, type, tags));

        //print a confirmation message with the new items information
        res.status(201);
        res.send(`Created new Item:\n
        Name : ${Cosmetics[Cosmetics.length-1].name}\n
        Description: ${Cosmetics[Cosmetics.length-1].description}\n
        Type: ${Cosmetics[Cosmetics.length-1].type}\n
        Rarity: ${Cosmetics[Cosmetics.length-1].rarity}\n
        Tags: ${Cosmetics[Cosmetics.length-1].tags}\n`)
    }
    else{
        res.status(400);
        res.json({error : "Invalid Input"});
    }
})

//add tags to an item
app.post('/tag/:itemName', (req, res) =>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }
    
    const itemName = req.params.itemName;
    const tags = req.body.tags

    //if the data was input correctly and the tags are appropriately in array form
    if(itemName && tags && Array.isArray(tags)){
        var found = false;
        //search for the item to add a tag to
        for(let item of Cosmetics){
            if(item.name == itemName){
                found = true;
                item.addTag(tags);
                res.status(201);
                res.json({tags : item.tags});
            }
        }
        if(!found){
            res.status(404)
            res.json({message : "Item not found"})
        }
    }
    else{
        res.status(400);
        res.json({error : "Invalid Input"});
    }
})

//getting items with the specified rarity
app.get('/rarity/:rarity', (req, res) =>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    let items = []

    const itemRarity = req.params.rarity;

    //if the input was entered correctly, search through the data for items with the rarity specified
    if(itemRarity){
        for(let item of Cosmetics){
            if(item.rarity == itemRarity){
                items.push(item.name);
            }
        }
        res.json(items);
    }
    else{
        res.status(400);
        res.json({error : "Invalid Input"});
    }
})

//getting the items with the specified type
app.get('/type/:type', (req, res) =>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    let items = []

    const itemType = req.params.type;

    //if the input was entered correctly, search through the data for items with the type specified
    if(itemType){ 
        for(let item of Cosmetics){
            if(item.type == itemType){
                items.push(item.name)
            }
        }
        res.json(items);
    }
    else{
        res.status(400);
        res.json({error : "Invalid Input"});
    }
})

//getting the rarity breakdown of items of a specific type
app.get('/type/:type/rarity', (req, res) =>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    const itemType = req.params.type;

    //if the input was entered correctly, create a map to keep track of how many of each rarity has been encountered
    if(itemType){
        const breakdown = new Map();

        //search through the data for the item type
        for(let item of Cosmetics){
            if(item.type == itemType){
                //if the map already has seen this rarity, add 1 to how many its seen
                if(breakdown.has(item.rarity)){
                    breakdown.set(item.rarity, breakdown.get(item.rarity) + 1);
                } //if the map has not seen this rarity, add it to the map with the number seen set to 1
                else{
                    breakdown.set(item.rarity, 1);
                }
            }
        }
        //total up the values, then use that to calculate percentages
        let total = 0;
        for(const value of breakdown.values()){
            total += value;
        }
        for(const key of breakdown.keys()){
            breakdown.set(key, (breakdown.get(key)/total)*100 + "%")
        }
        //turn the map into a json object
        const ret = Object.fromEntries(breakdown);
        res.json(ret);
    }
    else{
        res.status(400);
        res.json({error : "Invalid Input"});
    }
})
/////////////////////////////////////////////////
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;