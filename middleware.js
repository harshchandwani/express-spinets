const express = require("express");
const app = express();


function userMiddleware(req, res, next){
    const username = req.headers.username;
    const password = req.headers.password;
    if (username != "harsh" || password != "pass") {
        res.status(403).json({
            msg: "User doesnt exist",
        });
        return;
    }
    else{
        next();
    }
}

function kidneyMiddleware(req, res, next){
    const kidneyId = req.query.kidneyKid;
    if (kidneyId != 1 && kidneyId != 2) {
        res.status(411).json({
            msg: "wrong inputs",
        });
        return;
    }
    else{
        next();
    }
}

//middleware ---- intial check
app.use(express.json());
app.use(userMiddleware);
app.use(kidneyMiddleware)
//if any request is coming, the first function that will run will be userMiddleware
app.get("/health-checkup",  function (req, res) {
    // do health checks here
    // do something with kidney here
    res.send(", your kidney is fine")
});


app.use(function(err, req, res, next){
    res.json({
        msg: "Sorry, something is up with our server"
    })
})
app.listen(3001, ()=> {console.log("Ready")});
