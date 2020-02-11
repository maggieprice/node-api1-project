// implement your API here
const express = require('express');

const Database = require('./data/db.js');

const server = express();
server.get('/', (req, res)=>{
    res.json({hello: "Web 26"})
})

const port = 5000;

server.listen(port, () => console.log(`\n** API on port ${port} \n`));

server.get('/api/users', (req, res) => {
  
    Database.find().then(db => {
        res.status(200).json(db)
    }).catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: 'The users information could not be retrieved.'});
    });
})

server.get(`/api/users/:${id}`, (req, res) => {
    const { id } = req.params;
   
        if (!obj) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        } 
       else  Database.findById(id).then(obj => {res.status(200).json(obj); 
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    })
})

server.post('/api/users', (req, res) => {
  
    const newHobbit = req.body;
    if (!newHobbit.name && !newHobbit.bio){
            res.status(400).json({errorMessage: 'Please provide name and bio for the user.'});
        }    
     else Database.insert(newHobbit).then(db => {
        res.status(201).json(newHobbit)
    }).catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: 'There was an error while saving the user to the database'});
    });
    
})

server.put('/api/users/:id', (req, res) => {
  
    const {id}= req.params;
    const {dataChanges} = res.id;

    if (!dataChanges.id){
        res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    } 

    if (!dataChanges.name && !dataChanges.bio){
        res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    }
    else Database.update(id, dataChanges)
    .then(db => {
        res.status(200).json(db);
    })
    .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ errorMessage: "The user information could not be modified." });
        
      });
  })


  server.delete('/api/users/:id', (req, res) => {
    const deleteHobbit = req.body; 

    if (!deleteHobbit.name && !deleteHobbit.bio){
        res
        .status(404)
        .json({ errorMessage: "The user with the specified ID does not exist." });
    }
    Database.delete(id, deleteHobbit)
    .then(db => {
        res.status(200).json(db);
    })
    .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ errorMessage: "The user could not be removed." });
    });
  });