// implement your API here
const express = require('express');

const Database = require('./data/db.js');

const server = express();
server.get('/', (req, res)=>{
    res.json({hello: "Web 26"})
})

server.use(express.json())

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

server.get(`/api/users/:id`, (req, res) => {
    Database.findById(req.params.id)
   .then(obj =>{
    if (obj) {res.status(200).json(obj);
    }
   else { 
   res.status(404).json({ message: "The user with the specified ID does not exist." });
} 
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    })
})

server.post('/api/users', (req, res) => {
  console.log(req.body)
    // const newHobbit = req.body;
    if (!req.body.name || !req.body.bio){
            res.status(400).json({errorMessage: 'Please provide name and bio for the user.'});
        }    
     else Database.insert(req.body).then(db => {
        res.status(201).json(db)
    }).catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: 'There was an error while saving the user to the database'});
    });
    
})

// server.put('/api/users/:id', (req, res) => {
  
//     const {id}= req.params;
//     const {dataChanges} = res.id;

//     if (!dataChanges.id){
//         res
//         .status(404)
//         .json({ message: "The user with the specified ID does not exist." });
//     } 

//     if (!dataChanges.name && !dataChanges.bio){
//         res
//         .status(400)
//         .json({ errorMessage: "Please provide name and bio for the user." });
//     }
//     else Database.update(id, dataChanges)
//     .then(db => {
//         res.status(200).json(db);
//     })
//     .catch(err => {
//         console.log(err);
//         res
//           .status(500)
//           .json({ errorMessage: "The user information could not be modified." });
        
//       });
//   })


// server.put('./api/users/:id', (req, res)=> {
//     const updateObject = req.body;

//     Database.update(req.params.id, updateObject).then(obj => {
//         if (obj){
//             res.status(200).json(obj);
//         } else {
//             res.status(400).json({errorMessage: })
//         }
//     })
// })

  server.delete('/api/users/:id', (req, res) => {
    // const {id}= req.params;
    Database.remove(req.params.id)
    .then(db => {
        if (req.params.id) {
            res.status(200).json({Message:  "The user has been deleted.", db})
        } else {
            res
            .status(404)
            .json({ errorMessage: "The user with the specified ID does not exist." });
        }
    })
    .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ errorMessage: "The user could not be removed." });
    });
  });