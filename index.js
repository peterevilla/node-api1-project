const express = require("express");

const shortid = require("shortid");

const server = express();
server.use(express.json());

const PORT = 5000;

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

let users = [];

//-----------------------------------------------------

//GET
server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) => {});

//POST
server.post("/api/users", (req, res) => {
  const userInfo = req.body;

  if (userInfo.name === "" || userInfo.bio === "") {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for user" });
  } else if(userInfo) {
    userInfo.id = shortid.generate();

    users.push(userInfo);

    res.status(201).json(userInfo);
  } else {

    res.status(500).json({message: 'There was an error while saving the user to the database'})
  }
});

//DELETE

server.delete("/api/users/:id", (req, res) => {

    const {id} = req.params

    const found = users.filter(user => {
        user.id === id
    })

    if(found) {

        users = users.filter(user => user.id !== id)
        res.status(200).json({message: 'user deleted'})
    } else {

        res.status(404).json({message: 'The user with the specified ID not exist'})
    }


});

//PUT

server.put("/api/users/:id", (req, res) => {

    const {id} = req.params
    const changes = req.body

    let index = users.findIndex(user => user.id === id)


    if(index !== -1) {

        changes.id = id
        users[index] = changes
        res.status(200).json(users[index])
    } else {

        res.status(404).json({message: 'The user with the specified ID does not exist.'})
    }
   
    })




