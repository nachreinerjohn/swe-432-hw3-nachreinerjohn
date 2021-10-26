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
app.get('/items', async (req, res)=>{
  if(!dataIsReady){
      res.status(503)
      return res.json({error : "Data not ready"});
  }
  const documents = await db.collection('items').get()
  const items = [];
  documents.forEach(doc => {
    items.push(doc.id)
  })
  return res.json(items)
})

//getting a detailed list of all items and their values
app.get('/items/detailed', async (req, res) =>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    const documents = await db.collection('items').get()
    const items = [];
    documents.forEach(doc => {
      temp = doc.data()
      temp.name = doc.id
      items.push(temp)
    })

    res.json(items);
})
//getting one item
app.get('/items/:itemName', async (req, res) => {
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    const itemName = req.params.itemName;

    //if the item name was inputted, search through the data for that item name
    if(itemName){
      const docRef = db.collection('items').doc('' + itemName)
      const document = await docRef.get();
      if(document.exists){
        temp = document.data()
        temp.name = document.id 
        return res.json(temp)
      }
      else{
        res.status(404);
        res.json({message : "Item not found"})
      }
    }
    else{
        res.status(400);
        res.json({error : "Invalid Input"})
    }
  })
/////////////////////////////////////////////////
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;