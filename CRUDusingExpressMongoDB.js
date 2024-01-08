//here we are connecting the mongoDB to backend in a simple application
const mongoose = require("mongoose");
const express = require("express");

mongoose.connect("mongodb+srv://harshchandwani50028:cl8UKBwfO058PaY6@cluster0.qy3a5bn.mongodb.net/")

//We will do all CRUD
/* 
    C: CREATE (Done)
    R: READ (done)
    U: UPDATE (done)
    D: DELETE (done)
*/
const app = express();
app.use(express.json());
const User = mongoose.model('Users', { name: String, email: String, password: String });
//to get the information from http, we need to have something else
app.post('/signup', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    //to check if the user not exist already, we need something else
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).send("User already exist");
    }
    const user = new User({
        name: name,
        email: email,
        password: password
    });
    //CREATE
    user.save();
    res.json({
        "msg": "User created successfully"
    })
});


//Read
app.get("/users", async function (req, res) {
    const email = req.headers.email;
    const password = req.headers.password;
    const userExist = await User.findOne({ email: email });
    if(userExist.email === email && userExist.password === password){
        res.status(200).send("User Exist");
    }
    else{
        res.status(400).send("Incorrect Password");
    }
});

//update
app.put('/users',async function(req, res){
    const email = req.body.email;
    const newName = req.body.name;

    try{
        const updatedUser = await User.findOneAndUpdate({email: email}, {name: newName});
        res.status(200).send({user: updatedUser, msg: "User updated"});
    }
    catch(err){
        res.status(400).send("Error updating the user");
    }
});


// DELETE
app.delete("/users", async function (req, res) {
    const email = req.body.email;

    try {
        const deletedUser = await User.findOneAndDelete({ email: email });

        if (deletedUser) {
            res.status(200).json({ msg: "User deleted successfully" });
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (err) {
        res.status(400).send("Error deleting user");
    }
});
app.listen(3000, () => { console.log("Running") })
